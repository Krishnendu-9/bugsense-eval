// Controlled experiment for the C4-C6 investigation, with NO BugSense SDK on
// the page. Tests whether Chromium withholds the unhandledrejection event
// when the rejected error was raised inside a cross-origin script, using a
// fetch wrapper written for this test (diagnostics, not corpus).
// Output: diagnostics/cross-origin-cases.jsonl
//
//   node diagnostics/cross-origin-cases.mjs
//
// Pages (port 7160) load http://localhost:7161/wrap.js, which replaces
// window.fetch with function (u, o) { return origFetch(u, o); } and defines
// window.makeError() returning new TypeError('made in wrap.js').
//   i: wrap.js without CORS, no crossorigin attribute; real fetch to a closed port, unhandled
//   j: wrap.js with crossorigin="anonymous" and Access-Control-Allow-Origin; same fetch
//   k: wrap.js without CORS; Promise.reject(window.makeError()) from page code
//   l: wrap.js with CORS; Promise.reject(window.makeError()) from page code
//   m: wrap.js without CORS; window.makeError() thrown synchronously from page code
//   io, jo: observe runs for i and j (the fetch error is caught so its stack can be read)
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium, firefox, webkit } from 'playwright';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, 'cross-origin-cases.jsonl');
const WRAP = `(function () {
  var origFetch = window.fetch;
  window.fetch = function (u, o) { return origFetch(u, o); };
  window.makeError = function () { return new TypeError('made in wrap.js'); };
})();`;

const CASES = {
  i: { cors: false, code: "fetch('http://localhost:7199/diag-i');", what: 'own fetch wrapper in a no-CORS cross-origin script; fetch to a closed port, unhandled' },
  j: { cors: true, code: "fetch('http://localhost:7199/diag-j');", what: 'the same wrapper loaded with crossorigin=anonymous and CORS headers' },
  io: { cors: false, code: "fetch('http://localhost:7199/diag-io').catch(function (e) { window.__records.push(e.stack); });", what: 'observe run for i: the error is caught so its stack can be read' },
  jo: { cors: true, code: "fetch('http://localhost:7199/diag-jo').catch(function (e) { window.__records.push(e.stack); });", what: 'observe run for j' },
  k: { cors: false, code: 'Promise.reject(window.makeError());', what: 'Error created by a no-CORS cross-origin script, rejected unhandled from page code' },
  l: { cors: true, code: 'Promise.reject(window.makeError());', what: 'the same with the script loaded with CORS' },
  m: { cors: false, code: 'throw window.makeError();', what: 'Error created by a no-CORS cross-origin script, thrown synchronously from page code' },
};

const pageSrv = http.createServer((req, res) => {
  const id = new URL(req.url, 'http://x').pathname.split('/').pop();
  const c = CASES[id];
  if (!c) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`<!doctype html><html><head><script src="http://localhost:7161/wrap.js${c.cors ? '?cors=1' : ''}"${c.cors ? ' crossorigin="anonymous"' : ''}></script></head><body>
<button id="go">go</button><script>
window.__records = [];
document.getElementById('go').addEventListener('click', function () {
  ${c.code}
});
</script></body></html>`);
}).listen(7160, '127.0.0.1');
const xoSrv = http.createServer((req, res) => {
  const cors = new URL(req.url, 'http://x').searchParams.get('cors') === '1';
  res.writeHead(200, { 'Content-Type': 'application/javascript', ...(cors ? { 'Access-Control-Allow-Origin': '*' } : {}) });
  res.end(WRAP);
}).listen(7161, '127.0.0.1');

fs.writeFileSync(OUT, '');
for (const [name, engine] of Object.entries({ chromium, firefox, webkit })) {
  const browser = await engine.launch();
  for (const [id, c] of Object.entries(CASES)) {
    const ctx = await browser.newContext();
    await ctx.addInitScript(() => {
      window.__events = [];
      window.addEventListener('error', (e) => window.__events.push({ type: 'error', message: String(e.message).slice(0, 200) }), true);
      window.addEventListener('unhandledrejection', (e) => window.__events.push({ type: 'unhandledrejection', message: String(e.reason && e.reason.message).slice(0, 200) }));
    });
    const p = await ctx.newPage();
    const pageErrors = [];
    p.on('pageerror', (e) => pageErrors.push(String(e.message).slice(0, 200)));
    await p.goto(`http://localhost:7160/case/${id}`, { waitUntil: 'load' });
    await p.waitForTimeout(300);
    await p.click('#go');
    await p.waitForTimeout(3500);
    const events = await p.evaluate(() => window.__events);
    const stacks = await p.evaluate(() => window.__records);
    await ctx.close();
    const row = { engine: name, engineVersion: browser.version(), case: id, what: c.what, pageEvents: events, playwrightPageErrors: pageErrors, stackSeenByPage: stacks };
    fs.appendFileSync(OUT, JSON.stringify(row) + '\n');
    console.log(`${name} ${id}: events=${events.map((e) => `${e.type}(${e.message})`).join(' + ') || '-'} pageerror=${pageErrors.length} stack=${JSON.stringify(stacks[0] || '').slice(0, 140)}`);
  }
  await browser.close();
}
pageSrv.close();
xoSrv.close();
