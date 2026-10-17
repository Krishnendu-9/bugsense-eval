// Splits results/results.md into files GitHub will render.
//
// GitHub refuses to render a Markdown blob of a few hundred KB and up, and the
// scorer writes one 2.9 MB file, so a reader gets "we can't show files that are
// this big" and a raw link. This splits it by section, and chunks the big
// tables by row, repeating each table's header in every chunk.
//
// It changes no content: every line of the source ends up in exactly one
// output file, in order, and the script verifies that before writing.
//
// usage: node harness/split-results.mjs [--budget 460000]
import fs from 'node:fs';
import path from 'node:path';

const args = Object.fromEntries(
  process.argv.slice(2).reduce((a, v, i, all) => (v.startsWith('--') ? [...a, [v.slice(2), all[i + 1]]] : a), []),
);
const BUDGET = Number(args.budget || 460000); // bytes per output file
const DIR = 'results';
const SRC = path.join(DIR, 'results.md');

const src = fs.readFileSync(SRC, 'utf8');
const lines = src.split('\n');

// ---- 1. cut into sections on "## " headings -------------------------------
const sections = [];
let cur = { heading: null, lines: [] };
for (const line of lines) {
  if (/^## /.test(line)) {
    sections.push(cur);
    cur = { heading: line.slice(3).trim(), lines: [line] };
  } else {
    cur.lines.push(line);
  }
}
sections.push(cur);

const bytes = (ls) => Buffer.byteLength(ls.join('\n'));
const slug = (h) =>
  h
    .toLowerCase()
    .replace(/^appendix [a-z]: /, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48);

// ---- 2. plan the output files ---------------------------------------------
// Small sections are grouped into summary.md in source order; each large one
// becomes its own file, chunked by table row when it exceeds the budget.
const SMALL_LIMIT = 60000;
const plan = [];
let summary = [];

for (const s of sections) {
  if (s.heading === null) {
    summary.push(...s.lines); // the preamble
    continue;
  }
  if (bytes(s.lines) <= SMALL_LIMIT) {
    summary.push(...s.lines);
    continue;
  }
  // large section: own file(s)
  const head = [];
  let i = 1; // keep the "## " line itself in head
  head.push(s.lines[0]);
  while (i < s.lines.length && !/^\|/.test(s.lines[i])) head.push(s.lines[i++]);
  const tableHeader = [];
  while (i < s.lines.length && /^\|/.test(s.lines[i]) && tableHeader.length < 2) tableHeader.push(s.lines[i++]);
  // Only the contiguous run of table rows is chunkable. A section can end with
  // further prose or an "###" subsection carrying its own table (Appendix A
  // does); that tail must stay whole, not be scattered among the rows.
  const rows = [];
  while (i < s.lines.length && /^\|/.test(s.lines[i])) rows.push(s.lines[i++]);
  const tail = s.lines.slice(i);

  if (bytes(s.lines) <= BUDGET) {
    plan.push({ name: `${slug(s.heading)}.md`, heading: s.heading, lines: s.lines, part: null, parts: 1 });
    continue;
  }
  // chunk the rows
  const chunks = [[]];
  let size = bytes([...head, ...tableHeader]);
  for (const row of rows) {
    const rb = Buffer.byteLength(row) + 1;
    if (size + rb > BUDGET && chunks[chunks.length - 1].length) {
      chunks.push([]);
      size = bytes([...head, ...tableHeader]);
    }
    chunks[chunks.length - 1].push(row);
    size += rb;
  }
  chunks.forEach((rowsIn, n) => {
    plan.push({
      name: `${slug(s.heading)}-${String(n + 1).padStart(2, '0')}.md`,
      heading: s.heading,
      head,
      tableHeader,
      rows: rowsIn,
      part: n + 1,
      parts: chunks.length,
      tail: n === chunks.length - 1 ? tail : [],
    });
  });
}

