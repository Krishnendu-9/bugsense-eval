// Investigation re-runs (not corpus captures). Re-fires chosen incidents in
// one environment x app version x browser with the instrumented trigger
// (harness/trigger-instrumented.mjs) and writes every attempt to
// diagnostics/rerun/<label>/<env>-<version>-<browser>.jsonl.
//
//   node harness/capture-rerun.mjs --label C4-C6 --incidents C4,C5,C6 --env browser-prod --version v1 --browser chromium
//
// Every attempt record states postsReceived, requestsReceived, outcome
// (ok | zero_reports | multiple_reports | report_before_click |
// trigger_failed | harness_error), pageSessionId (one per browser context),
// msSincePreviousAttempt (start to start, same trigger and cell) and
// msSincePreviousAttemptEnded. Retries use a fresh context and start at least
// 11 s after the previous attempt of the same trigger ended. For C4-C6 it also
// records endpoint reachability before the click and right after the page's
// failure, and the harness posts a marker to the capture server before and
// after every attempt (from Node, and from a separate fresh browser context).
import fs from 'node:fs';
import net from 'node:net';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { chromium, firefox, webkit } from 'playwright';
import { startCaptureServer } from './capture-server.mjs';
import { startCdnOrigin, startVite, REPO, waitForHttp, MOCK_CONTAINER } from './services.mjs';
import { browserPlan } from './plan.mjs';
import { runTrigger, MARKER_PATH } from './trigger-instrumented.mjs';
import { appDir } from './build-fixture.mjs';

const args = Object.fromEntries(process.argv.slice(2).reduce((a, v, i, all) => (v.startsWith('--') ? [...a, [v.slice(2), all[i + 1]]] : a), []));
for (const k of ['label', 'incidents', 'env', 'version', 'browser']) if (!args[k]) throw new Error(`--${k} is required`);
const INCIDENTS = args.incidents.split(',');
const MAX_ATTEMPTS = Number(args.attempts || 4);
const RETRY_GAP_MS = 11000;
const ENGINES = { chromium, firefox, webkit };

const commit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: REPO, encoding: 'utf8' }).trim();
const dirty = execFileSync('git', ['status', '--porcelain', '--', 'fixture', 'harness'], { cwd: REPO, encoding: 'utf8' }).trim();
if (dirty) throw new Error(`fixture/harness has uncommitted changes:\n${dirty}`);

const outDir = path.join(REPO, 'diagnostics', 'rerun', args.label);
fs.mkdirSync(outDir, { recursive: true });
const logFile = path.join(outDir, `${args.env}-${args.version}-${args.browser}.jsonl`);
fs.writeFileSync(logFile, '');
const log = (o) => fs.appendFileSync(logFile, JSON.stringify(o) + '\n');

// ---- reachability probes ----
function tcp(host, port) {
  return new Promise((resolve) => {
    const s = net.connect({ host, port });
    const done = (r) => { s.destroy(); resolve(r); };
    s.setTimeout(1500, () => done('timeout'));
    s.once('connect', () => done('connected'));
    s.once('error', (e) => done(e.code || 'error'));
  });
}
async function httpProbe(url) {
  try {
    const res = await fetch(url);
    const text = await res.text();
    return { status: res.status, contentType: res.headers.get('content-type'), bodyStartsWith: text.slice(0, 15) };
  } catch (e) {
    return { error: String(e.cause?.code || e.message) };
  }
}
function mockContainerStatus() {
  try {
    return execFileSync('docker', ['ps', '-a', '--filter', `name=^${MOCK_CONTAINER}$`, '--format', '{{.Status}} started={{.RunningFor}}'], { encoding: 'utf8' }).trim();
  } catch (e) {
    return `docker error: ${e.message}`;
  }
}
function probesFor(incident, origin) {
  const closedPort = { C4: 7199, C5: 7198 }[incident];
  if (closedPort) {
    const probe = async () => ({ at: new Date().toISOString(), [`127.0.0.1:${closedPort}`]: await tcp('127.0.0.1', closedPort), [`[::1]:${closedPort}`]: await tcp('::1', closedPort) });
    return { beforeClick: probe, afterError: probe };
  }
  if (incident === 'C6') {
    const probe = async () => ({ at: new Date().toISOString(), mockDirect: await httpProbe('http://localhost:7103/api/orders/history'), viaAppOrigin: await httpProbe(`${origin}/api/orders/history`), mockContainer: mockContainerStatus() });
    return { beforeClick: probe, afterError: probe };
  }
  return null;
}
const EVIDENCE = {
  C4: { requestFailed: 'http://localhost:7199/collect' },
  C5: { requestFailed: 'http://localhost:7198/upload' },
  C6: { response: { path: '/api/orders/history', status: 500 } },
};

