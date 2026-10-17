# Corpus difficulty compared with the pre-registered corpus

These figures come from the corpus alone: the labels (`corpus/meta.jsonl`,
`corpus/incidents.json`) and the captured payloads (`corpus/reports.jsonl`).
No system output was used. Nothing has been replayed or scored.

- Corpus: corpus version 1, as locked by `corpus.lock` v2. `reports.jsonl` has
  SHA-256 `de4b8cd8…e412404` and `meta.jsonl` has SHA-256 `3e65f811…32ac452`.
  `node harness/verify-lock.mjs` passes.
- Computation: `node analysis/difficulty.mjs`, which writes `analysis/difficulty.json`.
- Scope: the headline, i.e. within-environment pairs in `browser-prod` (349
  reports) and `browser-dev` (331 reports). That is 680 reports from 57
  incidents.

The pre-registered figures are DESIGN.md's (section 1 "Size", and section 5
"Why these numbers"). They assume 27 incidents and every planned report
captured.

## Summary

| Statistic | Pre-registered | Actual |
|---|---|---|
| Share of headline same-incident pairs in incidents whose captured messages differ by engine | ~12% (104 of 858) | **61.8% (1,092 of 1,767)**, from 45 of 57 incidents |
| Hard-negative pairs | 7 | **15** (the design's 7 plus the builder's 8) |
| Same-incident rate (same-incident pairs ÷ all headline pairs) | 3.13% (858 / 27,390) | **1.53% (1,767 / 115,341)**, confirmed from the corpus |

Supporting figures:

| | Pre-registered | Actual |
|---|---|---|
| Incidents in the headline | 27 | 57 |
| Headline reports | 332 | 680 |
| Headline pairs | 27,390 | 115,341 |
| Same-incident pairs | 858 | 1,767 (×2.06) |
| Different-incident (negative) pairs | 26,532 | 113,574 (×4.28) |
| Negative pairs per same-incident pair | 30.9 | 64.3 |
| Distinct incident pairs (the unit of the merge gates) | 351 | 1,596 |
| Recall if every cross-browser pair of the engine-differing incidents splits (the scenario the 0.85 threshold was derived from) | ≈ 0.88 per pair (1 − 104/858 = 0.879) and ≈ 0.88 per incident | **0.382 per pair, 0.383 per incident** |

## 1. Engine-differing incidents

**Test.** The message field is `title` (see `corpus/incidents.json`,
`messageField`). The comparison works like this:

1. For each incident, within each browser environment and each app version,
   take the standard (non-variant) reports.
2. Compare their `title` strings byte for byte across the browsers that have a
   report in that cell. Normally that is three browsers; for C4–C6 it is two,
   because the Chromium cells were dropped.
3. An incident is **engine-differing** if, in any environment × version group,
   those titles are not all byte-identical.

Nothing is normalised. Variant reports are left out of the comparison, so a
data value or call path that differs cannot make an incident look
engine-differing. Version differences are compared only within a version.

**Pair count.** The pre-registered 104 is the number of **cross-browser**
same-incident pairs (pairs whose two reports come from different browsers) of
the four incidents DESIGN.md names as engine-specific: A5, A6, C4 and C6. That
works out as 12 + 16 + 12 + 12 = 52 per environment, × 2. The same definition
is used here:

- **cross-browser same-incident pairs of the engine-differing incidents: 1,092 of 1,767 = 61.8%**;
- for reference, all same-incident pairs of those incidents, same-browser ones included: 1,395 of 1,767 = 78.9%.

**The 45 engine-differing incidents:** A1, A2, A3, A4, A5, A6, A7, A8a, A8b,
A9, B1, B2, B3, B4, C4, C5, C6, D5, G1, G2, G3, G4, G5, G6, G7, G8, G9, G10,
G11, G12, G13, G14, G15, G16, G17, G18, G19, G20, G21, G22, G24, G25, G26, G27
and G30.

**The 12 that are not:** C1, C2 and C3 (`Unhandled Promise Rejection: Request
failed with status code …`); D1, D2, D3 and D4 (rejections whose text comes
from app code); E1 and E2 (`Script error.`); G23 (`ResizeObserver loop
completed with undelivered notifications.`); and G28 and G29 (rejections whose
text comes from the server).

The four incidents the pre-registration counted contribute 72 cross-browser
pairs in this corpus. Their Chromium cells were dropped for C4 and C6 (see
`diagnostics/C4-C6.md`), which is why the figure is 72 rather than 104.

**Why so many differ.** This breakdown is context only. The test above is the
statistic, and the breakdown makes no claim about what the system does.

