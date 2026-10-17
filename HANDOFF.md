# Handoff: grouping-evaluation corpus, frozen

Stage two of DESIGN.md is complete up to and including the freeze. The
builder has **not** replayed the corpus against the system under test and
has not scored any real result. Whoever runs the replay should be someone
other than the builder.

**Status: corpus v1 frozen** (`corpus.lock`, `lockVersion: 1`). There are 748 reports out of 778 planned: 349 `browser-prod`, 331 `browser-dev`, and 34 in each of `node-plain` and `node-mapped`. 30 planned reports are missing (3.9%, below the 10% threshold) and are listed in `corpus/dropped.json`. The headline has 680 reports, 115,341 pairs and 1,767 same-incident pairs. Cross-environment, there are 115,519 pairs, 2,053 of them same-incident. All totals are in `corpus.lock`.

## What is in this repository

| Path | What it is |
|---|---|
| `DESIGN.md` | verbatim copy of the pre-registered design (BugSense commit 521f9cb); unchanged |
| `builder-categories.md` | the builder's own categories, committed (`6365fc7`) before DESIGN.md was given; unchanged |
| `CATEGORIES.md` | every category with its origin marks (U, D, B), the builder incidents G1–G30, categories not added and why, and the extended hard-negative list |
| `corpus/reports.jsonl` | one line per report: `id`, the request `path` the SDK posted to, its `contentType`, and `body` = the request body exactly as captured (a string; byte-identical to the wire) |
| `corpus/meta.jsonl` | one line per report: incident, environment, browser and version, app version, Node version and image, variant, trigger, capture time, attempt, fixture commit, body SHA-256. **Never sent by the replay.** |
| `corpus/incidents.json` | the label set (origin marks, variant type), hard-negative pairs, planned counts |
| `corpus/controls.json` | the 10 seeded control picks |
| `corpus/dropped.json` | every planned trigger that was dropped under the retry rule, with each attempt's report count |
| `corpus/capture-log/*.jsonl` | every capture attempt, with every request the capture server received (including the rejected attempts) |
| `corpus/shopfront-v1-to-v2.diff`, `corpus/node-api-v1-to-v2.diff` | the v1→v2 "unrelated feature commit" of each fixture |
| `corpus.lock` | SHA-256 of every corpus file and of `replay.mjs` and `score.mjs`; fixture commits; Playwright, browser and Node image versions; actual totals; hard-negative list; controls; dropped list |
| `replay.mjs` | the replay tool (section 5, steps 1, 3, 4) |
| `score.mjs` | the scoring tool (all of section 5, plus section 4 ungraded) |
| `fixture/shopfront`, `fixture/shopfront.v2.patch` | the browser fixture (React 18.3.1, Vite 8.3.4, axios 1.20.0) and its v2 patch |
| `fixture/mock-backend` | the mock backend (deliberate 404/500/502 responses) |
| `fixture/node-api`, `fixture/node-api.v2.patch` | the Express 4 / TypeScript fixture of section 4 |
| `harness/` | capture harness, capture server, plan (the incident list), corpus assembly, freeze, lock check, API probe |
| `test/` | `score-synthetic.mjs` (scorer on synthetic partitions) and `replay-stub.mjs` (replay against a local stub API) |
| `probes/` | the API probe: the throwaway report body, the capture script, and the shape-only output |

## 1. Before the replays

1. Check the corpus is the frozen one:

   ```sh
   node harness/verify-lock.mjs
   ```

   It must print `corpus.lock verified`. Nothing in `corpus/`, `replay.mjs` or `score.mjs` may differ from the lock.

2. Bring up the BugSense stack at the commit under test **on a fresh volume**, seeded, and record that commit for the results document. The stack the builder probed has extra data in it (section 3 below), so it must not be used as is.

3. Node 22 or later is needed on the machine running the replay; there are no npm dependencies for `replay.mjs` or `score.mjs`.

## 2. Exact commands

Run 1 (graded), on a fresh, seeded volume:

```sh
node replay.mjs --base http://localhost:8090 --seed 1 --out runs/run-seed1.jsonl
```

Then wipe the volume, start fresh, seed again, and run 2:

```sh
node replay.mjs --base http://localhost:8090 --seed 2 --out runs/run-seed2.jsonl
```

Then score:

```sh
node score.mjs runs/run-seed1.jsonl runs/run-seed2.jsonl --out results/
```

`results/results.md` is the human-readable report (verdict, validity checks,
every gate with its band, headline lines, breakdowns, baselines, seed
comparison, every false merge, section 4, and appendices with every false
split, every byte-identical pair and every short incident).
`results/results.json` holds the same numbers.

Notes on the replay:

