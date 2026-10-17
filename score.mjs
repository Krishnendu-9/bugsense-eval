#!/usr/bin/env node
// Scores two replay runs against the frozen corpus, exactly as DESIGN.md
// section 5 specifies.
//
//   node score.mjs <run1.jsonl> <run2.jsonl> --out <dir> [--corpus <dir>] [--list-limit <n>]
//
// run1 is the graded run; run2 (a different seed, fresh volume) is used for
// the seed comparison gate and is also scored for reference.
// Writes <dir>/results.md and <dir>/results.json.
//
// Field mapping: the design's `message` and `stack` are the SDK payload's
// `title` and `errorLog` fields (corpus/incidents.json, messageField /
// stackField). Identity is tested byte for byte on those strings.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));

// ---------- arguments ----------
const positional = [];
const opts = {};
for (let i = 2; i < process.argv.length; i++) {
  const a = process.argv[i];
  if (a.startsWith('--')) opts[a.slice(2)] = process.argv[++i];
  else positional.push(a);
}
if (positional.length !== 2 || !opts.out) {
  console.error('usage: node score.mjs <run1.jsonl> <run2.jsonl> --out <dir> [--corpus <dir>] [--list-limit <n>]');
  process.exit(2);
}
const CORPUS = path.resolve(opts.corpus || path.join(HERE, 'corpus'));
const OUT = path.resolve(opts.out);
const LIST_LIMIT = opts['list-limit'] ? Number(opts['list-limit']) : Infinity;

// ---------- corpus ----------
const readJsonl = (f) => fs.readFileSync(f, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
const sha256File = (f) => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const reportsFile = path.join(CORPUS, 'reports.jsonl');
const reports = readJsonl(reportsFile);
const meta = new Map(readJsonl(path.join(CORPUS, 'meta.jsonl')).map((m) => [m.id, m]));
const INC = JSON.parse(fs.readFileSync(path.join(CORPUS, 'incidents.json'), 'utf8'));
const controls = JSON.parse(fs.readFileSync(path.join(CORPUS, 'controls.json'), 'utf8'));
const dropped = JSON.parse(fs.readFileSync(path.join(CORPUS, 'dropped.json'), 'utf8'));
const incidentById = new Map(INC.incidents.map((i) => [i.id, i]));
const BROWSER_ENVS = INC.browserEnvironments;
const NODE_ENVS = INC.nodeEnvironments;
const [PROD, DEV] = BROWSER_ENVS;
const [PLAIN, MAPPED] = NODE_ENVS;
const pairKey = (a, b) => (a < b ? `${a}|${b}` : `${b}|${a}`);
const HN = new Map(INC.hardNegativePairs.map((p) => [pairKey(p.a, p.b), p.origin]));
const NODE_HN = new Map(INC.nodeHardNegativePairs.map((p) => [pairKey(p.a, p.b), p.origin]));

const R = new Map();
for (const r of reports) {
  const m = meta.get(r.id);
  if (!m) throw new Error(`no metadata for ${r.id}`);
  let body;
  try { body = JSON.parse(r.body); } catch { body = {}; }
  const inc = incidentById.get(m.incident);
  R.set(r.id, {
    id: r.id, env: m.environment, incident: m.incident, origin: inc.origin, variantType: inc.variant,
    browser: m.browser, node: m.nodeVersion, appVersion: m.appVersion, variant: m.variant,
    cellAxis: m.browser || (m.nodeVersion ? `node${m.nodeVersion}` : null),
    msg: typeof body[INC.messageField] === 'string' ? body[INC.messageField] : JSON.stringify(body[INC.messageField] ?? null),
    stack: typeof body[INC.stackField] === 'string' ? body[INC.stackField] : JSON.stringify(body[INC.stackField] ?? null),
  });
}
const idsIn = (env) => [...R.values()].filter((r) => r.env === env).map((r) => r.id).sort();
const ENV_IDS = Object.fromEntries([...BROWSER_ENVS, ...NODE_ENVS].map((e) => [e, idsIn(e)]));
const BROWSER_IDS = [...ENV_IDS[PROD], ...ENV_IDS[DEV]];
const NODE_IDS = [...ENV_IDS[PLAIN], ...ENV_IDS[MAPPED]];
const byteIdentical = (a, b) => a.msg === b.msg && a.stack === b.stack;

// ---------- runs ----------
function loadRun(file) {
  const lines = readJsonl(file);
  const header = lines.find((l) => l.type === 'header');
  const footer = lines.find((l) => l.type === 'footer') || null;
  const recs = lines.filter((l) => l.type === 'report');
  if (!header) throw new Error(`${file}: no header`);
  const assign = new Map();
  const unlanded = [];
  for (const r of recs.filter((x) => !x.control)) {
    if (r.landed && r.bugId) assign.set(r.reportId, r.bugId);
    else unlanded.push(r.reportId);
  }
  const missingSends = reports.map((r) => r.id).filter((id) => !recs.some((x) => !x.control && x.reportId === id));
  for (const id of missingSends) unlanded.push(id);
  for (const id of unlanded) assign.set(id, `UNLANDED:${id}`);
  const controlResults = controls.ids.map((cid) => {
    const c = recs.find((x) => x.control && x.controlOf === cid);
    const original = assign.get(cid);
    const ok = Boolean(c && c.landed && c.bugId && c.bugId === original);
    return { reportId: cid, ok, originalBug: original, controlBug: c ? c.bugId || null : null, landed: Boolean(c && c.landed) };
  });
  return { file, header, footer, assign, unlanded, controlResults, seeded: new Set(header.seededBugIds || []) };
}
const run1 = loadRun(positional[0]);
const run2 = loadRun(positional[1]);

// ---------- helpers ----------
function axesDiffer(a, b) {
  const ax = [];
  if (a.env !== b.env) ax.push('environment');
  if (a.cellAxis !== b.cellAxis) ax.push(a.browser || b.browser ? 'browser' : 'node');
  if (a.appVersion !== b.appVersion) ax.push('version');
  if (a.variant !== b.variant) ax.push('variant');
  return ax;
}
function axisClass(a, b) {
  const ax = axesDiffer(a, b);
  if (ax.length === 1 && ax[0] === 'browser') return 'browser-only';
  if (ax.length === 1 && ax[0] === 'node') return 'node-only';
  if (ax.length === 1 && ax[0] === 'version') return 'version-only';
  if (ax.length === 1 && ax[0] === 'variant') return 'variant-only';
  if (ax.length === 0) return 'none';
  return 'several';
}
const ratio = (n, d) => (d === 0 ? null : n / d);
const fmt = (x) => (x === null || x === undefined ? 'n/a' : typeof x === 'number' ? (Number.isInteger(x) ? String(x) : x.toFixed(4)) : String(x));
const lower = (a, b) => (a === null ? b : b === null ? a : Math.min(a, b));

function frames(stack) {
  const lines = String(stack || '').split('\n').map((l) => l.trim()).filter(Boolean);
  const f = lines.filter((l) => /^at\s/.test(l) || /@/.test(l) || /:\d+:\d+\)?$/.test(l));
  return (f.length ? f : lines.slice(1)).slice(0, 5);
}

