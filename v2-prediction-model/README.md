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

## Hashes

SHA-256, as recorded in the pre-registration:

```
15ff0dfa384ce9df17bc00287a2fabceb211adade4405161aa35812ecb48c1be  v2model.mjs
137fa0da2e1dfee95d3459319ad50bf6fe4c6d2f213f6295cf3362246450862a  run.mjs
```

`infofree.mjs` was added after the pre-registration was written, so its hash
is not in that document:

```
0d003da708bb77e5fe08a712ae6873b0145b97e417574411d94eb7de55211918  infofree.mjs
```

Do not edit the two registered files. Any change, even to a path, breaks the
match with the registered hash.

## Absolute paths

The scripts contain absolute paths for the machine they were written on:

- `run.mjs` and `infofree.mjs` read the corpus from
  `E:/professional/Projects/bugsense-eval`.
- `run.mjs` also imports the v1 key from
  `E:/professional/Projects/bugsense/server/utils/fingerprint.util.js`.

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
