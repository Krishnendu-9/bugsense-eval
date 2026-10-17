# Scored results

The scorer writes one `results.md`. At 2.9 MB GitHub will not render it, so
it is split here into files that do. Every line of `results.md` appears in
exactly one of them, in order: the split is mechanical, done by
[`harness/split-results.mjs`](../harness/split-results.mjs), which verifies
that the parts reproduce each section before writing.

| File | Contents | Size |
|---|---|---|
| [summary.md](summary.md) | Validity checks; Gates; Headline; Reference baselines (context, not gates); Seed comparison; Section 4: server-side reports (not graded); Appendix B: byte-identical pairs; Appendix C: incidents with fewer reports than planned | 37 KB |
| [every-false-merge.md](every-false-merge.md) | Every false merge | 262 KB |
| [every-false-split-01.md](every-false-split-01.md) | Appendix A: every false split, part 1/6 | 449 KB |
| [every-false-split-02.md](every-false-split-02.md) | Appendix A: every false split, part 2/6 | 449 KB |
| [every-false-split-03.md](every-false-split-03.md) | Appendix A: every false split, part 3/6 | 449 KB |
| [every-false-split-04.md](every-false-split-04.md) | Appendix A: every false split, part 4/6 | 449 KB |
| [every-false-split-05.md](every-false-split-05.md) | Appendix A: every false split, part 5/6 | 449 KB |
| [every-false-split-06.md](every-false-split-06.md) | Appendix A: every false split, part 6/6 | 357 KB |
| [results.json](results.json) | every number, machine-readable; not split | 942 KB |
| [results.md](results.md) | the scorer's own single-file output, kept verbatim for provenance. GitHub will not render it; use the files above or the raw link | 2898 KB |

The narrative report, with the verdict and what the numbers mean, is in the
BugSense repository: `docs/fingerprint-results.md`.
