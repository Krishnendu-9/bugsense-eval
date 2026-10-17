// Materialises v1 and v2 of a fixture app under build/ and builds them.
//   v1 = fixture/<app> as committed
//   v2 = v1 + fixture/<app>.v2.patch (the unrelated feature commit)
//
// usage: node harness/build-fixture.mjs shopfront|node-api
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { REPO } from './services.mjs';

const app = process.argv[2];
const SKIP = new Set(['node_modules', 'dist', '.vite', 'pricing.wasm']);

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

function run(cmd, args, cwd, extraEnv = {}) {
  console.log(`[${path.relative(REPO, cwd) || '.'}] ${cmd} ${args.join(' ')}`);
  execFileSync(cmd, args, { cwd, stdio: 'inherit', shell: process.platform === 'win32' && cmd === 'npm', env: { ...process.env, ...extraEnv } });
}

export function appDir(appName, version) {
  return path.join(REPO, 'build', `${appName}-${version}`);
}

export function materialise(appName, version) {
  const dir = appDir(appName, version);
  fs.rmSync(dir, { recursive: true, force: true });
  copyTree(path.join(REPO, 'fixture', appName), dir);
  if (version === 'v2') {
    const rel = path.relative(REPO, dir).replace(/\\/g, '/');
    run('git', ['apply', '-p2', `--directory=${rel}`, `fixture/${appName}.v2.patch`], REPO);
  }
  return dir;
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'))) {
  if (app !== 'shopfront') throw new Error('the Node fixture is built inside its container by harness/capture-node.mjs');
  for (const version of ['v1', 'v2']) {
    const dir = materialise(app, version);
    run('npm', ['ci', '--no-audit', '--no-fund'], dir);
    run(process.execPath, ['scripts/build-wasm.mjs'], dir);
    run(process.execPath, ['node_modules/vite/bin/vite.js', 'build'], dir);
  }
}
