// One-off authoring tool for the v2 "unrelated feature commit" (SHOP-482,
// feature registry). It derives the v2 source tree from v1 and writes the
// v1->v2 diff, which is the artefact that is kept and applied by the build:
//   fixture/shopfront.v2.patch, fixture/node-api.v2.patch
// The edits add code above every bug site in the same files and touch no
// defect line and no dependency.
//
// usage: node harness/make-v2.mjs shopfront|node-api
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { REPO } from './services.mjs';

const app = process.argv[2];
const SRC = path.join(REPO, 'fixture', app);
const WORK = path.join(REPO, 'build', 'patchwork', app);
const A = path.join(WORK, 'v1');
const B = path.join(WORK, 'v2');
const SKIP = new Set(['node_modules', 'dist', '.vite', 'pricing.wasm', 'package-lock.json']);

function copyTree(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const name of fs.readdirSync(from)) {
    if (SKIP.has(name)) continue;
    const s = path.join(from, name);
    const d = path.join(to, name);
    if (fs.statSync(s).isDirectory()) copyTree(s, d);
    else fs.copyFileSync(s, d);
  }
}

function edit(rel, fn) {
  const file = path.join(B, rel);
  const before = fs.readFileSync(file, 'utf8');
  const after = fn(before);
  if (after === before) throw new Error(`edit had no effect: ${rel}`);
  fs.writeFileSync(file, after);
}

// Inserts `block` after the last top-level import (or at the top of the file).
function afterImports(text, block) {
  const lines = text.split('\n');
  let last = -1;
  lines.forEach((l, i) => { if (/^import\s/.test(l)) last = i; });
  lines.splice(last + 1, 0, ...(last >= 0 ? [''] : []), ...block, ...(last >= 0 ? [] : ['']));
  return lines.join('\n');
}

function walk(dir, exts, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, exts, out);
    else if (exts.some((e) => name.endsWith(e))) out.push(p);
  }
  return out;
}

fs.rmSync(WORK, { recursive: true, force: true });
copyTree(SRC, A);
copyTree(SRC, B);

if (app === 'shopfront') {
  fs.mkdirSync(path.join(B, 'src', 'features'), { recursive: true });
  fs.writeFileSync(
    path.join(B, 'src', 'features', 'registry.js'),
    [
      '// Feature registry (SHOP-482): modules announce themselves so the',
      '// operator flags panel can list what is deployed.',
      'const registry = new Map();',
      '',
      'export function registerFeature(name, owner = "storefront") {',
      '  registry.set(name, { owner, at: registry.size });',
      '  return registry.size;',
      '}',
      '',
      'export function listFeatures() {',
      '  return [...registry.keys()].sort();',
      '}',
      '',
    ].join('\n'),
  );
  for (const file of walk(path.join(B, 'src'), ['.js', '.jsx'])) {
    const rel = path.relative(path.join(B, 'src'), file).replace(/\\/g, '/');
    if (rel.startsWith('features/')) continue;
    const depth = rel.split('/').length - 1;
    const prefix = depth === 0 ? './' : '../'.repeat(depth);
    const name = rel.replace(/\.(jsx?|mjs)$/, '');
    edit(path.join('src', rel), (t) =>
      afterImports(t, [
        `import { registerFeature } from '${prefix}features/registry.js';`,
        '',
        '// SHOP-482: announce this module to the feature registry.',
        `registerFeature('${name}');`,
      ]),
    );
  }
  edit('index.html', (t) =>
    t.replace(
      '    <script>\n      // Legacy',
      '    <meta name="theme-color" content="#2f6b4f" />\n    <!-- SHOP-482: feature registry panel is enabled for operators. -->\n    <meta name="shop-features" content="registry" />\n    <script>\n      // Legacy',
    ),
  );
  edit('public/frames/card.html', (t) =>
    t.replace(
      '      // Card entry frame.',
      '      // SHOP-482: the frame reports its build to the feature registry panel.\n      window.cardFrameBuild = "2026.10.2";\n      // Card entry frame.',
    ),
  );
  for (const w of ['cdn/reviews-widget.js', 'cdn/chat-widget.js']) {
    edit(w, (t) => t.replace('(function () {\n', '(function () {\n  // SHOP-482: build stamp shown in the feature registry panel.\n  var WIDGET_BUILD = "2026.10.2";\n  window.__widgetBuilds = (window.__widgetBuilds || []).concat(WIDGET_BUILD);\n'));
  }
  edit('src/pricing/plugin.js', (t) =>
    t.replace("  'window.pricingPlugin = {',\n", "  'window.pricingPlugin = {',\n  '  // SHOP-482: build stamp shown in the feature registry panel.',\n  '  build: \"2026.10.2\",',\n"),
  );
  edit('scripts/build-wasm.mjs', (t) =>
    t.replace(
      'const FUNCTIONS = [\n',
      'const FUNCTIONS = [\n  // SHOP-482: build stamp routine read by the feature registry panel.\n  { name: \'build_stamp\', body: [op.localGet, 0, op.i32Const, ...sleb(20261002), op.add, op.end] },\n',
    ),
  );
} else if (app === 'node-api') {
  fs.writeFileSync(
    path.join(B, 'src', 'features.ts'),
    [
      '// Feature registry (API-311): modules announce themselves so /internal/features',
      '// can list what is deployed.',
      'const registry = new Map<string, number>();',
      '',
      'export function registerFeature(name: string): number {',
      '  registry.set(name, registry.size);',
      '  return registry.size;',
      '}',
      '',
      'export function listFeatures(): string[] {',
      '  return [...registry.keys()].sort();',
      '}',
      '',
    ].join('\n'),
  );
  for (const file of walk(path.join(B, 'src'), ['.ts'])) {
    const rel = path.relative(path.join(B, 'src'), file).replace(/\\/g, '/');
    if (rel === 'features.ts') continue;
    const depth = rel.split('/').length - 1;
    const prefix = depth === 0 ? './' : '../'.repeat(depth);
    edit(path.join('src', rel), (t) =>
      afterImports(t, [
        `import { registerFeature } from '${prefix}features';`,
        '',
        '// API-311: announce this module to the feature registry.',
        `registerFeature('${rel.replace(/\.ts$/, '')}');`,
      ]),
    );
  }
} else {
  throw new Error(`unknown app ${app}`);
}

let diff = '';
try {
  execFileSync('git', ['diff', '--no-index', '--no-color', 'v1', 'v2'], { cwd: WORK, encoding: 'utf8' });
} catch (e) {
  diff = e.stdout; // exit code 1 means "differences found"
}
if (!diff) throw new Error('empty diff');
const out = path.join(REPO, 'fixture', `${app}.v2.patch`);
fs.writeFileSync(out, diff);
console.log(`wrote ${path.relative(REPO, out)} (${diff.split('\n').length} lines)`);
