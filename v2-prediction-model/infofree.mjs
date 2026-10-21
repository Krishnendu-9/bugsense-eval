// For each hard-negative pair and each cell (environment x browser x app
// version, standard reports), list which payload fields differ between the two
// incidents' reports, with line and column numbers removed from the stack.
import fs from 'node:fs';
const EVAL = 'E:/professional/Projects/bugsense-eval';
const rd = (f) => fs.readFileSync(f, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
const meta = new Map(rd(`${EVAL}/corpus/meta.jsonl`).map((m) => [m.id, m]));
const reports = rd(`${EVAL}/corpus/reports.jsonl`).map((r) => ({ id: r.id, m: meta.get(r.id), b: JSON.parse(r.body) }));
const INC = JSON.parse(fs.readFileSync(`${EVAL}/corpus/incidents.json`, 'utf8'));

const noPos = (s) => String(s || '')
  .replace(/:\d+:\d+/g, ':L:C')
  .replace(/:\d+\)/g, ':L)')
  .replace(/ line \d+ >/g, ' line L >');
const crumbs = (b, cat) => (b.breadcrumbs || []).filter((c) => c.category === cat).map((c) => c.message).join(' | ');

function diff(a, b) {
  const d = [];
  if (a.title !== b.title) d.push('title');
  if (noPos(a.errorLog) !== noPos(b.errorLog)) d.push('STACK-TEXT');
  else if (a.errorLog !== b.errorLog) d.push('positions');
  if ((a.description || '') !== (b.description || '')) d.push('description(route)');
  for (const cat of ['navigation', 'click', 'xhr', 'console', 'error']) if (crumbs(a, cat) !== crumbs(b, cat)) d.push(`crumb:${cat}`);
  if (JSON.stringify(a.browserInfo) !== JSON.stringify(b.browserInfo)) d.push('browserInfo');
  const known = new Set(['title', 'errorLog', 'description', 'breadcrumbs', 'browserInfo', 'project', 'severity', 'priority']);
  for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) if (!known.has(k) && JSON.stringify(a[k]) !== JSON.stringify(b[k])) d.push(k);
  if (a.project !== b.project || a.severity !== b.severity || a.priority !== b.priority) d.push('meta');
  return d;
}

const pairs = (process.argv[2] ? process.argv[2].split(',').map((s) => s.split('+')) : INC.hardNegativePairs.map((p) => [p.a, p.b]));
for (const [x, y] of pairs) {
  console.log(`\n${x} / ${y}`);
  for (const env of ['browser-prod', 'browser-dev']) for (const br of ['chromium', 'firefox', 'webkit']) for (const v of ['v1', 'v2']) {
    const pick = (inc) => reports.find((r) => r.m.incident === inc && r.m.environment === env && r.m.browser === br && r.m.appVersion === v && r.m.variant === 'standard');
    const a = pick(x), b = pick(y);
    if (!a || !b) { console.log(`  ${env.slice(8)} ${br.padEnd(8)} ${v}  (missing)`); continue; }
    console.log(`  ${env.slice(8)} ${br.padEnd(8)} ${v}  ${a.id}/${b.id}  differ: ${diff(a.b, b.b).join(', ') || 'NOTHING'}`);
  }
}
