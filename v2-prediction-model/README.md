# v2 prediction model

These scripts produced the predictions and the evidence in the BugSense
fingerprint v2 pre-registration (`docs/fingerprint-eval-v2.md` in the bugsense
repository). They are a throwaway model of the proposed v2 key, not its
implementation. They run against the v1 corpus in this repository.

| File | What it is | Registered hash |
|---|---|---|
| `v2model.mjs` | The model of the v2 key: stack parser, top-app-frame selection, message normalisation, request identity, stackless rules. Each design choice is a switchable option. | Yes (section 5.1) |
| `run.mjs` | Runs one model configuration over the v1 corpus, writes a synthetic replay file, and scores it with this repository's `score.mjs`. With `{"v1":true}` it uses the real v1 function instead, which checks that the pipeline reproduces the published v1 gates. | Yes (section 5.1) |
| `infofree.mjs` | The field-by-field comparison behind Appendix A: for each hard-negative pair and each cell, which payload fields differ. | No |
| `replay-v2.mjs` | The regression check of the real implementation against prediction line (a) of section 5.2. Details below. | No |
| `demo.mjs` | Captures what the real SDK 1.4.0 posts for one deliberate crash in Chromium, Firefox and WebKit, and the v2 key of each payload. Produced the three-engine payload table. Details below. | No |
| `http-regression/` | The evidence for the HTTP regression table: section 7, step 3, run through the real telemetry endpoint at commit `17c71b29145a5128d378c55b0b1d457f22c96294`. Details below. | No |

## Hashes

SHA-256, as recorded in the pre-registration:

```
15ff0dfa384ce9df17bc00287a2fabceb211adade4405161aa35812ecb48c1be  v2model.mjs
137fa0da2e1dfee95d3459319ad50bf6fe4c6d2f213f6295cf3362246450862a  run.mjs
```

`infofree.mjs`, `replay-v2.mjs` and `demo.mjs` were added after the
pre-registration was written, so their hashes are not in that document:

```
0d003da708bb77e5fe08a712ae6873b0145b97e417574411d94eb7de55211918  infofree.mjs
a0c2a0a04ab15c5328e6bbc62eed3577159ea8b1b8224a7ef30d76f669c872b0  replay-v2.mjs
f4da4fe1c6b18695096293a33993da1b2fd145dafe6313768490fbe741fb0c55  demo.mjs
```

Do not edit the two registered files. Any change, even to a path, breaks the
match with the registered hash.

## Absolute paths

The scripts contain absolute paths for the machine they were written on:

- `run.mjs`, `infofree.mjs` and `replay-v2.mjs` read the corpus from
  `E:/professional/Projects/bugsense-eval`.
- `run.mjs` also imports the v1 key from
  `E:/professional/Projects/bugsense/server/utils/fingerprint.util.js`.
- `replay-v2.mjs` imports the v2 key from that same file, and `clampString`
  from `E:/professional/Projects/bugsense/server/utils/sanitize.js`.
- `demo.mjs` reads the SDK from
  `E:/professional/Projects/bugsense/server/public/sdk/bugsense.js`, imports
  the v2 key from `fingerprint.util.js` in the same repository, and imports
  Playwright from `E:/professional/Projects/bugsense-eval/node_modules/playwright`.

On another machine, run them from a copy with the paths edited, and leave the
originals here unchanged.

## Running

Run these from this folder with Node 18 or later.

```sh
node run.mjs '{"v1":true}' v1check
node run.mjs '{"K":1,"message":"canonical","sdkMessage":true,"request":true,"requestOnly":true,"scriptErrorRoute":false}' proposal
node infofree.mjs 'G21+G22,G28+G29,G6+G7'
```

The first command reproduces the published v1 gates. The second gives the
pre-registered prediction, line (b) of section 5.2; drop `"sdkMessage":true`
to get line (a). The third prints the Appendix A comparison.

`run.mjs` writes its output under `out/`, next to itself. That folder is
ignored by git. `infofree.mjs` only prints.

## The regression check: `replay-v2.mjs`

```sh
node replay-v2.mjs
```

**What it does:**

1. Takes every v1 corpus report exactly as captured.
2. Passes it through the telemetry controller's input normalisation for the
   fields the key reads: the `project`, `title` and `errorLog` defaults and
   limits, and the last 30 breadcrumbs with their category and message
   limits.
3. Computes the fingerprint with the real `generateFingerprintV2` from the
   bugsense repository.
4. Writes a replay file whose bug ID is that fingerprint, and scores it with
   this repository's `score.mjs`.

It then prints a JSON summary:

| Field | Content |
|---|---|
| `gates` | the eight gate values and bands. These are the "measured" column of the regression table |
| `headline`, `versionOnly`, `browserOnly` | the counts and the per-pair and per-incident recall behind the gates |
| `hardNegativeMerges`, `ordinaryMerges` | which incident pairs merged |
| `validity` | the scorer's validity checks |
| `partitionVsModel` | report pairs where the implementation and the registered model `v2model.mjs` disagree on same bug or not. Expected: 0 |
| `keyTextDiffersFromModel` | reports whose key text differs from the model's. Expected: 17, the G11 and Node differences declared in Amendment 1 (P2, P10) |
| `deterministicAcrossReplayOrders` | whether recomputing in both recorded replay orders gives the same fingerprints |

