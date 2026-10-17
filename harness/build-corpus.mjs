// Assembles the frozen corpus from the capture logs.
//
//   node harness/build-corpus.mjs
//
// Reads corpus/capture-log/{browser-prod,browser-dev,node}.jsonl and writes:
//   corpus/reports.jsonl   one line per report: id, request path, content type,
//                          and the request body exactly as captured
//   corpus/meta.jsonl      one line per report: incident, environment, cell, trigger, capture time
//   corpus/incidents.json  the label set, origin marks, variants, hard-negative pairs, planned counts
//   corpus/controls.json   the 10 seeded control picks
//   corpus/dropped.json    planned triggers that produced no accepted report, with each attempt's report count
//   corpus/*-v1-to-v2.diff the v1->v2 diffs of both fixtures
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { REPO } from './services.mjs';
import {
  BROWSER_INCIDENTS, NODE_INCIDENTS, HARD_NEGATIVE_PAIRS, NODE_HARD_NEGATIVE_PAIRS,
  browserPlan, nodePlan, BROWSER_ENVS, NODE_ENVS,
} from './plan.mjs';

const CONTROL_SEED = 20261017;
const CONTROL_COUNT = 10;
const C = (p) => path.join(REPO, 'corpus', p);
const sha256 = (buf) => crypto.createHash('sha256').update(buf).digest('hex');
const readLog = (name) => fs.readFileSync(C(`capture-log/${name}.jsonl`), 'utf8').trim().split('\n').filter(Boolean).map((l) => JSON.parse(l));

// mulberry32, the same generator replay.mjs uses.
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const reports = [];
const meta = [];
const dropped = [];
const summaries = {};
let n = 0;

// The Node capture runs in chunks, one log file per environment x app version.
const NODE_LOGS = fs.readdirSync(C('capture-log')).filter((f) => /^node-.*\.jsonl$/.test(f)).map((f) => f.replace(/\.jsonl$/, '')).sort();

// Investigation re-runs of dropped triggers (diagnostics/rerun/<label>/*.jsonl).
// They are evidence only: their reports never enter reports.jsonl.
const RERUN_DIR = path.join(REPO, 'diagnostics', 'rerun');
const RERUN = [];
if (fs.existsSync(RERUN_DIR)) {
  for (const label of fs.readdirSync(RERUN_DIR).filter((d) => fs.statSync(path.join(RERUN_DIR, d)).isDirectory()).sort()) {
    for (const f of fs.readdirSync(path.join(RERUN_DIR, label)).sort()) {
      RERUN.push(...fs.readFileSync(path.join(RERUN_DIR, label, f), 'utf8').trim().split('\n').filter(Boolean).map((l) => JSON.parse(l)));
    }
  }
}
const INVESTIGATION = { C4: 'diagnostics/C4-C6.md', C5: 'diagnostics/C4-C6.md', C6: 'diagnostics/C4-C6.md', B1: 'diagnostics/B1-B3.md', B2: 'diagnostics/B1-B3.md', B3: 'diagnostics/B1-B3.md' };

// The v1 capture did not record an outcome field; derive it from what it did record.
// A zero-report attempt counts as `zero_reports` only if the page raised (Playwright
// pageerror); otherwise `trigger_failed`.
function v1Outcome(a, reports) {
  if (a.failure) return 'harness_error';
  if (a.beforeClick) return 'report_before_click';
  if (reports === 1) return 'ok';
  if (reports > 1) return 'multiple_reports';
  return a.pageErrors && a.pageErrors.length ? 'zero_reports' : 'trigger_failed';
}

function addFrom(logNames, envs, cellOf) {
  const lines = [].concat(...[].concat(logNames).map((n) => readLog(n)));
  const logName = [].concat(logNames).join('+');
  for (const s of lines.filter((l) => l.kind === 'summary')) summaries[logName] = s;
  const attempts = lines.filter((l) => l.kind === 'attempt');
  for (const env of envs) {
    for (const acc of lines.filter((l) => l.kind === 'accepted' && l.env === env)) {
      const att = attempts.find((a) => a.env === env && cellOf(a) === cellOf(acc) && a.incident === acc.incident && a.variant === acc.variant && a.attempt === acc.attempt);
      if (!att || !att.ok) throw new Error(`accepted record without matching attempt: ${JSON.stringify(acc)}`);
      const post = att.requests.find((r) => r.method === 'POST' && r.seq === acc.seq);
      const bytes = Buffer.from(post.bodyBase64, 'base64');
      const body = bytes.toString('utf8');
      if (!Buffer.from(body, 'utf8').equals(bytes)) throw new Error('body is not valid UTF-8; cannot store it verbatim as text');
      const id = `R${String(++n).padStart(4, '0')}`;
      reports.push({ id, path: post.url, contentType: post.headers['content-type'] || null, body });
      meta.push({
        id,
        incident: acc.incident,
        environment: env,
        browser: att.browser || null,
        browserVersion: att.browserVersion || null,
        appVersion: att.version,
        nodeVersion: att.node || null,
        nodeImage: att.image || null,
        variant: att.variant,
        trigger: att.trigger,
        attempt: att.attempt,
        captureTime: post.receivedAt,
        fixtureCommit: att.fixtureCommit,
        bodySha256: sha256(bytes),
      });
    }
    for (const d of lines.filter((l) => l.kind === 'dropped' && l.env === env)) {
      const tries = attempts.filter((a) => a.env === env && cellOf(a) === cellOf(d) && a.incident === d.incident && a.variant === d.variant);
      const rerun = RERUN.filter((a) => a.env === env && a.version === d.version && a.browser === d.browser && a.incident === d.incident && a.variant === d.variant);
      dropped.push({
        incident: d.incident, environment: env, browser: d.browser || null, appVersion: d.version, nodeVersion: d.node || null, variant: d.variant,
        attempts: tries.map((a) => {
          const reports = a.requests.filter((r) => r.method === 'POST').length;
          return { attempt: a.attempt, outcome: a.outcome || v1Outcome(a, reports), reports, requests: a.requests.length, failure: a.failure || null, beforeClick: a.beforeClick || 0, pageErrors: a.pageErrors || [] };
        }),
        ...(rerun.length ? {
          rerunAttempts: rerun.map((a) => ({ attempt: a.attempt, outcome: a.outcome, postsReceived: a.postsReceived, requestsReceived: a.requestsReceived, pageSessionId: a.pageSessionId, msSincePreviousAttempt: a.msSincePreviousAttempt, msSincePreviousAttemptEnded: a.msSincePreviousAttemptEnded, triggerRaised: a.triggerRaised, startedAt: a.startedAt })),
        } : {}),
        investigation: INVESTIGATION[d.incident] || null,
      });
    }
  }
}

