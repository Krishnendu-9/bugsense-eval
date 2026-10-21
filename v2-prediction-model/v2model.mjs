// Throwaway model of the proposed v2 key, used only to predict gate effects on
// the (burned) v1 corpus. Not the implementation. Options let each design
// choice be switched on or off so its effect can be measured on its own.

const HASHED = /-([A-Za-z0-9_-]{8})(\.m?js)$/;

// ---------------------------------------------------------------- frames
function normFn(raw) {
  let f = (raw || '').trim();
  f = f.replace(/^async\s+/, '').replace(/^new\s+/, '');
  f = f.replace(/\s*\[as [^\]]+\]$/, '');              // V8 alias: keep own name
  if (f.includes('*')) f = f.slice(f.lastIndexOf('*') + 1); // Firefox async cause marker
  f = f.replace(/(?:\/<|<)+$/g, '');                     // Firefox nesting marks
  if (/^(global|module|eval) code$/.test(f)) return '';
  if (f.includes('.')) f = f.slice(f.lastIndexOf('.') + 1); // V8 receiver: Object.dispatch
  if (f === '<anonymous>') return '';
  return f;
}

function splitLoc(loc) {
  let m = loc.match(/^(.*?):(\d+):(\d+)$/);
  if (m) return { file: m[1], line: +m[2], col: +m[3] };
  m = loc.match(/^(.*?):(\d+)$/);
  if (m) return { file: m[1], line: +m[2], col: null };
  return { file: loc, line: null, col: null };
}

function normFile(file) {
  let f = file;
  try { const u = new URL(f); f = u.protocol === 'blob:' ? 'blob:' : u.protocol.startsWith('http') ? u.pathname : u.protocol + u.pathname; } catch { /* keep */ }
  let hashed = false;
  f = f.replace(HASHED, (_, _h, ext) => { hashed = true; return ext; });
  f = f.split('/').map((seg) => (/\d/.test(seg) && !/\.m?jsx?$|\.tsx?$/.test(seg) ? '<id>' : seg)).join('/');
  return { file: f, hashed };
}