**This is a function-level replay, not the HTTP replay** of section 7, step
3. No report is sent to a running BugSense stack, and the telemetry controller
is not involved beyond the input normalisation it copies. It shows that the
key function matches the prediction. It does not show that the server, once
wired to v2, does. The seed gate it reports is identical by construction,
because the bug ID is a pure function of the report. The real seed check needs
the HTTP replay.

It writes `scored/` next to itself (the replay file, `results.json` and
`results.md`). That folder is ignored by git.

## The three-engine payload capture: `demo.mjs`

```sh
node demo.mjs
```

**What it does:**

1. Starts a local HTTP server on a free port, bound to `127.0.0.1`. The server
   serves a one-button page at `/shop/cart?coupon=SAVE10`, the SDK at
   `/sdk/bugsense.js` (same origin, `data-project="Demo Shop"`, no widget), and
   a small `app.js`.
2. In `app.js`, the button's click handler calls `formatPrice(undefined)`
   through `renderCartLine`, so `product.price` throws a TypeError.
3. In Playwright's Chromium, Firefox and WebKit, each in a fresh browser,
   it loads the page, clicks the button, and waits up to 5 seconds for the
   report.
4. The server records the body the SDK posts to `/api/telemetry/report` and
   forwards nothing.

For each engine it prints the browser version, the payload (breadcrumbs shown
as one line each, `browserInfo` cut to the browser name), and the v2 key that
`buildKeyV2` gives the payload. The expected result is one identical key for
all three:

```
fp2::Demo Shop::nullish-read price::formatPrice@/app.js::::
```

**What decides the output:**
- **The code in the bugsense working tree when it runs.** It reads the SDK
  and the key from there. The published table was produced from the SDK 1.4.0
  change before that change was committed. To reproduce it exactly, check out
  the bugsense commit that contains the change.
- **The browser builds.** Playwright 1.64.1 installs Chromium 156.0.8078.4,
  Firefox 157.0 and WebKit 27.2, and the script prints the versions it used.
  Other builds may word messages or place columns differently.
- **The port** is chosen at random on each run, so the URLs inside `errorLog`
  differ between runs. Nothing else in the payload, and nothing in the key,
  depends on it.

It only prints. It writes no files.

## The HTTP regression check: `http-regression/`

This folder holds the evidence for the HTTP regression table: the v1 corpus
replayed through the real telemetry endpoint, as section 7, step 3 of the
pre-registration requires. It is the full check that `replay-v2.mjs`
approximates at function level.

**How it was run** (`orchestrate.mjs`). The commit under test was
`17c71b29145a5128d378c55b0b1d457f22c96294`, from a clean working tree. For
seeds 1 and 2:

1. A fresh database in an in-memory MongoDB, seeded with the server's own
   seed script.
2. The server from that commit on `127.0.0.1:8090`, with `NODE_ENV=production`.
   No AI key, webhooks or ingest key were loaded.
3. This repository's `replay.mjs` sends the 748 corpus reports and 10
   controls in that seed's order.

**How it was compared** (`compare.mjs`):
- the endpoint's grouping, against the function-level v2 key on the same
  reports;
- the two runs, against each other;
- both runs, scored with `score.mjs` at SHA-256
  `08b4e12f52ec41188fe20d2558a9e821016e37e6185f972fdab7cc762d45465a`. That is
  the scorer before the seeded-bug change of Amendment 2.

**Results:**
- Every gate equals prediction line (a) of section 5.2.
- 0 of 279,378 report pairs disagree between the endpoint and the function,
  in either run.
- The two arrival orders group identically.
- That scorer marks both runs void on one check only: "four seeded bugs"
  against 7 recorded, which Amendment 2 addresses.

| File | What it is | SHA-256 |
|---|---|---|
| `run-seed1.jsonl`, `run-seed2.jsonl` | the replay records | `dbc3debf11b7fb7dfa6dcaebb31f18fbb448871436ddfacc21a9d7df7ca0817d`, `1e720d0985257f0a00fa66fcdcdb62f15c41aff72ccef40b8ac5c04c23af3c18` |
| `scored/results.json`, `scored/results.md` | `score.mjs` output for the two runs | `9580874f28eda3e114fe6fe6f83a5d0f0c2bb45172806fed1398912ca50f7e5a`, `27934ea4db13baeecec7d3f7d1255d07662379c8a0a174a9ad1b1863412a8be1` |
| `compare.json` | the endpoint-vs-function and seed-vs-seed comparison | `e7e88a05cd3e77e2404806ce92bc25b8776e6c2a4c0ff76ad2021680eb27aa2f` |
| `orchestrate.mjs`, `compare.mjs` | the scripts | `430be49855ae3ff644f39072989ed9a96c046f912a727c72f303951b4a9f5080`, `dda8e446148bf68ca2914bd730d55d3e1cace42c53db74a12895be79a81f173f` |
| `seed-*.log`, `server-*.log`, `replay-*.log`, `orchestrate.log` | the logs of each step | |

The scripts were run from a scratch folder, and write their output next to
themselves. To re-run them here, they need the bugsense repository at that
commit, at the absolute path they name.