// Pair statistics over a set of pairs.
function newStats() {
  return { TP: 0, FN: 0, FP: 0, TN: 0, perIncident: new Map(), byteIdenticalSame: 0, byteIdenticalDiff: 0 };
}
function addPair(st, a, b, same, merged) {
  const sameInc = a.incident === b.incident;
  if (sameInc) {
    if (merged) st.TP++; else st.FN++;
    const pi = st.perIncident.get(a.incident) || { tp: 0, n: 0 };
    pi.n++; if (merged) pi.tp++;
    st.perIncident.set(a.incident, pi);
    if (same) st.byteIdenticalSame++;
  } else {
    if (merged) st.FP++; else st.TN++;
    if (same) st.byteIdenticalDiff++;
  }
}
function summarise(st) {
  const micro = ratio(st.TP, st.TP + st.FN);
  const recalls = [...st.perIncident.values()].map((p) => p.tp / p.n);
  const macro = recalls.length ? recalls.reduce((x, y) => x + y, 0) / recalls.length : null;
  return {
    TP: st.TP, FN: st.FN, FP: st.FP, TN: st.TN,
    precision: ratio(st.TP, st.TP + st.FP), recallPerPair: micro, recallPerIncident: macro, recallGraded: lower(micro, macro),
    incidents: st.perIncident.size, byteIdenticalSameIncidentPairs: st.byteIdenticalSame, byteIdenticalDifferentIncidentPairs: st.byteIdenticalDiff,
  };
}

