// Corpus difficulty statistics, computed from the corpus alone (labels and
// captured payloads; no system output).
//
//   node analysis/difficulty.mjs            prints JSON to stdout
//
// Engine-differing test: within each incident, for each browser environment
// and app version, take the standard (non-variant) reports and compare their
// captured message field (`title`, corpus/incidents.json messageField) across
// the browsers that have a report. The incident is engine-differing if in any
// such cell group the messages are not all byte-identical.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const C = (p) => path.join(REPO, 'corpus', p);
const readJsonl = (f) => fs.readFileSync(f, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
const INC = JSON.parse(fs.readFileSync(C('incidents.json'), 'utf8'));
const meta = readJsonl(C('meta.jsonl'));
const body = new Map(readJsonl(C('reports.jsonl')).map((r) => [r.id, JSON.parse(r.body)]));
const ENVS = INC.browserEnvironments;
const rows = meta.filter((m) => ENVS.includes(m.environment)).map((m) => ({ ...m, msg: body.get(m.id)[INC.messageField] }));
const c2 = (n) => (n * (n - 1)) / 2;
const incidents = [...new Set(rows.map((r) => r.incident))].sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));

// ---- engine-differing incidents ----
const engineDiffering = [];
const versionDiffering = [];
for (const inc of incidents) {
  let engine = false;
  let version = false;
  const evidence = [];
  for (const env of ENVS) {
    for (const v of ['v1', 'v2']) {
      const cell = rows.filter((r) => r.incident === inc && r.environment === env && r.appVersion === v && r.variant === 'standard');
      const distinct = new Set(cell.map((r) => r.msg));
      if (cell.length >= 2 && distinct.size > 1) { engine = true; evidence.push(`${env}/${v}: ${distinct.size} distinct across ${cell.map((r) => r.browser).join(', ')}`); }
    }
    for (const b of ['chromium', 'firefox', 'webkit']) {
      const cell = rows.filter((r) => r.incident === inc && r.environment === env && r.browser === b && r.variant === 'standard');
      if (cell.length === 2 && cell[0].msg !== cell[1].msg) version = true;
    }
  }
  if (engine) engineDiffering.push({ incident: inc, origin: INC.incidents.find((i) => i.id === inc).origin, evidence });
  if (version) versionDiffering.push(inc);
}

// ---- breakdown of the engine-differing incidents (context, not the test) ----
// prefix-only: identical once a leading "Uncaught " is removed (Chromium's
// uncaught-error titles carry it; Firefox and WebKit titles here do not).
// component-stack: the title is a React component stack (captureError context).
// wording: the message text itself differs between engines.
const stripUncaught = (s) => String(s).replace(/^Uncaught /, '');
for (const e of engineDiffering) {
  const groups = [];
  for (const env of ENVS) for (const v of ['v1', 'v2']) {
    const cell = rows.filter((r) => r.incident === e.incident && r.environment === env && r.appVersion === v && r.variant === 'standard');
    if (cell.length >= 2) groups.push(cell);
  }
  const isComponentStack = groups.every((g) => g.every((r) => /^\n/.test(String(r.msg))));
  // Titles in the payload never exceed 200 characters, so the prefix also moves
  // the cut point of long titles: compare up to the shorter stripped title.
  const prefixOnly = groups.every((g) => {
    const s = g.map((r) => stripUncaught(r.msg));
    const n = Math.min(...s.map((x) => x.length));
    return new Set(s.map((x) => x.slice(0, n))).size === 1;
  });
  e.kind = isComponentStack ? 'component-stack' : prefixOnly ? 'prefix-only' : 'wording';
}

