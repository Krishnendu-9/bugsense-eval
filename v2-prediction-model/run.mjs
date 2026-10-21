// Scores a v2 model configuration on the v1 corpus with the evaluation's own
// score.mjs, by writing a synthetic replay file whose bug id is the model key.
//   node run.mjs '<json options>' <label>
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { makeKey } from './v2model.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const EVAL = 'E:/professional/Projects/bugsense-eval';
const opt = { K: 1, prodNames: 'keep', mangledMax: 2, prodLine: false, message: 'out', request: false, route: false, scriptErrorRoute: true, ...JSON.parse(process.argv[2] || '{}') };
const label = process.argv[3] || 'run';

const rd = (f) => fs.readFileSync(f, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
const reports = rd(`${EVAL}/corpus/reports.jsonl`);
const orig = rd(`${EVAL}/runs/run-seed1.jsonl`);
const header = orig.find((l) => l.type === 'header');
const controls = JSON.parse(fs.readFileSync(`${EVAL}/corpus/controls.json`, 'utf8')).ids;

const { generateFingerprint } = await import('file:///E:/professional/Projects/bugsense/server/utils/fingerprint.util.js');
const v1Key = (b) => {
  const errorLog = String(b.errorLog ?? '').slice(0, 20000);
  const title = String(b.title || errorLog.split('\n')[0]?.trim() || 'Uncaught Client Exception').slice(0, 200);
  return generateFingerprint(errorLog, title, String(b.project || 'Web Client').slice(0, 100));
};
const meta = new Map(rd(`${EVAL}/corpus/meta.jsonl`).map((m) => [m.id, m]));
const INC = JSON.parse(fs.readFileSync(`${EVAL}/corpus/incidents.json`, 'utf8'));
const HN = new Set(INC.hardNegativePairs.map((p) => [p.a, p.b].sort().join('+')));
const bodies = new Map(reports.map((r) => [r.id, JSON.parse(r.body)]));

// Simulated v2 SDK message field: where the title was replaced by a component
// stack and the stack has no V8 header, use the canonical message of the same
// incident's Chromium report in the same cell (what the SDK would have sent).
if (opt.sdkMessage) {
  const { messageOf, canonicalMessage } = await import('./v2model.mjs');
  const canonFor = new Map();
  for (const r of reports) {
    const m = meta.get(r.id), b = bodies.get(r.id);
    if (m.browser !== 'chromium') continue;
    canonFor.set(`${m.incident}|${m.environment}|${m.appVersion}`, canonicalMessage(messageOf(b.title, b.errorLog), null));
  }
  for (const r of reports) {
    const m = meta.get(r.id), b = bodies.get(r.id);
    if (messageOf(b.title, b.errorLog) === '' && /^\s/.test(b.title || '')) {
      const c = canonFor.get(`${m.incident}|${m.environment}|${m.appVersion}`);
      if (c !== undefined) b._canon = c;
    }
  }
}

const keyOf = new Map();
for (const r of reports) {
  const body = bodies.get(r.id);
  const k = opt.v1 ? v1Key(body) : makeKey(body, opt);
  keyOf.set(r.id, 'K' + crypto.createHash('sha256').update(k).digest('hex').slice(0, 24));
}
const out = [JSON.stringify(header)];
let seq = 0;
for (const r of reports) out.push(JSON.stringify({ type: 'report', seq: ++seq, reportId: r.id, control: false, landed: true, attempts: 1, httpStatus: 200, bugId: keyOf.get(r.id) }));
for (const c of controls) out.push(JSON.stringify({ type: 'report', seq: ++seq, reportId: c, control: true, controlOf: c, landed: true, attempts: 1, httpStatus: 200, bugId: keyOf.get(c) }));
const dir = path.join(HERE, 'out', label);
fs.mkdirSync(dir, { recursive: true });
const runFile = path.join(dir, 'run.jsonl');
fs.writeFileSync(runFile, out.join('\n') + '\n');
execFileSync('node', [`${EVAL}/score.mjs`, runFile, runFile, '--out', dir, '--list-limit', '0'], { stdio: ['ignore', 'ignore', 'inherit'] });
const res = JSON.parse(fs.readFileSync(path.join(dir, 'results.json'), 'utf8'));

const fmt = (v) => (typeof v === 'number' ? v.toFixed(4) : v);
console.log(`\n### ${label}  ${JSON.stringify(opt)}`);
for (const g of res.gates) console.log(`  ${g.id.padEnd(22)} ${String(fmt(g.value)).padEnd(16)} ${g.band}`);
const h = res.headline;
console.log(`  headline: P=${fmt(h.precision)} R/pair=${fmt(h.recallPerPair)} R/inc=${fmt(h.recallPerIncident)} TP=${h.TP} FP=${h.FP} FN=${h.FN}`);
const vo = res.versionOnly;
console.log(`  version-only: prod ${fmt(vo['browser-prod'].recallGraded)} (${vo['browser-prod'].TP}/${vo['browser-prod'].TP + vo['browser-prod'].FN})  dev ${fmt(vo['browser-dev'].recallGraded)} (${vo['browser-dev'].TP}/${vo['browser-dev'].TP + vo['browser-dev'].FN})   browser-only pairs ${res.browserOnly.TP}/${res.browserOnly.TP + res.browserOnly.FN}`);
console.log(`  cross-env FP pairs: ${res.crossEnvironment.FP}`);
console.log(`  ordinary merges: ${(res.ordinaryMerges || []).map((m) => (m.incidents || [m.a, m.b]).join('+') + `(${m.reportPairs ?? ''})`).join(' ')}`);
console.log(`  hard-negative merges: ${(res.hardNegativeMerges || []).map((m) => m.incidents.join('+') + `(${m.reportPairs})`).join(' ')}`);
// Where each merged incident pair merges: prod only, dev only, cross-env.
const where = new Map();
const B = reports.map((r) => r.id).filter((id) => meta.get(id).environment.startsWith('browser'));
for (let i = 0; i < B.length; i++) for (let j = i + 1; j < B.length; j++) {
  const a = meta.get(B[i]), b = meta.get(B[j]);
  if (a.incident === b.incident || keyOf.get(B[i]) !== keyOf.get(B[j])) continue;
  const k = [a.incident, b.incident].sort().join('+');
  const w = a.environment !== b.environment ? 'x' : a.environment === 'browser-prod' ? 'p' : 'd';
  where.set(k, (where.get(k) || new Set()).add(w));
}
const tag = (set) => [...set].sort().join('');
const ord = [...where].filter(([k]) => !HN.has(k)), hn = [...where].filter(([k]) => HN.has(k));
const countIn = (list, env) => list.filter(([, s]) => s.has(env)).length;
console.log(`  merges by env (p=prod d=dev x=cross): ordinary prod ${countIn(ord, 'p')} dev ${countIn(ord, 'd')} cross ${countIn(ord, 'x')} | HN prod ${countIn(hn, 'p')} dev ${countIn(hn, 'd')} cross ${countIn(hn, 'x')}`);
console.log(`  HN detail: ${hn.map(([k, s]) => `${k}[${tag(s)}]`).join(' ')}`);
console.log(`  ordinary detail: ${ord.map(([k, s]) => `${k}[${tag(s)}]`).join(' ')}`);
const vp = res.variantPairs;
if (vp) console.log(`  variant pairs split: ${JSON.stringify(vp.filter ? vp.filter((p) => !p.merged).map((p) => `${p.incident}/${p.env}`) : vp).slice(0, 400)}`);