// ---------- the analysis of one partition ----------
function analyse(assign, seededSet, { listings = true } = {}) {
  const merged = (a, b) => assign.get(a.id) === assign.get(b.id);
  const S = {
    headline: newStats(), headlineExclByteDiff: newStats(), env: {}, cross: newStats(),
    axisEnv: {}, axisPooled: {}, originStats: {}, origin: {},
  };
  for (const e of BROWSER_ENVS) { S.env[e] = newStats(); S.axisEnv[e] = {}; }
  const fpPairs = [];
  const fnPairs = [];
  const byteIdenticalPairs = [];
  const ordinaryMerges = new Map(); // incident pair -> count
  const hnMerges = new Map();
  const variantPairs = [];
  const marks = ['U', 'D', 'B', 'B-only'];
  const hasMark = (r, m) => (m === 'B-only' ? r.origin.length === 1 && r.origin[0] === 'B' : r.origin.includes(m));
  for (const m of marks) S.origin[m] = { headline: newStats(), versionOnly: { [PROD]: newStats(), [DEV]: newStats() }, browserOnly: newStats() };

  const visit = (a, b, where) => {
    const same = byteIdentical(a, b);
    const isMerged = merged(a, b);
    const sameInc = a.incident === b.incident;
    if (where === 'cross') {
      addPair(S.cross, a, b, same, isMerged);
    } else {
      addPair(S.headline, a, b, same, isMerged);
      if (sameInc || !same) addPair(S.headlineExclByteDiff, a, b, same, isMerged);
      addPair(S.env[where], a, b, same, isMerged);
      if (sameInc) {
        const cls = axisClass(a, b);
        (S.axisEnv[where][cls] ||= newStats());
        addPair(S.axisEnv[where][cls], a, b, same, isMerged);
        (S.axisPooled[cls] ||= newStats());
        addPair(S.axisPooled[cls], a, b, same, isMerged);
        for (const m of marks) {
          if (!hasMark(a, m)) continue;
          addPair(S.origin[m].headline, a, b, same, isMerged);
          if (cls === 'version-only') addPair(S.origin[m].versionOnly[where], a, b, same, isMerged);
          if (cls === 'browser-only') addPair(S.origin[m].browserOnly, a, b, same, isMerged);
        }
        if (cls === 'variant-only') variantPairs.push({ a: a.id, b: b.id, incident: a.incident, type: a.variantType, env: where, merged: isMerged });
      }
    }
    if (same) byteIdenticalPairs.push({ a: a.id, b: b.id, incidentA: a.incident, incidentB: b.incident, where, sameIncident: sameInc });
    if (!sameInc && isMerged) {
      const k = pairKey(a.incident, b.incident);
      const isHN = HN.has(k);
      (isHN ? hnMerges : ordinaryMerges).set(k, ((isHN ? hnMerges : ordinaryMerges).get(k) || 0) + 1);
      if (listings) fpPairs.push({ a, b, where, bug: assign.get(a.id), hardNegative: isHN });
    }
    if (sameInc && !isMerged && listings) fnPairs.push({ a, b, where });
  };

  for (const e of BROWSER_ENVS) {
    const ids = ENV_IDS[e];
    for (let i = 0; i < ids.length; i++) for (let j = i + 1; j < ids.length; j++) visit(R.get(ids[i]), R.get(ids[j]), e);
  }
  for (const x of ENV_IDS[PROD]) for (const y of ENV_IDS[DEV]) visit(R.get(x), R.get(y), 'cross');

  // Reports landing on a seeded bug are false merges (ordinary).
  const seededLandings = BROWSER_IDS.filter((id) => seededSet.has(assign.get(id))).map((id) => ({ id, incident: R.get(id).incident, bug: assign.get(id) }));
  for (const s of seededLandings) {
    const k = `${s.incident}|seeded:${s.bug}`;
    ordinaryMerges.set(k, (ordinaryMerges.get(k) || 0) + 1);
  }

  // ----- gates -----
  const versionOnly = {};
  for (const e of BROWSER_ENVS) versionOnly[e] = summarise(S.axisEnv[e]['version-only'] || newStats());
  const browserOnly = summarise(S.axisPooled['browser-only'] || newStats());
  const headline = summarise(S.headline);
  const dataPairs = variantPairs.filter((p) => p.type === 'data');
  const callPairs = variantPairs.filter((p) => p.type === 'callpath');
  const gates = gradeGates({
    ordinary: ordinaryMerges.size, hn: hnMerges.size, headlineRecall: headline.recallGraded,
    versionOnly: lower(versionOnly[PROD].recallGraded, versionOnly[DEV].recallGraded),
    browserOnly: browserOnly.recallGraded,
    dataSplits: dataPairs.filter((p) => !p.merged).length, dataPairs: dataPairs.length,
    callSplits: callPairs.filter((p) => !p.merged).length, callPairs: callPairs.length,
  });

  // ----- by origin -----
  const byOrigin = {};
  for (const m of marks) {
    const inSet = (incId) => {
      const inc = incidentById.get(incId);
      return inc && (m === 'B-only' ? inc.origin.length === 1 && inc.origin[0] === 'B' : inc.origin.includes(m));
    };
    const ord = [...ordinaryMerges.keys()].filter((k) => k.split('|').some((x) => inSet(x)));
    const hn = [...hnMerges.keys()].filter((k) => k.split('|').some((x) => inSet(x)) || HN.get(k) === m);
    const vo = {};
    for (const e of BROWSER_ENVS) vo[e] = summarise(S.origin[m].versionOnly[e]);
    const dp = dataPairs.filter((p) => inSet(p.incident));
    const cp = callPairs.filter((p) => inSet(p.incident));
    const h = summarise(S.origin[m].headline);
    const bo = summarise(S.origin[m].browserOnly);
    byOrigin[m] = {
      incidents: INC.incidents.filter((i) => i.kind === 'browser' && inSet(i.id)).map((i) => i.id),
      headline: h, versionOnly: vo, browserOnly: bo,
      gates: gradeGates({
        ordinary: ord.length, hn: hn.length, headlineRecall: h.recallGraded,
        versionOnly: lower(vo[PROD].recallGraded, vo[DEV].recallGraded), browserOnly: bo.recallGraded,
        dataSplits: dp.filter((p) => !p.merged).length, dataPairs: dp.length,
        callSplits: cp.filter((p) => !p.merged).length, callPairs: cp.length,
      }),
      ordinaryMergedIncidentPairs: ord, hardNegativeMergedPairs: hn,
    };
  }

  const axes = {};
  for (const e of BROWSER_ENVS) axes[e] = Object.fromEntries(Object.entries(S.axisEnv[e]).map(([k, v]) => [k, summarise(v)]));
  const axesPooled = Object.fromEntries(Object.entries(S.axisPooled).map(([k, v]) => [k, summarise(v)]));
  return {
    headline, headlineExclByteIdenticalDifferent: summarise(S.headlineExclByteDiff),
    excludedByteIdenticalDifferentIncidentPairs: S.headline.byteIdenticalDiff,
    byEnvironment: Object.fromEntries(BROWSER_ENVS.map((e) => [e, summarise(S.env[e])])),
    cross: summarise(S.cross), versionOnly, browserOnly, axes, axesPooled,
    variantPairs, gates, byOrigin,
    ordinaryMerges: [...ordinaryMerges.entries()].map(([k, n]) => ({ incidents: k.split('|'), reportPairs: n })),
    hardNegativeMerges: [...hnMerges.entries()].map(([k, n]) => ({ incidents: k.split('|'), origin: HN.get(k), reportPairs: n })),
    seededLandings, fpPairs, fnPairs, byteIdenticalPairs,
  };
}