// ---- pair counts ----
function pairsOf(inc) {
  let same = 0;
  let crossBrowser = 0;
  let sameBrowser = 0;
  for (const env of ENVS) {
    const rs = rows.filter((r) => r.incident === inc && r.environment === env);
    for (let i = 0; i < rs.length; i++) for (let j = i + 1; j < rs.length; j++) {
      same++;
      if (rs[i].browser !== rs[j].browser) crossBrowser++; else sameBrowser++;
    }
  }
  return { same, crossBrowser, sameBrowser };
}
const per = Object.fromEntries(incidents.map((i) => [i, pairsOf(i)]));
const headlineSame = Object.values(per).reduce((a, p) => a + p.same, 0);
const headlinePairs = ENVS.reduce((a, env) => a + c2(rows.filter((r) => r.environment === env).length), 0);
const ed = engineDiffering.map((e) => e.incident);
const edCross = ed.reduce((a, i) => a + per[i].crossBrowser, 0);
const edAll = ed.reduce((a, i) => a + per[i].same, 0);

// The pre-registered threshold argument: "if every one of their cross-browser
// pairs splits". Recall under that scenario, from labels only.
const scenarioMicro = (headlineSame - edCross) / headlineSame;
const scenarioMacro = incidents.reduce((a, i) => a + (ed.includes(i) ? per[i].sameBrowser / per[i].same : 1), 0) / incidents.length;

// ---- hard negatives ----
const present = (inc) => rows.some((r) => r.incident === inc);
const hn = INC.hardNegativePairs.map((p) => {
  const reportPairs = ENVS.reduce((a, env) => a + rows.filter((r) => r.environment === env && r.incident === p.a).length * rows.filter((r) => r.environment === env && r.incident === p.b).length, 0);
  return { ...p, inCorpus: present(p.a) && present(p.b), headlineReportPairs: reportPairs };
});

// ---- growth ----
const nInc = incidents.length;
const out = {
  browserReports: rows.length,
  incidentsInHeadline: nInc,
  headline: { pairs: headlinePairs, sameIncidentPairs: headlineSame, negativePairs: headlinePairs - headlineSame, sameIncidentRate: headlineSame / headlinePairs },
  engineDiffering: {
    test: 'title byte-compared across the browsers present, per incident x environment x app version, standard reports only',
    incidents: engineDiffering,
    count: ed.length,
    crossBrowserSameIncidentPairs: edCross,
    shareCrossBrowser: edCross / headlineSame,
    allSameIncidentPairsOfThoseIncidents: edAll,
    shareAll: edAll / headlineSame,
    notEngineDiffering: incidents.filter((i) => !ed.includes(i)),
    byKind: Object.fromEntries(['prefix-only', 'wording', 'component-stack'].map((k) => {
      const ids = engineDiffering.filter((e) => e.kind === k).map((e) => e.incident);
      const cross = ids.reduce((a, i) => a + per[i].crossBrowser, 0);
      return [k, { incidents: ids, crossBrowserSameIncidentPairs: cross, share: cross / headlineSame }];
    })),
  },
  versionDifferingIncidents: versionDiffering,
  scenarioAllEngineCrossBrowserPairsSplit: { recallPerPair: scenarioMicro, recallPerIncident: scenarioMacro },
  hardNegativePairs: { count: hn.length, pairs: hn },
  perIncidentPairs: per,
  growth: {
    note: 'with k incidents of about r reports per environment: same-incident pairs ~ k*C(r,2) per environment (linear in k); all pairs ~ C(k*r,2) (quadratic in k); negatives = all - same',
    preRegistered: { incidents: 27, reportsPerEnv: 166, pairsPerEnv: c2(166), sameIncidentPerEnv: 429, negativePerEnv: c2(166) - 429 },
    actual: Object.fromEntries(ENVS.map((env) => {
      const n = rows.filter((r) => r.environment === env).length;
      const s = incidents.reduce((a, i) => a + c2(rows.filter((r) => r.environment === env && r.incident === i).length), 0);
      return [env, { reports: n, pairs: c2(n), sameIncident: s, negative: c2(n) - s }];
    })),
  },
};
console.log(JSON.stringify(out, null, 1));