- It logs in with the seeded admin (`--email`, `--password` to override), lists every bug first and records their ids as the seeded bugs (it warns if there are not exactly four), then sends every corpus report once in an order shuffled by `--seed` (mulberry32, Fisher-Yates), one at a time, then the 10 controls verbatim.
- Pacing: at least 1100 ms between telemetry posts (about 55/min, under the 60/min limit). A `429` is retried after `Retry-After` / the `RateLimit` reset (up to 30 times); network errors and 5xx up to 3 times. 748 corpus sends plus 10 controls take about 14 minutes per run. That stays under the 2000 requests per 15 minutes for all of `/api`.
- It sends only the captured body to the captured path (`/api/telemetry/report`) with the captured `Content-Type`. No metadata and no browser headers are sent.
- `--out` refuses to overwrite an existing file.
- Per send it records only the HTTP status, `bugId`, `occurrences` and attempt count; at the end it records the ids and occurrence counts of all bugs. It stores no other response field.

## 3. How the replay tells which bug a report landed on (probes)

Two throwaway reports, not in the corpus, were sent to the running stack at
`http://localhost:8090` on 2026-10-17. They were the same captured SDK body
(an `Error('eval probe throwaway report, not part of the corpus')` thrown
from a scratch page, captured by the capture server) sent twice. Only key
names and id- or count-like values were printed (`harness/probe-api.mjs`,
output in `probes/probe-output.txt`):

- `POST /api/telemetry/report` answered **201** the first time and **200** the second time. Both responses have the keys `success`, `status`, `bugId`, `occurrences`. `bugId` was the same ObjectId both times, and `occurrences` went 1 → 2.
- `GET /api/bugs?page=1&limit=100` returns `{ bugs: [...], total, page, pages, limit }`. Before the probes it listed 4 bugs (the seeded ones, each `occurrences=1`); after probe 1 a fifth id appeared, the one returned as `bugId`; after probe 2 that bug had `occurrences=2`.
- Rate-limit headers: `ratelimit: limit=60, remaining=…, reset=60`, `ratelimit-policy: 60;w=60`.

**Method:** the landing bug is the `bugId` in the telemetry response (201 = new bug, 200 = existing bug). The bug listing is used only to record the seeded bugs before the replay and, at the end, the ids and counts of every bug.

**The probed stack now holds one extra bug (the probe, 2 occurrences) in project "Fingerprint Eval".** Step 2 of section 5 says to wipe and reseed after the probes. The builder may not touch the containers, so this is left to the operator. Both replays must start from a fresh volume.

## 4. Deviations from DESIGN.md, and why

1. **What `message` and `stack` mean.** The SDK's wire payload has no `message` or `stack` keys. Its keys are `title`, `errorLog`, `description`, `severity`, `priority`, `project`, `breadcrumbs` and `browserInfo`. The scorer treats `title` as the message and `errorLog` as the stack. These are the fields that carry them: for uncaught errors `title` is `Uncaught <Name>: <message>`, and for rejections it is `Unhandled Promise Rejection: <message>`. The byte-identity split and both baselines use these two fields. `corpus/incidents.json` records the mapping.
2. **`captureError` puts the context in `title`.** For B1–B3, the documented call `BugSense.captureError(error, info.componentStack)` produces a report whose `title` is the component stack, with `errorLog` holding the error's stack. That is what the SDK sends, so the corpus keeps it as is. For B1–B3, the "message" in the byte-identity check is therefore the component stack.
3. **Telemetry path.** The brief names `POST /api/telemetry`. The SDK actually posts to `/api/telemetry/report`, and each corpus line records the path it was captured on. The replay posts to that path.
4. **Corpus size.** The builder added 30 incidents (G1–G30, all origin B; see CATEGORIES.md), 9 of them variants (7 data variants, 2 call-path variants), and 8 hard-negative pairs. The browser plan is 57 incidents × 6 cells + 13 variants = 355 reports per environment. The section 1 size table therefore no longer applies; `corpus.lock` has the actual totals.
5. **Dropped reports (30), under the retry rule.** Each was retried three times and is listed in `corpus/dropped.json` with each attempt's report count:
   - **Chromium C4, C5, C6, both environments, both versions (12):** every attempt delivered zero requests to the capture server. Firefox and WebKit reported all three normally. A black-box check without the SDK showed that headless Chromium 156 fires no `unhandledrejection` for a rejected `res.json()`. With the SDK on the page, no `unhandledrejection` reached even a listener registered before the SDK for a fetch network failure, even when app code awaited it. This is investigated further in `diagnostics/C4-C6.md`.
   - **B1, B2, B3 in `browser-dev`, all browsers and versions (18):** every attempt delivered two reports. In React 18 development builds, a render error caught by an error boundary is also re-thrown to `window.onerror`, so the SDK sends an uncaught-error report as well as the `captureError` report. Under the one-trigger-one-report rule these are dropped. B1–B3 are therefore measured in `browser-prod` only.
