// Regression check (fingerprint-eval-v2.md section 5.2 line (a), section 7 step 3,
// function-level): feeds every v1 corpus report, exactly as captured, through
// the telemetry controller's input normalisation and the real
// generateFingerprintV2, writes a replay file whose bug id is the fingerprint,
// and scores it with the v1 scorer. Also compares the partition with the
// registered prediction model's. Reads only; writes into this folder.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = 'E:/professional/Projects/bugsense';
const EVAL = 'E:/professional/Projects/bugsense-eval';
const { generateFingerprintV2, buildKeyV2 } = await import(pathToFileURL(`${REPO}/server/utils/fingerprint.util.js`).href);
const { clampString } = await import(pathToFileURL(`${REPO}/server/utils/sanitize.js`).href);
const model = await import(pathToFileURL(`${EVAL}/v2-prediction-model/v2model.mjs`).href);

const rd = (f) => fs.readFileSync(f, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
const reports = rd(`${EVAL}/corpus/reports.jsonl`);
const meta = new Map(rd(`${EVAL}/corpus/meta.jsonl`).map((m) => [m.id, m]));
const seed1 = rd(`${EVAL}/runs/run-seed1.jsonl`);
const seed2 = rd(`${EVAL}/runs/run-seed2.jsonl`);
const header = seed1.find((l) => l.type === 'header');
const controls = JSON.parse(fs.readFileSync(`${EVAL}/corpus/controls.json`, 'utf8')).ids;

// The telemetry controller's normalizeReport, for the fields the key reads.
const CATEGORIES = ['click', 'navigation', 'xhr', 'console', 'error'];
function asTheServerSeesIt(body) {
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
    error: body.error, request: body.request, source: body.source, // absent in v1 payloads
  };
}

const PROPOSAL_A = { K: 1, prodNames: 'keep', mangledMax: 2, prodLine: false, message: 'canonical', request: true, requestOnly: true, route: false, scriptErrorRoute: false };
const fp = new Map(), key = new Map(), modelKey = new Map();
for (const r of reports) {
  const body = JSON.parse(r.body);
  const input = asTheServerSeesIt(body);
  fp.set(r.id, generateFingerprintV2(input));
  key.set(r.id, buildKeyV2(input));
  modelKey.set(r.id, model.makeKey(JSON.parse(r.body), PROPOSAL_A));
}

// Determinism: recompute in each recorded replay order; a pure function must agree.
const orderOf = (run) => run.filter((l) => l.type === 'report' && !l.control).map((l) => l.reportId);
const recompute = (order) => new Map(order.map((id) => [id, generateFingerprintV2(asTheServerSeesIt(JSON.parse(reports.find((x) => x.id === id).body)))]));
const o1 = recompute(orderOf(seed1)), o2 = recompute(orderOf(seed2));
const orderSame = [...o1].every(([id, v]) => o2.get(id) === v && fp.get(id) === v);

// Partition agreement with the registered model.
const ids = reports.map((r) => r.id);
let pairs = 0, disagreeAll = 0, disagreeBrowser = 0;
const disagreeInc = new Set();
for (let i = 0; i < ids.length; i++) for (let j = i + 1; j < ids.length; j++) {
  pairs++;
  const a = fp.get(ids[i]) === fp.get(ids[j]);
  const b = modelKey.get(ids[i]) === modelKey.get(ids[j]);
  if (a !== b) {
    disagreeAll++;
    const ma = meta.get(ids[i]), mb = meta.get(ids[j]);
    if (ma.environment.startsWith('browser') && mb.environment.startsWith('browser')) disagreeBrowser++;
    disagreeInc.add(ma.incident); disagreeInc.add(mb.incident);
  }
}
const textDiff = ids.filter((id) => key.get(id).replace(/^fp2::/, '') !== modelKey.get(id));
const textDiffInc = [...new Set(textDiff.map((id) => `${meta.get(id).incident}/${meta.get(id).environment}`))];

// Replay file and score.
const out = [JSON.stringify({ ...header, tool: 'replay-v2.mjs (function-level)', note: 'bugId = generateFingerprintV2 of the report as the telemetry controller would see it' })];
let seq = 0;
for (const r of reports) out.push(JSON.stringify({ type: 'report', seq: ++seq, reportId: r.id, control: false, landed: true, attempts: 1, httpStatus: 200, bugId: 'FP' + fp.get(r.id) }));
for (const c of controls) out.push(JSON.stringify({ type: 'report', seq: ++seq, reportId: c, control: true, controlOf: c, landed: true, attempts: 1, httpStatus: 200, bugId: 'FP' + fp.get(c) }));
const dir = path.join(HERE, 'scored');
fs.mkdirSync(dir, { recursive: true });
const runFile = path.join(dir, 'run-v2-function.jsonl');
fs.writeFileSync(runFile, out.join('\n') + '\n');
execFileSync('node', [`${EVAL}/score.mjs`, runFile, runFile, '--out', dir, '--list-limit', '0'], { stdio: ['ignore', 'ignore', 'inherit'] });
const res = JSON.parse(fs.readFileSync(path.join(dir, 'results.json'), 'utf8'));

console.log(JSON.stringify({
  gates: res.gates.map((g) => ({ id: g.id, value: g.value, band: g.band })),
  headline: res.headline,
  versionOnly: { prod: res.versionOnly['browser-prod'], dev: res.versionOnly['browser-dev'] },
  browserOnly: res.browserOnly,
  hardNegativeMerges: res.hardNegativeMerges.map((m) => m.incidents.join('/')),
  ordinaryMerges: res.ordinaryMerges.map((m) => m.incidents.join('+')),
  validity: res.validity,
  partitionVsModel: { pairs, disagreeAll, disagreeBrowser, incidents: [...disagreeInc] },
  keyTextDiffersFromModel: { reports: textDiff.length, where: textDiffInc },
  deterministicAcrossReplayOrders: orderSame,
  nullFingerprints: ids.filter((id) => fp.get(id) === null).length,
}, null, 1));
