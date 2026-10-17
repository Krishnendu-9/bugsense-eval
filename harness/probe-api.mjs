// API probe (DESIGN.md section 5, "How the decision is read", step 2).
// Sends two throwaway reports that are not in the corpus and prints only the
// *shape* of every response: key names, types, string lengths, and the values
// of id- or count-like fields. No other field value of a bug document is ever
// printed, because some field may encode the grouping key.
//
// usage: node harness/probe-api.mjs --base http://localhost:8090 --body scratch/probe-capture.json
import fs from 'node:fs';

const args = Object.fromEntries(
  process.argv.slice(2).reduce((a, v, i, all) => (v.startsWith('--') ? [...a, [v.slice(2), all[i + 1]]] : a), []),
);
const BASE = args.base || 'http://localhost:8090';
const capture = JSON.parse(fs.readFileSync(args.body, 'utf8'))[0];
const body = Buffer.from(capture.bodyBase64, 'base64').toString('utf8');

const ID_KEY = /^(_id|id)$|Id$|_id$/;
const COUNT_KEY = /count|total|page|limit|pages|occurrence/i;
const OBJECT_ID = /^[0-9a-f]{24}$/;

function shape(v, key = '', depth = 0) {
  if (Array.isArray(v)) {
    if (v.length === 0) return '[]';
    return `[array len ${v.length}; first: ${shape(v[0], key, depth + 1)}]`;
  }
  if (v && typeof v === 'object') {
    const parts = Object.entries(v).map(([k, x]) => `${k}: ${shape(x, k, depth + 1)}`);
    return `{ ${parts.join(', ')} }`;
  }
  if (typeof v === 'number' && (ID_KEY.test(key) || COUNT_KEY.test(key))) return String(v);
  if (typeof v === 'string' && ID_KEY.test(key) && OBJECT_ID.test(v)) return JSON.stringify(v);
  if (typeof v === 'string') return `<string len ${v.length}>`;
  return `<${v === null ? 'null' : typeof v}>`;
}

// Only ids and counts of every listed bug.
function listIds(listing) {
  const arr = findArray(listing);
  if (!arr) return 'no array found';
  return arr.map((b) => {
    const id = b._id ?? b.id;
    const counts = Object.entries(b)
      .filter(([k, x]) => COUNT_KEY.test(k) && typeof x === 'number')
      .map(([k, x]) => `${k}=${x}`);
    return `${OBJECT_ID.test(String(id)) ? id : '<id?>'} ${counts.join(' ')}`;
  });
}
function findArray(o) {
  if (Array.isArray(o)) return o;
  if (o && typeof o === 'object') for (const x of Object.values(o)) { const a = findArray(x); if (a) return a; }
  return null;
}

async function call(method, path, { token, json, raw, contentType } = {}) {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  if (json !== undefined || raw !== undefined) headers['Content-Type'] = contentType || 'application/json';
  const res = await fetch(BASE + path, { method, headers, body: raw ?? (json !== undefined ? JSON.stringify(json) : undefined) });
  const text = await res.text();
  let parsed = null;
  try { parsed = JSON.parse(text); } catch { /* not json */ }
  return { status: res.status, parsed, headers: Object.fromEntries(res.headers) };
}

const login = await call('POST', '/api/auth/login', { json: { email: 'admin@bugsense.dev', password: 'password123' } });
console.log('login', login.status, 'shape:', shape(login.parsed));
const token = findToken(login.parsed);
function findToken(o) {
  if (o && typeof o === 'object') for (const [k, v] of Object.entries(o)) {
    if (/token/i.test(k) && typeof v === 'string') return v;
    const t = findToken(v); if (t) return t;
  }
  return null;
}

const list0 = await call('GET', '/api/bugs?page=1&limit=100', { token });
console.log('\nGET /api/bugs', list0.status, 'top-level shape:', shape({ ...list0.parsed, data: undefined, bugs: undefined }));
const arr0 = findArray(list0.parsed) || [];
console.log('listing item keys:', arr0[0] ? Object.keys(arr0[0]).join(', ') : '(none)');
console.log('bugs before:', listIds(list0.parsed));

for (const n of [1, 2]) {
  const r = await call('POST', capture.url, { raw: body, contentType: capture.headers['content-type'] });
  console.log(`\nprobe ${n}: POST ${capture.url} ->`, r.status);
  console.log('response shape:', shape(r.parsed));
  console.log('rate-limit headers:', Object.entries(r.headers).filter(([k]) => /ratelimit|retry/i.test(k)).map(([k, v]) => `${k}=${v}`).join(' '));
  const list = await call('GET', '/api/bugs?page=1&limit=100', { token });
  console.log('bugs after:', listIds(list.parsed));
}

const one = arr0[0] && (arr0[0]._id ?? arr0[0].id);
if (one) {
  const d = await call('GET', `/api/bugs/${one}`, { token });
  console.log('\nGET /api/bugs/:id', d.status, 'key names:', Object.keys(d.parsed || {}).join(', '));
  const inner = d.parsed && (d.parsed.data || d.parsed.bug);
  if (inner) console.log('inner key names:', Object.keys(inner).join(', '));
}
