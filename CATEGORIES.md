# Hard-case categories and their origin

This file follows DESIGN.md section 3. Every category is marked with where it
came from:

- **U**: named in the owner's prompt
- **D**: added by the design session
- **B**: proposed by the builder in `builder-categories.md` (commit `6365fc7`),
  before the builder saw DESIGN.md. That file is unchanged.

A category proposed by more than one source carries every mark that applies.
Builder category IDs (A1–A29, B1–B15, C1–C7) refer to the headings in
`builder-categories.md`. Incident IDs refer to DESIGN.md section 1 (A1–E2),
section 4 (F1–F8) and the builder incidents below (G1–G30).
`harness/plan.mjs` is the machine-readable form of this file, and the scorer
reads the incident origin marks from it (through `corpus/incidents.json`).

## 1. Section 3 categories, with builder overlaps

| Category | Origin | Overlapping builder categories | Incidents |
|---|---|---|---|
| Chrome, Firefox and Safari stack formats | U, B | A1, A2 | every browser incident (3 browsers per cell) |
| Minified bundles | U, B | A5 | every `browser-prod` report |
| Source-mapped frames (server-side only, section 4) | U, B | A16 | `node-mapped` (F1–F8) |
| React component stacks | U | — | B1, B2, B3 |
| Express/Node server traces (section 4) | U | — | F1–F8 |
| axios failures | U, B | B4 | C1, C2, C3, F5 |
| fetch failures | U, B | B5 | C4, C5, F6, F7 |
| Async rejections | U, B | A13, A14 | D1, C1–C6, G5 (variant), G13, G28, G29, F2 |
| Same bug from different browsers | U, B | A1 | every browser incident |
| Same bug across app versions with shifted line numbers | U, B | A6 | every incident (v1/v2) |
| Different bugs with similar top frames | U, B | B3, B4, B12 | A8a/A8b, B2/B3, C1/C2, G6/G7, G28/G29 |
| Unminified dev-server builds | D, B | A18, A26 | every `browser-dev` report |
| Lazy-chunk file hashes that change per build | D, B | A7, A27 | A2 |
| Minifier renaming identifiers between builds | D, B | A5 | every `browser-prod` report; G3 puts a renamed identifier in the message |
| Engine-specific error messages (recursion, JSON, fetch) | D, B | A1, A3, A19, B5, B15 | A5, A6, C4, C5, C6, G13, G24, G25, G30 |
| Values and IDs embedded in messages | D, B | A8 | A6, A7, C3, F3, G1, G9, G13, G15 |
| The same message thrown from different sites | D, B | B1 | A3/A4, F1/F4, G16/G17, G26/G27 |
| The same bug reached through different call paths | D, B | A4 | A9, F8, G4, G5 |
| Production React minified error codes | D, B | A18 | B2, B3, B4 (prod) |
| Stackless rejections (string and object reasons) | D, B | B6 | D2, D3, D4 |
| Stacks cut at a timer boundary | D, B | A14 | D5 |
| Cross-origin `Script error.` with no stack | D, B | B2 | E1, E2 |
| Node runtime upgrades shifting internal frames (section 4) | D | — | F1–F8 (node:22 vs node:24) |

## 2. Builder categories not covered by section 1, and the incidents added for them

Each of these is origin **B** only. The incidents are browser incidents with
the standard cells (3 browsers × 2 app versions, in both browser
environments). Incidents marked ◆ also get section 1's extra variant report
in the Chromium/v1 cell.

