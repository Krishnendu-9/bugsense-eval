// Writes corpus.lock (DESIGN.md section 2, step 4): SHA-256 of every corpus
// file and of replay.mjs and score.mjs, the fixture commit, the Playwright
// and browser versions, the Node image digests, and the actual totals.
//
//   node harness/freeze.mjs
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { REPO } from './services.mjs';

const C = (p) => path.join(REPO, 'corpus', p);
const sha = (f) => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const readJsonl = (f) => fs.readFileSync(f, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
const rel = (f) => path.relative(REPO, f).replace(/\\/g, '/');

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir).sort()) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const files = {};
for (const f of walk(path.join(REPO, 'corpus'))) files[rel(f)] = sha(f);
for (const f of ['replay.mjs', 'score.mjs']) files[f] = sha(path.join(REPO, f));
const supporting = {};
for (const f of [...walk(path.join(REPO, 'harness')), path.join(REPO, 'test', 'score-synthetic.mjs'), path.join(REPO, 'fixture', 'shopfront.v2.patch'), path.join(REPO, 'fixture', 'node-api.v2.patch'), path.join(REPO, 'CATEGORIES.md'), path.join(REPO, 'builder-categories.md'), path.join(REPO, 'DESIGN.md')]) supporting[rel(f)] = sha(f);

const meta = readJsonl(C('meta.jsonl'));
const INC = JSON.parse(fs.readFileSync(C('incidents.json'), 'utf8'));
const controls = JSON.parse(fs.readFileSync(C('controls.json'), 'utf8'));
const dropped = JSON.parse(fs.readFileSync(C('dropped.json'), 'utf8'));
const logs = ['browser-prod', 'browser-dev', 'node'].map((n) => readJsonl(C(`capture-log/${n}.jsonl`)).find((l) => l.kind === 'summary'));

// ---- totals ----
const c2 = (n) => (n * (n - 1)) / 2;
const envs = [...INC.browserEnvironments, ...INC.nodeEnvironments];
const incidentById = new Map(INC.incidents.map((i) => [i.id, i]));
const totals = { reports: meta.length, plannedReports: Object.values(INC.planned).reduce((a, b) => a + b, 0), perEnvironment: {} };
for (const env of envs) {
  const rs = meta.filter((m) => m.environment === env);
  const byInc = {};
  for (const m of rs) byInc[m.incident] = (byInc[m.incident] || 0) + 1;
  const sameInc = Object.values(byInc).reduce((a, n) => a + c2(n), 0);
  const cell = (m) => m.browser || `node${m.nodeVersion}`;
  let versionOnly = 0, browserOnly = 0, dataVariant = 0, callPath = 0;
  for (let i = 0; i < rs.length; i++) for (let j = i + 1; j < rs.length; j++) {
    const a = rs[i]; const b = rs[j];
    if (a.incident !== b.incident) continue;
    const dCell = cell(a) !== cell(b); const dVer = a.appVersion !== b.appVersion; const dVar = a.variant !== b.variant;
    if (dVer && !dCell && !dVar) versionOnly++;
    if (dCell && !dVer && !dVar) browserOnly++;
    if (dVar && !dCell && !dVer) { if (incidentById.get(a.incident).variant === 'data') dataVariant++; else callPath++; }
  }
  totals.perEnvironment[env] = {
    planned: INC.planned[env], reports: rs.length, incidents: Object.keys(byInc).length,
    pairs: c2(rs.length), sameIncidentPairs: sameInc,
    versionOnlyPairs: versionOnly, [env.startsWith('browser') ? 'browserOnlyPairs' : 'nodeVersionOnlyPairs']: browserOnly,
    isolatedDataVariantPairs: dataVariant, isolatedCallPathPairs: callPath,
  };
}
const count = (env) => meta.filter((m) => m.environment === env);
const crossSame = (e1, e2) => {
  const a = count(e1); const b = count(e2);
  let same = 0;
  for (const x of a) for (const y of b) if (x.incident === y.incident) same++;
  return { pairs: a.length * b.length, sameIncidentPairs: same };
};
const [PROD, DEV] = INC.browserEnvironments;
const [PLAIN, MAPPED] = INC.nodeEnvironments;
totals.headline = {
  reports: totals.perEnvironment[PROD].reports + totals.perEnvironment[DEV].reports,
  pairs: totals.perEnvironment[PROD].pairs + totals.perEnvironment[DEV].pairs,
  sameIncidentPairs: totals.perEnvironment[PROD].sameIncidentPairs + totals.perEnvironment[DEV].sameIncidentPairs,
};
totals.crossEnvironment = crossSame(PROD, DEV);
totals.nodeCross = crossSame(PLAIN, MAPPED);
totals.nodeBrowserPairs = (count(PLAIN).length + count(MAPPED).length) * totals.headline.reports;
totals.missing = totals.plannedReports - totals.reports;
totals.missingPercent = Number(((totals.missing / totals.plannedReports) * 100).toFixed(2));

// ---- versions ----
const nodeSummary = logs[2];
const images = {};
for (const n of ['22', '24']) {
  images[`node:${n}-alpine`] = {
    digest: nodeSummary.images[n],
    repoDigests: execFileSync('docker', ['image', 'ls', '--digests', '--format', '{{.Repository}}:{{.Tag}}@{{.Digest}} {{.ID}}', `node:${n}-alpine`], { encoding: 'utf8' }).trim(),
  };
}
const commits = [...new Set(meta.map((m) => m.fixtureCommit))];
const lock = {
  lockVersion: 1,
  corpusVersion: 1,
  frozenAt: new Date().toISOString(),
  note: 'Committed before any replay against the system under test. After this commit the corpus does not change; a corpus mistake found later is fixed in a new corpus version.',
  fixtureCommits: commits,
  fixtureCommitPerCapture: Object.fromEntries(logs.map((s) => [s.env, s.fixtureCommit])),
  playwright: logs[0].versions.playwright,
  browsers: logs[0].versions.browsers,
  browsersDevRun: logs[1].versions.browsers,
  nodeImages: images,
  mockBackendImage: 'node:22-alpine (same digest as above)',
  sdk: 'http://localhost:8090/sdk/bugsense.js, loaded only through the fixture <script> tag; not fetched or read by the builder',
  files,
  supportingFiles: supporting,
  totals,
  hardNegativePairs: INC.hardNegativePairs,
  nodeHardNegativePairs: INC.nodeHardNegativePairs,
  controls,
  dropped: dropped.map((d) => `${d.environment} ${d.appVersion} ${d.browser || 'node' + d.nodeVersion} ${d.incident}/${d.variant} (reports per attempt: ${d.attempts.map((a) => a.reports).join(', ')})`),
};
fs.writeFileSync(path.join(REPO, 'corpus.lock'), JSON.stringify(lock, null, 2) + '\n');
console.log(JSON.stringify(totals, null, 1));
