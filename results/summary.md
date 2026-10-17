# Grouping evaluation: summary and gates

> Split from `results.md` by `harness/split-results.mjs`; see [results/README.md](README.md).

# Grouping evaluation: scored results

Corpus `reports.jsonl` sha256 `de4b8cd84e871a29207f3ced21309e56efe9fc8f163b846dc8b354471e412404`. Graded run: `run-seed1.jsonl` (seed 1). Comparison run: `run-seed2.jsonl` (seed 2).

**Verdict: Change the code**

## Validity checks

| check | run 1 | run 2 | detail (run 1) |
|---|---|---|---|
| every control merges with its original | pass | pass | all 10 merged |
| every report lands after retries | pass | pass | all landed |
| no more than 10% of planned reports missing | pass | pass | 30 of 778 planned missing (3.9%) |
| run replayed this corpus | pass | pass | reports.jsonl sha256 in run header matches |
| quarantine audit finds no breach | not checked | not checked | not checked by this tool: the audit of the builder transcript is separate, and its outcome must be stated in the results |

## Gates

| gate | value | band | rule |
|---|---|---|---|
| Merges between two incidents that are not a designated hard-negative pair (headline or cross-environment) | 9 | Change the code | distinct incident pairs merged (a report landing on a seeded bug counts) |
| Distinct hard-negative pairs merged, in either environment or across them, byte-identical pairs included | 9 | Change the code | distinct hard-negative pairs merged |
| Headline recall (lower of per-pair and per-incident) | 0.2864 | Change the code | Good >= 0.85; publish 0.70 <= r < 0.85; change < 0.70 |
| Version-only recall, each browser environment (lower of the two) | 0.2262 | Change the code | Good >= 0.95; publish 0.80 <= r < 0.95; change < 0.80 in either |
| Browser-only recall, both browser environments pooled (lower of the two) | 0.2778 | Change the code | Good >= 0.80; publish 0.50 <= r < 0.80; change < 0.50 |
| Isolated data-variant pairs (each environment) | 8 of 20 merged | Change the code | all merged = Good; any split = change the code |
| Isolated call-path pairs (each environment) | 0 of 6 merged | Publish with the limitation stated | all merged = Good; any split = publish with the limitation |
| Seed 1 vs seed 2 partitions | identical | Good | identical = Good; any difference = publish with the limitation |

## Headline

| | TP | FP | FN | TN | precision | recall per pair | recall per incident | lower |
|---|---|---|---|---|---|---|---|---|
| Headline (graded): all within-environment pairs in browser-prod and browser-dev | 506 | 252 | 1261 | 113322 | 0.6675 | 0.2864 | 0.2896 | 0.2864 |
| Headline excluding byte-identical different-incident pairs (47 pairs removed) | 506 | 205 | 1261 | 113322 | 0.7117 | 0.2864 | 0.2896 | 0.2864 |

Byte-identical (`title` + `errorLog`) same-incident pairs, kept in both lines: 170. Byte-identical different-incident pairs: 47.

### By environment

| | TP | FP | FN | TN | precision | recall per pair | recall per incident | lower |
|---|---|---|---|---|---|---|---|---|
| browser-prod | 164 | 112 | 742 | 59708 | 0.5942 | 0.1810 | 0.1912 | 0.1810 |
| browser-dev | 342 | 140 | 519 | 53614 | 0.7095 | 0.3972 | 0.4022 | 0.3972 |
| cross-environment (browser-prod x browser-dev; splits informational, merges count toward the merge gates) | 267 | 32 | 1786 | 113434 | 0.8930 | 0.1301 | 0.1481 | 0.1301 |

### By axes that differ (same-incident pairs)

| | TP | FP | FN | TN | precision | recall per pair | recall per incident | lower |
|---|---|---|---|---|---|---|---|---|
| browser-prod: browser-only | 94 | 0 | 236 | 0 | 1 | 0.2848 | 0.2749 | 0.2749 |
| browser-prod: several | 28 | 0 | 367 | 0 | 1 | 0.0709 | 0.0819 | 0.0709 |
| browser-prod: variant-only | 4 | 0 | 9 | 0 | 1 | 0.3077 | 0.3077 | 0.3077 |
| browser-prod: version-only | 38 | 0 | 130 | 0 | 1 | 0.2262 | 0.2368 | 0.2262 |
| browser-dev: browser-only | 90 | 0 | 222 | 0 | 1 | 0.2885 | 0.2778 | 0.2778 |
| browser-dev: several | 94 | 0 | 283 | 0 | 1 | 0.2493 | 0.2593 | 0.2493 |
| browser-dev: variant-only | 4 | 0 | 9 | 0 | 1 | 0.3077 | 0.3077 | 0.3077 |
| browser-dev: version-only | 154 | 0 | 5 | 0 | 1 | 0.9686 | 0.9660 | 0.9660 |
| pooled: browser-only | 184 | 0 | 458 | 0 | 1 | 0.2866 | 0.2778 | 0.2778 |
| pooled: several | 122 | 0 | 650 | 0 | 1 | 0.1580 | 0.1637 | 0.1580 |
| pooled: variant-only | 8 | 0 | 18 | 0 | 1 | 0.3077 | 0.3077 | 0.3077 |
| pooled: version-only | 192 | 0 | 135 | 0 | 1 | 0.5872 | 0.5760 | 0.5760 |

### Isolated variant pairs

| incident | type | environment | pair | merged |
|---|---|---|---|---|
| A6 (D, B) | data | browser-prod | R0006 / R0007 | **no** |
| A7 (D, B) | data | browser-prod | R0008 / R0009 | yes |
| A9 (D, B) | callpath | browser-prod | R0012 / R0013 | **no** |
| C3 (U, D, B) | data | browser-prod | R0020 / R0021 | yes |
| G1 (B) | data | browser-prod | R0029 / R0030 | **no** |
| G2 (B) | data | browser-prod | R0031 / R0032 | **no** |
| G4 (B) | callpath | browser-prod | R0034 / R0035 | **no** |
| G5 (B) | callpath | browser-prod | R0036 / R0037 | **no** |
| G8 (B) | data | browser-prod | R0040 / R0041 | yes |
| G9 (B) | data | browser-prod | R0042 / R0043 | **no** |
| G10 (B) | data | browser-prod | R0044 / R0045 | **no** |
| G13 (B) | data | browser-prod | R0048 / R0049 | **no** |
| G15 (B) | data | browser-prod | R0051 / R0052 | yes |
| A6 (D, B) | data | browser-dev | R0355 / R0356 | **no** |
| A7 (D, B) | data | browser-dev | R0357 / R0358 | yes |
| A9 (D, B) | callpath | browser-dev | R0361 / R0362 | **no** |
| C3 (U, D, B) | data | browser-dev | R0366 / R0367 | yes |
| G1 (B) | data | browser-dev | R0375 / R0376 | **no** |
| G2 (B) | data | browser-dev | R0377 / R0378 | **no** |
| G4 (B) | callpath | browser-dev | R0380 / R0381 | **no** |
| G5 (B) | callpath | browser-dev | R0382 / R0383 | **no** |
| G8 (B) | data | browser-dev | R0386 / R0387 | yes |
| G9 (B) | data | browser-dev | R0388 / R0389 | **no** |
| G10 (B) | data | browser-dev | R0390 / R0391 | **no** |
| G13 (B) | data | browser-dev | R0394 / R0395 | **no** |
| G15 (B) | data | browser-dev | R0397 / R0398 | yes |

