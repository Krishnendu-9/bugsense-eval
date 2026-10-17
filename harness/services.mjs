// Helper services for the capture runs: the mock backend container, the
// no-CORS CDN origin, and the Vite dev/preview servers.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn, execFileSync } from 'node:child_process';

export const REPO = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
export const MOCK_CONTAINER = 'eval-mock';
export const DOCKER_NET = 'eval-net';

function docker(args, opts = {}) {
  return execFileSync('docker', args, { encoding: 'utf8', env: { ...process.env, MSYS_NO_PATHCONV: '1' }, ...opts }).trim();
}

export function ensureNetwork() {
  const nets = docker(['network', 'ls', '--format', '{{.Name}}']).split('\n');
  if (!nets.includes(DOCKER_NET)) docker(['network', 'create', DOCKER_NET]);
}

export async function startMock() {
  ensureNetwork();
  try { docker(['rm', '-f', MOCK_CONTAINER], { stdio: 'ignore' }); } catch { /* not running */ }
  const src = path.join(REPO, 'fixture', 'mock-backend').replace(/\\/g, '/');
  docker(['run', '-d', '--name', MOCK_CONTAINER, '--network', DOCKER_NET, '-p', '7103:7103', '-v', `${src}:/srv/mock:ro`, 'node:22-alpine', 'node', '/srv/mock/server.mjs']);
  await waitForHttp('http://localhost:7103/health');
}

export function stopMock() {
  try { docker(['rm', '-f', MOCK_CONTAINER], { stdio: 'ignore' }); } catch { /* already gone */ }
}

// Second origin: serves the app's CDN scripts with no CORS headers at all.
export function startCdnOrigin(dir, port = 7104) {
  const server = http.createServer((req, res) => {
    const file = path.join(dir, path.basename(new URL(req.url, 'http://x').pathname));
    if (!fs.existsSync(file)) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'Content-Type': 'application/javascript', 'Cache-Control': 'no-store' });
    res.end(fs.readFileSync(file));
  });
  return new Promise((resolve) => server.listen(port, '127.0.0.1', () => resolve({ close: () => new Promise((r) => server.close(r)) })));
}

// mode: 'dev' (vite, port 7120) or 'preview' (vite preview of dist, port 7110).
export async function startVite(appDir, mode) {
  const viteBin = path.join(appDir, 'node_modules', 'vite', 'bin', 'vite.js');
  const args = mode === 'dev' ? [viteBin] : [viteBin, 'preview'];
  const port = mode === 'dev' ? 7120 : 7110;
  const child = spawn(process.execPath, args, { cwd: appDir, stdio: ['ignore', 'pipe', 'pipe'] });
  let log = '';
  child.stdout.on('data', (d) => (log += d));
  child.stderr.on('data', (d) => (log += d));
  try {
    await waitForHttp(`http://localhost:${port}/`);
  } catch (e) {
    child.kill();
    throw new Error(`vite ${mode} did not start: ${log}`);
  }
  return {
    origin: `http://localhost:${port}`,
    log: () => log,
    close: () => new Promise((r) => { child.once('exit', r); child.kill(); }),
  };
}

export async function waitForHttp(url, timeoutMs = 60000) {
  const start = Date.now();
  for (;;) {
    try {
      const res = await fetch(url);
      await res.arrayBuffer();
      if (res.status < 500) return;
    } catch { /* not up yet */ }
    if (Date.now() - start > timeoutMs) throw new Error(`timeout waiting for ${url}`);
    await new Promise((r) => setTimeout(r, 300));
  }
}
