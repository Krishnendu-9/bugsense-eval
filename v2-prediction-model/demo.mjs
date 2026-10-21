// Runs the real SDK 1.4.0 in Playwright's Chromium, Firefox and WebKit against
// one deliberate crash, and prints what it posts, plus the v2 key the server
// would compute. A local server serves the page and the SDK and records the
// report bodies; nothing is forwarded anywhere.
import http from 'node:http';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

const REPO = 'E:/professional/Projects/bugsense';
const { chromium, firefox, webkit } = await import(pathToFileURL('E:/professional/Projects/bugsense-eval/node_modules/playwright/index.mjs').href);
const { buildKeyV2 } = await import(pathToFileURL(`${REPO}/server/utils/fingerprint.util.js`).href);
const SDK = fs.readFileSync(`${REPO}/server/public/sdk/bugsense.js`, 'utf8');

const APP = `
function formatPrice(product) { return '$' + product.price.toFixed(2); }
function renderCartLine(product) { return '<li>' + formatPrice(product) + '</li>'; }
document.getElementById('go').addEventListener('click', function onAddToCart() {
  document.getElementById('cart').innerHTML = renderCartLine(undefined);
});`;

let received = [];
const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/api/telemetry/report') {
    let body = '';
    req.on('data', (c) => (body += c)).on('end', () => {
      received.push(JSON.parse(body));
      res.writeHead(201, { 'Content-Type': 'application/json' }).end('{}');
    });
    return;
  }
  const port = server.address().port;
  const pages = {
    '/shop/cart?coupon=SAVE10': null,
    '/sdk/bugsense.js': ['text/javascript', SDK],
    '/app.js': ['text/javascript', APP],
  };
  if (req.url.startsWith('/shop/cart')) {
    res.writeHead(200, { 'Content-Type': 'text/html' }).end(`<!doctype html><button id="go">Add to cart</button><ul id="cart"></ul>
<script src="/sdk/bugsense.js" data-api-url="http://127.0.0.1:${port}" data-project="Demo Shop" data-widget="false"></script>
<script src="/app.js"></script>`);
  } else if (pages[req.url]) {
    res.writeHead(200, { 'Content-Type': pages[req.url][0] }).end(pages[req.url][1]);
  } else {
    res.writeHead(404).end();
  }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;

const results = {};
for (const [name, type] of [['chromium', chromium], ['firefox', firefox], ['webkit', webkit]]) {
  received = [];
  const browser = await type.launch();
  const page = await (await browser.newContext()).newPage();
  await page.goto(`${base}/shop/cart?coupon=SAVE10`);
  await page.click('#go');
  for (let i = 0; i < 50 && !received.length; i++) await page.waitForTimeout(100);
  results[name] = { version: browser.version(), payload: received[0] || null };
  await browser.close();
}
server.close();

for (const [name, { version, payload }] of Object.entries(results)) {
  if (!payload) { console.log(`\n=== ${name} ${version}: NO REPORT`); continue; }
  const { breadcrumbs, browserInfo, ...rest } = payload;
  console.log(`\n=== ${name} ${version}`);
  console.log(JSON.stringify({ ...rest, breadcrumbs: breadcrumbs.map((b) => `${b.category}: ${b.message}`), browserInfo: { browser: browserInfo.browser } }, null, 2));
  console.log('v2 key:', buildKeyV2(payload));
}