### By category origin

Every gate restricted to the incidents carrying each mark. Merge gates count merged pairs that involve at least one such incident; for hard-negative pairs, the pair's own origin also counts. These bands are context; the verdict uses the full set.

| gate | U | D | B | B-only |
|---|---|---|---|---|
| Merges between two incidents that are not a designated hard-negative pair (headline or cross-environment) | 7 (Change the code) | 7 (Change the code) | 9 (Change the code) | 7 (Change the code) |
| Distinct hard-negative pairs merged, in either environment or across them, byte-identical pairs included | 4 (Change the code) | 4 (Change the code) | 9 (Change the code) | 5 (Change the code) |
| Headline recall (lower of per-pair and per-incident) | 0.2212 (Change the code) | 0.3736 (Change the code) | 0.2877 (Change the code) | 0.2460 (Change the code) |
| Version-only recall, each browser environment (lower of the two) | 0.1081 (Change the code) | 0.3684 (Change the code) | 0.2303 (Change the code) | 0.1889 (Change the code) |
| Browser-only recall, both browser environments pooled (lower of the two) | 0.2051 (Change the code) | 0.3417 (Change the code) | 0.2768 (Change the code) | 0.2444 (Change the code) |
| Isolated data-variant pairs (each environment) | 2 of 2 merged (Good) | 4 of 6 merged (Change the code) | 8 of 20 merged (Change the code) | 4 of 14 merged (Change the code) |
| Isolated call-path pairs (each environment) | 0 of 0 merged (Good) | 0 of 2 merged (Publish with the limitation stated) | 0 of 6 merged (Publish with the limitation stated) | 0 of 4 merged (Publish with the limitation stated) |
| headline recall per pair / per incident | 0.2212 / 0.2238 | 0.3794 / 0.3736 | 0.2877 / 0.2924 | 0.2460 / 0.2502 |
| incidents | 13 | 20 | 56 | 30 |

## Reference baselines (context, not gates)

| | TP | FP | FN | TN | precision | recall per pair | recall per incident | lower |
|---|---|---|---|---|---|---|---|---|
| byte-equal message + stack | 170 | 47 | 1597 | 113527 | 0.7834 | 0.0962 | 0.1067 | 0.0962 |
| byte-equal message alone | 737 | 504 | 1030 | 113070 | 0.5939 | 0.4171 | 0.4141 | 0.4141 |

| gate | message + stack | message alone |
|---|---|---|
| Merges between two incidents that are not a designated hard-negative pair (headline or cross-environment) | 0 (Good) | 2 (Change the code) |
| Distinct hard-negative pairs merged, in either environment or across them, byte-identical pairs included | 6 (Change the code) | 13 (Change the code) |
| Headline recall (lower of per-pair and per-incident) | 0.0962 (Change the code) | 0.4141 (Change the code) |
| Version-only recall, each browser environment (lower of the two) | 0.1548 (Change the code) | 0.9167 (Publish with the limitation stated) |
| Browser-only recall, both browser environments pooled (lower of the two) | 0.0819 (Change the code) | 0.2865 (Change the code) |
| Isolated data-variant pairs (each environment) | 2 of 20 merged (Change the code) | 8 of 20 merged (Change the code) |
| Isolated call-path pairs (each environment) | 0 of 6 merged (Publish with the limitation stated) | 4 of 6 merged (Publish with the limitation stated) |

## Seed comparison

Browser reports: partitions identical. Node reports (not graded): identical.

Run 2 for reference: headline recall (lower) 0.2864, precision 0.6675; gate bands ordinary-merges=Change the code, hard-negative-merges=Change the code, headline-recall=Change the code, version-only-recall=Change the code, browser-only-recall=Change the code, data-variant-pairs=Change the code, call-path-pairs=Publish with the limitation stated.

## Section 4: server-side reports (not graded)

| | TP | FP | FN | TN | precision | recall per pair | recall per incident | lower |
|---|---|---|---|---|---|---|---|---|
| node-plain | 40 | 8 | 16 | 497 | 0.8333 | 0.7143 | 0.7333 | 0.7143 |
| node-mapped | 40 | 8 | 16 | 497 | 0.8333 | 0.7143 | 0.7333 | 0.7143 |
| node-plain x node-mapped | 49 | 16 | 97 | 994 | 0.7538 | 0.3356 | 0.3350 | 0.3350 |
| node-plain: node-only | 12 | 0 | 4 | 0 | 1 | 0.7500 | 0.7500 | 0.7500 |
| node-plain: several | 12 | 0 | 10 | 0 | 1 | 0.5455 | 0.6000 | 0.5455 |
| node-plain: variant-only | 0 | 0 | 2 | 0 | n/a | 0 | 0 | 0 |
| node-plain: version-only | 16 | 0 | 0 | 0 | 1 | 1 | 1 | 1 |
| node-mapped: node-only | 12 | 0 | 4 | 0 | 1 | 0.7500 | 0.7500 | 0.7500 |
| node-mapped: several | 12 | 0 | 10 | 0 | 1 | 0.5455 | 0.6000 | 0.5455 |
| node-mapped: variant-only | 0 | 0 | 2 | 0 | n/a | 0 | 0 | 0 |
| node-mapped: version-only | 16 | 0 | 0 | 0 | 1 | 1 | 1 | 1 |

Node x browser pairs: 46240, merged: 0.
Node reports landing on a seeded bug: none.

