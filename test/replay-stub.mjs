// Tests replay.mjs against a local stub of the BugSense API (never the
// system under test). The stub groups by byte-equal title + errorLog, seeds
// four bugs, and answers every 7th telemetry post with 429 to exercise the
// retry path. Then it scores the two stub runs with score.mjs.
//
//   node test/replay-stub.mjs [--corpus build/score-tests/corpus]
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const CORPUS = path.resolve(args.includes('--corpus') ? args[args.indexOf('--corpus') + 1] : path.join(REPO, 'build', 'score-tests', 'corpus'));
const WORK = path.join(REPO, 'build', 'replay-tests');
fs.rmSync(WORK, { recursive: true, force: true });
fs.mkdirSync(WORK, { recursive: true });

function startStub(port) {
  const bugs = new Map(); // key -> { id, occurrences }
  let nextId = 1;
  const mkId = () => (nextId++).toString(16).padStart(24, '0');
  for (let i = 0; i < 4; i++) bugs.set(`seed-${i}`, { id: mkId(), occurrences: 1 });
  let posts = 0;
  let throttled = 0;
  const server = http.createServer((req, res) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => {
      const send = (status, obj, headers = {}) => { res.writeHead(status, { 'Content-Type': 'application/json', ...headers }); res.end(JSON.stringify(obj)); };
      const url = new URL(req.url, 'http://stub');
      if (req.method === 'POST' && url.pathname === '/api/auth/login') return send(200, { token: 'stub-token', user: { _id: 'u' } });
      if (req.method === 'GET' && url.pathname === '/api/bugs') {
        if (req.headers.authorization !== 'Bearer stub-token') return send(401, {});
        const all = [...bugs.values()];
        const limit = Number(url.searchParams.get('limit') || 10);
        const page = Number(url.searchParams.get('page') || 1);
        return send(200, { bugs: all.slice((page - 1) * limit, page * limit).map((b) => ({ _id: b.id, occurrences: b.occurrences })), total: all.length, page, pages: Math.max(1, Math.ceil(all.length / limit)), limit });
      }
      if (req.method === 'POST' && url.pathname === '/api/telemetry/report') {
        posts++;
        if (posts % 7 === 0) { throttled++; return send(429, { error: 'Too many requests' }, { 'Retry-After': '1' }); }
        const body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
        const key = `${body.title}\u0000${body.errorLog}`;
        const existing = bugs.get(key);
        if (existing) { existing.occurrences++; return send(200, { success: true, status: 'deduplicated', bugId: existing.id, occurrences: existing.occurrences }); }
        const b = { id: mkId(), occurrences: 1 };
        bugs.set(key, b);
        return send(201, { success: true, status: 'created', bugId: b.id, occurrences: 1 });
      }
      send(404, {});
    });
  });
  return new Promise((r) => server.listen(port, '127.0.0.1', () => r({ close: () => new Promise((x) => server.close(x)), stats: () => ({ posts, throttled, bugs: bugs.size }) })));
}

let failures = 0;
const expect = (name, cond, detail) => { if (!cond) { failures++; console.log(`FAIL ${name}: ${detail}`); } else console.log(`ok   ${name}`); };
const runs = [];
for (const seed of [1, 2]) {
  const stub = await startStub(7150);
  const out = path.join(WORK, `stub-seed${seed}.jsonl`);
  // Asynchronous child: the stub lives in this process and must keep serving.
  const code = await new Promise((resolve) => {
    const child = spawn(process.execPath, [path.join(REPO, 'replay.mjs'), '--base', 'http://127.0.0.1:7150', '--seed', String(seed), '--out', out, '--corpus', CORPUS, '--interval-ms', '2'], { stdio: ['ignore', 'ignore', 'inherit'] });
    child.on('exit', resolve);
  });
  expect(`seed ${seed}: replay exited cleanly`, code === 0, code);
  const st = stub.stats();
  await stub.close();
  const lines = fs.readFileSync(out, 'utf8').trim().split('\n').map((l) => JSON.parse(l));
  const header = lines[0];
  const recs = lines.filter((l) => l.type === 'report');
  const nReports = fs.readFileSync(path.join(CORPUS, 'reports.jsonl'), 'utf8').trim().split('\n').length;
  expect(`seed ${seed}: header records 4 seeded bugs`, header.seededBugIds.length === 4, header.seededBugIds.length);
  expect(`seed ${seed}: one record per report plus 10 controls`, recs.length === nReports + 10, recs.length);
  expect(`seed ${seed}: controls are last`, recs.slice(-10).every((r) => r.control) && recs.slice(0, -10).every((r) => !r.control), '');
  expect(`seed ${seed}: every report landed despite 429s`, recs.every((r) => r.landed), recs.filter((r) => !r.landed).length);
  expect(`seed ${seed}: 429s were retried`, st.throttled > 0 && recs.some((r) => r.attempts > 1), `throttled ${st.throttled}`);
  expect(`seed ${seed}: no corpus report on a seeded bug`, recs.every((r) => !header.seededBugIds.includes(r.bugId)), '');
  runs.push({ out, order: recs.filter((r) => !r.control).map((r) => r.reportId) });
}
expect('different seeds give different orders', runs[0].order.join() !== runs[1].order.join(), '');
expect('same report set in both orders', [...runs[0].order].sort().join() === [...runs[1].order].sort().join(), '');
const scoreOut = path.join(WORK, 'scored');
execFileSync(process.execPath, [path.join(REPO, 'score.mjs'), runs[0].out, runs[1].out, '--out', scoreOut, '--corpus', CORPUS, '--list-limit', '20'], { stdio: ['ignore', 'inherit', 'inherit'] });
const res = JSON.parse(fs.readFileSync(path.join(scoreOut, 'results.json'), 'utf8'));
expect('stub runs are valid', res.validity.void === false, JSON.stringify(res.validity.run1.checks));
expect('stub grouping is order-independent', res.seedComparison.browser.identical, res.seedComparison.browser.differingPairs);
console.log(failures ? `${failures} failed` : 'all replay stub checks passed');
process.exit(failures ? 1 : 0);
