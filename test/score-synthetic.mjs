// Tests score.mjs on synthetic partitions only (never on output from the
// system under test).
//
//   node test/score-synthetic.mjs [--corpus corpus]
//
// Without --corpus it builds a synthetic corpus from harness/plan.mjs (every
// planned report present, fake bodies), so expected counts are exact. With
// --corpus it uses the real corpus files and checks only band outcomes.
// Each scenario writes two fake replay files (seed 1 and seed 2) and runs
// score.mjs on them.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { BROWSER_INCIDENTS, NODE_INCIDENTS, HARD_NEGATIVE_PAIRS, NODE_HARD_NEGATIVE_PAIRS, browserPlan, nodePlan, BROWSER_ENVS, NODE_ENVS } from '../harness/plan.mjs';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const REAL = args.includes('--corpus') ? path.resolve(args[args.indexOf('--corpus') + 1]) : null;
const WORK = path.join(REPO, 'build', 'score-tests');
fs.rmSync(WORK, { recursive: true, force: true });
fs.mkdirSync(WORK, { recursive: true });
const SEEDED = ['aaaaaaaaaaaaaaaaaaaaaa01', 'aaaaaaaaaaaaaaaaaaaaaa02', 'aaaaaaaaaaaaaaaaaaaaaa03', 'aaaaaaaaaaaaaaaaaaaaaa04'];

// ---------- corpus ----------
let CORPUS;
if (REAL) {
  CORPUS = REAL;
} else {
  CORPUS = path.join(WORK, 'corpus');
  fs.mkdirSync(CORPUS, { recursive: true });
  const reports = [];
  const meta = [];
  let n = 0;
  const plannedPerIncident = {};
  const planned = {};
  for (const env of [...BROWSER_ENVS, ...NODE_ENVS]) {
    const plan = BROWSER_ENVS.includes(env) ? browserPlan(env) : nodePlan(env);
    planned[env] = plan.length;
    for (const t of plan) {
      plannedPerIncident[env] ??= {};
      plannedPerIncident[env][t.incident] = (plannedPerIncident[env][t.incident] || 0) + 1;
      const id = `R${String(++n).padStart(4, '0')}`;
      // E1/E2 are byte-identical everywhere; every other incident differs per browser only.
      const stackless = ['E1', 'E2'].includes(t.incident);
      const body = stackless
        ? { title: 'Script error.', errorLog: 'Script error.' }
        : { title: `${t.incident} message`, errorLog: `${t.incident} stack\n    at f (${t.browser || 'node' + t.node})` };
      reports.push({ id, path: '/api/telemetry/report', contentType: 'application/json', body: JSON.stringify(body) });
      meta.push({ id, incident: t.incident, environment: env, browser: t.browser || null, appVersion: t.version, nodeVersion: t.node || null, variant: t.variant });
    }
  }
  const w = (f, rows) => fs.writeFileSync(path.join(CORPUS, f), rows.map((r) => JSON.stringify(r)).join('\n') + '\n');
  w('reports.jsonl', reports);
  w('meta.jsonl', meta);
  fs.writeFileSync(path.join(CORPUS, 'incidents.json'), JSON.stringify({
    messageField: 'title', stackField: 'errorLog', browserEnvironments: BROWSER_ENVS, nodeEnvironments: NODE_ENVS,
    incidents: [...BROWSER_INCIDENTS.map((i) => ({ id: i.id, kind: 'browser', origin: i.origin, variant: i.variant ? i.variant.type : null })), ...NODE_INCIDENTS.map((i) => ({ id: i.id, kind: 'node', origin: i.origin, variant: i.variant ? i.variant.type : null }))],
    hardNegativePairs: HARD_NEGATIVE_PAIRS.map(([a, b, origin]) => ({ a, b, origin })),
    nodeHardNegativePairs: NODE_HARD_NEGATIVE_PAIRS.map(([a, b, origin]) => ({ a, b, origin })),
    planned, plannedPerIncident,
  }));
  const browserIds = meta.filter((m) => BROWSER_ENVS.includes(m.environment)).map((m) => m.id);
  fs.writeFileSync(path.join(CORPUS, 'controls.json'), JSON.stringify({ seed: 1, ids: browserIds.slice(0, 10) }));
  fs.writeFileSync(path.join(CORPUS, 'dropped.json'), '[]');
}