| kind | pair | incidents | where |
|---|---|---|---|
| split | R0683 / R0692 | F3 / F3 | node-plain |
| merge (hard negative) | R0686 / R0687 | F6 / F7 | node-plain |
| split | R0686 / R0695 | F6 / F6 | node-plain |
| merge (hard negative) | R0686 / R0705 | F6 / F7 | node-plain |
| split | R0686 / R0712 | F6 / F6 | node-plain |
| split | R0687 / R0696 | F7 / F7 | node-plain |
| merge (hard negative) | R0687 / R0704 | F7 / F6 | node-plain |
| split | R0687 / R0713 | F7 / F7 | node-plain |
| split | R0688 / R0698 | F8 / F8 | node-plain |
| split | R0691 / R0692 | F3 / F3 | node-plain |
| split | R0692 / R0701 | F3 / F3 | node-plain |
| split | R0692 / R0709 | F3 / F3 | node-plain |
| merge (hard negative) | R0695 / R0696 | F6 / F7 | node-plain |
| split | R0695 / R0704 | F6 / F6 | node-plain |
| merge (hard negative) | R0695 / R0713 | F6 / F7 | node-plain |
| split | R0696 / R0705 | F7 / F7 | node-plain |
| merge (hard negative) | R0696 / R0712 | F7 / F6 | node-plain |
| split | R0697 / R0698 | F8 / F8 | node-plain |
| split | R0698 / R0706 | F8 / F8 | node-plain |
| split | R0698 / R0714 | F8 / F8 | node-plain |
| merge (hard negative) | R0704 / R0705 | F6 / F7 | node-plain |
| split | R0704 / R0712 | F6 / F6 | node-plain |
| split | R0705 / R0713 | F7 / F7 | node-plain |
| merge (hard negative) | R0712 / R0713 | F6 / F7 | node-plain |
| split | R0717 / R0726 | F3 / F3 | node-mapped |
| merge (hard negative) | R0720 / R0721 | F6 / F7 | node-mapped |
| split | R0720 / R0729 | F6 / F6 | node-mapped |
| merge (hard negative) | R0720 / R0739 | F6 / F7 | node-mapped |
| split | R0720 / R0746 | F6 / F6 | node-mapped |
| split | R0721 / R0730 | F7 / F7 | node-mapped |
| merge (hard negative) | R0721 / R0738 | F7 / F6 | node-mapped |
| split | R0721 / R0747 | F7 / F7 | node-mapped |
| split | R0722 / R0732 | F8 / F8 | node-mapped |
| split | R0725 / R0726 | F3 / F3 | node-mapped |
| split | R0726 / R0735 | F3 / F3 | node-mapped |
| split | R0726 / R0743 | F3 / F3 | node-mapped |
| merge (hard negative) | R0729 / R0730 | F6 / F7 | node-mapped |
| split | R0729 / R0738 | F6 / F6 | node-mapped |
| merge (hard negative) | R0729 / R0747 | F6 / F7 | node-mapped |
| split | R0730 / R0739 | F7 / F7 | node-mapped |
| merge (hard negative) | R0730 / R0746 | F7 / F6 | node-mapped |
| split | R0731 / R0732 | F8 / F8 | node-mapped |
| split | R0732 / R0740 | F8 / F8 | node-mapped |
| split | R0732 / R0748 | F8 / F8 | node-mapped |
| merge (hard negative) | R0738 / R0739 | F6 / F7 | node-mapped |
| split | R0738 / R0746 | F6 / F6 | node-mapped |
| split | R0739 / R0747 | F7 / F7 | node-mapped |
| merge (hard negative) | R0746 / R0747 | F6 / F7 | node-mapped |
| merge (hard negative) | R0686 / R0721 | F6 / F7 | node-plain x node-mapped |
| merge (hard negative) | R0686 / R0739 | F6 / F7 | node-plain x node-mapped |
| merge (hard negative) | R0687 / R0720 | F7 / F6 | node-plain x node-mapped |
| merge (hard negative) | R0687 / R0738 | F7 / F6 | node-plain x node-mapped |
| merge (hard negative) | R0695 / R0730 | F6 / F7 | node-plain x node-mapped |
| merge (hard negative) | R0695 / R0747 | F6 / F7 | node-plain x node-mapped |
| merge (hard negative) | R0696 / R0729 | F7 / F6 | node-plain x node-mapped |
| merge (hard negative) | R0696 / R0746 | F7 / F6 | node-plain x node-mapped |
| merge (hard negative) | R0704 / R0721 | F6 / F7 | node-plain x node-mapped |
| merge (hard negative) | R0704 / R0739 | F6 / F7 | node-plain x node-mapped |
| merge (hard negative) | R0705 / R0720 | F7 / F6 | node-plain x node-mapped |
| merge (hard negative) | R0705 / R0738 | F7 / F6 | node-plain x node-mapped |
| merge (hard negative) | R0712 / R0730 | F6 / F7 | node-plain x node-mapped |
| merge (hard negative) | R0712 / R0747 | F6 / F7 | node-plain x node-mapped |
| merge (hard negative) | R0713 / R0729 | F7 / F6 | node-plain x node-mapped |
| merge (hard negative) | R0713 / R0746 | F7 / F6 | node-plain x node-mapped |

## Appendix B: byte-identical pairs