6. **G18 uses a native DOM listener.** The builder changed this before any capture, after the dev smoke test showed that a bare string thrown from a React `onClick` is reported twice in React dev mode (React's dev rethrow). The incident still tests what it was added for: a synchronous non-Error throw through the uncaught path.
7. **Data for variants.** Variant data reaches the page through a Playwright init script, as `window.__FIXTURE__` or `localStorage`, so that the page URL stays the same. The exceptions are G10, whose data *is* the page path, and G1, whose variant is the browser locale (`de-DE`). Call-path variants click a second button (`#go-alt`) on the same route.
8. **One route per bug.** Every incident has its own route, so the page path also appears in `description` (`Auto-captured crash on <path>`) and in the breadcrumbs. DESIGN.md anticipates this ("page URL or breadcrumbs, that the system could have used").
9. **Mock backend in a container.** It runs from `node:22-alpine` as `eval-mock`, so that the real Node stack it returns for G28/G29 contains `/srv/mock/server.mjs` rather than a host path.
10. **Section 4 reporter.** It posts the same JSON keys the SDK posts. `title` uses the SDK's two formats, and `errorLog` is `err.stack`. `description` is `Auto-captured crash on <req.path>`, which is the SDK's page-path field, with no query string. `severity` and `priority` take the SDK's values (`major`, `high`). `breadcrumbs` is `[]`, and the `browserInfo` fields are empty strings. Errors from the error middleware use the uncaught format. The process-level `unhandledRejection` (F2) uses the rejection format and an empty `description`, because no request is known at process level.
11. **Section 4 runtime.** Each cell (app version × Node version) is a Docker image built from `node:22-alpine` / `node:24-alpine` (`harness/node-api.Dockerfile`). `npm ci` and `tsc` run inside the image, because bind-mounting `node_modules` from Windows was too slow to start. Every trigger runs in a fresh container process. Mongoose has no database connection; the `CastError` is raised before any connection is needed. The capture ran in four chunks (one per environment × app version). An earlier, interrupted run's log is kept in `corpus/capture-log/superseded/` and is not used.
12. **Graded run.** `score.mjs` grades the first run (seed 1). The second run is used for the seed-comparison gate and is reported for reference. The seed gate compares the partitions of the browser reports only; the Node partitions are compared and reported, ungraded.
13. **Seeded bugs.** A corpus report landing on a seeded bug counts as an ordinary false merge under the first gate.
14. **Breakdowns by origin.** Each gate is recomputed on the incidents carrying each mark (U, D, B, and B-only). For merge gates, a merged pair counts if either incident carries the mark. For hard-negative pairs, the pair's own origin counts too. These are context; the verdict uses the full set.
15. **Long messages in the Markdown listing** are cut at 600 characters, with the number of omitted characters stated. The full text is in `corpus/reports.jsonl`.
16. **Engines.** Playwright 1.64.1: Chromium 156.0.8078.4 (the default headless shell), Firefox 157.0 and WebKit 27.2, on Windows 11. React StrictMode is not used.
17. **Fixture commits.** `browser-prod` was captured at `9a4a9a2`, `browser-dev` at `a0a436d`, and Node at `9117df8`. Between `9a4a9a2` and `a0a436d` nothing changed in the browser fixture or the browser capture harness (`git diff 9a4a9a2 a0a436d -- fixture/shopfront fixture/mock-backend harness/capture-browser.mjs harness/trigger.mjs harness/plan.mjs` is empty).

## 5. Notes for the quarantine audit

- The builder's working directory is `E:\professional\Projects\bugsense-eval`, so every absolute path in the transcript starts with the string `E:\professional\Projects\bugsense`, followed by `-eval`. Nothing outside `bugsense-eval` was listed, read or searched. The builder never `cd`-ed above it, and no glob or grep was run on the parent directory.
- The word "fingerprint" appears in the transcript in three ways. It appears when DESIGN.md was read. It appears in the SDK attribute value `data-project="Fingerprint Eval"`. And it appears once as a **key name** in the probe output, the listing item key `fingerprint`. Its value was never printed, stored or read. `probe-api.mjs` prints strings only as `<string len N>`.
- The SDK was loaded only through the fixture's `<script>` tag. It was never fetched, read, saved or grepped. No Playwright tracing, HAR recording or response-body access was enabled. One black-box check ran `Function.prototype.toString` on `window.fetch` and kept only a boolean for whether it was native. This showed that the SDK wraps `fetch`. No source text was printed.
- The BugSense containers were not exec'd, copied, inspected, exported, composed or restarted. `docker ps` was run once, to list container names and status. The builder's own containers were `eval-mock` (mock backend) and `eval-node-api` (Node fixture), both built from `node:22-alpine` / `node:24-alpine`, on the network `eval-net`. The dashboard UI was never opened.
- The `.claude/` directory in this repository was not read, and it is not committed.
