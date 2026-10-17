// Checks that every file listed in corpus.lock still has its recorded SHA-256.
//   node harness/verify-lock.mjs
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { REPO } from './services.mjs';

const lock = JSON.parse(fs.readFileSync(path.join(REPO, 'corpus.lock'), 'utf8'));
let bad = 0;
for (const [group, files] of [['files', lock.files], ['supportingFiles', lock.supportingFiles], ['investigationFiles', lock.investigationFiles || {}]]) {
  for (const [f, want] of Object.entries(files)) {
    const p = path.join(REPO, f);
    const got = fs.existsSync(p) ? crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex') : 'missing';
    if (got !== want) { bad++; console.log(`MISMATCH ${group} ${f}: lock ${want}, now ${got}`); }
  }
}
const actual = new Set();
(function walk(d) { for (const n of fs.readdirSync(d)) { const p = path.join(d, n); if (fs.statSync(p).isDirectory()) walk(p); else actual.add(path.relative(REPO, p).replace(/\\/g, '/')); } })(path.join(REPO, 'corpus'));
for (const f of actual) if (!(f in lock.files)) { bad++; console.log(`UNLISTED corpus file ${f}`); }
console.log(bad ? `${bad} problem(s)` : `corpus.lock v${lock.lockVersion} verified: ${Object.keys(lock.files).length} locked files, ${Object.keys(lock.supportingFiles).length} supporting files and ${Object.keys(lock.investigationFiles || {}).length} investigation files match`);
process.exit(bad ? 1 : 0);