| pair | incidents | where | same incident |
|---|---|---|---|
| R0020 / R0021 | C3 / C3 | browser-prod | yes |
| R0023 / R0089 | D2 / D2 | browser-prod | yes |
| R0023 / R0146 | D2 / D2 | browser-prod | yes |
| R0023 / R0200 | D2 / D2 | browser-prod | yes |
| R0023 / R0257 | D2 / D2 | browser-prod | yes |
| R0023 / R0314 | D2 / D2 | browser-prod | yes |
| R0024 / R0090 | D3 / D3 | browser-prod | yes |
| R0024 / R0147 | D3 / D3 | browser-prod | yes |
| R0024 / R0201 | D3 / D3 | browser-prod | yes |
| R0024 / R0258 | D3 / D3 | browser-prod | yes |
| R0024 / R0315 | D3 / D3 | browser-prod | yes |
| R0025 / R0091 | D4 / D4 | browser-prod | yes |
| R0025 / R0148 | D4 / D4 | browser-prod | yes |
| R0025 / R0202 | D4 / D4 | browser-prod | yes |
| R0025 / R0259 | D4 / D4 | browser-prod | yes |
| R0025 / R0316 | D4 / D4 | browser-prod | yes |
| R0027 / R0150 | E1 / E1 | browser-prod | yes |
| R0027 / R0204 | E1 / E1 | browser-prod | yes |
| R0027 / R0318 | E1 / E1 | browser-prod | yes |
| R0028 / R0151 | E2 / E2 | browser-prod | yes |
| R0028 / R0205 | E2 / E2 | browser-prod | yes |
| R0028 / R0319 | E2 / E2 | browser-prod | yes |
| R0048 / R0218 | G13 / G13 | browser-prod | yes |
| R0058 / R0059 | G21 / G22 | browser-prod | no |
| R0060 / R0117 | G23 / G23 | browser-prod | yes |
| R0060 / R0174 | G23 / G23 | browser-prod | yes |
| R0060 / R0228 | G23 / G23 | browser-prod | yes |
| R0060 / R0285 | G23 / G23 | browser-prod | yes |
| R0060 / R0342 | G23 / G23 | browser-prod | yes |
| R0065 / R0066 | G28 / G29 | browser-prod | no |
| R0085 / R0086 | C4 / C5 | browser-prod | no |
| R0085 / R0253 | C4 / C4 | browser-prod | yes |
| R0085 / R0254 | C4 / C5 | browser-prod | no |
| R0086 / R0253 | C5 / C4 | browser-prod | no |
| R0086 / R0254 | C5 / C5 | browser-prod | yes |
| R0087 / R0255 | C6 / C6 | browser-prod | yes |
| R0089 / R0146 | D2 / D2 | browser-prod | yes |
| R0089 / R0200 | D2 / D2 | browser-prod | yes |
| R0089 / R0257 | D2 / D2 | browser-prod | yes |
| R0089 / R0314 | D2 / D2 | browser-prod | yes |
| R0090 / R0147 | D3 / D3 | browser-prod | yes |
| R0090 / R0201 | D3 / D3 | browser-prod | yes |
| R0090 / R0258 | D3 / D3 | browser-prod | yes |
| R0090 / R0315 | D3 / D3 | browser-prod | yes |
| R0091 / R0148 | D4 / D4 | browser-prod | yes |
| R0091 / R0202 | D4 / D4 | browser-prod | yes |
| R0091 / R0259 | D4 / D4 | browser-prod | yes |
| R0091 / R0316 | D4 / D4 | browser-prod | yes |
| R0093 / R0261 | E1 / E1 | browser-prod | yes |
| R0094 / R0262 | E2 / E2 | browser-prod | yes |
| R0107 / R0275 | G13 / G13 | browser-prod | yes |
| R0115 / R0116 | G21 / G22 | browser-prod | no |
| R0117 / R0174 | G23 / G23 | browser-prod | yes |
| R0117 / R0228 | G23 / G23 | browser-prod | yes |
| R0117 / R0285 | G23 / G23 | browser-prod | yes |
| R0117 / R0342 | G23 / G23 | browser-prod | yes |
| R0139 / R0140 | C1 / C2 | browser-prod | no |
| R0142 / R0143 | C4 / C5 | browser-prod | no |
| R0142 / R0310 | C4 / C4 | browser-prod | yes |
| R0142 / R0311 | C4 / C5 | browser-prod | no |
| R0143 / R0310 | C5 / C4 | browser-prod | no |
| R0143 / R0311 | C5 / C5 | browser-prod | yes |
| R0146 / R0200 | D2 / D2 | browser-prod | yes |
| R0146 / R0257 | D2 / D2 | browser-prod | yes |
| R0146 / R0314 | D2 / D2 | browser-prod | yes |
| R0147 / R0201 | D3 / D3 | browser-prod | yes |
| R0147 / R0258 | D3 / D3 | browser-prod | yes |
| R0147 / R0315 | D3 / D3 | browser-prod | yes |
| R0148 / R0202 | D4 / D4 | browser-prod | yes |
| R0148 / R0259 | D4 / D4 | browser-prod | yes |
| R0148 / R0316 | D4 / D4 | browser-prod | yes |
| R0150 / R0204 | E1 / E1 | browser-prod | yes |
| R0150 / R0318 | E1 / E1 | browser-prod | yes |
| R0151 / R0205 | E2 / E2 | browser-prod | yes |
| R0151 / R0319 | E2 / E2 | browser-prod | yes |
| R0157 / R0158 | G6 / G7 | browser-prod | no |
| R0164 / R0332 | G13 / G13 | browser-prod | yes |
| R0172 / R0173 | G21 / G22 | browser-prod | no |
| R0174 / R0228 | G23 / G23 | browser-prod | yes |
| R0174 / R0285 | G23 / G23 | browser-prod | yes |
| R0174 / R0342 | G23 / G23 | browser-prod | yes |
| R0179 / R0180 | G28 / G29 | browser-prod | no |
| R0200 / R0257 | D2 / D2 | browser-prod | yes |
| R0200 / R0314 | D2 / D2 | browser-prod | yes |
| R0201 / R0258 | D3 / D3 | browser-prod | yes |
| R0201 / R0315 | D3 / D3 | browser-prod | yes |
| R0202 / R0259 | D4 / D4 | browser-prod | yes |
| R0202 / R0316 | D4 / D4 | browser-prod | yes |
| R0204 / R0318 | E1 / E1 | browser-prod | yes |
| R0205 / R0319 | E2 / E2 | browser-prod | yes |
| R0226 / R0227 | G21 / G22 | browser-prod | no |
| R0228 / R0285 | G23 / G23 | browser-prod | yes |
| R0228 / R0342 | G23 / G23 | browser-prod | yes |
| R0233 / R0234 | G28 / G29 | browser-prod | no |
| R0253 / R0254 | C4 / C5 | browser-prod | no |
| R0257 / R0314 | D2 / D2 | browser-prod | yes |
| R0258 / R0315 | D3 / D3 | browser-prod | yes |
| R0259 / R0316 | D4 / D4 | browser-prod | yes |
| R0283 / R0284 | G21 / G22 | browser-prod | no |
| R0285 / R0342 | G23 / G23 | browser-prod | yes |
| R0307 / R0308 | C1 / C2 | browser-prod | no |
| R0310 / R0311 | C4 / C5 | browser-prod | no |
| R0325 / R0326 | G6 / G7 | browser-prod | no |
| R0340 / R0341 | G21 / G22 | browser-prod | no |
| R0347 / R0348 | G28 / G29 | browser-prod | no |
| R0365 / R0534 | C2 / C2 | browser-dev | yes |
| R0366 / R0367 | C3 / C3 | browser-dev | yes |
| R0369 / R0432 | D2 / D2 | browser-dev | yes |
| R0369 / R0486 | D2 / D2 | browser-dev | yes |
| R0369 / R0537 | D2 / D2 | browser-dev | yes |
| R0369 / R0591 | D2 / D2 | browser-dev | yes |
| R0369 / R0645 | D2 / D2 | browser-dev | yes |
| R0370 / R0433 | D3 / D3 | browser-dev | yes |
| R0370 / R0487 | D3 / D3 | browser-dev | yes |
| R0370 / R0538 | D3 / D3 | browser-dev | yes |
| R0370 / R0592 | D3 / D3 | browser-dev | yes |
| R0370 / R0646 | D3 / D3 | browser-dev | yes |
| R0371 / R0434 | D4 / D4 | browser-dev | yes |
| R0371 / R0488 | D4 / D4 | browser-dev | yes |
| R0371 / R0539 | D4 / D4 | browser-dev | yes |
| R0371 / R0593 | D4 / D4 | browser-dev | yes |
| R0371 / R0647 | D4 / D4 | browser-dev | yes |
| R0373 / R0490 | E1 / E1 | browser-dev | yes |
| R0373 / R0541 | E1 / E1 | browser-dev | yes |
| R0373 / R0649 | E1 / E1 | browser-dev | yes |
| R0374 / R0491 | E2 / E2 | browser-dev | yes |
| R0374 / R0542 | E2 / E2 | browser-dev | yes |
| R0374 / R0650 | E2 / E2 | browser-dev | yes |
| R0394 / R0555 | G13 / G13 | browser-dev | yes |
| R0404 / R0405 | G21 / G22 | browser-dev | no |
| R0406 / R0460 | G23 / G23 | browser-dev | yes |
| R0406 / R0514 | G23 / G23 | browser-dev | yes |
| R0406 / R0565 | G23 / G23 | browser-dev | yes |
| R0406 / R0619 | G23 / G23 | browser-dev | yes |
| R0406 / R0673 | G23 / G23 | browser-dev | yes |
| R0411 / R0412 | G28 / G29 | browser-dev | no |
| R0428 / R0429 | C4 / C5 | browser-dev | no |
| R0428 / R0587 | C4 / C4 | browser-dev | yes |
| R0428 / R0588 | C4 / C5 | browser-dev | no |
| R0429 / R0587 | C5 / C4 | browser-dev | no |
| R0429 / R0588 | C5 / C5 | browser-dev | yes |
| R0430 / R0589 | C6 / C6 | browser-dev | yes |
| R0432 / R0486 | D2 / D2 | browser-dev | yes |
| R0432 / R0537 | D2 / D2 | browser-dev | yes |
| R0432 / R0591 | D2 / D2 | browser-dev | yes |
| R0432 / R0645 | D2 / D2 | browser-dev | yes |
| R0433 / R0487 | D3 / D3 | browser-dev | yes |
| R0433 / R0538 | D3 / D3 | browser-dev | yes |
| R0433 / R0592 | D3 / D3 | browser-dev | yes |
| R0433 / R0646 | D3 / D3 | browser-dev | yes |
| R0434 / R0488 | D4 / D4 | browser-dev | yes |
| R0434 / R0539 | D4 / D4 | browser-dev | yes |
| R0434 / R0593 | D4 / D4 | browser-dev | yes |
| R0434 / R0647 | D4 / D4 | browser-dev | yes |
| R0436 / R0595 | E1 / E1 | browser-dev | yes |
| R0437 / R0596 | E2 / E2 | browser-dev | yes |
| R0450 / R0609 | G13 / G13 | browser-dev | yes |
| R0458 / R0459 | G21 / G22 | browser-dev | no |
| R0460 / R0514 | G23 / G23 | browser-dev | yes |
| R0460 / R0565 | G23 / G23 | browser-dev | yes |
| R0460 / R0619 | G23 / G23 | browser-dev | yes |
| R0460 / R0673 | G23 / G23 | browser-dev | yes |
| R0479 / R0480 | C1 / C2 | browser-dev | no |
| R0479 / R0638 | C1 / C1 | browser-dev | yes |
| R0479 / R0639 | C1 / C2 | browser-dev | no |
| R0480 / R0638 | C2 / C1 | browser-dev | no |
| R0480 / R0639 | C2 / C2 | browser-dev | yes |
| R0481 / R0640 | C3 / C3 | browser-dev | yes |
| R0482 / R0483 | C4 / C5 | browser-dev | no |
| R0482 / R0641 | C4 / C4 | browser-dev | yes |
| R0482 / R0642 | C4 / C5 | browser-dev | no |
| R0483 / R0641 | C5 / C4 | browser-dev | no |
| R0483 / R0642 | C5 / C5 | browser-dev | yes |
| R0486 / R0537 | D2 / D2 | browser-dev | yes |
| R0486 / R0591 | D2 / D2 | browser-dev | yes |
| R0486 / R0645 | D2 / D2 | browser-dev | yes |
| R0487 / R0538 | D3 / D3 | browser-dev | yes |
| R0487 / R0592 | D3 / D3 | browser-dev | yes |
| R0487 / R0646 | D3 / D3 | browser-dev | yes |
| R0488 / R0539 | D4 / D4 | browser-dev | yes |
| R0488 / R0593 | D4 / D4 | browser-dev | yes |
| R0488 / R0647 | D4 / D4 | browser-dev | yes |
| R0490 / R0541 | E1 / E1 | browser-dev | yes |
| R0490 / R0649 | E1 / E1 | browser-dev | yes |
| R0491 / R0542 | E2 / E2 | browser-dev | yes |
| R0491 / R0650 | E2 / E2 | browser-dev | yes |
| R0497 / R0498 | G6 / G7 | browser-dev | no |
| R0504 / R0663 | G13 / G13 | browser-dev | yes |
| R0512 / R0513 | G21 / G22 | browser-dev | no |
| R0514 / R0565 | G23 / G23 | browser-dev | yes |
| R0514 / R0619 | G23 / G23 | browser-dev | yes |
| R0514 / R0673 | G23 / G23 | browser-dev | yes |
| R0516 / R0674 | G25 / G24 | browser-dev | no |
| R0519 / R0520 | G28 / G29 | browser-dev | no |
| R0537 / R0591 | D2 / D2 | browser-dev | yes |
| R0537 / R0645 | D2 / D2 | browser-dev | yes |
| R0538 / R0592 | D3 / D3 | browser-dev | yes |
| R0538 / R0646 | D3 / D3 | browser-dev | yes |
| R0539 / R0593 | D4 / D4 | browser-dev | yes |
| R0539 / R0647 | D4 / D4 | browser-dev | yes |
| R0541 / R0649 | E1 / E1 | browser-dev | yes |
| R0542 / R0650 | E2 / E2 | browser-dev | yes |
| R0563 / R0564 | G21 / G22 | browser-dev | no |
| R0565 / R0619 | G23 / G23 | browser-dev | yes |
| R0565 / R0673 | G23 / G23 | browser-dev | yes |
| R0570 / R0571 | G28 / G29 | browser-dev | no |
| R0587 / R0588 | C4 / C5 | browser-dev | no |
| R0591 / R0645 | D2 / D2 | browser-dev | yes |
| R0592 / R0646 | D3 / D3 | browser-dev | yes |
| R0593 / R0647 | D4 / D4 | browser-dev | yes |
| R0617 / R0618 | G21 / G22 | browser-dev | no |
| R0619 / R0673 | G23 / G23 | browser-dev | yes |
| R0638 / R0639 | C1 / C2 | browser-dev | no |
| R0641 / R0642 | C4 / C5 | browser-dev | no |
| R0656 / R0657 | G6 / G7 | browser-dev | no |
| R0671 / R0672 | G21 / G22 | browser-dev | no |
| R0678 / R0679 | G28 / G29 | browser-dev | no |
| R0023 / R0369 | D2 / D2 | cross | yes |
| R0023 / R0432 | D2 / D2 | cross | yes |
| R0023 / R0486 | D2 / D2 | cross | yes |
| R0023 / R0537 | D2 / D2 | cross | yes |
| R0023 / R0591 | D2 / D2 | cross | yes |
| R0023 / R0645 | D2 / D2 | cross | yes |
| R0024 / R0370 | D3 / D3 | cross | yes |
| R0024 / R0433 | D3 / D3 | cross | yes |
| R0024 / R0487 | D3 / D3 | cross | yes |
| R0024 / R0538 | D3 / D3 | cross | yes |
| R0024 / R0592 | D3 / D3 | cross | yes |
| R0024 / R0646 | D3 / D3 | cross | yes |
| R0025 / R0371 | D4 / D4 | cross | yes |
| R0025 / R0434 | D4 / D4 | cross | yes |
| R0025 / R0488 | D4 / D4 | cross | yes |
| R0025 / R0539 | D4 / D4 | cross | yes |
| R0025 / R0593 | D4 / D4 | cross | yes |
| R0025 / R0647 | D4 / D4 | cross | yes |
| R0027 / R0373 | E1 / E1 | cross | yes |
| R0027 / R0490 | E1 / E1 | cross | yes |
| R0027 / R0541 | E1 / E1 | cross | yes |
| R0027 / R0649 | E1 / E1 | cross | yes |
| R0028 / R0374 | E2 / E2 | cross | yes |
| R0028 / R0491 | E2 / E2 | cross | yes |
| R0028 / R0542 | E2 / E2 | cross | yes |
| R0028 / R0650 | E2 / E2 | cross | yes |
| R0060 / R0406 | G23 / G23 | cross | yes |
| R0060 / R0460 | G23 / G23 | cross | yes |
| R0060 / R0514 | G23 / G23 | cross | yes |
| R0060 / R0565 | G23 / G23 | cross | yes |
| R0060 / R0619 | G23 / G23 | cross | yes |
| R0060 / R0673 | G23 / G23 | cross | yes |
| R0085 / R0428 | C4 / C4 | cross | yes |
| R0085 / R0429 | C4 / C5 | cross | no |
| R0085 / R0587 | C4 / C4 | cross | yes |
| R0085 / R0588 | C4 / C5 | cross | no |
| R0086 / R0428 | C5 / C4 | cross | no |
| R0086 / R0429 | C5 / C5 | cross | yes |
| R0086 / R0587 | C5 / C4 | cross | no |
| R0086 / R0588 | C5 / C5 | cross | yes |
| R0087 / R0430 | C6 / C6 | cross | yes |
| R0087 / R0589 | C6 / C6 | cross | yes |
| R0089 / R0369 | D2 / D2 | cross | yes |
| R0089 / R0432 | D2 / D2 | cross | yes |
| R0089 / R0486 | D2 / D2 | cross | yes |
| R0089 / R0537 | D2 / D2 | cross | yes |
| R0089 / R0591 | D2 / D2 | cross | yes |
| R0089 / R0645 | D2 / D2 | cross | yes |
| R0090 / R0370 | D3 / D3 | cross | yes |
| R0090 / R0433 | D3 / D3 | cross | yes |
| R0090 / R0487 | D3 / D3 | cross | yes |
| R0090 / R0538 | D3 / D3 | cross | yes |
| R0090 / R0592 | D3 / D3 | cross | yes |
| R0090 / R0646 | D3 / D3 | cross | yes |
| R0091 / R0371 | D4 / D4 | cross | yes |
| R0091 / R0434 | D4 / D4 | cross | yes |
| R0091 / R0488 | D4 / D4 | cross | yes |
| R0091 / R0539 | D4 / D4 | cross | yes |
| R0091 / R0593 | D4 / D4 | cross | yes |
| R0091 / R0647 | D4 / D4 | cross | yes |
| R0093 / R0436 | E1 / E1 | cross | yes |
| R0093 / R0595 | E1 / E1 | cross | yes |
| R0094 / R0437 | E2 / E2 | cross | yes |
| R0094 / R0596 | E2 / E2 | cross | yes |
| R0117 / R0406 | G23 / G23 | cross | yes |
| R0117 / R0460 | G23 / G23 | cross | yes |
| R0117 / R0514 | G23 / G23 | cross | yes |
| R0117 / R0565 | G23 / G23 | cross | yes |
| R0117 / R0619 | G23 / G23 | cross | yes |
| R0117 / R0673 | G23 / G23 | cross | yes |
| R0142 / R0482 | C4 / C4 | cross | yes |
| R0142 / R0483 | C4 / C5 | cross | no |
| R0142 / R0641 | C4 / C4 | cross | yes |
| R0142 / R0642 | C4 / C5 | cross | no |
| R0143 / R0482 | C5 / C4 | cross | no |
| R0143 / R0483 | C5 / C5 | cross | yes |
| R0143 / R0641 | C5 / C4 | cross | no |
| R0143 / R0642 | C5 / C5 | cross | yes |
| R0146 / R0369 | D2 / D2 | cross | yes |
| R0146 / R0432 | D2 / D2 | cross | yes |
| R0146 / R0486 | D2 / D2 | cross | yes |
| R0146 / R0537 | D2 / D2 | cross | yes |
| R0146 / R0591 | D2 / D2 | cross | yes |
| R0146 / R0645 | D2 / D2 | cross | yes |
| R0147 / R0370 | D3 / D3 | cross | yes |
| R0147 / R0433 | D3 / D3 | cross | yes |
| R0147 / R0487 | D3 / D3 | cross | yes |
| R0147 / R0538 | D3 / D3 | cross | yes |
| R0147 / R0592 | D3 / D3 | cross | yes |
| R0147 / R0646 | D3 / D3 | cross | yes |
| R0148 / R0371 | D4 / D4 | cross | yes |
| R0148 / R0434 | D4 / D4 | cross | yes |
| R0148 / R0488 | D4 / D4 | cross | yes |
| R0148 / R0539 | D4 / D4 | cross | yes |
| R0148 / R0593 | D4 / D4 | cross | yes |
| R0148 / R0647 | D4 / D4 | cross | yes |
| R0150 / R0373 | E1 / E1 | cross | yes |
| R0150 / R0490 | E1 / E1 | cross | yes |
| R0150 / R0541 | E1 / E1 | cross | yes |
| R0150 / R0649 | E1 / E1 | cross | yes |
| R0151 / R0374 | E2 / E2 | cross | yes |
| R0151 / R0491 | E2 / E2 | cross | yes |
| R0151 / R0542 | E2 / E2 | cross | yes |
| R0151 / R0650 | E2 / E2 | cross | yes |
| R0164 / R0504 | G13 / G13 | cross | yes |
| R0164 / R0663 | G13 / G13 | cross | yes |
| R0174 / R0406 | G23 / G23 | cross | yes |
| R0174 / R0460 | G23 / G23 | cross | yes |
| R0174 / R0514 | G23 / G23 | cross | yes |
| R0174 / R0565 | G23 / G23 | cross | yes |
| R0174 / R0619 | G23 / G23 | cross | yes |
| R0174 / R0673 | G23 / G23 | cross | yes |
| R0200 / R0369 | D2 / D2 | cross | yes |
| R0200 / R0432 | D2 / D2 | cross | yes |
| R0200 / R0486 | D2 / D2 | cross | yes |
| R0200 / R0537 | D2 / D2 | cross | yes |
| R0200 / R0591 | D2 / D2 | cross | yes |
| R0200 / R0645 | D2 / D2 | cross | yes |
| R0201 / R0370 | D3 / D3 | cross | yes |
| R0201 / R0433 | D3 / D3 | cross | yes |
| R0201 / R0487 | D3 / D3 | cross | yes |
| R0201 / R0538 | D3 / D3 | cross | yes |
| R0201 / R0592 | D3 / D3 | cross | yes |
| R0201 / R0646 | D3 / D3 | cross | yes |
| R0202 / R0371 | D4 / D4 | cross | yes |
| R0202 / R0434 | D4 / D4 | cross | yes |
| R0202 / R0488 | D4 / D4 | cross | yes |
| R0202 / R0539 | D4 / D4 | cross | yes |
| R0202 / R0593 | D4 / D4 | cross | yes |
| R0202 / R0647 | D4 / D4 | cross | yes |
| R0204 / R0373 | E1 / E1 | cross | yes |
| R0204 / R0490 | E1 / E1 | cross | yes |
| R0204 / R0541 | E1 / E1 | cross | yes |
| R0204 / R0649 | E1 / E1 | cross | yes |
| R0205 / R0374 | E2 / E2 | cross | yes |
| R0205 / R0491 | E2 / E2 | cross | yes |
| R0205 / R0542 | E2 / E2 | cross | yes |
| R0205 / R0650 | E2 / E2 | cross | yes |
| R0228 / R0406 | G23 / G23 | cross | yes |
| R0228 / R0460 | G23 / G23 | cross | yes |
| R0228 / R0514 | G23 / G23 | cross | yes |
| R0228 / R0565 | G23 / G23 | cross | yes |
| R0228 / R0619 | G23 / G23 | cross | yes |
| R0228 / R0673 | G23 / G23 | cross | yes |
| R0253 / R0428 | C4 / C4 | cross | yes |
| R0253 / R0429 | C4 / C5 | cross | no |
| R0253 / R0587 | C4 / C4 | cross | yes |
| R0253 / R0588 | C4 / C5 | cross | no |
| R0254 / R0428 | C5 / C4 | cross | no |
| R0254 / R0429 | C5 / C5 | cross | yes |
| R0254 / R0587 | C5 / C4 | cross | no |
| R0254 / R0588 | C5 / C5 | cross | yes |
| R0255 / R0430 | C6 / C6 | cross | yes |
| R0255 / R0589 | C6 / C6 | cross | yes |
| R0257 / R0369 | D2 / D2 | cross | yes |
| R0257 / R0432 | D2 / D2 | cross | yes |
| R0257 / R0486 | D2 / D2 | cross | yes |
| R0257 / R0537 | D2 / D2 | cross | yes |
| R0257 / R0591 | D2 / D2 | cross | yes |
| R0257 / R0645 | D2 / D2 | cross | yes |
| R0258 / R0370 | D3 / D3 | cross | yes |
| R0258 / R0433 | D3 / D3 | cross | yes |
| R0258 / R0487 | D3 / D3 | cross | yes |
| R0258 / R0538 | D3 / D3 | cross | yes |
| R0258 / R0592 | D3 / D3 | cross | yes |
| R0258 / R0646 | D3 / D3 | cross | yes |
| R0259 / R0371 | D4 / D4 | cross | yes |
| R0259 / R0434 | D4 / D4 | cross | yes |
| R0259 / R0488 | D4 / D4 | cross | yes |
| R0259 / R0539 | D4 / D4 | cross | yes |
| R0259 / R0593 | D4 / D4 | cross | yes |
| R0259 / R0647 | D4 / D4 | cross | yes |
| R0261 / R0436 | E1 / E1 | cross | yes |
| R0261 / R0595 | E1 / E1 | cross | yes |
| R0262 / R0437 | E2 / E2 | cross | yes |
| R0262 / R0596 | E2 / E2 | cross | yes |
| R0285 / R0406 | G23 / G23 | cross | yes |
| R0285 / R0460 | G23 / G23 | cross | yes |
| R0285 / R0514 | G23 / G23 | cross | yes |
| R0285 / R0565 | G23 / G23 | cross | yes |
| R0285 / R0619 | G23 / G23 | cross | yes |
| R0285 / R0673 | G23 / G23 | cross | yes |
| R0310 / R0482 | C4 / C4 | cross | yes |
| R0310 / R0483 | C4 / C5 | cross | no |
| R0310 / R0641 | C4 / C4 | cross | yes |
| R0310 / R0642 | C4 / C5 | cross | no |
| R0311 / R0482 | C5 / C4 | cross | no |
| R0311 / R0483 | C5 / C5 | cross | yes |
| R0311 / R0641 | C5 / C4 | cross | no |
| R0311 / R0642 | C5 / C5 | cross | yes |
| R0312 / R0484 | C6 / C6 | cross | yes |
| R0314 / R0369 | D2 / D2 | cross | yes |
| R0314 / R0432 | D2 / D2 | cross | yes |
| R0314 / R0486 | D2 / D2 | cross | yes |
| R0314 / R0537 | D2 / D2 | cross | yes |
| R0314 / R0591 | D2 / D2 | cross | yes |
| R0314 / R0645 | D2 / D2 | cross | yes |
| R0315 / R0370 | D3 / D3 | cross | yes |
| R0315 / R0433 | D3 / D3 | cross | yes |
| R0315 / R0487 | D3 / D3 | cross | yes |
| R0315 / R0538 | D3 / D3 | cross | yes |
| R0315 / R0592 | D3 / D3 | cross | yes |
| R0315 / R0646 | D3 / D3 | cross | yes |
| R0316 / R0371 | D4 / D4 | cross | yes |
| R0316 / R0434 | D4 / D4 | cross | yes |
| R0316 / R0488 | D4 / D4 | cross | yes |
| R0316 / R0539 | D4 / D4 | cross | yes |
| R0316 / R0593 | D4 / D4 | cross | yes |
| R0316 / R0647 | D4 / D4 | cross | yes |
| R0318 / R0373 | E1 / E1 | cross | yes |
| R0318 / R0490 | E1 / E1 | cross | yes |
| R0318 / R0541 | E1 / E1 | cross | yes |
| R0318 / R0649 | E1 / E1 | cross | yes |
| R0319 / R0374 | E2 / E2 | cross | yes |
| R0319 / R0491 | E2 / E2 | cross | yes |
| R0319 / R0542 | E2 / E2 | cross | yes |
| R0319 / R0650 | E2 / E2 | cross | yes |
| R0332 / R0504 | G13 / G13 | cross | yes |
| R0332 / R0663 | G13 / G13 | cross | yes |
| R0342 / R0406 | G23 / G23 | cross | yes |
| R0342 / R0460 | G23 / G23 | cross | yes |
| R0342 / R0514 | G23 / G23 | cross | yes |
| R0342 / R0565 | G23 / G23 | cross | yes |
| R0342 / R0619 | G23 / G23 | cross | yes |
| R0342 / R0673 | G23 / G23 | cross | yes |