addFrom('browser-prod', ['browser-prod'], (l) => `${l.version}|${l.browser}`);
addFrom('browser-dev', ['browser-dev'], (l) => `${l.version}|${l.browser}`);
addFrom(NODE_LOGS, NODE_ENVS, (l) => `${l.version}|${l.node}`);

// Planned counts per environment and per incident.
const planned = {};
for (const env of BROWSER_ENVS) planned[env] = browserPlan(env).length;
for (const env of NODE_ENVS) planned[env] = nodePlan(env).length;
const plannedPerIncident = {};
for (const env of [...BROWSER_ENVS, ...NODE_ENVS]) {
  const plan = BROWSER_ENVS.includes(env) ? browserPlan(env) : nodePlan(env);
  for (const t of plan) {
    plannedPerIncident[env] ??= {};
    plannedPerIncident[env][t.incident] = (plannedPerIncident[env][t.incident] || 0) + 1;
  }
}

const incidents = {
  note: 'Ground truth: two reports are the same incident iff the same trigger fired them. Generated from harness/plan.mjs.',
  messageField: 'title',
  stackField: 'errorLog',
  browserEnvironments: BROWSER_ENVS,
  nodeEnvironments: NODE_ENVS,
  incidents: [
    ...BROWSER_INCIDENTS.map((i) => ({ id: i.id, kind: 'browser', origin: i.origin, defect: i.defect, hard: i.hard, variant: i.variant ? i.variant.type : null })),
    ...NODE_INCIDENTS.map((i) => ({ id: i.id, kind: 'node', origin: i.origin, defect: i.defect, hard: i.hard, variant: i.variant ? i.variant.type : null })),
  ],
  hardNegativePairs: HARD_NEGATIVE_PAIRS.map(([a, b, origin]) => ({ a, b, origin })),
  nodeHardNegativePairs: NODE_HARD_NEGATIVE_PAIRS.map(([a, b, origin]) => ({ a, b, origin })),
  planned,
  plannedPerIncident,
};

// Controls: seeded choice of 10 distinct browser reports.
const browserIds = meta.filter((m) => BROWSER_ENVS.includes(m.environment)).map((m) => m.id);
const rand = rng(CONTROL_SEED);
const pool = [...browserIds];
const picks = [];
while (picks.length < CONTROL_COUNT) picks.push(pool.splice(Math.floor(rand() * pool.length), 1)[0]);
const controls = {
  seed: CONTROL_SEED,
  method: 'mulberry32(seed); repeat 10 times: remove pool[floor(rand() * pool.length)], where pool is the browser report ids in id order',
  ids: picks,
};

const writeJsonl = (file, rows) => fs.writeFileSync(C(file), rows.map((r) => JSON.stringify(r)).join('\n') + '\n');
writeJsonl('reports.jsonl', reports);
writeJsonl('meta.jsonl', meta);
fs.writeFileSync(C('incidents.json'), JSON.stringify(incidents, null, 2) + '\n');
fs.writeFileSync(C('controls.json'), JSON.stringify(controls, null, 2) + '\n');
fs.writeFileSync(C('dropped.json'), JSON.stringify(dropped, null, 2) + '\n');
fs.copyFileSync(path.join(REPO, 'fixture', 'shopfront.v2.patch'), C('shopfront-v1-to-v2.diff'));
fs.copyFileSync(path.join(REPO, 'fixture', 'node-api.v2.patch'), C('node-api-v1-to-v2.diff'));

const byEnv = {};
for (const m of meta) byEnv[m.environment] = (byEnv[m.environment] || 0) + 1;
console.log('reports per environment:', byEnv, 'planned:', planned);
console.log('dropped:', dropped.length, dropped.map((d) => `${d.environment}/${d.appVersion}/${d.browser || 'node' + d.nodeVersion}/${d.incident}/${d.variant}`).join(', '));
const totalPlanned = Object.values(planned).reduce((a, b) => a + b, 0);
console.log(`missing: ${totalPlanned - meta.length} of ${totalPlanned} planned (${(((totalPlanned - meta.length) / totalPlanned) * 100).toFixed(1)}%)`);
console.log('controls:', picks.join(', '));