| Builder category | What the incident tests | Incident(s) | Variant |
|---|---|---|---|
| A9 Locale and i18n in messages | Order-limit error embeds an `Intl.NumberFormat` total: `€1,234.50` (en-US) vs `1.234,50 €` (de-DE) | G1 ◆ | data: browser locale de-DE |
| A10 `null` vs `undefined` | Cached quote's `shipping` block is absent (standard) or `null` (variant): "of undefined" vs "of null" | G2 ◆ | data: stored JSON |
| A11 Expression text in the message changes with build | `tracker.trackPurchase is not a function`; in prod the receiver is a minified call expression such as `ci(...)`, renamed between v1 and v2 | G3 | — |
| A12 Receiver type changes the frame name | One shared `describeItem` installed on two classes: `Product.describeItem [as describe]` vs `Bundle.describeItem [as describe]` | G4 ◆ | call path: Bundle instead of Product |
| A13 Delivery channel (uncaught vs rejection) | The same `parseGiftCard` defect reached synchronously (uncaught error) or after an `await` (unhandled rejection) | G5 ◆ | call path: async route |
| A17 Wrapped and re-thrown errors | Shared `withRetry` throws `Operation failed after retries` with `{ cause }` for two unrelated defects | G6, G7 (hard negative) | — |
| A19 Stack depth and truncation | Defect at the bottom of a recursive thread flattener: depth 3 vs depth 14 (beyond V8's 10-frame limit, so the entry frames disappear) | G8 ◆ | data: thread depth |
| A20 Very long, data-dependent messages | Whole API payload stringified into the message: 3 items vs 150 items (several kB) | G9 ◆ | data: payload size |
| A23 Inline scripts carry the page URL | Legacy inline `<script>` in `index.html`; its frames name the document URL, which embeds a product id | G10 ◆ | data: `/recently-viewed/12` vs `/97` |
| A23 `eval` / `new Function` frames | CMS rule compiled with `new Function` | G11 | — |
| A24 Blob URLs | Pricing plugin loaded from a `blob:` URL with a fresh random UUID on every page load | G12 | — |
| A27 Dynamic-import failures | Missing locale bundle; the module URL is in the message (Chromium, Firefox), and the wording differs per engine | G13 ◆ | data: `pt-BR` vs `sv-SE` |
| A28 Cross-realm errors | `TypeError` constructed in a same-origin iframe's realm, thrown into the parent's click handler | G14 | — |
| A29 Message mutated after creation | Retry layer appends `(after N attempts)` to `err.message` (V8's `stack` keeps the original header) | G15 ◆ | data: 3 vs 5 attempts |
| B6 Empty messages | `throw new Error()` with no message, from two different sites | G16, G17 (hard negative) | — |
| B6 Non-Error throwables through the uncaught path | `throw 'Invalid quantity'` synchronously, from a DOM listener | G18 | — |
| B7 Two defects in one function | `buildShippingLabel` reads `billing.address.zip` (guest orders) and `shipping.address.zip` (pickup orders); identical V8 message, adjacent lines | G19, G20 (hard negative) | — |
| B8 Pre-constructed, reused error objects | One module-level `PAYMENTS_NOT_READY` error thrown from two features; stack captured at module load, so the stacks are identical | G21, G22 (hard negative) | — |
| B10 Browser noise | `ResizeObserver loop completed with undelivered notifications.` (no error object) | G23 | — |
| B11 WebAssembly traps | Two kernel functions that trap on `unreachable`; frames are numbered (`wasm-function[0]` / `[1]`), and v2 adds a function so the numbers shift | G24, G25 (hard negative) | — |
| B13 Copy-pasted code | `normalizePhone` duplicated in `checkout/phone.js` and `account/phone.js`, same defect, same name and message | G26, G27 (hard negative) | — |
| B14 Messages that look like stacks | Debug backend returns its real Node error and stack; the client embeds both in a multi-line message thrown from a shared helper, called with an empty list by two different buggy callers | G28, G29 (hard negative) | — |
| B15 A second, different stack overflow | `deepClone` recursing on a back-reference; same engine messages as A5 | G30 (hard negative with A5) | — |

### Variant types of the builder incidents (for section 5's gates)

- **Data variants** (row "Isolated data-variant pairs"): G1, G2, G8, G9, G10, G13, G15.
- **Call-path variants** (row "Isolated call-path pairs"): G4, G5.

## 3. Builder categories that got no new incident, and why

| Builder category | Origin | Why no incident was added |
|---|---|---|
| A1 Engine wording, A2 stack formats | U, B | Covered by section 1 (every incident in 3 engines). |
| A3 Wording changes between engine versions | B | Section 1 pins one engine build per browser through the Playwright version. Older engines would add a cell axis the design does not have. Not measured; listed here so the results can state it. |
| A4 Different paths into the faulty function | D, B | Covered by A9 (and F8). |
| A5 Minification, A6 code moving between releases | U, D, B | Covered by `browser-prod` and the v1/v2 cells. |
| A7 Script URLs (hashes, CDNs, query strings, environments) | D, B | Chunk hashes covered by A2 and every prod report. Different hosts are covered only across environments (prod and dev origins differ), where splits are informational. Query strings are not varied, because DESIGN.md section 3 records that the SDK strips them. |
| A8 Dynamic data in messages | D, B | Covered by A6, A7, C3. |
| A14 Async vs sync stacks | U, D, B | Covered by D1, D5 and G5. |
| A15 Transpilation target / differential serving | B | Would need a second (legacy) bundle per environment, i.e. a new environment axis. Not measured. |
| A16 Source maps present for some reports and missing for others | U, B | Browsers never apply source maps (DESIGN.md section 1); the only mapped/plain contrast is section 4 (`node-mapped` vs `node-plain`). |
| A18 Dev vs prod framework builds | D, B | Covered by the two browser environments and B2–B4. |
| A21 SDK instrumentation frames sometimes present | B | Needs control over SDK load order relative to app code. The fixture loads the SDK exactly as DESIGN.md prescribes (a blocking `<script>` tag before the app), and section 6 excludes SDK client behaviour. One related black-box observation is in HANDOFF.md: in Chromium, fetch failures never reach the SDK. |
| A22 Polyfills changing stacks or rejections | B | Would change the fixture's dependencies, which v1/v2 must keep identical. Not measured. |
| A24 (workers part) Errors in Web/Service Workers | B | Uncaught worker errors never reach the page's `window.onerror`, so the SDK cannot see them without app code that the design does not describe. The blob-URL part is G12. |
| A25 Mobile browsers and webviews | — | Excluded by DESIGN.md section 6 (no real Safari, macOS or iOS). |
| A26 Environment-specific paths (`file://`, Electron, `webpack-internal://`) | D, B | Dev-server paths are covered by `browser-dev`. The other hosts are out of scope. |
| B1 Identical generic messages from different sites | D, B | Covered by A3/A4 (and by G16/G17, G19/G20, G26/G27). |
| B2 `Script error.` | D, B | Covered by E1/E2. |
| B3 Shared throwing helpers, B12 same message and top frame | U, B | Covered by A8a/A8b (and G6/G7, G28/G29). |
| B4 Library frames dominate | U, B | Covered by B2/B3 and C1/C2. |
| B5 Network failures hiding different causes | U, B | Covered by C4/C5. |
| B9 Extensions and third-party scripts | D, B | Extensions are excluded by section 6. Third-party scripts without CORS are E1/E2. |
| C1–C7 Debatable labels (root cause vs crash site, cascading errors, races, regressions, double reporting, cross-project, bursts) | B | Ground truth here is defined by trigger (one trigger, one report, one incident), so cases whose label is a policy choice have no trigger-defined answer. Races, regressions, cross-project grouping and bursts are excluded by section 6. C1's "same symptom, different root cause" is represented the way the design treats it: each root cause is its own incident (A8a/A8b, G28/G29). |

## 4. Hard-negative pairs

Different bugs designed to look alike. Section 5's second gate row counts the
distinct pairs from this list that are merged; its band thresholds (0, 1–2,
≥ 3) do not change with the length of the list.

| Pair | Origin of the pair | Why they look alike |
|---|---|---|
| A3 / A4 | D | same message, different site |
| A8a / A8b | D | identical message and top frame |
| B2 / B3 | D | same React invariant; top frames inside react-dom; here also the same object keys, so the same message |
| C1 / C2 | D | identical axios message and top frames |
| C4 / C5 | D | identical network-failure message |
| D2 / D3 | D | stackless string rejections |
| E1 / E2 | D | `Script error.`, no stack |
| G6 / G7 | B | same wrapper message and top frame (`withRetry`) |
| G16 / G17 | B | empty message (`Error`) |
| G19 / G20 | B | same function and V8 message, adjacent lines |
| G21 / G22 | B | one shared error object: identical message and stack |
| G24 / G25 | B | wasm `unreachable` traps in one module |
| G26 / G27 | B | copy-pasted function: same name and message |
| G28 / G29 | B | same multi-line message, embedded server stack, shared helper on top |
| A5 / G30 | B | both stack overflows; same per-engine message |

Section 4 (not graded) keeps the design's pairs F1/F4 and F6/F7.