## Appendix C: incidents with fewer reports than planned

| environment | incident | planned | captured |
|---|---|---|---|
| browser-prod | C4 (U, D, B) | 6 | 4 |
| browser-prod | C5 (U, D, B) | 6 | 4 |
| browser-prod | C6 (D, B) | 6 | 4 |
| browser-dev | B1 (U) | 6 | 0 |
| browser-dev | B2 (U, D, B) | 6 | 0 |
| browser-dev | B3 (U, D, B) | 6 | 0 |
| browser-dev | C4 (U, D, B) | 6 | 4 |
| browser-dev | C5 (U, D, B) | 6 | 4 |
| browser-dev | C6 (D, B) | 6 | 4 |

Dropped triggers (each retried up to three times):

- browser-prod v1 chromium C4/standard: reports per attempt 0, 0, 0, 0
- browser-prod v1 chromium C5/standard: reports per attempt 0, 0, 0, 0
- browser-prod v1 chromium C6/standard: reports per attempt 0, 0, 0, 0
- browser-prod v2 chromium C4/standard: reports per attempt 0, 0, 0, 0
- browser-prod v2 chromium C5/standard: reports per attempt 0, 0, 0, 0
- browser-prod v2 chromium C6/standard: reports per attempt 0, 0, 0, 0
- browser-dev v1 chromium B1/standard: reports per attempt 2, 2, 2, 2
- browser-dev v1 chromium B2/standard: reports per attempt 2, 2, 2, 2
- browser-dev v1 chromium B3/standard: reports per attempt 2, 2, 2, 2
- browser-dev v1 chromium C4/standard: reports per attempt 0, 0, 0, 0
- browser-dev v1 chromium C5/standard: reports per attempt 0, 0, 0, 0
- browser-dev v1 chromium C6/standard: reports per attempt 0, 0, 0, 0
- browser-dev v1 firefox B1/standard: reports per attempt 2, 2, 2, 2
- browser-dev v1 firefox B2/standard: reports per attempt 2, 2, 2, 2
- browser-dev v1 firefox B3/standard: reports per attempt 2, 2, 2, 2
- browser-dev v1 webkit B1/standard: reports per attempt 2, 2, 2, 2
- browser-dev v1 webkit B2/standard: reports per attempt 2, 2, 2, 2
- browser-dev v1 webkit B3/standard: reports per attempt 2, 2, 2, 2
- browser-dev v2 chromium B1/standard: reports per attempt 2, 2, 2, 2
- browser-dev v2 chromium B2/standard: reports per attempt 2, 2, 2, 2
- browser-dev v2 chromium B3/standard: reports per attempt 2, 2, 2, 2
- browser-dev v2 chromium C4/standard: reports per attempt 0, 0, 0, 0
- browser-dev v2 chromium C5/standard: reports per attempt 0, 0, 0, 0
- browser-dev v2 chromium C6/standard: reports per attempt 0, 0, 0, 0
- browser-dev v2 firefox B1/standard: reports per attempt 2, 2, 2, 2
- browser-dev v2 firefox B2/standard: reports per attempt 2, 2, 2, 2
- browser-dev v2 firefox B3/standard: reports per attempt 2, 2, 2, 2
- browser-dev v2 webkit B1/standard: reports per attempt 2, 2, 2, 2
- browser-dev v2 webkit B2/standard: reports per attempt 2, 2, 2, 2
- browser-dev v2 webkit B3/standard: reports per attempt 2, 2, 2, 2