| Kind of difference (as captured) | Incidents | Cross-browser same-incident pairs | Share of 1,767 |
|---|---|---|---|
| **Prefix only.** For uncaught errors, Chromium's titles begin `Uncaught ` and Firefox's and WebKit's do not. Otherwise the titles are equal, up to the 200-character cap that every captured `title` respects: the prefix also shifts where a long title is cut (B4 prod, G9). G16/G17 also differ in a trailing `: ` (`Uncaught Error` / `Error: ` / `Error`). | 15: A3, A4, A7, B4, D5, G1, G6, G7, G9, G14, G15, G16, G17, G21, G22 | 392 | 22.2% |
| **Wording.** The engine's own message text differs (null/undefined access, recursion, JSON, network, module import, wasm traps, `is not a function`, a string thrown, the expression text embedded in the message). | 27: A1, A2, A5, A6, A8a, A8b, A9, C4, C5, C6, G2, G3, G4, G5, G8, G10, G11, G12, G13, G18, G19, G20, G24, G25, G26, G27, G30 | 664 | 37.6% |
| **Component-stack format.** The title is the React component stack passed to `captureError`, written in each engine's frame syntax. | 3: B1, B2, B3 | 36 | 2.0% |

Leaving out the prefix-only incidents altogether still leaves 30
engine-differing incidents with 700 cross-browser pairs, which is 39.6% of
same-incident pairs. If all of those split, recall would be 0.604 per pair and
0.591 per incident. Both are well below 0.85.

## 2. Hard-negative pairs

There are 15 pairs. The design's 7 are A3/A4, A8a/A8b, B2/B3, C1/C2, C4/C5,
D2/D3 and E1/E2. The builder's 8 are G6/G7, G16/G17, G19/G20, G21/G22, G24/G25,
G26/G27, G28/G29 and A5/G30. All 15 are present in the corpus.

Together they make up 1,004 headline report pairs. Most pairs contribute
72 (6 × 6 in each environment). C4/C5 contributes 32, because its Chromium
cells are missing, and B2/B3 contributes 36, because it is in `browser-prod`
only. Their origins and reasons are in `CATEGORIES.md` section 4.

The second merge gate counts distinct hard-negative pairs merged, with fixed
bands: 0 is Good, 1–2 is Publish, 3 or more is Change. With 15 designated
pairs instead of 7, there are twice as many ways to reach those bands, and the
bands themselves do not move (DESIGN.md: "the counts in that row do not change
however many pairs are added").

## 3. Same-incident rate

Confirmed from the corpus:

- **1,767 same-incident pairs out of 115,341 headline pairs = 1.53%.**
- `browser-prod`: 906 of 60,726. `browser-dev`: 861 of 54,615.
- Pre-registered: 858 of 27,390 = 3.13%.

Why the rate halved: with *k* incidents of roughly *r* reports each in an
environment, the same-incident pairs number about *k* · C(*r*, 2). That grows
**linearly** in *k*. All pairs number C(*k*·*r*, 2), and the negative pairs
(all minus same-incident) grow with the **square** of *k*. Going from 27 to 57
incidents roughly doubled the same-incident pairs (×2.06) but more than
quadrupled the negative pairs (×4.28). There are now 64.3 negative pairs for
every same-incident pair, against 30.9 in the pre-registered arithmetic.

So **precision is materially harder to hold than the pre-registered arithmetic
assumed**:

- any per-pair tendency to merge unrelated reports produces about twice as
  many false-merge pairs per true pair;
- the merge gates are counted in incident pairs, and there are 1,596 distinct
  incident pairs that could merge, against 351. The first gate tolerates zero
  ordinary merges.

## Overall direction: harder

This corpus is **harder** than the one the 0.85 recall threshold was derived
against, on both sides of the metric.

- **Recall, driven by the share of engine-differing pairs.** The threshold
  argument assumed that engine-specific messages put about 12% of same-incident
  pairs at risk. If all of those split, recall would be about 0.88. Here the
  same definition gives 61.8%, and the same all-split scenario gives about 0.38.
  Even ignoring incidents that differ only by the `Uncaught ` prefix, the share
  is 39.6% and the scenario gives about 0.60. A grouping that keys on the
  captured message text, without reconciling engines, would therefore fall far
  below 0.85 here, where on the pre-registered corpus it would have passed.
- **Precision and the merge gates, driven by the same-incident rate and the
  hard-negative count.** The same-incident rate is 1.53% instead of 3.13%: there
  are 64.3 negative pairs per positive instead of 30.9, and 1,596 incident pairs
  that could merge instead of 351. There are 15 designated hard-negative pairs
  instead of 7, under unchanged band counts.

One factor pulls the other way, and only slightly. The dropped cells (C4–C6 in
Chromium, B1–B3 in `browser-dev`) remove some of the hardest cross-browser
pairs from the denominator. With them, the engine-differing share would be
higher still.

**The 0.85 threshold stands as pre-registered.** No threshold is proposed here.
These are the measurements the amendment can quote.
