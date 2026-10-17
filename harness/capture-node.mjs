// Captures the section-4 Node corpus (not graded).
//
//   node harness/capture-node.mjs [--capture-port 7102] [--only F1,F3] [--test]
//
// Builds fixture/node-api v1 and v2 inside node:22-alpine (npm ci + tsc), then
// runs each build on node:22-alpine and node:24-alpine, plain and with
// --enable-source-maps, and fires each planned request. The reporter in the
// fixture posts to the capture server. Same one-report rule and retries as
// the browser capture. --test writes nothing to corpus/.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { startCaptureServer } from './capture-server.mjs';
import { REPO, DOCKER_NET, ensureNetwork, waitForHttp } from './services.mjs';
import { nodePlan, APP_VERSIONS, NODE_VERSIONS, NODE_ENVS } from './plan.mjs';
import { materialise } from './build-fixture.mjs';

const args = Object.fromEntries(process.argv.slice(2).reduce((a, v, i, all) => (v.startsWith('--') ? [...a, [v.slice(2), all[i + 1] && !all[i + 1].startsWith('--') ? all[i + 1] : true]] : a), []));
const CAPTURE_PORT = Number(args['capture-port'] || 7102);
const ONLY = args.only ? String(args.only).split(',') : null;
const TEST = Boolean(args.test);
const CONTAINER = 'eval-node-api';
const MAX_ATTEMPTS = 4;

const docker = (a, opts = {}) => (execFileSync('docker', a, { encoding: 'utf8', env: { ...process.env, MSYS_NO_PATHCONV: '1' }, ...opts }) || '').trim();
const hostPath = (p) => p.replace(/\\/g, '/');

const commit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: REPO, encoding: 'utf8' }).trim();
if (!TEST) {
  const dirty = execFileSync('git', ['status', '--porcelain', '--', 'fixture', 'harness'], { cwd: REPO, encoding: 'utf8' }).trim();
  if (dirty) throw new Error(`fixture/harness has uncommitted changes:\n${dirty}`);
}

ensureNetwork();
await waitForHttp('http://localhost:7103/health', 5000);

const images = {};
for (const n of NODE_VERSIONS) images[n] = docker(['image', 'ls', '--digests', '--format', '{{.Digest}}', `node:${n}-alpine`]).split('\n')[0];

// One image per cell (app version x Node version): npm ci and tsc run inside
// the image, so the compiled files live at /app/dist in every cell.
const tag = (version, node) => `eval-node-api:${version}-node${node}`;
for (const version of APP_VERSIONS) {
  const dir = materialise('node-api', version);
  for (const node of NODE_VERSIONS) {
    docker(['build', '-q', '-t', tag(version, node), '--build-arg', `NODE=${node}`, '-f', hostPath(path.join(REPO, 'harness', 'node-api.Dockerfile')), hostPath(dir)], { stdio: ['ignore', 'ignore', 'inherit'] });
  }
}

const cap = await startCaptureServer({ port: CAPTURE_PORT, host: '0.0.0.0' });
const logFile = TEST ? null : path.join(REPO, 'corpus', 'capture-log', 'node.jsonl');
if (logFile) { fs.mkdirSync(path.dirname(logFile), { recursive: true }); fs.writeFileSync(logFile, ''); }
const log = (o) => { if (logFile) fs.appendFileSync(logFile, JSON.stringify(o) + '\n'); };

async function fire(req) {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), 3000);
  try {
    const res = await fetch(`http://localhost:7130${req.path}`, {
      method: req.method,
      headers: req.body ? { 'Content-Type': 'application/json' } : {},
      body: req.body ? JSON.stringify(req.body) : undefined,
      signal: ac.signal,
    });
    await res.arrayBuffer();
    return res.status;
  } catch {
    return 'no-response';
  } finally {
    clearTimeout(timer);
  }
}

let accepted = 0;
let dropped = 0;
let planned = 0;
for (const env of NODE_ENVS) {
  for (const version of APP_VERSIONS) {
    for (const node of NODE_VERSIONS) {
      const runArgs = ['run', '-d', '--name', CONTAINER, '--network', DOCKER_NET, '-p', '7130:7130', '--add-host', 'host.docker.internal:host-gateway',
        '-e', `REPORT_URL=http://host.docker.internal:${CAPTURE_PORT}/api/telemetry/report`,
        tag(version, node), 'node', ...(env === 'node-mapped' ? ['--enable-source-maps'] : []), 'dist/server.js'];
      const plan = nodePlan(env).filter((t) => t.version === version && t.node === node && (!ONLY || ONLY.includes(t.incident)));
      for (const t of plan) {
        planned++;
        let outcome = null;
        for (let attempt = 1; attempt <= MAX_ATTEMPTS && !outcome; attempt++) {
          // Fresh process per trigger, so no state carries over between triggers.
          for (let boot = 1; ; boot++) {
            try { docker(['rm', '-f', CONTAINER], { stdio: 'ignore' }); } catch { /* none */ }
            docker(runArgs);
            try { await waitForHttp('http://localhost:7130/health', 20000); break; } catch (e) { if (boot >= 3) throw e; }
          }
          const startSeq = cap.lastSeq;
          const status = await fire(t.request);
          const deadline = Date.now() + 6000;
          while (Date.now() < deadline && !cap.since(startSeq).some((r) => r.method === 'POST')) await new Promise((r) => setTimeout(r, 100));
          await new Promise((r) => setTimeout(r, 1500));
          const records = cap.since(startSeq);
          const posts = records.filter((r) => r.method === 'POST');
          const ok = posts.length === 1;
          log({ kind: 'attempt', env, version, node, image: `node:${node}-alpine@${images[node]}`, incident: t.incident, variant: t.variant, trigger: { request: t.request }, attempt, ok, httpStatus: status, fixtureCommit: commit,
            requests: records.map(({ seq, receivedAt, method, url, headers, bodyBase64 }) => ({ seq, receivedAt, method, url, headers, bodyBase64 })) });
          if (TEST) for (const p of posts) { const b = JSON.parse(Buffer.from(p.bodyBase64, 'base64').toString('utf8')); console.log(`   title=${JSON.stringify(b.title).slice(0, 140)}\n   stack=${JSON.stringify(b.errorLog.split('\n').slice(0, 4))}`); }
          if (ok) outcome = { attempt, post: posts[0] };
        }
        if (outcome) { accepted++; log({ kind: 'accepted', env, version, node, incident: t.incident, variant: t.variant, attempt: outcome.attempt, seq: outcome.post.seq, receivedAt: outcome.post.receivedAt }); }
        else { dropped++; log({ kind: 'dropped', env, version, node, incident: t.incident, variant: t.variant, attempts: MAX_ATTEMPTS }); }
        console.log(`${env} ${version} node${node} ${t.incident}/${t.variant}: ${outcome ? `ok (attempt ${outcome.attempt})` : 'DROPPED'}`);
      }
      try { docker(['rm', '-f', CONTAINER], { stdio: 'ignore' }); } catch { /* none */ }
      if (TEST) break;
    }
    if (TEST) break;
  }
  if (TEST && env === 'node-plain' && !args['both-envs']) break;
}
log({ kind: 'summary', env: 'node', planned, accepted, dropped, fixtureCommit: commit, images, finishedAt: new Date().toISOString() });
console.log(`node: planned ${planned}, accepted ${accepted}, dropped ${dropped}`);
await cap.close();
