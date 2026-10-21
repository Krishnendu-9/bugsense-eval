// Full HTTP regression check (docs/fingerprint-eval-v2.md, section 7, step 3):
// for seeds 1 and 2, a fresh in-memory MongoDB database, seeded; the server
// at the checked-out commit on :8090 in production mode; v1's replay.mjs
// sending the v1 corpus to the real telemetry endpoint. The owner's own server
// and database are not touched. No AI key, webhook or ingest key is loaded.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawn, spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SERVER = 'E:/professional/Projects/bugsense/server';
const EVAL = 'E:/professional/Projects/bugsense-eval';
const PORT = '8090';
const require = createRequire(`${SERVER}/package.json`);
const { MongoMemoryServer } = require('mongodb-memory-server');

const log = (s) => console.log(`[${new Date().toISOString()}] ${s}`);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const commit = spawnSync('git', ['-C', SERVER, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).stdout.trim();
const dirty = spawnSync('git', ['-C', SERVER, 'status', '--porcelain'], { encoding: 'utf8' }).stdout.trim();
log(`commit under test: ${commit}${dirty ? ' (WORKING TREE NOT CLEAN)' : ' (clean working tree)'}`);
if (dirty) process.exit(4);

const mongo = await MongoMemoryServer.create();
log(`in-memory MongoDB at ${mongo.getUri()}`);

for (const seed of [1, 2]) {
  const env = {
    ...process.env,
    MONGO_URI: mongo.getUri(`bugsense-httpreg-s${seed}`),
    NODE_ENV: 'production',
    PORT,
    JWT_SECRET: crypto.randomBytes(32).toString('hex'),
    ANTHROPIC_API_KEY: '',
    DISCORD_WEBHOOK_URL: '',
    SLACK_WEBHOOK_URL: '',
    TELEMETRY_INGEST_KEY: '',
    GITHUB_TOKEN: '',
    CLOUDINARY_URL: '',
    CLIENT_URL: 'http://localhost:5173',
  };

  log(`seed ${seed}: seeding a fresh database`);
  const seeded = spawnSync('node', ['scripts/seed.js'], { cwd: SERVER, env, encoding: 'utf8' });
  fs.writeFileSync(path.join(HERE, `seed-${seed}.log`), seeded.stdout + seeded.stderr);
  if (seeded.status !== 0) throw new Error(`seed failed: ${seeded.stderr}`);

  log(`seed ${seed}: starting the server on :${PORT}`);
  const serverLog = fs.openSync(path.join(HERE, `server-${seed}.log`), 'w');
  const server = spawn('node', ['server.js'], { cwd: SERVER, env, stdio: ['ignore', serverLog, serverLog] });
  let up = false;
  for (let i = 0; i < 60 && !up; i++) {
    await sleep(500);
    try {
      up = (await fetch(`http://127.0.0.1:${PORT}/api/health`)).status === 200;
    } catch { /* not yet */ }
  }
  if (!up) throw new Error('server did not come up');

  const out = path.join(HERE, `run-seed${seed}.jsonl`);
  if (fs.existsSync(out)) fs.unlinkSync(out);
  log(`seed ${seed}: replaying the v1 corpus`);
  const replay = spawnSync('node', [`${EVAL}/replay.mjs`, '--base', `http://127.0.0.1:${PORT}`, '--seed', String(seed), '--out', out], {
    cwd: EVAL,
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  });
  fs.writeFileSync(path.join(HERE, `replay-${seed}.log`), replay.stdout + replay.stderr);
  log(`seed ${seed}: replay exited ${replay.status}`);

  server.kill();
  await new Promise((r) => server.once('exit', r));
  if (replay.status !== 0) throw new Error(`replay ${seed} failed; see replay-${seed}.log`);
}

await mongo.stop();
log('done');