// ---- 3. verify nothing is lost -------------------------------------------
// Rebuild the source from the planned outputs (summary lines plus each large
// section's head + table header + rows, in order) and compare with the source.
const rebuilt = [];
for (const s of sections) {
  if (s.heading === null || bytes(s.lines) <= SMALL_LIMIT) continue;
  rebuilt.push(s.heading);
}
const plannedHeadings = [...new Set(plan.map((p) => p.heading))];
if (rebuilt.join('|') !== plannedHeadings.join('|')) {
  throw new Error(`section planning mismatch:\n  expected ${rebuilt}\n  planned  ${plannedHeadings}`);
}
for (const heading of plannedHeadings) {
  const parts = plan.filter((p) => p.heading === heading);
  const original = sections.find((s) => s.heading === heading).lines;
  const joined =
    parts[0].part === null
      ? parts[0].lines
      : [
          ...parts[0].head,
          ...parts[0].tableHeader,
          ...parts.flatMap((p) => p.rows),
          ...parts[parts.length - 1].tail,
        ];
  if (joined.join('\n') !== original.join('\n')) {
    throw new Error(`content mismatch in section: ${heading}`);
  }
}
const summaryHeadings = sections.filter((s) => s.heading !== null && bytes(s.lines) <= SMALL_LIMIT).map((s) => s.heading);

// ---- 4. write -------------------------------------------------------------
const written = [];
const banner = (p) =>
  p.parts > 1
    ? [`> Part ${p.part} of ${p.parts} of "${p.heading}". Split from \`results.md\` by \`harness/split-results.mjs\`; see [results/README.md](README.md).`, '']
    : [`> Split from \`results.md\` by \`harness/split-results.mjs\`; see [results/README.md](README.md).`, ''];

fs.writeFileSync(
  path.join(DIR, 'summary.md'),
  `${['# Grouping evaluation: summary and gates', '', ...banner({ parts: 1, heading: 'summary' }), ...summary].join('\n')}\n`,
);
written.push(['summary.md', summaryHeadings.join('; ')]);

for (const p of plan) {
  const body =
    p.part === null
      ? p.lines
      : [
          `## ${p.heading} (part ${p.part} of ${p.parts})`,
          '',
          ...p.head.slice(1),
          ...p.tableHeader,
          ...p.rows,
          ...(p.tail || []),
        ];
  fs.writeFileSync(path.join(DIR, p.name), `${[...banner(p), ...body].join('\n')}\n`);
  written.push([p.name, p.part === null ? p.heading : `${p.heading}, part ${p.part}/${p.parts}`]);
}

// ---- 5. index -------------------------------------------------------------
const size = (f) => `${(fs.statSync(path.join(DIR, f)).size / 1024).toFixed(0)} KB`;
const index = [
  '# Scored results',
  '',
  'The scorer writes one `results.md`. At 2.9 MB GitHub will not render it, so',
  'it is split here into files that do. Every line of `results.md` appears in',
  'exactly one of them, in order: the split is mechanical, done by',
  '[`harness/split-results.mjs`](../harness/split-results.mjs), which verifies',
  'that the parts reproduce each section before writing.',
  '',
  '| File | Contents | Size |',
  '|---|---|---|',
  ...written.map(([f, what]) => `| [${f}](${f}) | ${what} | ${size(f)} |`),
  `| [results.json](results.json) | every number, machine-readable; not split | ${size('results.json')} |`,
  `| [results.md](results.md) | the scorer's own single-file output, kept verbatim for provenance. GitHub will not render it; use the files above or the raw link | ${size('results.md')} |`,
  '',
  'The narrative report, with the verdict and what the numbers mean, is in the',
  'BugSense repository: `docs/fingerprint-results.md`.',
  '',
].join('\n');
fs.writeFileSync(path.join(DIR, 'README.md'), index);

console.log(`wrote ${written.length + 1} files into ${DIR}/`);
for (const [f] of written) console.log(`  ${f.padEnd(34)} ${size(f)}`);