function classify(fileRaw) {
  if (!fileRaw || fileRaw === '<anonymous>' || fileRaw === 'native' || fileRaw === '[native code]') return 'native';
  if (fileRaw === '[wasm code]' || fileRaw.startsWith('wasm')) return 'app';
  if (/\/sdk\/bugsense\.js$/.test(fileRaw.split(/[?#]/)[0])) return 'sdk';
  if (/^(file|node):/.test(fileRaw)) return 'foreign';
  if (fileRaw.includes('/node_modules/')) return 'library';
  return 'app';
}

// One line -> frame, or null if the line is not a frame in any of the formats.
export function parseFrame(line) {
  const l = line.trim();
  let fn, loc, m;
  if ((m = l.match(/^at (.*?) \((.*)\)$/))) { fn = m[1]; loc = m[2]; }
  else if ((m = l.match(/^at (.*)$/))) { fn = ''; loc = m[1]; }
  else if ((m = l.match(/^([^@]*)@(.*)$/))) { fn = m[1]; loc = m[2]; }
  else return null;
  // eval / new Function / wasm forms
  let wasm = null;
  const wf = (fn + ' ' + loc).match(/wasm-function\[([^\]]+)\]/);
  if (wf) wasm = wf[1];
  const ev = loc.match(/^eval at .*?\((.*?)\)/) || loc.match(/^(.*?) line \d+ > (?:eval|Function)/);
  if (ev) loc = ev[1] + ':0:0', fn = fn || 'eval';
  const ffw = loc.match(/^(.*?) line \d+ > WebAssembly/);
  if (ffw) loc = '[wasm code]';
  const { file: fileRaw, line: ln, col } = splitLoc(loc);
  const kind = classify(fileRaw);
  const { file, hashed } = kind === 'native' ? { file: '', hashed: false } : normFile(fileRaw);
  if (wasm) return { fn: `wasm:${wasm}`, rawFn: fn, file: 'wasm', hashed: false, line: null, col: null, kind: 'app' };
  return { fn: normFn(fn), rawFn: fn, file, hashed, line: ln, col, kind };
}

export function parseStack(errorLog) {
  const frames = [];
  let unparsed = 0;
  for (const line of (errorLog || '').split('\n')) {
    if (!line.trim()) continue;
    const f = parseFrame(line);
    if (f) frames.push(f); else unparsed++;
  }
  // A browser stack that has web frames: frames from other schemes were pasted
  // into the message (a server stack embedded in an error), not executed here.
  if (frames.some((f) => f.kind === 'app' && !/^(file|node):/.test(f.file))) {
    return { frames: frames.filter((f) => f.kind !== 'foreign'), unparsed };
  }
  return { frames: frames.map((f) => (f.kind === 'foreign' ? { ...f, kind: 'app' } : f)), unparsed };
}

// ---------------------------------------------------------------- message
const PREFIX = /^(?:Uncaught |Unhandled Promise Rejection: )/;
function messageOf(title, errorLog) {
  let t = title || '';
  const looksLikeComponentStack = /^\s/.test(t) || /^at /.test(t);
  if (looksLikeComponentStack) {
    const head = (errorLog || '').split('\n')[0] || '';
    t = /^\s*at |@/.test(head) ? '' : head; // only V8 has a header line
  }
  return t.replace(PREFIX, '').replace(/^(?:[A-Z]\w*)?(?:Error|Exception):\s*/, '').trim();
}

const lastSeg = (expr) => {
  const s = expr.replace(/\(.*\)$/, '').trim();
  const br = s.match(/\[['"]?([^'"\]]+)['"]?\]$/);
  if (br) return br[1];
  return s.slice(s.lastIndexOf('.') + 1);
};

export function canonicalMessage(msg, topNativeFn) {
  const m = msg.trim();
  let r;
  if ((r = m.match(/^Cannot read propert(?:y|ies) of (?:undefined|null) \(reading '(.+)'\)$/))) return `nullish-read ${r[1]}`;
  if ((r = m.match(/^can't access property (?:"(.+)"|(\S+)), .+ is (?:undefined|null)$/))) return `nullish-read ${r[1] ?? r[2]}`;
  if (/^(unreachable|unreachable executed|Unreachable code should not be executed\b.*)$/s.test(m)) return 'wasm-unreachable';
  if ((r = m.match(/^(?:undefined|null) is not an object \(evaluating '(.+)'\)$/))) return `nullish-read ${lastSeg(r[1])}`;
  if ((r = m.match(/^Cannot set propert(?:y|ies) of (?:undefined|null) \(setting '(.+)'\)$/))) return `nullish-write ${r[1]}`;
  if ((r = m.match(/^(.+?) is not a function(?:\. \(In [\s\S]*\))?$/))) return `not-function ${lastSeg(r[1])}`;
  if ((r = m.match(/^(.+?) is not a constructor/))) return `not-constructor ${lastSeg(r[1])}`;
  if (/^(Maximum call stack size exceeded\.?|too much recursion)$/.test(m)) return 'recursion';
  if (/is not valid JSON|Unexpected end of JSON input|in JSON at position|^JSON\.parse: |^JSON Parse error: /.test(m)) return 'json-parse';
  if (/^The string did not match the expected pattern\.$/.test(m) && topNativeFn === 'json') return 'json-parse';
  if (/^(Failed to fetch|NetworkError when attempting to fetch resource\.|Load failed)$/.test(m)) return 'network';
  if (/^(Failed to fetch dynamically imported module|error loading dynamically imported module|Importing a module script failed)/.test(m)) return 'dynamic-import';
  if ((r = m.match(/^(.+?) is not defined$/)) || (r = m.match(/^Can't find variable: (.+)$/))) return `undefined-var ${r[1]}`;
  if ((r = m.match(/^Minified React error #(\d+)/))) return `react#${r[1]}`;
  if ((r = m.match(/^Request failed with status code (\d)\d\d$/))) return `http ${r[1]}xx`;
  // Generic: strip the data a message can carry.
  return m
    .replace(/https?:\/\/\S+/g, '<url>')
    .replace(/\{.*\}|\[.*\]/gs, '<json>')
    .replace(/"[^"]*"/g, '<str>')
    .replace(/(?:[€$£¥]\s?)?\d[\d.,]*(?:\s?[€$£¥])?/g, '<num>')
    .replace(/\S*\d\S*/g, '<num>')
    .replace(/\s+/g, ' ')
    .slice(0, 200);
}

// ---------------------------------------------------------------- request context
function requestOf(breadcrumbs) {
  const xs = (breadcrumbs || []).filter((c) => c.category === 'xhr' && /\((FAILED|HTTP [45]\d\d)\)$/.test(c.message || ''));
  const last = xs[xs.length - 1];
  if (!last) return '';
  const m = last.message.match(/^API \[(\w+)\] (\S+)/);
  if (!m) return '';
  let p = m[2];
  try { p = new URL(p, 'http://x').pathname; } catch { /* keep */ }
  p = p.split('/').map((s) => (/\d/.test(s) ? '<id>' : s)).join('/');
  return `${m[1]} ${p}`;
}

function routeOf(body) {
  const nav = (body.breadcrumbs || []).filter((c) => c.category === 'navigation').pop();
  return nav?.data?.url || (body.description || '').replace(/^.* on /, '') || '';
}

// ---------------------------------------------------------------- the key
export { messageOf };
export function makeKey(body, opt) {
  const errorLog = String(body.errorLog || '');
  const title = String(body.title || '');
  const { frames } = parseStack(errorLog);
  const topNative = frames.find((f) => f.kind === 'native');
  const msg = messageOf(title, errorLog);
  // body._canon simulates the v2 SDK sending error.message as its own field
  // for reports whose title was replaced (captureError's second argument).
  const canon = body._canon !== undefined ? body._canon : canonicalMessage(msg, topNative ? topNative.fn : null);

  let usable = frames.filter((f) => f.kind === 'app' || f.kind === 'library');
  if (usable.some((f) => f.kind === 'app')) usable = usable.filter((f) => f.kind === 'app');

  const frameId = (f) => {
    let fn = f.fn;
    if (f.hashed && opt.prodNames === 'wildcard' && fn.length <= opt.mangledMax) fn = '?';
    if (f.hashed && opt.prodNames === 'drop') fn = '?';
    const parts = [fn, f.file];
    if (opt.prodLine && f.hashed) parts.push(f.line);
    return parts.join('@');
  };
  const sig = usable.slice(0, opt.K).map(frameId).join('|');

  const req = opt.request && /^(network|http )/.test(canon) ? requestOf(body.breadcrumbs) : '';
  const route = opt.route ? routeOf(body) : '';

  if (!usable.length) {
    // Stackless: the message is all there is.
    if (/^Script error\.?/.test(msg)) {
      const fileHint = (errorLog.match(/^Script error\. at (\S+?):\d+:\d+$/) || [])[1] || '';
      const where = /^https?:/.test(fileHint) ? normFile(fileHint).file : opt.scriptErrorRoute ? fileHint : '';
      return `${body.project}::script-error::${where}`;
    }
    return `${body.project}::nostack::${canon}::${req}::${route}`;
  }
  const m = opt.message === 'canonical' ? canon : '';
  // HTTP and network failures: the failed request is the identity, frames are not used.
  if (opt.requestOnly && req) return `${body.project}::${m}::::${req}::${route}`;
  return `${body.project}::${m}::${sig}::${req}::${route}`;
}
