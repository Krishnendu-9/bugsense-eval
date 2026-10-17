// Captures the browser corpus for one environment (DESIGN.md section 1).
//
//   node harness/capture-browser.mjs --env browser-prod|browser-dev
//
// Preconditions: harness/build-fixture.mjs shopfront has run, and the mock
// backend container is up (node harness/services-cli.mjs up).
//
// For every planned trigger: fresh browser context, click, collect what the SDK
// sent. Exactly one report is required. A run with no report, more than one,
// a report before the click, or a harness failure is retried up to three
// times; if it still fails it is dropped and listed. Every attempt and every
// request is written to corpus/capture-log/<env>.jsonl.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { chromium, firefox, webkit } from 'playwright';
import { startCaptureServer } from './capture-server.mjs';
import { startCdnOrigin, startVite, REPO, waitForHttp } from './services.mjs';
import { browserPlan, APP_VERSIONS, BROWSERS } from './plan.mjs';
import { runTrigger } from './trigger.mjs';
import { appDir } from './build-fixture.mjs';

const args = Object.fromEntries(process.argv.slice(2).reduce((a, v, i, all) => (v.startsWith('--') ? [...a, [v.slice(2), all[i + 1]]] : a), []));
const ENV = args.env;
if (!['browser-prod', 'browser-dev'].includes(ENV)) throw new Error('--env browser-prod|browser-dev');
const MAX_ATTEMPTS = 4; // first try + three retries
const ENGINES = { chromium, firefox, webkit };

const commit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: REPO, encoding: 'utf8' }).trim();
const dirty = execFileSync('git', ['status', '--porcelain', '--', 'fixture', 'harness'], { cwd: REPO, encoding: 'utf8' }).trim();
if (dirty && !args['allow-dirty']) throw new Error(`fixture/harness has uncommitted changes:\n${dirty}`);

const logDir = path.join(REPO, 'corpus', 'capture-log');
fs.mkdirSync(logDir, { recursive: true });
const logFile = path.join(logDir, `${ENV}.jsonl`);
fs.writeFileSync(logFile, '');
const log = (obj) => fs.appendFileSync(logFile, JSON.stringify(obj) + '\n');

await waitForHttp('http://localhost:7103/health', 5000);
const cap = await startCaptureServer({ port: 7102 });
const plan = browserPlan(ENV);
const versions = { playwright: JSON.parse(fs.readFileSync(path.join(REPO, 'node_modules', 'playwright', 'package.json'), 'utf8')).version, browsers: {} };
let accepted = 0;
let dropped = 0;

for (const version of APP_VERSIONS) {
  const dir = appDir('shopfront', version);
  const server = await startVite(dir, ENV === 'browser-prod' ? 'preview' : 'dev');
  const cdn = await startCdnOrigin(path.join(dir, 'cdn'));
  for (const browserName of BROWSERS) {
    const browser = await ENGINES[browserName].launch();
    versions.browsers[browserName] = browser.version();
    // Warm-up page load (the dev server optimises dependencies on first use).
    {
      const before = cap.lastSeq;
      const ctx = await browser.newContext();
      const page = await ctx.newPage();
      await page.goto(server.origin + '/', { waitUntil: 'load' });
      await page.waitForTimeout(1500);
      await ctx.close();
      const stray = cap.since(before).filter((r) => r.method === 'POST').length;
      if (stray) throw new Error('report captured during warm-up');
    }
    for (const t of plan.filter((p) => p.version === version && p.browser === browserName)) {
      let outcome = null;
      for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
        const r = await runTrigger(browser, cap, server.origin, t);
        const ok = !r.failure && r.posts.length === 1 && r.beforeClick === 0;
        log({
          kind: 'attempt', env: ENV, version, browser: browserName, browserVersion: browser.version(), incident: t.incident, variant: t.variant,
          trigger: { route: t.route, selector: t.selector, locale: t.locale, data: t.data }, attempt, ok,
          failure: r.failure, beforeClick: r.beforeClick, pageErrors: r.pageErrors, fixtureCommit: commit,
          requests: r.records.map(({ seq, receivedAt, method, url, headers, bodyBase64 }) => ({ seq, receivedAt, method, url, headers, bodyBase64 })),
        });
        if (ok) { outcome = { attempt, post: r.posts[0] }; break; }
      }
      if (outcome) {
        accepted++;
        log({ kind: 'accepted', env: ENV, version, browser: browserName, browserVersion: browser.version(), incident: t.incident, variant: t.variant, attempt: outcome.attempt, seq: outcome.post.seq, receivedAt: outcome.post.receivedAt });
        console.log(`${ENV} ${version} ${browserName} ${t.incident}/${t.variant}: ok (attempt ${outcome.attempt})`);
      } else {
        dropped++;
        log({ kind: 'dropped', env: ENV, version, browser: browserName, browserVersion: browser.version(), incident: t.incident, variant: t.variant, attempts: MAX_ATTEMPTS });
        console.log(`${ENV} ${version} ${browserName} ${t.incident}/${t.variant}: DROPPED after ${MAX_ATTEMPTS} attempts`);
      }
    }
    await browser.close();
  }
  await cdn.close();
  await server.close();
}
log({ kind: 'summary', env: ENV, planned: plan.length, accepted, dropped, fixtureCommit: commit, versions, finishedAt: new Date().toISOString() });
console.log(`${ENV}: planned ${plan.length}, accepted ${accepted}, dropped ${dropped}`);
await cap.close();
