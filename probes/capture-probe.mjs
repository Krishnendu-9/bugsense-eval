// Capture one throwaway (non-corpus) SDK report for API probing.
import http from 'node:http';
import fs from 'node:fs';
import { chromium } from 'playwright';
import { startCaptureServer, bodyText } from '../harness/capture-server.mjs';
const cap = await startCaptureServer({ port: 7102 });
const page = `<!doctype html><html><head><meta charset="utf-8">
<script src="http://localhost:8090/sdk/bugsense.js" data-api-url="http://localhost:7102" data-project="Fingerprint Eval" data-widget="false"></script>
</head><body><button id="go" onclick="probeThrowaway()">go</button>
<script>function probeThrowaway(){ throw new Error('eval probe throwaway report, not part of the corpus'); }</script></body></html>`;
const site = http.createServer((q, s) => { s.writeHead(200, {'Content-Type':'text/html'}); s.end(page); }).listen(7110);
const browser = await chromium.launch();
const ctx = await browser.newContext();
const p = await ctx.newPage();
await p.goto('http://localhost:7110/probe');
await p.waitForTimeout(800);
await p.click('#go');
await p.waitForTimeout(2500);
await ctx.close();
const posts = cap.records.filter(r => r.method === 'POST');
fs.writeFileSync('scratch/probe-capture.json', JSON.stringify(posts, null, 1));
console.log('captured POSTs:', posts.length, posts.map(r => r.url));
await browser.close(); site.close(); await cap.close();