// ---------- gates and bands ----------
const BANDS = ['Good', 'Publish with the limitation stated', 'Change the code'];
function gradeGates(v) {
  const g = [];
  const add = (id, name, value, band, detail) => g.push({ id, name, value, band, detail });
  add('ordinary-merges', 'Merges between two incidents that are not a designated hard-negative pair (headline or cross-environment)', v.ordinary, v.ordinary === 0 ? 0 : 2, 'distinct incident pairs merged (a report landing on a seeded bug counts)');
  add('hard-negative-merges', 'Distinct hard-negative pairs merged, in either environment or across them, byte-identical pairs included', v.hn, v.hn === 0 ? 0 : v.hn <= 2 ? 1 : 2, 'distinct hard-negative pairs merged');
  add('headline-recall', 'Headline recall (lower of per-pair and per-incident)', v.headlineRecall, recallBand(v.headlineRecall, 0.85, 0.7), 'Good >= 0.85; publish 0.70 <= r < 0.85; change < 0.70');
  add('version-only-recall', 'Version-only recall, each browser environment (lower of the two)', v.versionOnly, recallBand(v.versionOnly, 0.95, 0.8), 'Good >= 0.95; publish 0.80 <= r < 0.95; change < 0.80 in either');
  add('browser-only-recall', 'Browser-only recall, both browser environments pooled (lower of the two)', v.browserOnly, recallBand(v.browserOnly, 0.8, 0.5), 'Good >= 0.80; publish 0.50 <= r < 0.80; change < 0.50');
  add('data-variant-pairs', 'Isolated data-variant pairs (each environment)', `${v.dataPairs - v.dataSplits} of ${v.dataPairs} merged`, v.dataSplits === 0 ? 0 : 2, 'all merged = Good; any split = change the code');
  add('call-path-pairs', 'Isolated call-path pairs (each environment)', `${v.callPairs - v.callSplits} of ${v.callPairs} merged`, v.callSplits === 0 ? 0 : 1, 'all merged = Good; any split = publish with the limitation');
  return g;
}
function recallBand(r, good, publish) {
  if (r === null) return null;
  return r >= good ? 0 : r >= publish ? 1 : 2;
}

// ---------- section 4 (not graded) ----------
function analyseNode(assign, seededSet) {
  const merged = (a, b) => assign.get(a.id) === assign.get(b.id);
  const res = {};
  const axisStats = {};
  const errors = [];
  for (const e of NODE_ENVS) {
    const st = newStats();
    axisStats[e] = {};
    const ids = ENV_IDS[e];
    for (let i = 0; i < ids.length; i++) for (let j = i + 1; j < ids.length; j++) {
      const a = R.get(ids[i]); const b = R.get(ids[j]); const m = merged(a, b);
      addPair(st, a, b, byteIdentical(a, b), m);
      if (a.incident === b.incident) { const c = axisClass(a, b); (axisStats[e][c] ||= newStats()); addPair(axisStats[e][c], a, b, false, m); if (!m) errors.push({ kind: 'split', a, b, where: e }); }
      else if (m) errors.push({ kind: 'merge', a, b, where: e, hardNegative: NODE_HN.has(pairKey(a.incident, b.incident)) });
    }
    res[e] = summarise(st);
  }
  const cross = newStats();
  for (const x of ENV_IDS[PLAIN]) for (const y of ENV_IDS[MAPPED]) {
    const a = R.get(x); const b = R.get(y); const m = merged(a, b);
    addPair(cross, a, b, byteIdentical(a, b), m);
    if (a.incident !== b.incident && m) errors.push({ kind: 'merge', a, b, where: 'node-plain x node-mapped', hardNegative: NODE_HN.has(pairKey(a.incident, b.incident)) });
  }
  const nodeBrowser = [];
  let nodeBrowserPairs = 0;
  for (const x of NODE_IDS) for (const y of BROWSER_IDS) { nodeBrowserPairs++; if (merged(R.get(x), R.get(y))) nodeBrowser.push({ a: x, b: y, incidentA: R.get(x).incident, incidentB: R.get(y).incident, bug: assign.get(x) }); }
  const seeded = NODE_IDS.filter((id) => seededSet.has(assign.get(id))).map((id) => ({ id, incident: R.get(id).incident, bug: assign.get(id) }));
  return {
    byEnvironment: res, crossPlainMapped: summarise(cross),
    axes: Object.fromEntries(NODE_ENVS.map((e) => [e, Object.fromEntries(Object.entries(axisStats[e]).map(([k, v]) => [k, summarise(v)]))])),
    nodeBrowserPairs, nodeBrowserMerges: nodeBrowser, seededLandings: seeded, errors,
  };
}

