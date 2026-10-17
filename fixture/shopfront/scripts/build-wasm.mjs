// Assembles public/pricing.wasm: the pricing kernel, a stand-in for a small
// Rust/C module built with panics compiled to `unreachable` and no name section.
import fs from 'node:fs';

const I32 = 0x7f;
const op = { localGet: 0x20, i32Const: 0x41, gtS: 0x4a, if: 0x04, void: 0x40, unreachable: 0x00, end: 0x0b, add: 0x6a, mul: 0x6c, divS: 0x6d };

function sleb(n) {
  const out = [];
  for (;;) {
    const byte = n & 0x7f;
    n >>= 7;
    if ((n === 0 && (byte & 0x40) === 0) || (n === -1 && (byte & 0x40) !== 0)) return [...out, byte];
    out.push(byte | 0x80);
  }
}
const uleb = (n) => sleb(n); // all values here are small and non-negative
const str = (s) => [...uleb(s.length), ...Buffer.from(s, 'utf8')];
const section = (id, bytes) => [id, ...uleb(bytes.length), ...bytes];
const vec = (items) => [...uleb(items.length), ...items.flat()];

// Traps (panics) when the argument exceeds `limit`, otherwise returns it scaled.
function guardedScale(limit, factor, divisor) {
  return [
    op.localGet, 0, op.i32Const, ...sleb(limit), op.gtS, op.if, op.void, op.unreachable, op.end,
    op.localGet, 0, op.i32Const, ...sleb(factor), op.mul, op.i32Const, ...sleb(divisor), op.divS, op.end,
  ];
}

const FUNCTIONS = [
  // G24: overflow guard set far too low for real carts.
  { name: 'apply_discount', body: guardedScale(1000, 90, 100) },
  // G25: same kind of guard, separate routine.
  { name: 'compute_tax', body: guardedScale(500, 19, 100) },
];

const typeSec = section(1, vec([[0x60, 1, I32, 1, I32]]));
const funcSec = section(3, vec(FUNCTIONS.map(() => [0])));
const exportSec = section(7, vec(FUNCTIONS.map((f, i) => [...str(f.name), 0x00, ...uleb(i)])));
const codeSec = section(
  10,
  vec(FUNCTIONS.map((f) => { const body = [0, ...f.body]; return [...uleb(body.length), ...body]; })),
);

const bytes = Buffer.from([0x00, 0x61, 0x73, 0x6d, 1, 0, 0, 0, ...typeSec, ...funcSec, ...exportSec, ...codeSec]);
if (!WebAssembly.validate(bytes)) throw new Error('invalid wasm module');
fs.writeFileSync(new URL('../public/pricing.wasm', import.meta.url), bytes);
console.log(`pricing.wasm: ${bytes.length} bytes, ${FUNCTIONS.length} functions`);
