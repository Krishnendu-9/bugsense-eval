# bugsense-eval

A blind, pre-registered evaluation of how well [BugSense](https://github.com/Krishnendu-9/bugsense)
groups duplicate crash reports.

When BugSense's browser SDK reports an error, the server decides whether it is
a new bug or another occurrence of a known one. This repository measures that
decision: 748 real error reports, captured from two test apps across three
browser engines, two builds and two app versions, replayed against a running
BugSense and scored pair by pair.

**Verdict: change the code.** Identical repeats group perfectly, but the same
bug is rarely grouped once its circumstances change. That result led to
BugSense's fingerprint v2.

## Why a separate repository

A test written by someone who has read the code tends to test what the code
already does. So the corpus was built blind:

- **Built without seeing the code.** The builder was a fresh Claude Code session
  started in this repository. Its permission rules (`.claude/settings.json`)
  denied reading the BugSense folder, fetching from GitHub, and inspecting the
  BugSense containers. It used BugSense only from outside: the SDK through its
  `<script>` tag, and the API over HTTP.
- **Thresholds fixed first.** The design and every pass/fail threshold
  (`DESIGN.md`) were committed and pushed before any report was captured.
- **Frozen before scoring.** `corpus.lock` records a SHA-256 of every corpus
  file and of both scripts, committed before the first replay.
- **Audited afterwards.** The builder's transcript was searched for every
  forbidden path and for the word `fingerprint`: no breach (reported in
  BugSense's results document).

## The corpus

| | |
|---|---|
| Reports | 748 of 778 planned (349 browser production build, 331 browser dev build, 68 Node) |
| Apps | `fixture/shopfront` (React + Vite + axios) and `fixture/node-api` (Express + TypeScript) |
| Engines | Chromium, Firefox and WebKit via Playwright 1.64.1 |
| Variations | browser engine, app version (an unrelated feature commit), dev vs production build, data and call-path variants |
| Hard cases | 15 pairs of different bugs that look alike, which must **not** be merged |
| Missing | 30 reports, all investigated before scoring and explained in `diagnostics/` |

## Results

From `results/summary.md`, graded run (seed 1):

| Check | Result |
|---|---|
| Exact repeats merged with their original | 10 of 10 |
| Two replays in different orders | identical grouping |
| Same-bug pairs grouped (headline recall) | 0.29 |
| Same bug across browser engines | 0.28 |
| Same bug across an unrelated release | 0.23 |
| Unrelated bugs wrongly merged | 9 pairs |

What the numbers mean, and what changed because of them:
[fingerprint-results.md](https://github.com/Krishnendu-9/bugsense/blob/main/docs/fingerprint-results.md).
The v2 fingerprint's predictions were modelled in `v2-prediction-model/`; v2
has **not** yet been measured on held-out data
([fingerprint-results-v2.md](https://github.com/Krishnendu-9/bugsense/blob/main/docs/fingerprint-results-v2.md)).

## What is where

| Path | Contents |
|---|---|
| `DESIGN.md` | The pre-registered design and thresholds |
| `CATEGORIES.md`, `builder-categories.md` | Every kind of crash in the corpus, and why |
| `corpus/`, `corpus.lock` | The captured reports, their labels, and the freeze |
| `replay.mjs`, `score.mjs` | Replay the corpus against BugSense, then score it |
| `runs/`, `results/` | Both replays, and the scored results (every false merge and split listed) |
| `fixture/`, `harness/` | The test apps and the capture tooling |
| `diagnostics/` | Why 30 planned reports do not exist |
| `v2-prediction-model/` | The model behind the v2 predictions |
| `HANDOFF.md` | The full run book |

## Re-running it

Requires Node 22+. Replay and scoring need no npm packages; Playwright is only
for re-capturing.

```sh
node harness/verify-lock.mjs            # must print: corpus.lock v2 verified
# start BugSense on a fresh, seeded database at http://localhost:8090, then:
node replay.mjs --base http://localhost:8090 --seed 1 --out runs/run-seed1.jsonl
# wipe and re-seed BugSense, then:
node replay.mjs --base http://localhost:8090 --seed 2 --out runs/run-seed2.jsonl
node score.mjs runs/run-seed1.jsonl runs/run-seed2.jsonl --out results/
```

Each replay takes about 14 minutes, paced under BugSense's rate limits.
`--out` refuses to overwrite existing files, so move the committed runs aside
first. Details are in `HANDOFF.md`.
