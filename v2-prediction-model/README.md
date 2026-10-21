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

## Hashes

SHA-256, as recorded in the pre-registration:

```
15ff0dfa384ce9df17bc00287a2fabceb211adade4405161aa35812ecb48c1be  v2model.mjs
137fa0da2e1dfee95d3459319ad50bf6fe4c6d2f213f6295cf3362246450862a  run.mjs
```

`infofree.mjs` and `replay-v2.mjs` were added after the pre-registration was
written, so their hashes are not in that document:

```
0d003da708bb77e5fe08a712ae6873b0145b97e417574411d94eb7de55211918  infofree.mjs
a0c2a0a04ab15c5328e6bbc62eed3577159ea8b1b8224a7ef30d76f669c872b0  replay-v2.mjs
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