// ---------- validity ----------
function validity(run) {
  const plannedTotal = Object.values(INC.planned).reduce((a, b) => a + b, 0);
  const missing = plannedTotal - reports.length;
  const checks = [
    { check: 'every control merges with its original', ok: run.controlResults.every((c) => c.ok), detail: run.controlResults.filter((c) => !c.ok).map((c) => `${c.reportId}: original ${c.originalBug}, control ${c.controlBug}`).join('; ') || 'all 10 merged' },
    { check: 'every report lands after retries', ok: run.unlanded.length === 0 && run.controlResults.every((c) => c.landed), detail: run.unlanded.length ? `${run.unlanded.length} did not land: ${run.unlanded.slice(0, 20).join(', ')}` : 'all landed' },
    { check: 'no more than 10% of planned reports missing', ok: missing / plannedTotal <= 0.1, detail: `${missing} of ${plannedTotal} planned missing (${((missing / plannedTotal) * 100).toFixed(1)}%)` },
    { check: 'run replayed this corpus', ok: run.header.corpusReportsSha256 === sha256File(reportsFile), detail: `reports.jsonl sha256 in run header ${run.header.corpusReportsSha256 === sha256File(reportsFile) ? 'matches' : 'DOES NOT match'}` },
    { check: 'quarantine audit finds no breach', ok: null, detail: 'not checked by this tool: the audit of the builder transcript is separate, and its outcome must be stated in the results' },
  ];
  if ((run.header.seededBugIds || []).length !== 4) checks.push({ check: 'four seeded bugs recorded before the replay', ok: false, detail: `${(run.header.seededBugIds || []).length} recorded` });
  return { checks, void: checks.some((c) => c.ok === false) };
}

// ---------- seed comparison ----------
function comparePartitions(a1, a2, ids) {
  let differing = 0;
  const involved = new Set();
  for (let i = 0; i < ids.length; i++) for (let j = i + 1; j < ids.length; j++) {
    const s1 = a1.get(ids[i]) === a1.get(ids[j]);
    const s2 = a2.get(ids[i]) === a2.get(ids[j]);
    if (s1 !== s2) { differing++; involved.add(ids[i]); involved.add(ids[j]); }
  }
  return { identical: differing === 0, differingPairs: differing, reportsInvolved: [...involved].sort() };
}

// ---------- baselines ----------
function baselinePartition(keyFn) {
  const m = new Map();
  for (const r of R.values()) m.set(r.id, 'K:' + keyFn(r));
  return m;
}

// ---------- run everything ----------
const A1 = analyse(run1.assign, run1.seeded);
const A2 = analyse(run2.assign, run2.seeded, { listings: false });
const V1 = validity(run1);
const V2 = validity(run2);
const seedCmp = comparePartitions(run1.assign, run2.assign, BROWSER_IDS);
const seedCmpNode = comparePartitions(run1.assign, run2.assign, NODE_IDS);
const seedGate = { id: 'seed-comparison', name: 'Seed 1 vs seed 2 partitions', value: seedCmp.identical ? 'identical' : `${seedCmp.differingPairs} pairs differ`, band: seedCmp.identical ? 0 : 1, detail: 'identical = Good; any difference = publish with the limitation' };
const gates = [...A1.gates, seedGate];
const isVoid = V1.void || V2.void;
const worst = Math.max(...gates.map((g) => (g.band === null ? 0 : g.band)));
const verdict = isVoid ? 'VOID: nothing is graded' : BANDS[worst];
const baselineMS = analyse(baselinePartition((r) => r.msg + '\u0000' + r.stack), new Set(), { listings: false });
const baselineM = analyse(baselinePartition((r) => r.msg), new Set(), { listings: false });
const node1 = analyseNode(run1.assign, run1.seeded);

// Split pattern of each incident: its reports grouped by bug, per environment.
function splitPattern(incident, assign) {
  const parts = [];
  for (const e of BROWSER_ENVS) {
    const ids = ENV_IDS[e].filter((id) => R.get(id).incident === incident);
    const groups = new Map();
    for (const id of ids) { const b = assign.get(id); (groups.get(b) || groups.set(b, []).get(b)).push(id); }
    const label = (id) => { const r = R.get(id); return `${r.browser}/${r.appVersion}${r.variant !== 'standard' ? '/' + r.variant : ''}`; };
    parts.push(`${e}: ${groups.size} bug${groups.size === 1 ? '' : 's'} [${[...groups.values()].map((g) => g.map(label).join(', ')).join(' | ')}]`);
  }
  return parts.join('; ');
}

// Planned vs captured per incident.
const short = [];
for (const [env, per] of Object.entries(INC.plannedPerIncident)) {
  for (const [inc, plannedN] of Object.entries(per)) {
    const got = [...R.values()].filter((r) => r.env === env && r.incident === inc).length;
    if (got < plannedN) short.push({ environment: env, incident: inc, planned: plannedN, captured: got });
  }
}