const readJsonl = (f) => fs.readFileSync(f, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
const META = readJsonl(path.join(CORPUS, 'meta.jsonl'));
const CONTROLS = JSON.parse(fs.readFileSync(path.join(CORPUS, 'controls.json'), 'utf8')).ids;
const SHA = crypto.createHash('sha256').update(fs.readFileSync(path.join(CORPUS, 'reports.jsonl'))).digest('hex');
const byId = new Map(META.map((m) => [m.id, m]));

// ---------- fake replay files ----------
function writeRun(name, seed, bugOf, { unlanded = [], controlBug = {}, seeded = SEEDED } = {}) {
  const file = path.join(WORK, `${name}-seed${seed}.jsonl`);
  const lines = [{ type: 'header', seed, base: 'synthetic', corpusReportsSha256: SHA, seededBugIds: seeded }];
  let seq = 0;
  for (const m of META) {
    if (unlanded.includes(m.id)) lines.push({ type: 'report', seq: ++seq, reportId: m.id, control: false, landed: false, httpStatus: 500 });
    else lines.push({ type: 'report', seq: ++seq, reportId: m.id, control: false, landed: true, httpStatus: 200, bugId: bugOf(m) });
  }
  for (const c of CONTROLS) lines.push({ type: 'report', seq: ++seq, reportId: c, control: true, controlOf: c, landed: true, httpStatus: 200, bugId: controlBug[c] || bugOf(byId.get(c)) });
  lines.push({ type: 'footer' });
  fs.writeFileSync(file, lines.map((l) => JSON.stringify(l)).join('\n') + '\n');
  return file;
}
function score(name, run1, run2) {
  const out = path.join(WORK, `out-${name}`);
  execFileSync(process.execPath, [path.join(REPO, 'score.mjs'), run1, run2, '--out', out, '--corpus', CORPUS, '--list-limit', '50'], { stdio: ['ignore', 'ignore', 'inherit'] });
  return JSON.parse(fs.readFileSync(path.join(out, 'results.json'), 'utf8'));
}
const gate = (res, id) => res.gates.find((g) => g.id === id);

let failures = 0;
let passes = 0;
function expect(name, cond, detail) {
  if (cond) passes++;
  else { failures++; console.log(`FAIL ${name}: ${detail}`); }
}
function scenario(name, bugOf, { bugOf2 = bugOf, runOpts = {}, check }) {
  const r1 = writeRun(name, 1, bugOf, runOpts);
  const r2 = writeRun(name, 2, bugOf2, runOpts);
  const res = score(name, r1, r2);
  check(res);
  console.log(`${name}: verdict ${res.verdict}; ${res.gates.map((g) => `${g.id}=${g.band}`).join(', ')}`);
}

// Ground-truth bug: one bug per incident (shared across environments, which is allowed).
const truth = (m) => `bug-${m.incident}`;
const inEnv = (m, env) => m.environment === env;
const isBrowser = (m) => BROWSER_ENVS.includes(m.environment);

// ---------- scenarios ----------
scenario('ground-truth', truth, {
  check: (r) => {
    expect('truth verdict', r.verdict === 'Good', r.verdict);
    expect('truth recall', r.headline.recallPerPair === 1 && r.headline.recallPerIncident === 1, JSON.stringify(r.headline));
    expect('truth FP', r.headline.FP === 0 && r.crossEnvironment.FP === 0, `${r.headline.FP} ${r.crossEnvironment.FP}`);
    expect('truth precision', r.headline.precision === 1, r.headline.precision);
    expect('truth seed', gate(r, 'seed-comparison').band === 'Good', gate(r, 'seed-comparison').value);
    if (!REAL) {
      // Full synthetic plan: 355 reports per browser environment.
      expect('pairs per env', r.byEnvironment['browser-prod'].TP + r.byEnvironment['browser-prod'].TN === 62835, r.byEnvironment['browser-prod'].TP + r.byEnvironment['browser-prod'].TN);
      expect('same-incident pairs per env', r.byEnvironment['browser-prod'].TP === 933, r.byEnvironment['browser-prod'].TP);
      expect('headline same-incident pairs', r.headline.TP === 1866, r.headline.TP);
      expect('version-only pairs', r.versionOnly['browser-prod'].TP === 171, r.versionOnly['browser-prod'].TP);
      expect('browser-only pairs pooled', r.browserOnly.TP === 684, r.browserOnly.TP);
      expect('variant pairs', r.variantPairs.length === 26 && r.variantPairs.filter((p) => p.type === 'data').length === 20, r.variantPairs.length);
      expect('cross pairs', r.crossEnvironment.TP + r.crossEnvironment.TN === 355 * 355, r.crossEnvironment.TP + r.crossEnvironment.TN);
      // E1 x E2 byte-identical: 6 x 6 per env.
      expect('byte-identical different-incident', r.excludedByteIdenticalDifferentIncidentPairs === 72, r.excludedByteIdenticalDifferentIncidentPairs);
      expect('excl line drops exactly those', r.headlineExclByteIdenticalDifferent.TN === r.headline.TN - 72, `${r.headlineExclByteIdenticalDifferent.TN} vs ${r.headline.TN}`);
      expect('node env pairs', r.section4.byEnvironment['node-plain'].TP === 56 && r.section4.byEnvironment['node-plain'].TP + r.section4.byEnvironment['node-plain'].TN === 561, JSON.stringify(r.section4.byEnvironment['node-plain']));
      expect('node x browser pairs', r.section4.nodeBrowserPairs === 68 * 710, r.section4.nodeBrowserPairs);
      expect('baseline message+stack splits by browser', r.baselines.messageAndStack.headline.recallPerPair < 1, r.baselines.messageAndStack.headline.recallPerPair);
      expect('baseline message+stack merges E1/E2', r.baselines.messageAndStack.gates.find((g) => g.id === 'hard-negative-merges').value === 1, JSON.stringify(r.baselines.messageAndStack.gates));
    }
  },
});

scenario('all-merged', () => 'one-bug', {
  check: (r) => {
    expect('all-merged verdict', r.verdict === 'Change the code', r.verdict);
    expect('all-merged recall', r.headline.recallGraded === 1, r.headline.recallGraded);
    expect('all-merged ordinary', gate(r, 'ordinary-merges').band === 'Change the code', gate(r, 'ordinary-merges').value);
    expect('all-merged HN', gate(r, 'hard-negative-merges').value === HARD_NEGATIVE_PAIRS.length && gate(r, 'hard-negative-merges').band === 'Change the code', gate(r, 'hard-negative-merges').value);
    expect('all-merged TN', r.headline.TN === 0, r.headline.TN);
  },
});

scenario('all-split', (m) => `bug-${m.id}`, {
  check: (r) => {
    expect('all-split verdict', r.verdict === 'Change the code', r.verdict);
    expect('all-split recall', r.headline.recallPerPair === 0 && r.headline.recallPerIncident === 0, JSON.stringify(r.headline));
    expect('all-split precision undefined', r.headline.precision === null, r.headline.precision);
    expect('all-split merges', gate(r, 'ordinary-merges').value === 0 && gate(r, 'hard-negative-merges').value === 0, '');
    expect('all-split data gate', gate(r, 'data-variant-pairs').band === 'Change the code', gate(r, 'data-variant-pairs').band);
    expect('all-split callpath gate', gate(r, 'call-path-pairs').band === 'Publish with the limitation stated', gate(r, 'call-path-pairs').band);
    expect('all-split version gate', gate(r, 'version-only-recall').band === 'Change the code', gate(r, 'version-only-recall').band);
  },
});

// One hard-negative pair merged (E1/E2) in browser-prod only: publish.
scenario('E1-E2-merged-prod', (m) => (inEnv(m, 'browser-prod') && ['E1', 'E2'].includes(m.incident) ? 'bug-E' : truth(m)), {
  check: (r) => {
    expect('E merge HN count', gate(r, 'hard-negative-merges').value === 1, gate(r, 'hard-negative-merges').value);
    expect('E merge band', gate(r, 'hard-negative-merges').band === 'Publish with the limitation stated', gate(r, 'hard-negative-merges').band);
    expect('E merge verdict', r.verdict === 'Publish with the limitation stated', r.verdict);
    expect('E merge ordinary 0', gate(r, 'ordinary-merges').value === 0, gate(r, 'ordinary-merges').value);
    if (!REAL) expect('E merge FP pairs', r.headline.FP === 36 && r.headlineExclByteIdenticalDifferent.FP === 0, `${r.headline.FP} / ${r.headlineExclByteIdenticalDifferent.FP}`);
  },
});

// Three hard-negative pairs merged: change the code.
const three = { A3: 'hn1', A4: 'hn1', C4: 'hn2', C5: 'hn2', G21: 'hn3', G22: 'hn3' };
scenario('three-HN', (m) => (isBrowser(m) && three[m.incident] ? three[m.incident] : truth(m)), {
  check: (r) => {
    expect('three HN', gate(r, 'hard-negative-merges').value === 3 && gate(r, 'hard-negative-merges').band === 'Change the code', gate(r, 'hard-negative-merges').value);
    expect('three HN by origin B', r.byOrigin.B.gates.find((g) => g.id === 'hard-negative-merges').value >= 1, JSON.stringify(r.byOrigin.B.hardNegativeMergedPairs));
  },
});

// A hard-negative merge seen only across environments (A3 in prod with A4 in dev).
scenario('cross-env-HN', (m) => ((inEnv(m, 'browser-prod') && m.incident === 'A3') || (inEnv(m, 'browser-dev') && m.incident === 'A4') ? 'bug-x' : truth(m)), {
  check: (r) => {
    expect('cross HN counted', gate(r, 'hard-negative-merges').value === 1, gate(r, 'hard-negative-merges').value);
    expect('cross HN not in headline FP', r.headline.FP === 0, r.headline.FP);
    expect('cross FP', r.crossEnvironment.FP > 0, r.crossEnvironment.FP);
  },
});

// One ordinary merge (A1 with A7) in browser-dev only: change the code.
scenario('ordinary-merge', (m) => (inEnv(m, 'browser-dev') && ['A1', 'A7'].includes(m.incident) ? 'bug-o' : truth(m)), {
  check: (r) => {
    expect('ordinary count', gate(r, 'ordinary-merges').value === 1, gate(r, 'ordinary-merges').value);
    expect('ordinary band', gate(r, 'ordinary-merges').band === 'Change the code', gate(r, 'ordinary-merges').band);
    expect('ordinary origin U', r.byOrigin.U.gates[0].value === 1 && r.byOrigin['B-only'].gates[0].value === 0, `${r.byOrigin.U.gates[0].value} ${r.byOrigin['B-only'].gates[0].value}`);
  },
});

// A corpus report landing on a seeded bug is an ordinary false merge.
const victim = META.find((m) => m.environment === 'browser-prod' && m.incident === 'G3').id;
scenario('seeded-landing', (m) => (m.id === victim ? SEEDED[0] : truth(m)), {
  check: (r) => {
    expect('seeded landing listed', r.seededLandings.length === 1 && r.seededLandings[0].id === victim, JSON.stringify(r.seededLandings));
    expect('seeded landing gate', gate(r, 'ordinary-merges').band === 'Change the code', gate(r, 'ordinary-merges').value);
  },
});

// Data-variant split (A7 variant in prod on its own bug): change the code.
const a7var = META.find((m) => m.environment === 'browser-prod' && m.incident === 'A7' && m.variant === 'data').id;
scenario('data-variant-split', (m) => (m.id === a7var ? 'bug-A7-variant' : truth(m)), {
  check: (r) => {
    expect('data split band', gate(r, 'data-variant-pairs').band === 'Change the code', gate(r, 'data-variant-pairs').value);
    expect('data split recall still good', gate(r, 'headline-recall').band === 'Good', gate(r, 'headline-recall').value);
  },
});

// Call-path split (A9 variant in dev): publish.
const a9var = META.find((m) => m.environment === 'browser-dev' && m.incident === 'A9' && m.variant === 'callpath').id;
scenario('callpath-split', (m) => (m.id === a9var ? 'bug-A9-variant' : truth(m)), {
  check: (r) => {
    expect('callpath band', gate(r, 'call-path-pairs').band === 'Publish with the limitation stated', gate(r, 'call-path-pairs').value);
    expect('callpath verdict', r.verdict === 'Publish with the limitation stated', r.verdict);
    expect('callpath listed', r.falseSplits.some((p) => p.a === a9var || p.b === a9var), '');
  },
});

// Version splits in browser-prod: every v2 report of the first 4 standard incidents on its own bug.
const four = ['A1', 'A2', 'A3', 'A4'];
const splitV2 = (m) => (inEnv(m, 'browser-prod') && four.includes(m.incident) && m.appVersion === 'v2' ? `bug-${m.incident}-v2` : truth(m));
scenario('version-split-4', splitV2, {
  check: (r) => {
    const v = r.versionOnly['browser-prod'];
    if (!REAL) {
      expect('version micro', Math.abs(v.recallPerPair - 159 / 171) < 1e-9, v.recallPerPair);
      expect('version macro', Math.abs(v.recallPerIncident - 53 / 57) < 1e-9, v.recallPerIncident);
    }
    expect('version band publish', gate(r, 'version-only-recall').band === 'Publish with the limitation stated', `${gate(r, 'version-only-recall').value}`);
    expect('dev version untouched', r.versionOnly['browser-dev'].recallGraded === 1, r.versionOnly['browser-dev'].recallGraded);
  },
});

// Browser splits everywhere: each browser on its own bug -> browser-only recall 0.
scenario('browser-split', (m) => (isBrowser(m) ? `bug-${m.incident}-${m.browser}` : truth(m)), {
  check: (r) => {
    expect('browser recall 0', r.browserOnly.recallGraded === 0, r.browserOnly.recallGraded);
    expect('browser band', gate(r, 'browser-only-recall').band === 'Change the code', gate(r, 'browser-only-recall').band);
    expect('version still 1', gate(r, 'version-only-recall').value === 1, gate(r, 'version-only-recall').value);
  },
});

// Seed difference: run 2 merges G16 with G17 in dev, run 1 is truth.
scenario('seed-difference', truth, {
  bugOf2: (m) => (inEnv(m, 'browser-dev') && ['G16', 'G17'].includes(m.incident) ? 'bug-g' : truth(m)),
  check: (r) => {
    expect('seed band', gate(r, 'seed-comparison').band === 'Publish with the limitation stated', gate(r, 'seed-comparison').value);
    expect('seed verdict', r.verdict === 'Publish with the limitation stated', r.verdict);
    expect('seed differing pairs', r.seedComparison.browser.differingPairs > 0, r.seedComparison.browser.differingPairs);
  },
});

// Validity: a failed control voids the run.
scenario('control-fails', truth, {
  runOpts: { controlBug: { [CONTROLS[0]]: 'some-other-bug' } },
  check: (r) => {
    expect('void on control', r.validity.void === true && r.verdict.startsWith('VOID'), r.verdict);
  },
});

// Validity: an unlanded report voids the run.
scenario('unlanded', truth, {
  runOpts: { unlanded: [META[5].id] },
  check: (r) => {
    expect('void on unlanded', r.validity.void === true, r.verdict);
  },
});

// Node merges never affect the verdict.
scenario('node-merges-ungraded', (m) => (isBrowser(m) ? truth(m) : 'node-blob'), {
  check: (r) => {
    expect('node verdict good', r.verdict === 'Good', r.verdict);
    expect('node merges reported', r.section4.errors.some((e) => e.kind === 'merge'), '');
  },
});

console.log(`\n${passes} checks passed, ${failures} failed${REAL ? ' (real corpus metadata, synthetic partitions)' : ' (synthetic corpus)'}`);
process.exit(failures ? 1 : 0);
