// Controlled diagnostic pages for the C4-C6 investigation. NOT corpus reports:
// nothing here goes into corpus/. Output: diagnostics/fetch-cases.jsonl.
//
//   node diagnostics/fetch-cases.mjs
//
// Each case runs twice per engine, each time in a fresh browser context:
//   - "count" run: the page does exactly what the case says; the harness counts
//     the requests that reach the capture server, and records what the page's
//     own listeners (registered before any page script, so before the SDK) and
//     Playwright's pageerror saw;
//   - "observe" run (cases b, g, h only): the same error is caught so its
//     `stack` can be read as the page sees it. Cases a, c, d, e and f read the
//     stack in the count run itself, before the error is rejected or thrown.
// Every case is run with the SDK script tag and without it.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium, firefox, webkit } from 'playwright';
import { startCaptureServer } from '../harness/capture-server.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, 'fetch-cases.jsonl');
const PORT = 7160;
const SDK_TAG = '<script src="http://localhost:8090/sdk/bugsense.js" data-api-url="http://localhost:7102" data-project="Fingerprint Eval" data-widget="false"></script>';

// Case code runs from a click handler defined in an inline page script.
// `record(x)` stores a value for the harness; `closed` is a port with nothing listening.
const CASES = {
  a: { what: "Promise.reject(new TypeError('Failed to fetch')) created in page code", code: `
    const e = new TypeError('Failed to fetch'); record({ stack: e.stack }); Promise.reject(e);` },
  b: { what: 'real fetch() to a closed port, rejection unhandled', code: `
    fetch('http://localhost:7199/diag-b');`,
    observe: `fetch('http://localhost:7199/diag-b').catch((e) => record({ stack: e.stack, name: e.name, message: e.message }));` },
  c: { what: 'real fetch() to a closed port, caught and passed to BugSense.captureError', code: `
    fetch('http://localhost:7199/diag-c').catch((e) => { record({ stack: e.stack }); if (window.BugSense) window.BugSense.captureError(e); else record({ note: 'no BugSense global' }); });` },
  d: { what: "real fetch rejection caught and swallowed, then an unrelated throw new Error('after')", code: `
    fetch('http://localhost:7199/diag-d').catch((e) => { record({ swallowedStack: e.stack }); setTimeout(() => { const a = new Error('after'); record({ stack: a.stack }); throw a; }, 0); });` },
  e: { what: "hand-made Error whose stack is only 'TypeError: Failed to fetch', rejected unhandled", code: `
    const e = new TypeError('Failed to fetch'); e.stack = 'TypeError: Failed to fetch'; record({ stack: e.stack }); Promise.reject(e);` },
  f: { what: 'the same hand-made Error, thrown synchronously', code: `
    const e = new TypeError('Failed to fetch'); e.stack = 'TypeError: Failed to fetch'; record({ stack: e.stack }); throw e;` },
  g: { what: 'res.json() on an HTML 500 page (same origin), rejection unhandled', code: `
    (async () => { const r = await fetch('/html500'); return r.json(); })();`,
    observe: `(async () => { const r = await fetch('/html500'); try { await r.json(); } catch (e) { record({ stack: e.stack, name: e.name, message: e.message }); } })();` },
  h: { what: 'real fetch() to a closed port awaited inside an async function, rejection unhandled (C4 shape)', code: `
    (async () => { const r = await fetch('http://localhost:7199/diag-h', { method: 'POST', body: '{}' }); return r.ok; })();`,
    observe: `(async () => { try { await fetch('http://localhost:7199/diag-h', { method: 'POST', body: '{}' }); } catch (e) { record({ stack: e.stack, name: e.name, message: e.message }); } })();` },
};

function page(sdk, body) {
  return `<!doctype html><html><head><meta charset="utf-8">${sdk ? SDK_TAG : ''}</head><body>
<button id="go">go</button>
<script>
window.__records = [];
function record(x) { window.__records.push(x); }
document.getElementById('go').addEventListener('click', function () {${body}
});
</script></body></html>`;
}

const site = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  if (url.pathname === '/html500') { res.writeHead(500, { 'Content-Type': 'text/html' }); return res.end('<!DOCTYPE html><html><body><h1>Internal Server Error</h1></body></html>'); }
  const m = url.pathname.match(/^\/case\/([a-h])$/);
  if (!m) { res.writeHead(404); return res.end(); }
  const c = CASES[m[1]];
  const body = url.searchParams.get('mode') === 'observe' ? c.observe : c.code;
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(page(url.searchParams.get('sdk') === '1', body));
}).listen(PORT, '127.0.0.1');

const cap = await startCaptureServer({ port: 7102 });
fs.writeFileSync(OUT, '');
const engines = { chromium, firefox, webkit };
for (const [engineName, engine] of Object.entries(engines)) {
  const browser = await engine.launch();
  for (const [id, c] of Object.entries(CASES)) {
    for (const sdk of [1, 0]) {
      for (const mode of c.observe ? ['count', 'observe'] : ['count']) {
        const ctx = await browser.newContext();
        await ctx.addInitScript(() => {
          window.__events = [];
          const msg = (x) => { try { return String(x && x.message !== undefined ? x.message : x).slice(0, 200); } catch { return '?'; } };
          window.addEventListener('error', (e) => window.__events.push({ type: 'error', message: msg(e.message || e.error), filename: e.filename || null }), true);
          window.addEventListener('unhandledrejection', (e) => window.__events.push({ type: 'unhandledrejection', message: msg(e.reason) }));
        });
        const p = await ctx.newPage();
        const pageErrors = [];
        p.on('pageerror', (e) => pageErrors.push(String(e.message).slice(0, 200)));
        await p.goto(`http://localhost:${PORT}/case/${id}?sdk=${sdk}&mode=${mode}`, { waitUntil: 'load' });
        await p.waitForTimeout(500);
        const before = cap.lastSeq;
        await p.click('#go');
        await p.waitForTimeout(3500);
        const records = await p.evaluate(() => window.__records);
        const events = await p.evaluate(() => window.__events);
        await ctx.close();
        await new Promise((r) => setTimeout(r, 400));
        const reqs = cap.since(before);
        const posts = reqs.filter((r) => r.method === 'POST');
        const bodies = posts.map((r) => { try { const b = JSON.parse(Buffer.from(r.bodyBase64, 'base64').toString('utf8')); return { title: b.title, errorLog: b.errorLog }; } catch { return { unparsable: true }; } });
        const row = { engine: engineName, engineVersion: browser.version(), case: id, what: c.what, sdk: Boolean(sdk), mode, reportsReceived: posts.length, requestsReceived: reqs.length, pageRecords: records, pageEvents: events, playwrightPageErrors: pageErrors, reports: bodies };
        fs.appendFileSync(OUT, JSON.stringify(row) + '\n');
        console.log(`${engineName} ${id} sdk=${sdk} ${mode}: reports=${posts.length} requests=${reqs.length} events=${events.map((e) => e.type).join('+') || '-'} pageerror=${pageErrors.length}`);
      }
    }
  }
  await browser.close();
}
site.close();
await cap.close();
