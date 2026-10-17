// Controlled experiment for the B1-B3 investigation (not corpus).
//
//   node diagnostics/b-cases.mjs <chromium|firefox|webkit>
//
// Serves the diagnostic app (diagnostics/b-app) four ways:
//   devserver   Vite dev server (React development build, unminified modules)
//   devbuild    bundled React development build, unminified (NODE_ENV=development)
//   prod-unmin  bundled React production build, unminified
//   prod-min    bundled React production build, minified (as browser-prod)
// and for each: boundary+captureError, boundary without captureError, no
// boundary; each with and without the SDK tag; each in a fresh context.
// Records the reports that reach the capture server and what the page saw:
// window `error` events (listener registered before any page script),
// componentDidCatch calls, and console errors.
// Output: appended to diagnostics/b-cases.jsonl
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { chromium, firefox, webkit } from 'playwright';
import { startCaptureServer } from '../harness/capture-server.mjs';
import { waitForHttp } from '../harness/services.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const APP = path.join(HERE, 'b-app');
const OUT = path.join(HERE, 'b-cases.jsonl');
const engineName = process.argv[2];
const engine = { chromium, firefox, webkit }[engineName];
if (!engine) throw new Error('usage: node diagnostics/b-cases.mjs <chromium|firefox|webkit>');

function staticServer(dir, port) {
  const types = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css' };
  const s = http.createServer((req, res) => {
    const p = new URL(req.url, 'http://x').pathname;
    const file = path.join(dir, p === '/' ? 'index.html' : p);
    if (!file.startsWith(dir) || !fs.existsSync(file)) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
    res.end(fs.readFileSync(file));
  });
  return new Promise((r) => s.listen(port, '127.0.0.1', () => r({ origin: `http://localhost:${port}`, close: () => new Promise((x) => s.close(x)) })));
}

const servers = {};
const dev = spawn(process.execPath, [path.join(APP, 'node_modules', 'vite', 'bin', 'vite.js'), '--port', '7170', '--strictPort'], { cwd: APP, stdio: 'ignore' });
await waitForHttp('http://localhost:7170/');
servers.devserver = { origin: 'http://localhost:7170' };
servers.devbuild = await staticServer(path.join(APP, 'dist-devbuild'), 7171);
servers['prod-unmin'] = await staticServer(path.join(APP, 'dist-prod-unmin'), 7172);
servers['prod-min'] = await staticServer(path.join(APP, 'dist-prod-min'), 7173);

const cap = await startCaptureServer({ port: 7102 });
const browser = await engine.launch();
// Warm-up for the dev server's dependency optimisation.
{ const c = await browser.newContext(); const p = await c.newPage(); await p.goto('http://localhost:7170/nosdk.html'); await p.waitForTimeout(2000); await c.close(); }

const CONFIGS = [
  { boundary: 1, capture: 1, label: 'boundary + captureError' },
  { boundary: 1, capture: 0, label: 'boundary, no captureError' },
  { boundary: 0, capture: 0, label: 'no boundary' },
];
for (const [build, srv] of Object.entries(servers)) {
  for (const cfg of CONFIGS) {
    for (const sdk of [1, 0]) {
      const ctx = await browser.newContext();
      await ctx.addInitScript(() => {
        window.__errorEvents = [];
        window.addEventListener('error', (e) => window.__errorEvents.push(String(e.message).slice(0, 160)), true);
      });
      const page = await ctx.newPage();
      const consoleErrors = [];
      const pageErrors = [];
      page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 100)); });
      page.on('pageerror', (e) => pageErrors.push(String(e.message).slice(0, 120)));
      await page.goto(`${srv.origin}/${sdk ? 'index.html' : 'nosdk.html'}?boundary=${cfg.boundary}&capture=${cfg.capture}`, { waitUntil: 'load' });
      await page.waitForFunction(() => document.body.dataset.ready === '1');
      await page.waitForTimeout(300);
      const before = cap.lastSeq;
      await page.click('#go');
      await page.waitForTimeout(3000);
      const errorEvents = await page.evaluate(() => window.__errorEvents);
      const didCatch = await page.evaluate(() => window.__didCatch);
      await ctx.close();
      await new Promise((r) => setTimeout(r, 400));
      const posts = cap.since(before).filter((r) => r.method === 'POST');
      const reports = posts.map((r) => {
        const b = JSON.parse(Buffer.from(r.bodyBase64, 'base64').toString('utf8'));
        return {
          titleStart: String(b.title).slice(0, 90),
          titleIsComponentStack: /^\s*\n?\s*(at |\w+@)/.test(String(b.title)) || String(b.title).startsWith('\n'),
          hasDescription: 'description' in b,
          errorLogFirstLine: String(b.errorLog).split('\n')[0].slice(0, 90),
          errorLogFrameNames: String(b.errorLog).split('\n').slice(1).map((l) => (l.trim().match(/^at ([^\s(]+)/) || l.trim().match(/^([^@]*)@/) || [])[1] || '').slice(0, 12),
          breadcrumbCategories: (b.breadcrumbs || []).map((c) => c.category),
        };
      });
      const row = { engine: engineName, engineVersion: browser.version(), build, ...cfg, sdk: Boolean(sdk), reportsReceived: posts.length, windowErrorEvents: errorEvents, componentDidCatchCalls: didCatch, pageErrors, consoleErrors, reports };
      fs.appendFileSync(OUT, JSON.stringify(row) + '\n');
      console.log(`${engineName} ${build.padEnd(10)} ${cfg.label.padEnd(26)} sdk=${sdk}: reports=${posts.length} windowErrorEvents=${errorEvents.length} didCatch=${didCatch} kinds=${reports.map((r) => (r.titleIsComponentStack ? 'captureError-shape' : 'uncaught-shape')).join('+') || '-'}`);
    }
  }
}
await browser.close();
await cap.close();
for (const s of Object.values(servers)) if (s.close) await s.close();
dev.kill();