// ---------- write JSON ----------
fs.mkdirSync(OUT, { recursive: true });
const strip = (p) => ({ a: p.a.id, b: p.b.id, incidentA: p.a.incident, incidentB: p.b.incident, where: p.where, axes: axesDiffer(p.a, p.b), bug: p.bug, bugA: p.bugA, bugB: p.bugB, hardNegative: p.hardNegative });
const json = {
  tool: 'score.mjs', corpusReportsSha256: sha256File(reportsFile),
  runs: [run1, run2].map((r) => ({ file: path.basename(r.file), seed: r.header.seed, base: r.header.base, startedAt: r.header.startedAt, seededBugIds: r.header.seededBugIds })),
  validity: { run1: V1, run2: V2, void: isVoid },
  verdict, gates: gates.map((g) => ({ ...g, band: g.band === null ? null : BANDS[g.band] })),
  headline: A1.headline, headlineExclByteIdenticalDifferent: A1.headlineExclByteIdenticalDifferent, excludedByteIdenticalDifferentIncidentPairs: A1.excludedByteIdenticalDifferentIncidentPairs,
  byEnvironment: A1.byEnvironment, crossEnvironment: A1.cross, versionOnly: A1.versionOnly, browserOnly: A1.browserOnly, axes: A1.axes, axesPooled: A1.axesPooled,
  variantPairs: A1.variantPairs,
  byOrigin: Object.fromEntries(Object.entries(A1.byOrigin).map(([m, v]) => [m, { ...v, gates: v.gates.map((g) => ({ ...g, band: g.band === null ? null : BANDS[g.band] })) }])),
  ordinaryMerges: A1.ordinaryMerges, hardNegativeMerges: A1.hardNegativeMerges, seededLandings: A1.seededLandings,
  falseMerges: A1.fpPairs.map(strip), falseSplits: A1.fnPairs.map((p) => strip({ ...p, bugA: run1.assign.get(p.a.id), bugB: run1.assign.get(p.b.id) })),
  byteIdenticalPairs: A1.byteIdenticalPairs, incidentsShort: short, dropped,
  baselines: {
    messageAndStack: { headline: baselineMS.headline, gates: baselineMS.gates.map((g) => ({ ...g, band: BANDS[g.band] ?? null })) },
    messageOnly: { headline: baselineM.headline, gates: baselineM.gates.map((g) => ({ ...g, band: BANDS[g.band] ?? null })) },
  },
  seedComparison: { browser: seedCmp, node: seedCmpNode },
  run2: { headline: A2.headline, gates: A2.gates.map((g) => ({ ...g, band: g.band === null ? null : BANDS[g.band] })) },
  section4: { ...node1, errors: node1.errors.map((e) => ({ kind: e.kind, a: e.a.id, b: e.b.id, incidentA: e.a.incident, incidentB: e.b.incident, where: e.where, hardNegative: e.hardNegative || false })) },
};
fs.writeFileSync(path.join(OUT, 'results.json'), JSON.stringify(json, null, 1) + '\n');

// ---------- write Markdown ----------
const md = [];
const P = (s = '') => md.push(s);
const marksOf = (inc) => (incidentById.get(inc)?.origin || []).join(', ');
const esc = (s) => String(s).replace(/\|/g, '\\|').replace(/\r?\n/g, '↵ ');
const clip = (s, n = 600) => (s.length > n ? `${s.slice(0, n)}… (+${s.length - n} chars)` : s);
const statRow = (label, s) => `| ${label} | ${s.TP} | ${s.FP} | ${s.FN} | ${s.TN} | ${fmt(s.precision)} | ${fmt(s.recallPerPair)} | ${fmt(s.recallPerIncident)} | ${fmt(s.recallGraded)} |`;
const statHead = '| | TP | FP | FN | TN | precision | recall per pair | recall per incident | lower |\n|---|---|---|---|---|---|---|---|---|';

