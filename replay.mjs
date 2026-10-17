#!/usr/bin/env node
// Replays the frozen corpus against a running BugSense stack and records,
// for every report, the bug it landed on. DESIGN.md section 5, "How the
// decision is read", steps 1, 3 and 4. Step 2 (probes) was done once by the
// builder (HANDOFF.md); steps "fresh volume, seed" and step 5 (second run on a
// fresh volume with another seed) are the operator's.
//
//   node replay.mjs --base http://localhost:8090 --seed 1 --out runs/run-seed1.jsonl
//
// Options:
//   --corpus <dir>              corpus directory (default: ./corpus next to this file)
//   --email / --password        login used to list bugs (default: the seeded admin)
//   --interval-ms <n>           minimum gap between telemetry posts (default 1100, about 55/min)
//
// How the landing bug is read (worked out from the probes): the telemetry
// endpoint answers 201 when it opens a bug and 200 when it adds to one, and
// the JSON body carries `bugId`. Only `bugId`, the HTTP status and
// `occurrences` are recorded; no other field of any response is stored.
//
// Output: JSON lines. One header, one record per send (corpus reports in
// replay order, then the controls), one footer.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const args = {};
for (let i = 2; i < process.argv.length; i++) {
  const a = process.argv[i];
  if (a.startsWith('--')) args[a.slice(2)] = process.argv[i + 1] && !process.argv[i + 1].startsWith('--') ? process.argv[++i] : true;
}
if (!args.base || args.seed === undefined || !args.out) {
  console.error('usage: node replay.mjs --base <url> --seed <n> --out <file>');
  process.exit(2);
}
const BASE = String(args.base).replace(/\/+$/, '');
const SEED = Number(args.seed);
if (!Number.isInteger(SEED)) throw new Error('--seed must be an integer');
const CORPUS = path.resolve(args.corpus || path.join(HERE, 'corpus'));
const EMAIL = args.email || 'admin@bugsense.dev';
const PASSWORD = args.password || 'password123';
const INTERVAL_MS = Number(args['interval-ms'] || 1100);
const MAX_429_RETRIES = 30;
const MAX_OTHER_RETRIES = 3;

