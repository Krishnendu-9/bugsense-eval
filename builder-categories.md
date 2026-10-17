# BugSense error-grouping eval: categories of hard cases

This is a list of hard cases for the grouping decision ("does this report belong to
an existing bug, or is it a new one?"). I wrote it before seeing the full design and
without reading the server or SDK code.

There are two ways grouping can fail:

- **Split (false negative):** two reports of the *same* bug get different groups.
- **Merge (false positive):** reports of *different* bugs get one group.

Part A covers cases that tend to cause splits, Part B covers cases that tend to cause
merges, and Part C covers cases where the correct label itself is debatable. Those
need a stated labelling policy before they can be scored.

## How examples get produced (applies to every category)

- **Fixture app with planted bugs.** Build a small web app (plus variants built with
  React, Vue and plain JS) that embeds the BugSense SDK. Each defect is planted on
  purpose and has a stable ID such as `BUG-017`. The ground truth comes from how the
  fixture is built: a report belongs to the bug that was triggered. Nobody labels
  reports by hand after the fact.
- **Real triggering only.** A Playwright/Puppeteer harness loads the page and triggers
  each bug by clicking, navigating, or making network routes fail. Real engines then
  produce the messages and stacks. Stack traces are never written by hand.
- **Capture what the SDK actually sends.** Intercept the SDK's outbound requests
  (Playwright `page.route` or a recording proxy) and store the exact payload. This
  works with the SDK as a black box, and the stored payloads can be replayed to the
  server again and again.
- **Matrix runs.** Run every bug across Chromium, Firefox and WebKit, across old and
  new versions of each engine (pinned Playwright/Puppeteer browser revisions, archived
  Firefox builds), across build configurations (dev/prod, minified or not, ES5 or ES2020
  target, source maps present or missing), across trigger paths, and across inputs. Use
  a real-device cloud (BrowserStack/Sauce) or simulators for iOS Safari, Android
  WebView and Samsung Internet.
- **Record the context of each run** (browser and version, build ID, trigger path,
  input) next to the payload. That makes failures easy to diagnose.

---

## Part A — Same bug, different-looking reports (risk: splitting)

### A1. Different JS engines word the same error differently
- **Why hard:** One null dereference produces V8 `Cannot read properties of undefined
  (reading 'x')`, SpiderMonkey `can't access property "x", y is undefined`, and
  JavaScriptCore `undefined is not an object (evaluating 'y.x')`. If the message is
  used as a key, the bug splits by browser.
- **Produce:** Trigger each planted bug in Playwright Chromium, Firefox and WebKit.

### A2. Different stack trace formats per engine
- **Why hard:** V8 writes `    at fn (url:line:col)`. Firefox and Safari write
  `fn@url:line:col`. The engines also name anonymous functions, constructors, methods,
  `eval` code and global code differently (`global code`, `<anonymous>`, empty names).
  Firefox leaves native frames out, V8 shows `at Array.map (<anonymous>)`, and Safari
  shows `map@[native code]`. Some frames have no column number.
- **Produce:** Same as A1. Plant bugs inside `Array.map`/`forEach` callbacks,
  constructors, class methods, getters and arrow functions.

### A3. Message wording changes between versions of the same engine
- **Why hard:** V8 changed `Cannot read property 'x' of undefined` to
  `Cannot read properties of undefined (reading 'x')` around Chrome 91. It also changed
  the JSON.parse messages from `Unexpected token < in JSON at position 0` to
  `Unexpected token '<', "<!DOCTYPE "... is not valid JSON`. Users on old and new
  browsers see different text for the same bug.
- **Produce:** Pin older Chromium revisions through Puppeteer or Playwright. Also use
  older Firefox ESR builds and older Safari through a device cloud.

### A4. The same bug strikes on different code paths into the faulty function
- **Why hard:** The frame where the fault happens is the same, but the callers differ:
  a click handler in one report, a timer, a route change or a websocket message in
  another. Grouping by the whole stack will split the bug.
- **Produce:** Call one buggy helper from three or more UI paths and trigger each path.

### A5. Minification: mangled names and line-1 positions
- **Why hard:** In a production bundle, function names become `t`, `n` or `e`, nearly
  everything sits on line 1, and only the column tells frames apart. A rebuild after
  any unrelated change reshuffles the names and columns.
- **Produce:** Build the same source with webpack+terser and with esbuild. Make a
  trivial unrelated edit, rebuild, and trigger the bug on both builds.

### A6. Code moves between releases
- **Why hard:** Adding lines or functions above the bug shifts line and column
  numbers, even in unminified builds. The bug is the same, but every frame position
  differs.
- **Produce:** Make release N and release N+1 of the fixture, with unrelated edits in
  the same file, and trigger the bug on both.

### A7. Script URLs vary: hashes, CDNs, query strings, environments
- **Why hard:** `main.3fa9c1.js` becomes `main.b71e02.js`. Scripts are served from
  `cdn1`/`cdn2`, with or without `?v=123`, and from staging, production or
  `localhost:5173`. Code splitting can move the faulty function into a different
  chunk.
- **Produce:** Serve the same build from two origins and with cache-busting query
  strings. Rebuild with different `splitChunks` settings.

### A8. Messages contain dynamic data
- **Why hard:** Messages include IDs, URLs, emails, timestamps, UUIDs, numbers, JSON
  positions and pieces of the server response, for example
  `User 48213 not found`, `Unexpected token '<', "<html><hea"...`,
  `Invalid array length` or `'#1abc' is not a valid selector`.
- **Produce:** Trigger the same bug with many different inputs and backend responses
  (use Playwright routes to stub different bodies).

### A9. Locale and i18n differences in messages
- **Why hard:** App-level messages are often translated
  (`throw new Error(t('load_failed'))`). Number and date formatting inside messages
  depends on locale (`1,234.5` vs `1.234,5`). Some engines or older browsers (such as
  Edge Legacy) localize built-in messages. Which current engines do this needs to be
  checked empirically.
- **Produce:** Run the fixture with different `locale` settings in the Playwright
  context and different app language settings. Try localized browser builds where
  they exist.

### A10. The same value is sometimes `null` and sometimes `undefined`
- **Why hard:** `Cannot read properties of null (reading 'x')` and `... of undefined
  ...` can be the same bug. One example: an API sometimes omits a field and sometimes
  sends `null`.
- **Produce:** Stub the API to return both shapes.

### A11. Expression text inside messages changes with call shape or build
- **Why hard:** V8 writes `e.foo is not a function`, `(intermediate value).foo is not
  a function` or `Object(...) is not a function`, depending on how the call is written.
  Safari's `(evaluating 'a.b.c')` contains minified names that change with every build.
- **Produce:** Trigger the bug in minified and unminified builds, and with different
  call styles (direct call, optional chaining, destructured import).

### A12. The receiver type changes the frame name
- **Why hard:** V8 names method frames after the receiver. The same shared function
  shows up as `at Foo.method`, `at Bar.method`, `at Object.method` or
  `at HTMLButtonElement.<anonymous>`, depending on what it was called on.
- **Produce:** Attach one buggy function to several objects or DOM elements and
  trigger it through each one.

### A13. Delivery channel: uncaught vs unhandled rejection vs manually captured
- **Why hard:** The same throw arrives as an `error` event (sync), as an
  `unhandledrejection` (inside an async function or a promise), or through manual
  capture (`try/catch` plus a capture call). The report type, the presence of the
  "Uncaught (in promise)" wording, and the extra frames all differ.
- **Produce:** Call the same buggy function synchronously, from an `async` function,
  from a `.then`, and inside a `try/catch` that calls the SDK's manual capture.

### A14. Async stacks vs sync stacks
- **Why hard:** V8 adds `at async fn` frames, Firefox adds `async*` frames, and
  `.then` chains and `setTimeout` boundaries drop frames. The same bug reached through
  `await` and reached through a callback produces different stacks.
- **Produce:** Use several async entry styles for one bug: await chain, `.then` chain,
  `setTimeout`, `queueMicrotask`, and `requestAnimationFrame`.

### A15. Transpilation target and differential serving
- **Why hard:** An ES5/regenerator build adds frames like `asyncGeneratorStep`,
  `Generator.next` and `tryCatch`, and it renames classes. A module/nomodule setup
  sends a different bundle to different browsers, so stacks differ for the same bug.
- **Produce:** Build with Babel `preset-env` for two targets and serve both through
  `<script type=module>` / `nomodule`. Use old browsers to get the legacy bundle.

### A16. Source maps present for some reports and missing for others
- **Why hard:** If the server symbolicates, reports from builds with maps resolve to
  original names and lines. Reports from builds whose maps are missing or late stay
  minified. The same bug appears in both forms.
- **Produce:** Deploy the same build twice, with the source map available and
  unavailable (404, or `SourceMap` header removed).

### A17. Wrapped or re-thrown errors
- **Why hard:** `catch (e) { throw new Error('Checkout failed: ' + e.message) }`,
  `new Error(msg, { cause: e })`, and framework wrappers (React error boundaries, Vue
  `errorHandler`, Angular `ErrorHandler`/zone.js) change the outer message and the
  stack. The root cause is the same.
- **Produce:** Trigger one root bug both through a wrapping layer and directly, in
  React and Vue variants of the fixture.

### A18. Dev vs prod builds of frameworks
- **Why hard:** React dev builds give full messages. React prod builds give
  `Minified React error #31; visit https://react.dev/errors/31?args[]=...`, where the
  arguments vary. Vue and Angular differ in similar ways.
- **Produce:** Build the React fixture in development and production modes and
  trigger the same misuse.

### A19. Stack depth and truncation
- **Why hard:** V8's `Error.stackTraceLimit` (10 by default) cuts the stack at a fixed
  depth, so the visible frames depend on recursion depth. Stack overflow messages
  differ by engine (`Maximum call stack size exceeded` vs `too much recursion`), and
  the frames are just the repeated function.
- **Produce:** Plant a recursion bug whose depth depends on input. Also plant a bug
  deep in a call chain and trigger it at varying depths.

### A20. Truncated payloads from very long messages or stacks
- **Why hard:** The SDK or server may cut long messages (JSON dumps, HTML bodies) or
  long stacks at a fixed length. Different inputs then get cut at different points.
- **Produce:** Throw errors whose messages include response bodies of varying length.

### A21. SDK instrumentation frames sometimes present
- **Why hard:** SDKs often wrap `addEventListener`, `setTimeout` and `fetch`. Handlers
  registered before the SDK initializes may not be wrapped. The same bug then shows up
  with or without wrapper frames. This can only be observed from outside, by comparing
  payloads.
- **Produce:** Register the buggy handler before and after the SDK loads, and with the
  SDK loaded sync and async.

### A22. Polyfills and libraries that change stacks or rejections
- **Why hard:** zone.js, core-js Promise polyfills and Bluebird long stack traces add
  frames or change whether `unhandledrejection` fires and in what shape. App code that
  sets `Error.stackTraceLimit` or `Error.prepareStackTrace` changes the stack format.
- **Produce:** Fixture variants with zone.js, a Promise polyfill, and a raised
  `stackTraceLimit`.

### A23. Inline scripts, eval and `new Function`
- **Why hard:** Inline `<script>` frames point at the *page* URL (which includes the
  route and query string) and at HTML line numbers. Frames from `eval` or
  `new Function` look like `eval at foo (...), <anonymous>:3:7`, and
  `//# sourceURL` changes that. `onclick="..."` attribute handlers have their own
  shape.
- **Produce:** Put the same bug in an inline script on pages with different routes,
  query strings and HTML above it. Also plant bugs inside `eval`/`new Function`, with
  and without `sourceURL`.

### A24. Workers, iframes and blob URLs
- **Why hard:** Errors in Web Workers or Service Workers, or in workers built from
  `Blob` URLs, carry `blob:https://host/<random-uuid>` URLs that change every session.
  Iframes and micro-frontends put the same component under different host pages.
- **Produce:** Run the same bug in a dedicated worker built from a Blob, in a module
  worker file, and in a component embedded in two different host pages through an
  iframe.

### A25. Mobile browsers, webviews and in-app browsers
- **Why hard:** All iOS browsers run WebKit, and its message wording differs from
  desktop. Android WebView and Samsung Internet lag behind Chrome versions. In-app
  browsers (for example Facebook and Instagram) inject scripts that add frames.
- **Produce:** Use an iOS Simulator, an Android emulator WebView shell, and real-device
  clouds.

### A26. Environment-specific paths
- **Why hard:** `file:///C:/Users/...` vs `file:///Users/...`, `webpack-internal:///`,
  dev-server URLs, `chrome-extension://<id>`, and Electron `app://` paths. The same
  code produces different frame URLs.
- **Produce:** Load the fixture over `file://` on Windows and macOS, through the dev
  server, and inside an Electron shell.

### A27. Dynamic-import and chunk-load failures
- **Why hard:** Chrome writes `Failed to fetch dynamically imported module: <url with
  hash>`, Firefox writes `error loading dynamically imported module`, and Safari writes
  `Importing a module script failed.`. Webpack writes `ChunkLoadError: Loading chunk 5
  failed`, where the chunk ID and URL change with every deploy.
- **Produce:** Load the app, deploy a new build (old chunks deleted), then navigate so
  that a lazy route has to load. Repeat across browsers.

### A28. Cross-realm errors
- **Why hard:** An `Error` created in an iframe's realm fails `instanceof Error` in
  the parent. The SDK may then serialize it as a plain object, so the same bug arrives
  in two shapes.
- **Produce:** Throw from a same-origin iframe function called by the parent, and from
  the parent directly.

### A29. Message mutated or extended after creation
- **Why hard:** Code that appends context (`e.message += ' (retry 3)'`), overrides
  `name`, or defines a custom `toString` changes the reported text. The V8 `stack`
  string was captured earlier and still holds the original message.
- **Produce:** Plant a bug whose error passes through a retry layer that edits the
  message.

---

## Part B — Different bugs, similar-looking reports (risk: merging)

### B1. Identical generic messages from different sites
- **Why hard:** `Cannot read properties of undefined (reading 'length')`,
  `x is not a function` and `Unexpected end of JSON input` come from many unrelated
  places in code. Grouping by message alone merges them.
- **Produce:** Plant several separate bugs that produce the same message from
  different functions and files.

### B2. "Script error." from cross-origin scripts
- **Why hard:** A script from another origin without `crossorigin` and CORS headers
  is reduced to `Script error.` with line 0 and no stack. Every bug in that script
  becomes byte-identical. The same bugs show full detail when CORS is configured
  (which is also a split case, see A16).
- **Produce:** Serve the buggy script from a second local origin, with and without
  `crossorigin="anonymous"` + `Access-Control-Allow-Origin`.

### B3. Shared throwing helpers: assert, invariant, fetch wrappers, loggers
- **Why hard:** Every failure throws from `invariant()`, `assertDefined()`,
  `fetchJson()` or `logError()`, which calls `capture(new Error(msg))`. The top frames
  are identical, and the actual bug is in the caller.
- **Produce:** Route several different planted bugs through one helper, with both
  distinct and identical messages.

### B4. Library and framework frames dominate the stack
- **Why hard:** Stacks that are mostly `react-dom`, the Vue runtime, jQuery or lodash
  end in the same library frame (for example React's `Objects are not valid as a
  React child`). Different app bugs look alike unless the first *app* frame is found.
- **Produce:** Two different components each render an object as a child. Two
  different callers pass bad arguments to the same lodash or jQuery function.

### B5. Network-failure messages hiding different causes
- **Why hard:** `Failed to fetch`, `NetworkError when attempting to fetch resource.`
  and `Load failed` cover CORS misconfiguration, offline clients, ad-blocker blocking,
  DNS failure, a server that is down, and an aborted request. These are different
  endpoints and different bugs with one message.
- **Produce:** Use Playwright `route.abort()` per endpoint, offline mode, a
  misconfigured CORS endpoint, and request-blocking rules.

### B6. Non-Error throwables and empty messages
- **Why hard:** `throw "oops"`, `throw {code: 1}`, `Promise.reject()`,
  `reject(new Response())` and `new Error()` with no message carry no stack and almost
  no distinguishing data. They come out as `[object Object]`, `undefined`, or
  "Non-Error promise rejection".
- **Produce:** Plant several different bugs that each reject or throw a primitive, a
  plain object or `undefined`, from different code sites.

### B7. Two defects in one function, or on one minified line
- **Why hard:** One function can hold two distinct bugs (null `a.x` vs null `b.y`). In
  a minified bundle everything is on line 1, so only the column separates them.
  Grouping at function or line level merges them.
- **Produce:** Plant two independent defects in one function and trigger each one on
  its own, in both minified and unminified builds.

### B8. Pre-constructed or reused error objects
- **Why hard:** A module-level `const NOT_READY = new Error('not ready')` is thrown
  from many places. The stack was captured at creation, so it is identical for
  unrelated bugs.
- **Produce:** Throw one shared error instance from several planted bug sites.

### B9. Errors from browser extensions and third-party scripts
- **Why hard:** Extension content scripts, page translation (Chrome Translate
  rewriting DOM text, which makes React throw `Failed to execute 'removeChild' on
  'Node'`), analytics and ad scripts all raise errors that look like app errors. App
  bugs and extension-caused errors with the same message should stay apart.
- **Produce:** Use a Playwright persistent context with a test extension loaded.
  Simulate translation by mutating text nodes the way the translator does. Embed a
  deliberately buggy third-party script tag.

### B10. Browser noise that is not an app bug
- **Why hard:** `ResizeObserver loop completed with undelivered notifications`,
  benign `AbortError`s, and errors fired during page unload are high-volume,
  message-only noise. They tend to absorb real bugs that share partial features.
- **Produce:** Trigger ResizeObserver loops, abort in-flight fetches when navigating
  away, and throw during `pagehide`.

### B11. WebAssembly traps
- **Why hard:** Every panic or trap shows up as `RuntimeError: unreachable` (V8),
  `unreachable executed` (Firefox) or `Unreachable code should not be executed`
  (Safari), with frames like `wasm-function[123]`. Different bugs look identical, and
  frame indices change between builds.
- **Produce:** Compile a small Rust or C module with two different panics to wasm and
  trigger each one in all three engines.

### B12. Same message and top frame, different upstream cause
- **Why hard:** A formatter crashes on `null` because caller A passes an unvalidated
  API field, and in a separate case because caller B has an off-by-one. The fault frame
  is the same, but these may be different bugs with different fixes (see C1).
- **Produce:** Plant two distinct upstream defects that feed bad input into one shared
  function.

### B13. Vendored copies and duplicated code
- **Why hard:** Copy-pasted functions, or one library bundled twice in two chunks,
  give identical names and messages at different locations. Separately, different
  libraries can share common minified names.
- **Produce:** Bundle a library twice (two versions in separate chunks) and plant the
  same-looking defect in two copied modules.

### B14. Messages that confuse the stack parser
- **Why hard:** V8's `stack` string begins with the message. A multi-line message, or
  one that contains text like `    at foo (x.js:1:1)`, can inject fake frames. Two
  bugs with crafted or user-supplied multi-line messages may then parse as the same
  stack.
- **Produce:** Throw errors whose messages include newlines, stack-like text, very
  long Unicode, emoji and RTL characters (for example user input copied into
  messages).

### B15. Stack overflow and out-of-memory errors
- **Why hard:** Different recursion bugs all produce `Maximum call stack size
  exceeded` with truncated stacks of repeated frames. Only the recurring function
  tells them apart.
- **Produce:** Plant two different infinite-recursion bugs and trigger each in all
  engines.

---

## Part C — Cases where the label itself is debatable (need a policy)

### C1. Same symptom, different root cause (or the reverse)
- **Why hard:** It is unclear whether a "bug" means one crash site or one root cause.
  B12 and A17 depend on the answer. The corpus should mark these cases and score them
  under a stated policy.
- **Produce:** Use the B12 and A17 fixtures. Label both the crash site and the root
  cause.

### C2. Cascading errors
- **Why hard:** The first error leaves broken state, and later errors with different
  messages and stacks follow from it. They could be one bug or several.
- **Produce:** Plant a bug that corrupts a store, then trigger downstream reads.

### C3. Race conditions with several symptoms
- **Why hard:** One timing bug crashes at different places depending on
  interleaving.
- **Produce:** Inject random delays through Playwright routes or `setTimeout` jitter,
  and run many iterations.

### C4. Regressions
- **Why hard:** A bug is fixed in release N and comes back in N+5, perhaps in
  different code. Is that the same bug or a new one?
- **Produce:** Use fixture releases that fix a bug and then reintroduce it, both
  verbatim and in changed form.

### C5. Handled vs unhandled, and double reporting
- **Why hard:** One error can be captured manually by an inner layer *and* reach the
  global handler. This tests dedup as well as grouping.
- **Produce:** Capture in a `catch`, then re-throw.

### C6. Identical bug across projects, apps or tenants
- **Why hard:** Two apps share a library with a bug. Grouping should presumably stay
  within one project, so the corpus should check that it does not leak across
  projects.
- **Produce:** Run two fixture apps with different project keys and the same buggy
  shared module.

### C7. Burst volume from a single bug
- **Why hard:** A bug thrown in a `requestAnimationFrame` loop sends thousands of
  near-identical reports. Small differences such as timing or frame counts must not
  open new groups.
- **Produce:** Put the bug in a render loop and record every payload the SDK sends.