P('# Grouping evaluation: scored results');
P();
P(`Corpus \`reports.jsonl\` sha256 \`${json.corpusReportsSha256}\`. Graded run: \`${path.basename(run1.file)}\` (seed ${run1.header.seed}). Comparison run: \`${path.basename(run2.file)}\` (seed ${run2.header.seed}).`);
P();
P(`**Verdict: ${verdict}**`);
P();
P('## Validity checks');
P();
P('| check | run 1 | run 2 | detail (run 1) |');
P('|---|---|---|---|');
V1.checks.forEach((c, i) => P(`| ${c.check} | ${c.ok === null ? 'not checked' : c.ok ? 'pass' : 'FAIL'} | ${V2.checks[i] ? (V2.checks[i].ok === null ? 'not checked' : V2.checks[i].ok ? 'pass' : 'FAIL') : ''} | ${esc(c.detail)} |`));
P();
P('## Gates');
P();
P('| gate | value | band | rule |');
P('|---|---|---|---|');
for (const g of gates) P(`| ${g.name} | ${fmt(g.value)} | ${isVoid ? '(void) ' : ''}${g.band === null ? 'n/a' : BANDS[g.band]} | ${g.detail} |`);
P();
P('## Headline');
P();
P(statHead);
P(statRow('Headline (graded): all within-environment pairs in browser-prod and browser-dev', A1.headline));
P(statRow(`Headline excluding byte-identical different-incident pairs (${A1.excludedByteIdenticalDifferentIncidentPairs} pairs removed)`, A1.headlineExclByteIdenticalDifferent));
P();
P(`Byte-identical (\`${INC.messageField}\` + \`${INC.stackField}\`) same-incident pairs, kept in both lines: ${A1.headline.byteIdenticalSameIncidentPairs}. Byte-identical different-incident pairs: ${A1.excludedByteIdenticalDifferentIncidentPairs}.`);
P();
P('### By environment');
P();
P(statHead);
for (const e of BROWSER_ENVS) P(statRow(e, A1.byEnvironment[e]));
P(statRow('cross-environment (browser-prod x browser-dev; splits informational, merges count toward the merge gates)', A1.cross));
P();
P('### By axes that differ (same-incident pairs)');
P();
P(statHead);
for (const e of BROWSER_ENVS) for (const [cls, s] of Object.entries(A1.axes[e]).sort()) P(statRow(`${e}: ${cls}`, s));
for (const [cls, s] of Object.entries(A1.axesPooled).sort()) P(statRow(`pooled: ${cls}`, s));
P();
P('### Isolated variant pairs');
P();
P('| incident | type | environment | pair | merged |');
P('|---|---|---|---|---|');
for (const v of A1.variantPairs) P(`| ${v.incident} (${marksOf(v.incident)}) | ${v.type} | ${v.env} | ${v.a} / ${v.b} | ${v.merged ? 'yes' : '**no**'} |`);
P();
P('### By category origin');
P();
P('Every gate restricted to the incidents carrying each mark. Merge gates count merged pairs that involve at least one such incident; for hard-negative pairs, the pair\'s own origin also counts. These bands are context; the verdict uses the full set.');
P();
P(`| gate | ${Object.keys(A1.byOrigin).join(' | ')} |`);
P(`|---|${Object.keys(A1.byOrigin).map(() => '---').join('|')}|`);
A1.gates.forEach((g, i) => P(`| ${g.name} | ${Object.values(A1.byOrigin).map((o) => `${fmt(o.gates[i].value)} (${o.gates[i].band === null ? 'n/a' : BANDS[o.gates[i].band]})`).join(' | ')} |`));
P(`| headline recall per pair / per incident | ${Object.values(A1.byOrigin).map((o) => `${fmt(o.headline.recallPerPair)} / ${fmt(o.headline.recallPerIncident)}`).join(' | ')} |`);
P(`| incidents | ${Object.values(A1.byOrigin).map((o) => o.incidents.length).join(' | ')} |`);
P();
P('## Reference baselines (context, not gates)');
P();
P(statHead);
P(statRow('byte-equal message + stack', baselineMS.headline));
P(statRow('byte-equal message alone', baselineM.headline));
P();
P('| gate | message + stack | message alone |');
P('|---|---|---|');
baselineMS.gates.forEach((g, i) => P(`| ${g.name} | ${fmt(g.value)} (${BANDS[g.band] ?? 'n/a'}) | ${fmt(baselineM.gates[i].value)} (${BANDS[baselineM.gates[i].band] ?? 'n/a'}) |`));
P();
P('## Seed comparison');
P();
P(`Browser reports: ${seedCmp.identical ? 'partitions identical' : `${seedCmp.differingPairs} report pairs decided differently; reports involved: ${seedCmp.reportsInvolved.join(', ')}`}. Node reports (not graded): ${seedCmpNode.identical ? 'identical' : `${seedCmpNode.differingPairs} pairs differ`}.`);
P();
P(`Run 2 for reference: headline recall (lower) ${fmt(A2.headline.recallGraded)}, precision ${fmt(A2.headline.precision)}; gate bands ${A2.gates.map((g) => `${g.id}=${g.band === null ? 'n/a' : BANDS[g.band]}`).join(', ')}.`);
P();
P('## Every false merge');
P();
P(`Ordinary merges (not designated hard-negative pairs): ${A1.ordinaryMerges.length ? A1.ordinaryMerges.map((m) => `${m.incidents.join(' + ')} (${m.reportPairs} report pairs)`).join('; ') : 'none'}.`);
P();
P(`Hard-negative pairs merged: ${A1.hardNegativeMerges.length ? A1.hardNegativeMerges.map((m) => `${m.incidents.join(' + ')} [pair origin ${m.origin}] (${m.reportPairs} report pairs)`).join('; ') : 'none'}.`);
P();
P(`Corpus reports landing on a seeded bug: ${A1.seededLandings.length ? A1.seededLandings.map((s) => `${s.id} (${s.incident}) on ${s.bug}`).join('; ') : 'none'}.`);
P();
const pairBlock = (p, bugs) => {
  P(`#### ${p.a.id} (${p.a.incident}; ${marksOf(p.a.incident)}) / ${p.b.id} (${p.b.incident}; ${marksOf(p.b.incident)})`);
  P();
  P(`- environment: ${p.where === 'cross' ? `${p.a.env} x ${p.b.env}` : p.where}; axes that differ: ${[...(p.a.incident !== p.b.incident ? ['incident'] : []), ...axesDiffer(p.a, p.b)].join(', ') || 'none'}${p.hardNegative ? '; designated hard-negative pair' : ''}`);
  P(`- ${bugs}`);
  P(`- message A: \`${esc(clip(p.a.msg))}\``);
  P(`- message B: \`${esc(clip(p.b.msg))}\``);
  P();
  P('| frame | A | B |');
  P('|---|---|---|');
  const fa = frames(p.a.stack); const fb = frames(p.b.stack);
  for (let k = 0; k < Math.max(fa.length, fb.length, 1); k++) P(`| ${k + 1} | ${esc(fa[k] ? clip(fa[k], 200) : k === 0 ? '(no frames)' : '')} | ${esc(fb[k] ? clip(fb[k], 200) : k === 0 ? '(no frames)' : '')} |`);
  P();
};
let listed = 0;
for (const p of A1.fpPairs) { if (listed++ >= LIST_LIMIT) { P(`(listing cut at ${LIST_LIMIT}; ${A1.fpPairs.length} in results.json)`); break; } pairBlock(p, `bug: ${p.bug}`); }
if (!A1.fpPairs.length) P('No false-merge pairs.');
P();
P('## Section 4: server-side reports (not graded)');
P();
P(statHead);
for (const e of NODE_ENVS) P(statRow(e, node1.byEnvironment[e]));
P(statRow('node-plain x node-mapped', node1.crossPlainMapped));
for (const e of NODE_ENVS) for (const [cls, s] of Object.entries(node1.axes[e]).sort()) P(statRow(`${e}: ${cls}`, s));
P();
P(`Node x browser pairs: ${node1.nodeBrowserPairs}, merged: ${node1.nodeBrowserMerges.length}${node1.nodeBrowserMerges.length ? ' (' + node1.nodeBrowserMerges.slice(0, 200).map((m) => `${m.a} ${m.incidentA} + ${m.b} ${m.incidentB} on ${m.bug}`).join('; ') + ')' : ''}.`);
P(`Node reports landing on a seeded bug: ${node1.seededLandings.length ? node1.seededLandings.map((s) => `${s.id} (${s.incident})`).join(', ') : 'none'}.`);
P();
P('| kind | pair | incidents | where |');
P('|---|---|---|---|');
for (const e of node1.errors) P(`| ${e.kind}${e.hardNegative ? ' (hard negative)' : ''} | ${e.a.id} / ${e.b.id} | ${e.a.incident} / ${e.b.incident} | ${e.where} |`);
P();
P('## Appendix A: every false split');
P();
const patterns = new Map();
const patternOf = (inc) => patterns.get(inc) || patterns.set(inc, splitPattern(inc, run1.assign)).get(inc);
P('| pair | incident (origin) | environment | axes | bugs | message A | message B | frames A | frames B |');
P('|---|---|---|---|---|---|---|---|---|');
listed = 0;
for (const p of A1.fnPairs) {
  if (listed++ >= LIST_LIMIT) { P(`(listing cut at ${LIST_LIMIT}; ${A1.fnPairs.length} in results.json)`); break; }
  P(`| ${p.a.id} / ${p.b.id} | ${p.a.incident} (${marksOf(p.a.incident)}) | ${p.where === 'cross' ? 'cross' : p.where} | ${axesDiffer(p.a, p.b).join(', ')} | ${run1.assign.get(p.a.id)} / ${run1.assign.get(p.b.id)} | ${esc(clip(p.a.msg, 200))} | ${esc(clip(p.b.msg, 200))} | ${frames(p.a.stack).map((f) => esc(clip(f, 120))).join('<br>')} | ${frames(p.b.stack).map((f) => esc(clip(f, 120))).join('<br>')} |`);
}
if (!A1.fnPairs.length) P('| no false-split pairs | | | | | | | | |');
P();
P('### Split pattern of every incident with a false split');
P();
for (const inc of [...new Set(A1.fnPairs.map((p) => p.a.incident))].sort()) P(`- **${inc}** (${marksOf(inc)}): ${patternOf(inc)}`);
P();
P('## Appendix B: byte-identical pairs');
P();
P('| pair | incidents | where | same incident |');
P('|---|---|---|---|');
for (const b of A1.byteIdenticalPairs) P(`| ${b.a} / ${b.b} | ${b.incidentA} / ${b.incidentB} | ${b.where} | ${b.sameIncident ? 'yes' : 'no'} |`);
P();
P('## Appendix C: incidents with fewer reports than planned');
P();
P('| environment | incident | planned | captured |');
P('|---|---|---|---|');
for (const s of short) P(`| ${s.environment} | ${s.incident} (${marksOf(s.incident)}) | ${s.planned} | ${s.captured} |`);
P();
P('Dropped triggers (each retried up to three times):');
P();
for (const d of dropped) P(`- ${d.environment} ${d.appVersion} ${d.browser || 'node' + d.nodeVersion} ${d.incident}/${d.variant}: reports per attempt ${d.attempts.map((a) => a.reports).join(', ')}`);
fs.writeFileSync(path.join(OUT, 'results.md'), md.join('\n') + '\n');
console.log(`verdict: ${verdict}`);
console.log(`wrote ${path.join(OUT, 'results.md')} and results.json`);
