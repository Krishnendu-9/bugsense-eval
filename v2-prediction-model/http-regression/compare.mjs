// After the HTTP replays: score them with v1's score.mjs, and compare the
// grouping the endpoint produced with the function-level key on the same
// reports, and the two replay orders with each other.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = 'E:/professional/Projects/bugsense';
const EVAL = 'E:/professional/Projects/bugsense-eval';
const { generateFingerprintV2 } = await import(pathToFileURL(`${REPO}/server/utils/fingerprint.util.js`).href);
const { clampString } = await import(pathToFileURL(`${REPO}/server/utils/sanitize.js`).href);

const rd = (f) => fs.readFileSync(f, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
const reports = rd(`${EVAL}/corpus/reports.jsonl`);
const meta = new Map(rd(`${EVAL}/corpus/meta.jsonl`).map((m) => [m.id, m]));

// The controller's input normalisation, as in replay-v2.mjs.
const CATEGORIES = ['click', 'navigation', 'xhr', 'console', 'error'];
const asServerSees = (body) => {
  const errorLog = clampString(body.errorLog, 20000);
  const firstLine = errorLog.split('\n')[0]?.trim();
  return {
    project: clampString(body.project || 'Web Client', 100),
    title: clampString(body.title || firstLine || 'Uncaught Client Exception', 200),
    errorLog,
    breadcrumbs: (Array.isArray(body.breadcrumbs) ? body.breadcrumbs : []).slice(-30).map((c) => ({
      category: CATEGORIES.includes(c?.category) ? c.category : 'console',
      message: clampString(c?.message, 500),
    })),
  };
};
const fp = new Map(reports.map((r) => [r.id, generateFingerprintV2(asServerSees(JSON.parse(r.body)))]));

const runOf = (seed) => {
  const lines = rd(path.join(HERE, `run-seed${seed}.jsonl`));
  const recs = lines.filter((l) => l.type === 'report');
  return {
    header: lines.find((l) => l.type === 'header'),
    bug: new Map(recs.filter((r) => !r.control).map((r) => [r.reportId, r.bugId])),
    controls: recs.filter((r) => r.control),
    failed: recs.filter((r) => !r.landed).length,
  };
};
const runs = [runOf(1), runOf(2)];
const ids = reports.map((r) => r.id);

const disagree = (sameA, sameB) => {
  let n = 0;
  const inc = new Set();
  for (let i = 0; i < ids.length; i++) for (let j = i + 1; j < ids.length; j++) {
    if (sameA(ids[i], ids[j]) !== sameB(ids[i], ids[j])) {
      n++;
      inc.add(meta.get(ids[i]).incident);
      inc.add(meta.get(ids[j]).incident);
    }
  }
  return { pairs: n, incidents: [...inc] };
};
const sameFp = (a, b) => fp.get(a) === fp.get(b);
const sameBug = (run) => (a, b) => run.bug.get(a) === run.bug.get(b);

const dir = path.join(HERE, 'scored');
fs.mkdirSync(dir, { recursive: true });
execFileSync('node', [`${EVAL}/score.mjs`, path.join(HERE, 'run-seed1.jsonl'), path.join(HERE, 'run-seed2.jsonl'), '--out', dir, '--list-limit', '0'], { stdio: ['ignore', 'ignore', 'inherit'] });
const res = JSON.parse(fs.readFileSync(path.join(dir, 'results.json'), 'utf8'));

console.log(JSON.stringify({
  headers: runs.map((r) => ({ seed: r.header.seed, base: r.header.base, seeded: r.header.seededBugIds.length, corpusSha: r.header.corpusReportsSha256.slice(0, 12) })),
  sends: runs.map((r) => ({ reports: r.bug.size, controls: r.controls.length, failed: r.failed, controlsMerged: r.controls.filter((c) => c.bugId === r.bug.get(c.controlOf)).length })),
  httpVsFunction: runs.map((r) => disagree(sameBug(r), sameFp)),
  seed1VsSeed2AllReports: disagree(sameBug(runs[0]), sameBug(runs[1])),
  distinctBugs: runs.map((r) => new Set(r.bug.values()).size),
  distinctKeys: new Set(fp.values()).size,
  gates: res.gates.map((g) => ({ id: g.id, value: g.value, band: g.band })),
  headline: res.headline,
  versionOnly: { prod: res.versionOnly['browser-prod'], dev: res.versionOnly['browser-dev'] },
  browserOnly: res.browserOnly,
  hardNegativeMerges: res.hardNegativeMerges.map((m) => m.incidents.join('/')),
  ordinaryMerges: res.ordinaryMerges.map((m) => m.incidents.join('+')),
  seededLandings: res.seededLandings,
  validity: res.validity,
  seedComparison: res.seedComparison,
}, null, 1));
