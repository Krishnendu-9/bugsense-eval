// Prints a Markdown table of every re-run attempt in diagnostics/rerun/<label>/.
//   node diagnostics/summarise-rerun.mjs C4-C6
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(HERE, 'rerun', process.argv[2]);
const rows = [];
for (const f of fs.readdirSync(dir).sort()) rows.push(...fs.readFileSync(path.join(dir, f), 'utf8').trim().split('\n').map((l) => JSON.parse(l)));
const order = { 'browser-prod': 0, 'browser-dev': 1 };
rows.sort((a, b) => order[a.env] - order[b.env] || a.version.localeCompare(b.version) || a.browser.localeCompare(b.browser) || a.incident.localeCompare(b.incident) || a.attempt - b.attempt);
const reach = (r) => {
  const x = r.reachability;
  if (!x) return '';
  const fmt = (p) => (!p ? 'n/a' : p.mockDirect ? `mock ${p.mockDirect.status} ${p.mockDirect.contentType}, via app ${p.viaAppOrigin.status}` : Object.entries(p).filter(([k]) => k !== 'at' && k !== 'note').map(([k, v]) => `${k} ${v}`).join(', '));
  return `before: ${fmt(x.beforeClick)}; after: ${fmt(x.afterError)}`;
};
const evidence = (r) => [
  ...r.raised.requestFailures.map((f) => `requestfailed ${f.failure}`),
  ...r.raised.responses.map((s) => `response ${s.status} ${s.contentType}`),
  ...r.raised.pageErrors.map((p) => `pageerror "${p.message.slice(0, 50)}"`),
  r.raised.rejectionEvents.length ? `unhandledrejection x${r.raised.rejectionEvents.length}` : 'no unhandledrejection event',
].join('; ');
console.log('| env | ver | browser | inc | try | outcome | posts | requests | ms since prev. start / end | trigger raised: page evidence | endpoint reachability | capture-server markers (before / after / from browser) | pageSessionId |');
console.log('|---|---|---|---|---|---|---|---|---|---|---|---|---|');
for (const r of rows) {
  const m = r.captureServer;
  console.log(`| ${r.env} | ${r.version} | ${r.browser} | ${r.incident} | ${r.attempt} | ${r.outcome} | ${r.postsReceived} | ${r.requestsReceived} | ${r.msSincePreviousAttempt ?? '-'} / ${r.msSincePreviousAttemptEnded ?? '-'} | ${r.triggerRaised ? 'yes' : 'NO'}: ${evidence(r)} | ${reach(r)} | ${m.markerBefore.recorded ? 'ok' : 'MISSING'} / ${m.markerAfter.recorded ? 'ok' : 'MISSING'} / ${m.markerBrowser.recorded ? 'ok' : 'MISSING'} | \`${r.pageSessionId.slice(0, 8)}\` |`);
}
const totals = {};
for (const r of rows) { const k = `${r.browser} ${r.outcome}`; totals[k] = (totals[k] || 0) + 1; }
console.log(`\nAttempts: ${rows.length}. By browser and outcome: ${Object.entries(totals).map(([k, v]) => `${k}: ${v}`).join('; ')}. Minimum gap between retries of the same trigger (end of previous attempt to start of next): ${Math.min(...rows.filter((r) => r.msSincePreviousAttemptEnded !== null).map((r) => r.msSincePreviousAttemptEnded))} ms. Distinct pageSessionIds: ${new Set(rows.map((r) => r.pageSessionId)).size}.`);