// ---- capture-server markers ----
async function nodeMarker(cap, tag) {
  const before = cap.lastSeq;
  let status = null;
  try { status = (await fetch(`http://localhost:7102${MARKER_PATH}?from=node&tag=${encodeURIComponent(tag)}`, { method: 'POST', body: tag })).status; } catch (e) { status = String(e.message); }
  return { tag, status, recorded: cap.since(before).some((r) => r.url.startsWith(MARKER_PATH) && r.url.includes(encodeURIComponent(tag))) };
}
async function browserMarker(browser, cap, tag) {
  const before = cap.lastSeq;
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  let result;
  try {
    result = await page.evaluate(async (u) => { try { const r = await fetch(u, { mode: 'no-cors' }); return { type: r.type }; } catch (e) { return { error: String(e.message) }; } }, `http://localhost:7102${MARKER_PATH}?from=browser&tag=${encodeURIComponent(tag)}`);
  } catch (e) {
    result = { error: String(e.message).split('\n')[0] };
  }
  await ctx.close();
  return { tag, ...result, recorded: cap.since(before).some((r) => r.url.startsWith(MARKER_PATH) && r.url.includes(encodeURIComponent(tag))) };
}

// ---- run ----
await waitForHttp('http://localhost:7103/health', 5000);
const cap = await startCaptureServer({ port: 7102 });
const dir = appDir('shopfront', args.version);
const server = await startVite(dir, args.env === 'browser-prod' ? 'preview' : 'dev');
const cdn = await startCdnOrigin(path.join(dir, 'cdn'));
const browser = await ENGINES[args.browser].launch();
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.goto(server.origin + '/', { waitUntil: 'load' });
  await page.waitForTimeout(1500);
  await ctx.close();
}
const plan = browserPlan(args.env).filter((t) => t.version === args.version && t.browser === args.browser && INCIDENTS.includes(t.incident));
for (const t of plan) {
  let previousStart = null;
  let previousEnd = null;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    if (previousEnd !== null) {
      const wait = previousEnd + RETRY_GAP_MS - Date.now();
      if (wait > 0) await new Promise((r) => setTimeout(r, wait));
    }
    const startedAt = Date.now();
    const tag = `${args.env}/${args.version}/${args.browser}/${t.incident}/${t.variant}/a${attempt}`;
    const markerBefore = await nodeMarker(cap, `${tag}/before`);
    const r = await runTrigger(browser, cap, server.origin, t, { probes: probesFor(t.incident, server.origin), evidence: EVIDENCE[t.incident] || null });
    const markerAfter = await nodeMarker(cap, `${tag}/after`);
    const markerBrowser = await browserMarker(browser, cap, `${tag}/browser`);
    log({
      kind: 'attempt', label: args.label, env: args.env, version: args.version, browser: args.browser, browserVersion: browser.version(),
      incident: t.incident, variant: t.variant, attempt, outcome: r.outcome, ok: r.outcome === 'ok',
      postsReceived: r.postsReceived, requestsReceived: r.requestsReceived, pageSessionId: r.pageSessionId,
      msSincePreviousAttempt: previousStart === null ? null : startedAt - previousStart,
      msSincePreviousAttemptEnded: previousEnd === null ? null : startedAt - previousEnd,
      startedAt: new Date(startedAt).toISOString(), triggerRaised: r.triggerRaised, raised: r.raised, reachability: r.reachability,
      captureServer: { markerBefore, markerAfter, markerBrowser }, failure: r.failure, fixtureCommit: commit,
      trigger: { route: t.route, selector: t.selector, locale: t.locale, data: t.data },
      requests: r.records.map(({ seq, receivedAt, method, url, headers, bodyBase64 }) => ({ seq, receivedAt, method, url, headers, bodyBase64 })),
    });
    console.log(`${tag}: ${r.outcome} (posts ${r.postsReceived}, requests ${r.requestsReceived}, raised ${r.triggerRaised}, markers ${markerBefore.recorded}/${markerAfter.recorded}/${markerBrowser.recorded})`);
    previousStart = startedAt;
    previousEnd = r.endedAt;
    if (r.outcome === 'ok' && !args['all-attempts']) break;
  }
}
await browser.close();
await cdn.close();
await server.close();
await cap.close();