// mulberry32
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
function shuffled(items, seed) {
  const out = [...items];
  const rand = rng(seed);
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const sha256File = (f) => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');

const reportsFile = path.join(CORPUS, 'reports.jsonl');
const reports = fs.readFileSync(reportsFile, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
const controls = JSON.parse(fs.readFileSync(path.join(CORPUS, 'controls.json'), 'utf8')).ids;
const byId = new Map(reports.map((r) => [r.id, r]));
for (const c of controls) if (!byId.has(c)) throw new Error(`control ${c} not in corpus`);

fs.mkdirSync(path.dirname(path.resolve(args.out)), { recursive: true });
const out = fs.createWriteStream(path.resolve(args.out), { flags: 'wx' });
const write = (o) => out.write(JSON.stringify(o) + '\n');

async function http(method, url, { token, body, contentType } = {}) {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body !== undefined) headers['Content-Type'] = contentType || 'application/json';
  const res = await fetch(url, { method, headers, body });
  const text = await res.text();
  let json = null;
  try { json = JSON.parse(text); } catch { /* not JSON */ }
  return { status: res.status, json, headers: res.headers };
}

async function login() {
  const r = await http('POST', `${BASE}/api/auth/login`, { body: JSON.stringify({ email: EMAIL, password: PASSWORD }) });
  if (r.status !== 200 || !r.json || typeof r.json.token !== 'string') throw new Error(`login failed with HTTP ${r.status}`);
  return r.json.token;
}

// Ids and occurrence counts of every bug; nothing else is kept.
async function listBugs(token) {
  const bugs = [];
  for (let page = 1; ; page++) {
    const r = await http('GET', `${BASE}/api/bugs?page=${page}&limit=100`, { token });
    if (r.status !== 200 || !r.json || !Array.isArray(r.json.bugs)) throw new Error(`GET /api/bugs failed with HTTP ${r.status}`);
    for (const b of r.json.bugs) bugs.push({ id: b._id, occurrences: typeof b.occurrences === 'number' ? b.occurrences : null });
    if (page >= (r.json.pages || 1)) break;
    await sleep(200);
  }
  return bugs;
}

let lastSend = 0;
async function send(report) {
  let attempts = 0;
  let n429 = 0;
  let nOther = 0;
  for (;;) {
    const wait = lastSend + INTERVAL_MS - Date.now();
    if (wait > 0) await sleep(wait);
    lastSend = Date.now();
    attempts++;
    let r;
    try {
      r = await http('POST', BASE + report.path, { body: report.body, contentType: report.contentType });
    } catch (e) {
      if (++nOther > MAX_OTHER_RETRIES) return { landed: false, attempts, httpStatus: null, error: String(e.message || e) };
      await sleep(2000 * nOther);
      continue;
    }
    if (r.status === 429) {
      if (++n429 > MAX_429_RETRIES) return { landed: false, attempts, httpStatus: 429, error: 'rate limited after retries' };
      const retryAfter = Number(r.headers.get('retry-after'));
      const reset = Number((r.headers.get('ratelimit') || '').match(/reset=(\d+)/)?.[1] || r.headers.get('ratelimit-reset'));
      const seconds = Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter : Number.isFinite(reset) && reset > 0 ? reset : 15;
      await sleep(seconds * 1000 + 500);
      continue;
    }
    if (r.status >= 500) {
      if (++nOther > MAX_OTHER_RETRIES) return { landed: false, attempts, httpStatus: r.status, error: 'server error after retries' };
      await sleep(2000 * nOther);
      continue;
    }
    const bugId = r.json && typeof r.json.bugId === 'string' ? r.json.bugId : null;
    const occurrences = r.json && typeof r.json.occurrences === 'number' ? r.json.occurrences : null;
    if ((r.status === 200 || r.status === 201) && bugId) return { landed: true, attempts, httpStatus: r.status, bugId, occurrences };
    return { landed: false, attempts, httpStatus: r.status, error: bugId ? 'unexpected status' : 'no bugId in response' };
  }
}

const startedAt = new Date().toISOString();
const token = await login();
const seeded = await listBugs(token);
const order = shuffled(reports.map((r) => r.id), SEED);
write({
  type: 'header', tool: 'replay.mjs', base: BASE, seed: SEED, startedAt,
  corpusReportsSha256: sha256File(reportsFile), corpusControlsSha256: sha256File(path.join(CORPUS, 'controls.json')),
  reports: reports.length, controls: controls.length, intervalMs: INTERVAL_MS,
  seededBugIds: seeded.map((b) => b.id),
  landingRule: 'bugId field of the POST response; HTTP 201 = new bug, 200 = added to an existing bug',
});
console.log(`seeded bugs before replay: ${seeded.length}`);
if (seeded.length !== 4) console.warn(`warning: expected 4 seeded bugs, found ${seeded.length}; is this a fresh, seeded volume?`);

let seq = 0;
let failed = 0;
for (const id of order) {
  const res = await send(byId.get(id));
  seq++;
  if (!res.landed) failed++;
  write({ type: 'report', seq, reportId: id, control: false, ...res, sentAt: new Date().toISOString() });
  if (seq % 25 === 0) console.log(`${seq}/${order.length + controls.length} sent (${failed} failed)`);
}
for (const id of controls) {
  const res = await send(byId.get(id));
  seq++;
  if (!res.landed) failed++;
  write({ type: 'report', seq, reportId: id, control: true, controlOf: id, ...res, sentAt: new Date().toISOString() });
}

const after = await listBugs(await login());
write({ type: 'footer', finishedAt: new Date().toISOString(), sent: seq, failed, bugsAfter: after });
await new Promise((r) => out.end(r));
console.log(`done: ${seq} sends, ${failed} failed to land; ${after.length} bugs after the replay`);
