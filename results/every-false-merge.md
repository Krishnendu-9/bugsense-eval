> Split from `results.md` by `harness/split-results.mjs`; see [results/README.md](README.md).

## Every false merge

Ordinary merges (not designated hard-negative pairs): C1 + C3 (21 report pairs); C2 + C3 (21 report pairs); B2 + G9 (4 report pairs); B3 + G9 (4 report pairs); C1 + G3 (4 report pairs); C2 + G3 (4 report pairs); C3 + G3 (4 report pairs); D5 + G21 (2 report pairs); D5 + G22 (2 report pairs).

Hard-negative pairs merged: A8a + A8b [pair origin D] (26 report pairs); C1 + C2 [pair origin D] (18 report pairs); G19 + G20 [pair origin B] (30 report pairs); G21 + G22 [pair origin B] (18 report pairs); G28 + G29 [pair origin B] (40 report pairs); B2 + B3 [pair origin D] (8 report pairs); C4 + C5 [pair origin D] (32 report pairs); G6 + G7 [pair origin B] (24 report pairs); G24 + G25 [pair origin B] (22 report pairs).

Corpus reports landing on a seeded bug: none.

#### R0010 (A8a; U, B) / R0011 (A8b; U, B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad383b8d52d8cbf0f6b0f87
- message A: `Uncaught TypeError: Cannot read properties of undefined (reading 'toFixed')`
- message B: `Uncaught TypeError: Cannot read properties of undefined (reading 'toFixed')`

| frame | A | B |
|---|---|---|
| 1 | at Ii (http://localhost:7110/assets/index-BOtVUl4o.js:17:8759) | at Ii (http://localhost:7110/assets/index-BOtVUl4o.js:17:8759) |
| 2 | at n (http://localhost:7110/assets/index-BOtVUl4o.js:17:8838) | at n (http://localhost:7110/assets/index-BOtVUl4o.js:17:16363) |
| 3 | at Object.ct (http://localhost:7110/assets/index-BOtVUl4o.js:5:9805) | at Object.ct (http://localhost:7110/assets/index-BOtVUl4o.js:5:9805) |
| 4 | at mt (http://localhost:7110/assets/index-BOtVUl4o.js:5:9959) | at mt (http://localhost:7110/assets/index-BOtVUl4o.js:5:9959) |
| 5 | at ht (http://localhost:7110/assets/index-BOtVUl4o.js:5:10016) | at ht (http://localhost:7110/assets/index-BOtVUl4o.js:5:10016) |

#### R0018 (C1; U, B) / R0019 (C2; U, B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad38300d52d8cbf0f6b08d6
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 500`

| frame | A | B |
|---|---|---|
| 1 | at Wn (http://localhost:7110/assets/index-BOtVUl4o.js:11:11885) | at Wn (http://localhost:7110/assets/index-BOtVUl4o.js:11:11885) |
| 2 | at XMLHttpRequest._ (http://localhost:7110/assets/index-BOtVUl4o.js:11:18956) | at XMLHttpRequest._ (http://localhost:7110/assets/index-BOtVUl4o.js:11:18956) |
| 3 | at $r.request (http://localhost:7110/assets/index-BOtVUl4o.js:13:2170) |  |
| 4 | at async ai (http://localhost:7110/assets/index-BOtVUl4o.js:17:5614) |  |
| 5 | at async e (http://localhost:7110/assets/index-BOtVUl4o.js:17:6761) |  |

#### R0018 (C1; U, B) / R0020 (C3; U, D, B)

- environment: browser-prod; axes that differ: incident
- bug: 6ad38300d52d8cbf0f6b08d6
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 404`

| frame | A | B |
|---|---|---|
| 1 | at Wn (http://localhost:7110/assets/index-BOtVUl4o.js:11:11885) | at Wn (http://localhost:7110/assets/index-BOtVUl4o.js:11:11885) |
| 2 | at XMLHttpRequest._ (http://localhost:7110/assets/index-BOtVUl4o.js:11:18956) | at XMLHttpRequest._ (http://localhost:7110/assets/index-BOtVUl4o.js:11:18956) |
| 3 | at $r.request (http://localhost:7110/assets/index-BOtVUl4o.js:13:2170) | at $r.request (http://localhost:7110/assets/index-BOtVUl4o.js:13:2170) |
| 4 | at async ai (http://localhost:7110/assets/index-BOtVUl4o.js:17:5614) | at async qi (http://localhost:7110/assets/index-BOtVUl4o.js:17:10300) |
| 5 | at async e (http://localhost:7110/assets/index-BOtVUl4o.js:17:6761) | at async t (http://localhost:7110/assets/index-BOtVUl4o.js:17:14324) |

#### R0018 (C1; U, B) / R0021 (C3; U, D, B)

- environment: browser-prod; axes that differ: incident, variant
- bug: 6ad38300d52d8cbf0f6b08d6
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 404`

| frame | A | B |
|---|---|---|
| 1 | at Wn (http://localhost:7110/assets/index-BOtVUl4o.js:11:11885) | at Wn (http://localhost:7110/assets/index-BOtVUl4o.js:11:11885) |
| 2 | at XMLHttpRequest._ (http://localhost:7110/assets/index-BOtVUl4o.js:11:18956) | at XMLHttpRequest._ (http://localhost:7110/assets/index-BOtVUl4o.js:11:18956) |
| 3 | at $r.request (http://localhost:7110/assets/index-BOtVUl4o.js:13:2170) | at $r.request (http://localhost:7110/assets/index-BOtVUl4o.js:13:2170) |
| 4 | at async ai (http://localhost:7110/assets/index-BOtVUl4o.js:17:5614) | at async qi (http://localhost:7110/assets/index-BOtVUl4o.js:17:10300) |
| 5 | at async e (http://localhost:7110/assets/index-BOtVUl4o.js:17:6761) | at async t (http://localhost:7110/assets/index-BOtVUl4o.js:17:14324) |

#### R0019 (C2; U, B) / R0020 (C3; U, D, B)

- environment: browser-prod; axes that differ: incident
- bug: 6ad38300d52d8cbf0f6b08d6
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 404`

| frame | A | B |
|---|---|---|
| 1 | at Wn (http://localhost:7110/assets/index-BOtVUl4o.js:11:11885) | at Wn (http://localhost:7110/assets/index-BOtVUl4o.js:11:11885) |
| 2 | at XMLHttpRequest._ (http://localhost:7110/assets/index-BOtVUl4o.js:11:18956) | at XMLHttpRequest._ (http://localhost:7110/assets/index-BOtVUl4o.js:11:18956) |
| 3 |  | at $r.request (http://localhost:7110/assets/index-BOtVUl4o.js:13:2170) |
| 4 |  | at async qi (http://localhost:7110/assets/index-BOtVUl4o.js:17:10300) |
| 5 |  | at async t (http://localhost:7110/assets/index-BOtVUl4o.js:17:14324) |

#### R0019 (C2; U, B) / R0021 (C3; U, D, B)

- environment: browser-prod; axes that differ: incident, variant
- bug: 6ad38300d52d8cbf0f6b08d6
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 404`

| frame | A | B |
|---|---|---|
| 1 | at Wn (http://localhost:7110/assets/index-BOtVUl4o.js:11:11885) | at Wn (http://localhost:7110/assets/index-BOtVUl4o.js:11:11885) |
| 2 | at XMLHttpRequest._ (http://localhost:7110/assets/index-BOtVUl4o.js:11:18956) | at XMLHttpRequest._ (http://localhost:7110/assets/index-BOtVUl4o.js:11:18956) |
| 3 |  | at $r.request (http://localhost:7110/assets/index-BOtVUl4o.js:13:2170) |
| 4 |  | at async qi (http://localhost:7110/assets/index-BOtVUl4o.js:17:10300) |
| 5 |  | at async t (http://localhost:7110/assets/index-BOtVUl4o.js:17:14324) |

#### R0056 (G19; B) / R0057 (G20; B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad382ced52d8cbf0f6b06e0
- message A: `Uncaught TypeError: Cannot read properties of undefined (reading 'zip')`
- message B: `Uncaught TypeError: Cannot read properties of undefined (reading 'zip')`

| frame | A | B |
|---|---|---|
| 1 | at Wa (http://localhost:7110/assets/index-BOtVUl4o.js:17:18377) | at Wa (http://localhost:7110/assets/index-BOtVUl4o.js:17:18406) |
| 2 | at onClick (http://localhost:7110/assets/index-BOtVUl4o.js:17:22139) | at onClick (http://localhost:7110/assets/index-BOtVUl4o.js:17:22350) |
| 3 | at Object.ct (http://localhost:7110/assets/index-BOtVUl4o.js:5:9805) | at Object.ct (http://localhost:7110/assets/index-BOtVUl4o.js:5:9805) |
| 4 | at mt (http://localhost:7110/assets/index-BOtVUl4o.js:5:9959) | at mt (http://localhost:7110/assets/index-BOtVUl4o.js:5:9959) |
| 5 | at ht (http://localhost:7110/assets/index-BOtVUl4o.js:5:10016) | at ht (http://localhost:7110/assets/index-BOtVUl4o.js:5:10016) |

#### R0058 (G21; B) / R0059 (G22; B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad38428d52d8cbf0f6b133c
- message A: `Uncaught Error: Payments SDK not ready`
- message B: `Uncaught Error: Payments SDK not ready`

| frame | A | B |
|---|---|---|
| 1 | at http://localhost:7110/assets/index-BOtVUl4o.js:17:6262 | at http://localhost:7110/assets/index-BOtVUl4o.js:17:6262 |

#### R0065 (G28; B) / R0066 (G29; B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad3831fd52d8cbf0f6b0a06
- message A: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`
- message B: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`

| frame | A | B |
|---|---|---|
| 1 | at reserve (file:///srv/mock/server.mjs:29:28) | at reserve (file:///srv/mock/server.mjs:29:28) |
| 2 | at Server.<anonymous> (file:///srv/mock/server.mjs:51:29) | at Server.<anonymous> (file:///srv/mock/server.mjs:51:29) |
| 3 | at process.processTicksAndRejections (node:internal/process/task_queues:103:5) | at process.processTicksAndRejections (node:internal/process/task_queues:103:5) |
| 4 | at se (http://localhost:7110/assets/index-BOtVUl4o.js:9:400) | at se (http://localhost:7110/assets/index-BOtVUl4o.js:9:400) |

#### R0065 (G28; B) / R0234 (G29; B)

- environment: browser-prod; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad3831fd52d8cbf0f6b0a06
- message A: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`
- message B: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`

| frame | A | B |
|---|---|---|
| 1 | at reserve (file:///srv/mock/server.mjs:29:28) | at reserve (file:///srv/mock/server.mjs:29:28) |
| 2 | at Server.<anonymous> (file:///srv/mock/server.mjs:51:29) | at Server.<anonymous> (file:///srv/mock/server.mjs:51:29) |
| 3 | at process.processTicksAndRejections (node:internal/process/task_queues:103:5) | at process.processTicksAndRejections (node:internal/process/task_queues:103:5) |
| 4 | at se (http://localhost:7110/assets/index-BOtVUl4o.js:9:400) | at E (http://localhost:7110/assets/index-DvtLrm67.js:9:419) |

#### R0066 (G29; B) / R0233 (G28; B)

- environment: browser-prod; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad3831fd52d8cbf0f6b0a06
- message A: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`
- message B: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`

| frame | A | B |
|---|---|---|
| 1 | at reserve (file:///srv/mock/server.mjs:29:28) | at reserve (file:///srv/mock/server.mjs:29:28) |
| 2 | at Server.<anonymous> (file:///srv/mock/server.mjs:51:29) | at Server.<anonymous> (file:///srv/mock/server.mjs:51:29) |
| 3 | at process.processTicksAndRejections (node:internal/process/task_queues:103:5) | at process.processTicksAndRejections (node:internal/process/task_queues:103:5) |
| 4 | at se (http://localhost:7110/assets/index-BOtVUl4o.js:9:400) | at E (http://localhost:7110/assets/index-DvtLrm67.js:9:419) |

#### R0075 (A8a; U, B) / R0076 (A8b; U, B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad382ebd52d8cbf0f6b080c
- message A: `TypeError: can't access property "toFixed", e is undefined`
- message B: `TypeError: can't access property "toFixed", e is undefined`

| frame | A | B |
|---|---|---|
| 1 | Ii@http://localhost:7110/assets/index-BOtVUl4o.js:17:8757 | Ii@http://localhost:7110/assets/index-BOtVUl4o.js:17:8757 |
| 2 | n@http://localhost:7110/assets/index-BOtVUl4o.js:17:8838 | n@http://localhost:7110/assets/index-BOtVUl4o.js:17:16363 |
| 3 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9805 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9805 |
| 4 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9959 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9959 |
| 5 | ht@http://localhost:7110/assets/index-BOtVUl4o.js:5:10016 | ht@http://localhost:7110/assets/index-BOtVUl4o.js:5:10016 |

#### R0075 (A8a; U, B) / R0133 (A8b; U, B)

- environment: browser-prod; axes that differ: incident, browser; designated hard-negative pair
- bug: 6ad382ebd52d8cbf0f6b080c
- message A: `TypeError: can't access property "toFixed", e is undefined`
- message B: `TypeError: undefined is not an object (evaluating 'e.toFixed')`

| frame | A | B |
|---|---|---|
| 1 | Ii@http://localhost:7110/assets/index-BOtVUl4o.js:17:8757 | Ii@http://localhost:7110/assets/index-BOtVUl4o.js:17:8758 |
| 2 | n@http://localhost:7110/assets/index-BOtVUl4o.js:17:8838 | n@http://localhost:7110/assets/index-BOtVUl4o.js:17:16365 |
| 3 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9805 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9810 |
| 4 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9959 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9964 |
| 5 | ht@http://localhost:7110/assets/index-BOtVUl4o.js:5:10016 | ht@http://localhost:7110/assets/index-BOtVUl4o.js:5:10021 |

#### R0076 (A8b; U, B) / R0132 (A8a; U, B)

- environment: browser-prod; axes that differ: incident, browser; designated hard-negative pair
- bug: 6ad382ebd52d8cbf0f6b080c
- message A: `TypeError: can't access property "toFixed", e is undefined`
- message B: `TypeError: undefined is not an object (evaluating 'e.toFixed')`

| frame | A | B |
|---|---|---|
| 1 | Ii@http://localhost:7110/assets/index-BOtVUl4o.js:17:8757 | Ii@http://localhost:7110/assets/index-BOtVUl4o.js:17:8758 |
| 2 | n@http://localhost:7110/assets/index-BOtVUl4o.js:17:16363 | n@http://localhost:7110/assets/index-BOtVUl4o.js:17:8840 |
| 3 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9805 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9810 |
| 4 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9959 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9964 |
| 5 | ht@http://localhost:7110/assets/index-BOtVUl4o.js:5:10016 | ht@http://localhost:7110/assets/index-BOtVUl4o.js:5:10021 |

#### R0079 (B2; U, D, B) / R0080 (B3; U, D, B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad38311d52d8cbf0f6b0974
- message A: `↵ td↵ tr↵ tbody↵ table↵ Ta@http://localhost:7110/assets/index-BOtVUl4o.js:17:16510↵ Wi@http://localhost:7110/assets/index-BOtVUl4o.js:17:9617↵ main↵ v@http://localhost:7110/assets/index-BOtVUl4o.js:8:57929↵ Ya`
- message B: `↵ small↵ span↵ Ea@http://localhost:7110/assets/index-BOtVUl4o.js:17:16715↵ Wi@http://localhost:7110/assets/index-BOtVUl4o.js:17:9617↵ main↵ v@http://localhost:7110/assets/index-BOtVUl4o.js:8:57929↵ Xa@http:/`

| frame | A | B |
|---|---|---|
| 1 | za@http://localhost:7110/assets/index-BOtVUl4o.js:6:6263 | za@http://localhost:7110/assets/index-BOtVUl4o.js:6:6263 |
| 2 | _@http://localhost:7110/assets/index-BOtVUl4o.js:6:11241 | f@http://localhost:7110/assets/index-BOtVUl4o.js:6:8036 |
| 3 | Rs@http://localhost:7110/assets/index-BOtVUl4o.js:8:1472 | h@http://localhost:7110/assets/index-BOtVUl4o.js:6:9168 |
| 4 | Ul@http://localhost:7110/assets/index-BOtVUl4o.js:8:45269 | _@http://localhost:7110/assets/index-BOtVUl4o.js:6:11201 |
| 5 | Nl@http://localhost:7110/assets/index-BOtVUl4o.js:8:39385 | Rs@http://localhost:7110/assets/index-BOtVUl4o.js:8:1472 |

#### R0079 (B2; U, D, B) / R0103 (G9; B)

- environment: browser-prod; axes that differ: incident
- bug: 6ad38311d52d8cbf0f6b0974
- message A: `↵ td↵ tr↵ tbody↵ table↵ Ta@http://localhost:7110/assets/index-BOtVUl4o.js:17:16510↵ Wi@http://localhost:7110/assets/index-BOtVUl4o.js:17:9617↵ main↵ v@http://localhost:7110/assets/index-BOtVUl4o.js:8:57929↵ Ya`
- message B: `Error: Unexpected inventory response: {"data":{"items":[{"sku":"sku-1000","onHand":0,"warehouse":"LDS-1"},{"sku":"sku-1001","onHand":7,"warehouse":"LDS-1"},{"sku":"sku-1002","onHand":14,"warehouse":"L`

| frame | A | B |
|---|---|---|
| 1 | za@http://localhost:7110/assets/index-BOtVUl4o.js:6:6263 | za@http://localhost:7110/assets/index-BOtVUl4o.js:17:17896 |
| 2 | _@http://localhost:7110/assets/index-BOtVUl4o.js:6:11241 | onClick@http://localhost:7110/assets/index-BOtVUl4o.js:17:21409 |
| 3 | Rs@http://localhost:7110/assets/index-BOtVUl4o.js:8:1472 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9805 |
| 4 | Ul@http://localhost:7110/assets/index-BOtVUl4o.js:8:45269 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9959 |
| 5 | Nl@http://localhost:7110/assets/index-BOtVUl4o.js:8:39385 | ht@http://localhost:7110/assets/index-BOtVUl4o.js:5:10016 |

#### R0079 (B2; U, D, B) / R0137 (B3; U, D, B)

- environment: browser-prod; axes that differ: incident, browser; designated hard-negative pair
- bug: 6ad38311d52d8cbf0f6b0974
- message A: `↵ td↵ tr↵ tbody↵ table↵ Ta@http://localhost:7110/assets/index-BOtVUl4o.js:17:16510↵ Wi@http://localhost:7110/assets/index-BOtVUl4o.js:17:9617↵ main↵ v@http://localhost:7110/assets/index-BOtVUl4o.js:8:57929↵ Ya`
- message B: `↵ small↵ span↵ Ea@http://localhost:7110/assets/index-BOtVUl4o.js:17:16736↵ Wi@http://localhost:7110/assets/index-BOtVUl4o.js:17:9622↵ main↵ v@http://localhost:7110/assets/index-BOtVUl4o.js:8:57962↵ Xa@http:/`

| frame | A | B |
|---|---|---|
| 1 | za@http://localhost:7110/assets/index-BOtVUl4o.js:6:6263 | za@http://localhost:7110/assets/index-BOtVUl4o.js:6:6268 |
| 2 | _@http://localhost:7110/assets/index-BOtVUl4o.js:6:11241 | f@http://localhost:7110/assets/index-BOtVUl4o.js:6:8036 |
| 3 | Rs@http://localhost:7110/assets/index-BOtVUl4o.js:8:1472 | h@http://localhost:7110/assets/index-BOtVUl4o.js:6:9169 |
| 4 | Ul@http://localhost:7110/assets/index-BOtVUl4o.js:8:45269 | Rs@http://localhost:7110/assets/index-BOtVUl4o.js:8:1474 |
| 5 | Nl@http://localhost:7110/assets/index-BOtVUl4o.js:8:39385 | Ul@http://localhost:7110/assets/index-BOtVUl4o.js:8:45271 |

#### R0079 (B2; U, D, B) / R0160 (G9; B)

- environment: browser-prod; axes that differ: incident, browser
- bug: 6ad38311d52d8cbf0f6b0974
- message A: `↵ td↵ tr↵ tbody↵ table↵ Ta@http://localhost:7110/assets/index-BOtVUl4o.js:17:16510↵ Wi@http://localhost:7110/assets/index-BOtVUl4o.js:17:9617↵ main↵ v@http://localhost:7110/assets/index-BOtVUl4o.js:8:57929↵ Ya`
- message B: `Error: Unexpected inventory response: {"data":{"items":[{"sku":"sku-1000","onHand":0,"warehouse":"LDS-1"},{"sku":"sku-1001","onHand":7,"warehouse":"LDS-1"},{"sku":"sku-1002","onHand":14,"warehouse":"L`

| frame | A | B |
|---|---|---|
| 1 | za@http://localhost:7110/assets/index-BOtVUl4o.js:6:6263 | za@http://localhost:7110/assets/index-BOtVUl4o.js:17:17901 |
| 2 | _@http://localhost:7110/assets/index-BOtVUl4o.js:6:11241 | onClick@http://localhost:7110/assets/index-BOtVUl4o.js:17:21411 |
| 3 | Rs@http://localhost:7110/assets/index-BOtVUl4o.js:8:1472 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9810 |
| 4 | Ul@http://localhost:7110/assets/index-BOtVUl4o.js:8:45269 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9964 |
| 5 | Nl@http://localhost:7110/assets/index-BOtVUl4o.js:8:39385 | ht@http://localhost:7110/assets/index-BOtVUl4o.js:5:10021 |

#### R0080 (B3; U, D, B) / R0103 (G9; B)

- environment: browser-prod; axes that differ: incident
- bug: 6ad38311d52d8cbf0f6b0974
- message A: `↵ small↵ span↵ Ea@http://localhost:7110/assets/index-BOtVUl4o.js:17:16715↵ Wi@http://localhost:7110/assets/index-BOtVUl4o.js:17:9617↵ main↵ v@http://localhost:7110/assets/index-BOtVUl4o.js:8:57929↵ Xa@http:/`
- message B: `Error: Unexpected inventory response: {"data":{"items":[{"sku":"sku-1000","onHand":0,"warehouse":"LDS-1"},{"sku":"sku-1001","onHand":7,"warehouse":"LDS-1"},{"sku":"sku-1002","onHand":14,"warehouse":"L`

| frame | A | B |
|---|---|---|
| 1 | za@http://localhost:7110/assets/index-BOtVUl4o.js:6:6263 | za@http://localhost:7110/assets/index-BOtVUl4o.js:17:17896 |
| 2 | f@http://localhost:7110/assets/index-BOtVUl4o.js:6:8036 | onClick@http://localhost:7110/assets/index-BOtVUl4o.js:17:21409 |
| 3 | h@http://localhost:7110/assets/index-BOtVUl4o.js:6:9168 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9805 |
| 4 | _@http://localhost:7110/assets/index-BOtVUl4o.js:6:11201 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9959 |
| 5 | Rs@http://localhost:7110/assets/index-BOtVUl4o.js:8:1472 | ht@http://localhost:7110/assets/index-BOtVUl4o.js:5:10016 |

#### R0080 (B3; U, D, B) / R0136 (B2; U, D, B)

- environment: browser-prod; axes that differ: incident, browser; designated hard-negative pair
- bug: 6ad38311d52d8cbf0f6b0974
- message A: `↵ small↵ span↵ Ea@http://localhost:7110/assets/index-BOtVUl4o.js:17:16715↵ Wi@http://localhost:7110/assets/index-BOtVUl4o.js:17:9617↵ main↵ v@http://localhost:7110/assets/index-BOtVUl4o.js:8:57929↵ Xa@http:/`
- message B: `↵ td↵ tr↵ tbody↵ table↵ Ta@http://localhost:7110/assets/index-BOtVUl4o.js:17:16533↵ Wi@http://localhost:7110/assets/index-BOtVUl4o.js:17:9622↵ main↵ v@http://localhost:7110/assets/index-BOtVUl4o.js:8:57962↵ Ya`

| frame | A | B |
|---|---|---|
| 1 | za@http://localhost:7110/assets/index-BOtVUl4o.js:6:6263 | za@http://localhost:7110/assets/index-BOtVUl4o.js:6:6268 |
| 2 | f@http://localhost:7110/assets/index-BOtVUl4o.js:6:8036 | _@http://localhost:7110/assets/index-BOtVUl4o.js:6:11241 |
| 3 | h@http://localhost:7110/assets/index-BOtVUl4o.js:6:9168 | Rs@http://localhost:7110/assets/index-BOtVUl4o.js:8:1474 |
| 4 | _@http://localhost:7110/assets/index-BOtVUl4o.js:6:11201 | Ul@http://localhost:7110/assets/index-BOtVUl4o.js:8:45271 |
| 5 | Rs@http://localhost:7110/assets/index-BOtVUl4o.js:8:1472 | Nl@http://localhost:7110/assets/index-BOtVUl4o.js:8:39385 |

#### R0080 (B3; U, D, B) / R0160 (G9; B)

- environment: browser-prod; axes that differ: incident, browser
- bug: 6ad38311d52d8cbf0f6b0974
- message A: `↵ small↵ span↵ Ea@http://localhost:7110/assets/index-BOtVUl4o.js:17:16715↵ Wi@http://localhost:7110/assets/index-BOtVUl4o.js:17:9617↵ main↵ v@http://localhost:7110/assets/index-BOtVUl4o.js:8:57929↵ Xa@http:/`
- message B: `Error: Unexpected inventory response: {"data":{"items":[{"sku":"sku-1000","onHand":0,"warehouse":"LDS-1"},{"sku":"sku-1001","onHand":7,"warehouse":"LDS-1"},{"sku":"sku-1002","onHand":14,"warehouse":"L`

| frame | A | B |
|---|---|---|
| 1 | za@http://localhost:7110/assets/index-BOtVUl4o.js:6:6263 | za@http://localhost:7110/assets/index-BOtVUl4o.js:17:17901 |
| 2 | f@http://localhost:7110/assets/index-BOtVUl4o.js:6:8036 | onClick@http://localhost:7110/assets/index-BOtVUl4o.js:17:21411 |
| 3 | h@http://localhost:7110/assets/index-BOtVUl4o.js:6:9168 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9810 |
| 4 | _@http://localhost:7110/assets/index-BOtVUl4o.js:6:11201 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9964 |
| 5 | Rs@http://localhost:7110/assets/index-BOtVUl4o.js:8:1472 | ht@http://localhost:7110/assets/index-BOtVUl4o.js:5:10021 |

#### R0082 (C1; U, B) / R0083 (C2; U, B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad38346d52d8cbf0f6b0b6b
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 500`

| frame | A | B |
|---|---|---|
| 1 | e@http://localhost:7110/assets/index-BOtVUl4o.js:11:2004 | e@http://localhost:7110/assets/index-BOtVUl4o.js:11:2004 |
| 2 | Wn@http://localhost:7110/assets/index-BOtVUl4o.js:11:11885 | Wn@http://localhost:7110/assets/index-BOtVUl4o.js:11:11885 |
| 3 | _@http://localhost:7110/assets/index-BOtVUl4o.js:11:18958 | _@http://localhost:7110/assets/index-BOtVUl4o.js:11:18958 |
| 4 | EventHandlerNonNull*hr</<@http://localhost:7110/assets/index-BOtVUl4o.js:11:19154 | EventHandlerNonNull*hr</<@http://localhost:7110/assets/index-BOtVUl4o.js:11:19154 |
| 5 | hr<@http://localhost:7110/assets/index-BOtVUl4o.js:11:18260 | hr<@http://localhost:7110/assets/index-BOtVUl4o.js:11:18260 |

#### R0082 (C1; U, B) / R0084 (C3; U, D, B)

- environment: browser-prod; axes that differ: incident
- bug: 6ad38346d52d8cbf0f6b0b6b
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 404`

| frame | A | B |
|---|---|---|
| 1 | e@http://localhost:7110/assets/index-BOtVUl4o.js:11:2004 | e@http://localhost:7110/assets/index-BOtVUl4o.js:11:2004 |
| 2 | Wn@http://localhost:7110/assets/index-BOtVUl4o.js:11:11885 | Wn@http://localhost:7110/assets/index-BOtVUl4o.js:11:11885 |
| 3 | _@http://localhost:7110/assets/index-BOtVUl4o.js:11:18958 | _@http://localhost:7110/assets/index-BOtVUl4o.js:11:18958 |
| 4 | EventHandlerNonNull*hr</<@http://localhost:7110/assets/index-BOtVUl4o.js:11:19154 | EventHandlerNonNull*hr</<@http://localhost:7110/assets/index-BOtVUl4o.js:11:19154 |
| 5 | hr<@http://localhost:7110/assets/index-BOtVUl4o.js:11:18260 | hr<@http://localhost:7110/assets/index-BOtVUl4o.js:11:18260 |

#### R0082 (C1; U, B) / R0097 (G3; B)

- environment: browser-prod; axes that differ: incident
- bug: 6ad38346d52d8cbf0f6b0b6b
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `TypeError: ci().trackPurchase is not a function`

| frame | A | B |
|---|---|---|
| 1 | e@http://localhost:7110/assets/index-BOtVUl4o.js:11:2004 | e@http://localhost:7110/assets/index-BOtVUl4o.js:17:7068 |
| 2 | Wn@http://localhost:7110/assets/index-BOtVUl4o.js:11:11885 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9805 |
| 3 | _@http://localhost:7110/assets/index-BOtVUl4o.js:11:18958 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9959 |
| 4 | EventHandlerNonNull*hr</<@http://localhost:7110/assets/index-BOtVUl4o.js:11:19154 | ht@http://localhost:7110/assets/index-BOtVUl4o.js:5:10016 |
| 5 | hr<@http://localhost:7110/assets/index-BOtVUl4o.js:11:18260 | li@http://localhost:7110/assets/index-BOtVUl4o.js:5:31224 |

#### R0082 (C1; U, B) / R0154 (G3; B)

- environment: browser-prod; axes that differ: incident, browser
- bug: 6ad38346d52d8cbf0f6b0b6b
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `TypeError: ci().trackPurchase is not a function. (In 'ci().trackPurchase({orderId:`o-5521`,value:42})', 'ci().trackPurchase' is undefined)`

| frame | A | B |
|---|---|---|
| 1 | e@http://localhost:7110/assets/index-BOtVUl4o.js:11:2004 | e@http://localhost:7110/assets/index-BOtVUl4o.js:17:7081 |
| 2 | Wn@http://localhost:7110/assets/index-BOtVUl4o.js:11:11885 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9810 |
| 3 | _@http://localhost:7110/assets/index-BOtVUl4o.js:11:18958 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9964 |
| 4 | EventHandlerNonNull*hr</<@http://localhost:7110/assets/index-BOtVUl4o.js:11:19154 | ht@http://localhost:7110/assets/index-BOtVUl4o.js:5:10021 |
| 5 | hr<@http://localhost:7110/assets/index-BOtVUl4o.js:11:18260 | li@http://localhost:7110/assets/index-BOtVUl4o.js:5:31226 |

#### R0083 (C2; U, B) / R0084 (C3; U, D, B)

- environment: browser-prod; axes that differ: incident
- bug: 6ad38346d52d8cbf0f6b0b6b
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 404`

| frame | A | B |
|---|---|---|
| 1 | e@http://localhost:7110/assets/index-BOtVUl4o.js:11:2004 | e@http://localhost:7110/assets/index-BOtVUl4o.js:11:2004 |
| 2 | Wn@http://localhost:7110/assets/index-BOtVUl4o.js:11:11885 | Wn@http://localhost:7110/assets/index-BOtVUl4o.js:11:11885 |
| 3 | _@http://localhost:7110/assets/index-BOtVUl4o.js:11:18958 | _@http://localhost:7110/assets/index-BOtVUl4o.js:11:18958 |
| 4 | EventHandlerNonNull*hr</<@http://localhost:7110/assets/index-BOtVUl4o.js:11:19154 | EventHandlerNonNull*hr</<@http://localhost:7110/assets/index-BOtVUl4o.js:11:19154 |
| 5 | hr<@http://localhost:7110/assets/index-BOtVUl4o.js:11:18260 | hr<@http://localhost:7110/assets/index-BOtVUl4o.js:11:18260 |

#### R0083 (C2; U, B) / R0097 (G3; B)

- environment: browser-prod; axes that differ: incident
- bug: 6ad38346d52d8cbf0f6b0b6b
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `TypeError: ci().trackPurchase is not a function`

| frame | A | B |
|---|---|---|
| 1 | e@http://localhost:7110/assets/index-BOtVUl4o.js:11:2004 | e@http://localhost:7110/assets/index-BOtVUl4o.js:17:7068 |
| 2 | Wn@http://localhost:7110/assets/index-BOtVUl4o.js:11:11885 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9805 |
| 3 | _@http://localhost:7110/assets/index-BOtVUl4o.js:11:18958 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9959 |
| 4 | EventHandlerNonNull*hr</<@http://localhost:7110/assets/index-BOtVUl4o.js:11:19154 | ht@http://localhost:7110/assets/index-BOtVUl4o.js:5:10016 |
| 5 | hr<@http://localhost:7110/assets/index-BOtVUl4o.js:11:18260 | li@http://localhost:7110/assets/index-BOtVUl4o.js:5:31224 |

#### R0083 (C2; U, B) / R0154 (G3; B)

- environment: browser-prod; axes that differ: incident, browser
- bug: 6ad38346d52d8cbf0f6b0b6b
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `TypeError: ci().trackPurchase is not a function. (In 'ci().trackPurchase({orderId:`o-5521`,value:42})', 'ci().trackPurchase' is undefined)`

| frame | A | B |
|---|---|---|
| 1 | e@http://localhost:7110/assets/index-BOtVUl4o.js:11:2004 | e@http://localhost:7110/assets/index-BOtVUl4o.js:17:7081 |
| 2 | Wn@http://localhost:7110/assets/index-BOtVUl4o.js:11:11885 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9810 |
| 3 | _@http://localhost:7110/assets/index-BOtVUl4o.js:11:18958 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9964 |
| 4 | EventHandlerNonNull*hr</<@http://localhost:7110/assets/index-BOtVUl4o.js:11:19154 | ht@http://localhost:7110/assets/index-BOtVUl4o.js:5:10021 |
| 5 | hr<@http://localhost:7110/assets/index-BOtVUl4o.js:11:18260 | li@http://localhost:7110/assets/index-BOtVUl4o.js:5:31226 |

#### R0084 (C3; U, D, B) / R0097 (G3; B)

- environment: browser-prod; axes that differ: incident
- bug: 6ad38346d52d8cbf0f6b0b6b
- message A: `Unhandled Promise Rejection: Request failed with status code 404`
- message B: `TypeError: ci().trackPurchase is not a function`

| frame | A | B |
|---|---|---|
| 1 | e@http://localhost:7110/assets/index-BOtVUl4o.js:11:2004 | e@http://localhost:7110/assets/index-BOtVUl4o.js:17:7068 |
| 2 | Wn@http://localhost:7110/assets/index-BOtVUl4o.js:11:11885 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9805 |
| 3 | _@http://localhost:7110/assets/index-BOtVUl4o.js:11:18958 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9959 |
| 4 | EventHandlerNonNull*hr</<@http://localhost:7110/assets/index-BOtVUl4o.js:11:19154 | ht@http://localhost:7110/assets/index-BOtVUl4o.js:5:10016 |
| 5 | hr<@http://localhost:7110/assets/index-BOtVUl4o.js:11:18260 | li@http://localhost:7110/assets/index-BOtVUl4o.js:5:31224 |

#### R0084 (C3; U, D, B) / R0154 (G3; B)

- environment: browser-prod; axes that differ: incident, browser
- bug: 6ad38346d52d8cbf0f6b0b6b
- message A: `Unhandled Promise Rejection: Request failed with status code 404`
- message B: `TypeError: ci().trackPurchase is not a function. (In 'ci().trackPurchase({orderId:`o-5521`,value:42})', 'ci().trackPurchase' is undefined)`

| frame | A | B |
|---|---|---|
| 1 | e@http://localhost:7110/assets/index-BOtVUl4o.js:11:2004 | e@http://localhost:7110/assets/index-BOtVUl4o.js:17:7081 |
| 2 | Wn@http://localhost:7110/assets/index-BOtVUl4o.js:11:11885 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9810 |
| 3 | _@http://localhost:7110/assets/index-BOtVUl4o.js:11:18958 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9964 |
| 4 | EventHandlerNonNull*hr</<@http://localhost:7110/assets/index-BOtVUl4o.js:11:19154 | ht@http://localhost:7110/assets/index-BOtVUl4o.js:5:10021 |
| 5 | hr<@http://localhost:7110/assets/index-BOtVUl4o.js:11:18260 | li@http://localhost:7110/assets/index-BOtVUl4o.js:5:31226 |

#### R0085 (C4; U, D, B) / R0086 (C5; U, D, B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad382f2d52d8cbf0f6b0847
- message A: `Unhandled Promise Rejection: NetworkError when attempting to fetch resource.`
- message B: `Unhandled Promise Rejection: NetworkError when attempting to fetch resource.`

| frame | A | B |
|---|---|---|
| 1 | (no frames) | (no frames) |

#### R0085 (C4; U, D, B) / R0254 (C5; U, D, B)

- environment: browser-prod; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad382f2d52d8cbf0f6b0847
- message A: `Unhandled Promise Rejection: NetworkError when attempting to fetch resource.`
- message B: `Unhandled Promise Rejection: NetworkError when attempting to fetch resource.`

| frame | A | B |
|---|---|---|
| 1 | (no frames) | (no frames) |

#### R0086 (C5; U, D, B) / R0253 (C4; U, D, B)

- environment: browser-prod; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad382f2d52d8cbf0f6b0847
- message A: `Unhandled Promise Rejection: NetworkError when attempting to fetch resource.`
- message B: `Unhandled Promise Rejection: NetworkError when attempting to fetch resource.`

| frame | A | B |
|---|---|---|
| 1 | (no frames) | (no frames) |

#### R0100 (G6; B) / R0101 (G7; B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad383e1d52d8cbf0f6b10e8
- message A: `Error: Operation failed after retries`
- message B: `Error: Operation failed after retries`

| frame | A | B |
|---|---|---|
| 1 | li@http://localhost:7110/assets/index-BOtVUl4o.js:17:5966 | li@http://localhost:7110/assets/index-BOtVUl4o.js:17:5966 |
| 2 | La@http://localhost:7110/assets/index-BOtVUl4o.js:17:17657 | di@http://localhost:7110/assets/index-BOtVUl4o.js:17:6098 |
| 3 | onClick@http://localhost:7110/assets/index-BOtVUl4o.js:17:20891 | onClick@http://localhost:7110/assets/index-BOtVUl4o.js:17:7302 |
| 4 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9805 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9805 |
| 5 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9959 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9959 |

#### R0100 (G6; B) / R0158 (G7; B)

- environment: browser-prod; axes that differ: incident, browser; designated hard-negative pair
- bug: 6ad383e1d52d8cbf0f6b10e8
- message A: `Error: Operation failed after retries`
- message B: `Error: Operation failed after retries`

| frame | A | B |
|---|---|---|
| 1 | li@http://localhost:7110/assets/index-BOtVUl4o.js:17:5966 | li@http://localhost:7110/assets/index-BOtVUl4o.js:17:5971 |
| 2 | La@http://localhost:7110/assets/index-BOtVUl4o.js:17:17657 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9810 |
| 3 | onClick@http://localhost:7110/assets/index-BOtVUl4o.js:17:20891 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9964 |
| 4 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9805 | ht@http://localhost:7110/assets/index-BOtVUl4o.js:5:10021 |
| 5 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9959 | li@http://localhost:7110/assets/index-BOtVUl4o.js:5:31226 |

#### R0101 (G7; B) / R0157 (G6; B)

- environment: browser-prod; axes that differ: incident, browser; designated hard-negative pair
- bug: 6ad383e1d52d8cbf0f6b10e8
- message A: `Error: Operation failed after retries`
- message B: `Error: Operation failed after retries`

| frame | A | B |
|---|---|---|
| 1 | li@http://localhost:7110/assets/index-BOtVUl4o.js:17:5966 | li@http://localhost:7110/assets/index-BOtVUl4o.js:17:5971 |
| 2 | di@http://localhost:7110/assets/index-BOtVUl4o.js:17:6098 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9810 |
| 3 | onClick@http://localhost:7110/assets/index-BOtVUl4o.js:17:7302 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9964 |
| 4 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9805 | ht@http://localhost:7110/assets/index-BOtVUl4o.js:5:10021 |
| 5 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9959 | li@http://localhost:7110/assets/index-BOtVUl4o.js:5:31226 |

#### R0103 (G9; B) / R0136 (B2; U, D, B)

- environment: browser-prod; axes that differ: incident, browser
- bug: 6ad38311d52d8cbf0f6b0974
- message A: `Error: Unexpected inventory response: {"data":{"items":[{"sku":"sku-1000","onHand":0,"warehouse":"LDS-1"},{"sku":"sku-1001","onHand":7,"warehouse":"LDS-1"},{"sku":"sku-1002","onHand":14,"warehouse":"L`
- message B: `↵ td↵ tr↵ tbody↵ table↵ Ta@http://localhost:7110/assets/index-BOtVUl4o.js:17:16533↵ Wi@http://localhost:7110/assets/index-BOtVUl4o.js:17:9622↵ main↵ v@http://localhost:7110/assets/index-BOtVUl4o.js:8:57962↵ Ya`

| frame | A | B |
|---|---|---|
| 1 | za@http://localhost:7110/assets/index-BOtVUl4o.js:17:17896 | za@http://localhost:7110/assets/index-BOtVUl4o.js:6:6268 |
| 2 | onClick@http://localhost:7110/assets/index-BOtVUl4o.js:17:21409 | _@http://localhost:7110/assets/index-BOtVUl4o.js:6:11241 |
| 3 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9805 | Rs@http://localhost:7110/assets/index-BOtVUl4o.js:8:1474 |
| 4 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9959 | Ul@http://localhost:7110/assets/index-BOtVUl4o.js:8:45271 |
| 5 | ht@http://localhost:7110/assets/index-BOtVUl4o.js:5:10016 | Nl@http://localhost:7110/assets/index-BOtVUl4o.js:8:39385 |

#### R0103 (G9; B) / R0137 (B3; U, D, B)

- environment: browser-prod; axes that differ: incident, browser
- bug: 6ad38311d52d8cbf0f6b0974
- message A: `Error: Unexpected inventory response: {"data":{"items":[{"sku":"sku-1000","onHand":0,"warehouse":"LDS-1"},{"sku":"sku-1001","onHand":7,"warehouse":"LDS-1"},{"sku":"sku-1002","onHand":14,"warehouse":"L`
- message B: `↵ small↵ span↵ Ea@http://localhost:7110/assets/index-BOtVUl4o.js:17:16736↵ Wi@http://localhost:7110/assets/index-BOtVUl4o.js:17:9622↵ main↵ v@http://localhost:7110/assets/index-BOtVUl4o.js:8:57962↵ Xa@http:/`

| frame | A | B |
|---|---|---|
| 1 | za@http://localhost:7110/assets/index-BOtVUl4o.js:17:17896 | za@http://localhost:7110/assets/index-BOtVUl4o.js:6:6268 |
| 2 | onClick@http://localhost:7110/assets/index-BOtVUl4o.js:17:21409 | f@http://localhost:7110/assets/index-BOtVUl4o.js:6:8036 |
| 3 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9805 | h@http://localhost:7110/assets/index-BOtVUl4o.js:6:9169 |
| 4 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9959 | Rs@http://localhost:7110/assets/index-BOtVUl4o.js:8:1474 |
| 5 | ht@http://localhost:7110/assets/index-BOtVUl4o.js:5:10016 | Ul@http://localhost:7110/assets/index-BOtVUl4o.js:8:45271 |

#### R0113 (G19; B) / R0114 (G20; B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad38344d52d8cbf0f6b0b54
- message A: `TypeError: can't access property "zip", e.billing.address is undefined`
- message B: `TypeError: can't access property "zip", e.shipping.address is undefined`

| frame | A | B |
|---|---|---|
| 1 | Wa@http://localhost:7110/assets/index-BOtVUl4o.js:17:18351 | Wa@http://localhost:7110/assets/index-BOtVUl4o.js:17:18381 |
| 2 | onClick@http://localhost:7110/assets/index-BOtVUl4o.js:17:22141 | onClick@http://localhost:7110/assets/index-BOtVUl4o.js:17:22352 |
| 3 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9805 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9805 |
| 4 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9959 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9959 |
| 5 | ht@http://localhost:7110/assets/index-BOtVUl4o.js:5:10016 | ht@http://localhost:7110/assets/index-BOtVUl4o.js:5:10016 |

#### R0113 (G19; B) / R0171 (G20; B)

- environment: browser-prod; axes that differ: incident, browser; designated hard-negative pair
- bug: 6ad38344d52d8cbf0f6b0b54
- message A: `TypeError: can't access property "zip", e.billing.address is undefined`
- message B: `TypeError: undefined is not an object (evaluating 'e.shipping.address.zip')`

| frame | A | B |
|---|---|---|
| 1 | Wa@http://localhost:7110/assets/index-BOtVUl4o.js:17:18351 | Wa@http://localhost:7110/assets/index-BOtVUl4o.js:17:18405 |
| 2 | onClick@http://localhost:7110/assets/index-BOtVUl4o.js:17:22141 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9810 |
| 3 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9805 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9964 |
| 4 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9959 | ht@http://localhost:7110/assets/index-BOtVUl4o.js:5:10021 |
| 5 | ht@http://localhost:7110/assets/index-BOtVUl4o.js:5:10016 | li@http://localhost:7110/assets/index-BOtVUl4o.js:5:31226 |

#### R0114 (G20; B) / R0170 (G19; B)

- environment: browser-prod; axes that differ: incident, browser; designated hard-negative pair
- bug: 6ad38344d52d8cbf0f6b0b54
- message A: `TypeError: can't access property "zip", e.shipping.address is undefined`
- message B: `TypeError: undefined is not an object (evaluating 'e.billing.address.zip')`

| frame | A | B |
|---|---|---|
| 1 | Wa@http://localhost:7110/assets/index-BOtVUl4o.js:17:18381 | Wa@http://localhost:7110/assets/index-BOtVUl4o.js:17:18376 |
| 2 | onClick@http://localhost:7110/assets/index-BOtVUl4o.js:17:22352 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9810 |
| 3 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9805 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9964 |
| 4 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9959 | ht@http://localhost:7110/assets/index-BOtVUl4o.js:5:10021 |
| 5 | ht@http://localhost:7110/assets/index-BOtVUl4o.js:5:10016 | li@http://localhost:7110/assets/index-BOtVUl4o.js:5:31226 |

#### R0115 (G21; B) / R0116 (G22; B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad38378d52d8cbf0f6b0d51
- message A: `Error: Payments SDK not ready`
- message B: `Error: Payments SDK not ready`

| frame | A | B |
|---|---|---|
| 1 | @http://localhost:7110/assets/index-BOtVUl4o.js:17:6267 | @http://localhost:7110/assets/index-BOtVUl4o.js:17:6267 |

#### R0115 (G21; B) / R0149 (D5; D, B)

- environment: browser-prod; axes that differ: incident, browser
- bug: 6ad38378d52d8cbf0f6b0d51
- message A: `Error: Payments SDK not ready`
- message B: `Error: Session refresh failed: no refresh token`

| frame | A | B |
|---|---|---|
| 1 | @http://localhost:7110/assets/index-BOtVUl4o.js:17:6267 | @http://localhost:7110/assets/index-BOtVUl4o.js:17:17455 |

#### R0116 (G22; B) / R0149 (D5; D, B)

- environment: browser-prod; axes that differ: incident, browser
- bug: 6ad38378d52d8cbf0f6b0d51
- message A: `Error: Payments SDK not ready`
- message B: `Error: Session refresh failed: no refresh token`

| frame | A | B |
|---|---|---|
| 1 | @http://localhost:7110/assets/index-BOtVUl4o.js:17:6267 | @http://localhost:7110/assets/index-BOtVUl4o.js:17:17455 |

#### R0118 (G24; B) / R0119 (G25; B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad38312d52d8cbf0f6b0980
- message A: `RuntimeError: unreachable executed`
- message B: `RuntimeError: unreachable executed`

| frame | A | B |
|---|---|---|
| 1 | @http://localhost:7110/assets/index-BOtVUl4o.js line 8 > WebAssembly.instantiate:wasm-function[0]:0x44 | @http://localhost:7110/assets/index-BOtVUl4o.js line 8 > WebAssembly.instantiate:wasm-function[1]:0x5b |
| 2 | ie@http://localhost:7110/assets/index-BOtVUl4o.js:8:59048 | ae@http://localhost:7110/assets/index-BOtVUl4o.js:8:59099 |
| 3 | oe@http://localhost:7110/assets/index-BOtVUl4o.js:8:59136 | vi@http://localhost:7110/assets/index-BOtVUl4o.js:17:6394 |
| 4 | onClick@http://localhost:7110/assets/index-BOtVUl4o.js:9:2012 | onClick@http://localhost:7110/assets/index-BOtVUl4o.js:17:8039 |
| 5 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9805 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9805 |

#### R0122 (G28; B) / R0123 (G29; B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad38314d52d8cbf0f6b0998
- message A: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`
- message B: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`

| frame | A | B |
|---|---|---|
| 1 | se@http://localhost:7110/assets/index-BOtVUl4o.js:9:400 | se@http://localhost:7110/assets/index-BOtVUl4o.js:9:400 |
| 2 | async*E@http://localhost:7110/assets/index-BOtVUl4o.js:9:499 | async*bi@http://localhost:7110/assets/index-BOtVUl4o.js:17:6479 |
| 3 | onClick@http://localhost:7110/assets/index-BOtVUl4o.js:9:2411 | onClick@http://localhost:7110/assets/index-BOtVUl4o.js:17:8436 |
| 4 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9805 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9805 |
| 5 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9959 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9959 |

#### R0122 (G28; B) / R0180 (G29; B)

- environment: browser-prod; axes that differ: incident, browser; designated hard-negative pair
- bug: 6ad38314d52d8cbf0f6b0998
- message A: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`
- message B: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`

| frame | A | B |
|---|---|---|
| 1 | se@http://localhost:7110/assets/index-BOtVUl4o.js:9:400 | se@http://localhost:7110/assets/index-BOtVUl4o.js:9:405 |
| 2 | async*E@http://localhost:7110/assets/index-BOtVUl4o.js:9:499 |  |
| 3 | onClick@http://localhost:7110/assets/index-BOtVUl4o.js:9:2411 |  |
| 4 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9805 |  |
| 5 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9959 |  |

#### R0123 (G29; B) / R0179 (G28; B)

- environment: browser-prod; axes that differ: incident, browser; designated hard-negative pair
- bug: 6ad38314d52d8cbf0f6b0998
- message A: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`
- message B: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`

| frame | A | B |
|---|---|---|
| 1 | se@http://localhost:7110/assets/index-BOtVUl4o.js:9:400 | se@http://localhost:7110/assets/index-BOtVUl4o.js:9:405 |
| 2 | async*bi@http://localhost:7110/assets/index-BOtVUl4o.js:17:6479 |  |
| 3 | onClick@http://localhost:7110/assets/index-BOtVUl4o.js:17:8436 |  |
| 4 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9805 |  |
| 5 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9959 |  |

#### R0132 (A8a; U, B) / R0133 (A8b; U, B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad382ebd52d8cbf0f6b080c
- message A: `TypeError: undefined is not an object (evaluating 'e.toFixed')`
- message B: `TypeError: undefined is not an object (evaluating 'e.toFixed')`

| frame | A | B |
|---|---|---|
| 1 | Ii@http://localhost:7110/assets/index-BOtVUl4o.js:17:8758 | Ii@http://localhost:7110/assets/index-BOtVUl4o.js:17:8758 |
| 2 | n@http://localhost:7110/assets/index-BOtVUl4o.js:17:8840 | n@http://localhost:7110/assets/index-BOtVUl4o.js:17:16365 |
| 3 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9810 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9810 |
| 4 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9964 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9964 |
| 5 | ht@http://localhost:7110/assets/index-BOtVUl4o.js:5:10021 | ht@http://localhost:7110/assets/index-BOtVUl4o.js:5:10021 |

#### R0136 (B2; U, D, B) / R0137 (B3; U, D, B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad38311d52d8cbf0f6b0974
- message A: `↵ td↵ tr↵ tbody↵ table↵ Ta@http://localhost:7110/assets/index-BOtVUl4o.js:17:16533↵ Wi@http://localhost:7110/assets/index-BOtVUl4o.js:17:9622↵ main↵ v@http://localhost:7110/assets/index-BOtVUl4o.js:8:57962↵ Ya`
- message B: `↵ small↵ span↵ Ea@http://localhost:7110/assets/index-BOtVUl4o.js:17:16736↵ Wi@http://localhost:7110/assets/index-BOtVUl4o.js:17:9622↵ main↵ v@http://localhost:7110/assets/index-BOtVUl4o.js:8:57962↵ Xa@http:/`

| frame | A | B |
|---|---|---|
| 1 | za@http://localhost:7110/assets/index-BOtVUl4o.js:6:6268 | za@http://localhost:7110/assets/index-BOtVUl4o.js:6:6268 |
| 2 | _@http://localhost:7110/assets/index-BOtVUl4o.js:6:11241 | f@http://localhost:7110/assets/index-BOtVUl4o.js:6:8036 |
| 3 | Rs@http://localhost:7110/assets/index-BOtVUl4o.js:8:1474 | h@http://localhost:7110/assets/index-BOtVUl4o.js:6:9169 |
| 4 | Ul@http://localhost:7110/assets/index-BOtVUl4o.js:8:45271 | Rs@http://localhost:7110/assets/index-BOtVUl4o.js:8:1474 |
| 5 | Nl@http://localhost:7110/assets/index-BOtVUl4o.js:8:39385 | Ul@http://localhost:7110/assets/index-BOtVUl4o.js:8:45271 |

#### R0136 (B2; U, D, B) / R0160 (G9; B)

- environment: browser-prod; axes that differ: incident
- bug: 6ad38311d52d8cbf0f6b0974
- message A: `↵ td↵ tr↵ tbody↵ table↵ Ta@http://localhost:7110/assets/index-BOtVUl4o.js:17:16533↵ Wi@http://localhost:7110/assets/index-BOtVUl4o.js:17:9622↵ main↵ v@http://localhost:7110/assets/index-BOtVUl4o.js:8:57962↵ Ya`
- message B: `Error: Unexpected inventory response: {"data":{"items":[{"sku":"sku-1000","onHand":0,"warehouse":"LDS-1"},{"sku":"sku-1001","onHand":7,"warehouse":"LDS-1"},{"sku":"sku-1002","onHand":14,"warehouse":"L`

| frame | A | B |
|---|---|---|
| 1 | za@http://localhost:7110/assets/index-BOtVUl4o.js:6:6268 | za@http://localhost:7110/assets/index-BOtVUl4o.js:17:17901 |
| 2 | _@http://localhost:7110/assets/index-BOtVUl4o.js:6:11241 | onClick@http://localhost:7110/assets/index-BOtVUl4o.js:17:21411 |
| 3 | Rs@http://localhost:7110/assets/index-BOtVUl4o.js:8:1474 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9810 |
| 4 | Ul@http://localhost:7110/assets/index-BOtVUl4o.js:8:45271 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9964 |
| 5 | Nl@http://localhost:7110/assets/index-BOtVUl4o.js:8:39385 | ht@http://localhost:7110/assets/index-BOtVUl4o.js:5:10021 |

#### R0137 (B3; U, D, B) / R0160 (G9; B)

- environment: browser-prod; axes that differ: incident
- bug: 6ad38311d52d8cbf0f6b0974
- message A: `↵ small↵ span↵ Ea@http://localhost:7110/assets/index-BOtVUl4o.js:17:16736↵ Wi@http://localhost:7110/assets/index-BOtVUl4o.js:17:9622↵ main↵ v@http://localhost:7110/assets/index-BOtVUl4o.js:8:57962↵ Xa@http:/`
- message B: `Error: Unexpected inventory response: {"data":{"items":[{"sku":"sku-1000","onHand":0,"warehouse":"LDS-1"},{"sku":"sku-1001","onHand":7,"warehouse":"LDS-1"},{"sku":"sku-1002","onHand":14,"warehouse":"L`

| frame | A | B |
|---|---|---|
| 1 | za@http://localhost:7110/assets/index-BOtVUl4o.js:6:6268 | za@http://localhost:7110/assets/index-BOtVUl4o.js:17:17901 |
| 2 | f@http://localhost:7110/assets/index-BOtVUl4o.js:6:8036 | onClick@http://localhost:7110/assets/index-BOtVUl4o.js:17:21411 |
| 3 | h@http://localhost:7110/assets/index-BOtVUl4o.js:6:9169 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9810 |
| 4 | Rs@http://localhost:7110/assets/index-BOtVUl4o.js:8:1474 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9964 |
| 5 | Ul@http://localhost:7110/assets/index-BOtVUl4o.js:8:45271 | ht@http://localhost:7110/assets/index-BOtVUl4o.js:5:10021 |

#### R0139 (C1; U, B) / R0140 (C2; U, B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad38354d52d8cbf0f6b0bf6
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 500`

| frame | A | B |
|---|---|---|
| 1 | Wn@http://localhost:7110/assets/index-BOtVUl4o.js:11:11890 | Wn@http://localhost:7110/assets/index-BOtVUl4o.js:11:11890 |
| 2 | _@http://localhost:7110/assets/index-BOtVUl4o.js:11:18958 | _@http://localhost:7110/assets/index-BOtVUl4o.js:11:18958 |

#### R0139 (C1; U, B) / R0141 (C3; U, D, B)

- environment: browser-prod; axes that differ: incident
- bug: 6ad38354d52d8cbf0f6b0bf6
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 404`

| frame | A | B |
|---|---|---|
| 1 | Wn@http://localhost:7110/assets/index-BOtVUl4o.js:11:11890 | Wn@http://localhost:7110/assets/index-BOtVUl4o.js:11:11890 |
| 2 | _@http://localhost:7110/assets/index-BOtVUl4o.js:11:18958 | _@http://localhost:7110/assets/index-BOtVUl4o.js:11:18958 |

#### R0140 (C2; U, B) / R0141 (C3; U, D, B)

- environment: browser-prod; axes that differ: incident
- bug: 6ad38354d52d8cbf0f6b0bf6
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 404`

| frame | A | B |
|---|---|---|
| 1 | Wn@http://localhost:7110/assets/index-BOtVUl4o.js:11:11890 | Wn@http://localhost:7110/assets/index-BOtVUl4o.js:11:11890 |
| 2 | _@http://localhost:7110/assets/index-BOtVUl4o.js:11:18958 | _@http://localhost:7110/assets/index-BOtVUl4o.js:11:18958 |

#### R0142 (C4; U, D, B) / R0143 (C5; U, D, B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad3834ed52d8cbf0f6b0bb4
- message A: `Unhandled Promise Rejection: Load failed`
- message B: `Unhandled Promise Rejection: Load failed`

| frame | A | B |
|---|---|---|
| 1 | (no frames) | (no frames) |

#### R0142 (C4; U, D, B) / R0311 (C5; U, D, B)

- environment: browser-prod; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad3834ed52d8cbf0f6b0bb4
- message A: `Unhandled Promise Rejection: Load failed`
- message B: `Unhandled Promise Rejection: Load failed`

| frame | A | B |
|---|---|---|
| 1 | (no frames) | (no frames) |

#### R0143 (C5; U, D, B) / R0310 (C4; U, D, B)

- environment: browser-prod; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad3834ed52d8cbf0f6b0bb4
- message A: `Unhandled Promise Rejection: Load failed`
- message B: `Unhandled Promise Rejection: Load failed`

| frame | A | B |
|---|---|---|
| 1 | (no frames) | (no frames) |

#### R0157 (G6; B) / R0158 (G7; B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad383e1d52d8cbf0f6b10e8
- message A: `Error: Operation failed after retries`
- message B: `Error: Operation failed after retries`

| frame | A | B |
|---|---|---|
| 1 | li@http://localhost:7110/assets/index-BOtVUl4o.js:17:5971 | li@http://localhost:7110/assets/index-BOtVUl4o.js:17:5971 |
| 2 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9810 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9810 |
| 3 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9964 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9964 |
| 4 | ht@http://localhost:7110/assets/index-BOtVUl4o.js:5:10021 | ht@http://localhost:7110/assets/index-BOtVUl4o.js:5:10021 |
| 5 | li@http://localhost:7110/assets/index-BOtVUl4o.js:5:31226 | li@http://localhost:7110/assets/index-BOtVUl4o.js:5:31226 |

#### R0170 (G19; B) / R0171 (G20; B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad38344d52d8cbf0f6b0b54
- message A: `TypeError: undefined is not an object (evaluating 'e.billing.address.zip')`
- message B: `TypeError: undefined is not an object (evaluating 'e.shipping.address.zip')`

| frame | A | B |
|---|---|---|
| 1 | Wa@http://localhost:7110/assets/index-BOtVUl4o.js:17:18376 | Wa@http://localhost:7110/assets/index-BOtVUl4o.js:17:18405 |
| 2 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9810 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9810 |
| 3 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9964 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9964 |
| 4 | ht@http://localhost:7110/assets/index-BOtVUl4o.js:5:10021 | ht@http://localhost:7110/assets/index-BOtVUl4o.js:5:10021 |
| 5 | li@http://localhost:7110/assets/index-BOtVUl4o.js:5:31226 | li@http://localhost:7110/assets/index-BOtVUl4o.js:5:31226 |

#### R0172 (G21; B) / R0173 (G22; B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad38414d52d8cbf0f6b1290
- message A: `Error: Payments SDK not ready`
- message B: `Error: Payments SDK not ready`

| frame | A | B |
|---|---|---|
| 1 | module code@http://localhost:7110/assets/index-BOtVUl4o.js:17:6267 | module code@http://localhost:7110/assets/index-BOtVUl4o.js:17:6267 |

#### R0175 (G24; B) / R0176 (G25; B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad38366d52d8cbf0f6b0ca8
- message A: `RuntimeError: Unreachable code should not be executed (evaluating 't.apply(n,l)')`
- message B: `RuntimeError: Unreachable code should not be executed (evaluating 't.apply(n,l)')`

| frame | A | B |
|---|---|---|
| 1 | 0@wasm-function[0] | 1@wasm-function[1] |
| 2 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9810 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9810 |
| 3 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9964 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9964 |
| 4 | ht@http://localhost:7110/assets/index-BOtVUl4o.js:5:10021 | ht@http://localhost:7110/assets/index-BOtVUl4o.js:5:10021 |
| 5 | li@http://localhost:7110/assets/index-BOtVUl4o.js:5:31226 | li@http://localhost:7110/assets/index-BOtVUl4o.js:5:31226 |

#### R0175 (G24; B) / R0344 (G25; B)

- environment: browser-prod; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad38366d52d8cbf0f6b0ca8
- message A: `RuntimeError: Unreachable code should not be executed (evaluating 't.apply(n,l)')`
- message B: `RuntimeError: Unreachable code should not be executed (evaluating 't.apply(n,l)')`

| frame | A | B |
|---|---|---|
| 1 | 0@wasm-function[0] | 2@wasm-function[2] |
| 2 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9810 | ct@http://localhost:7110/assets/index-DvtLrm67.js:5:9811 |
| 3 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9964 | mt@http://localhost:7110/assets/index-DvtLrm67.js:5:9965 |
| 4 | ht@http://localhost:7110/assets/index-BOtVUl4o.js:5:10021 | ht@http://localhost:7110/assets/index-DvtLrm67.js:5:10022 |
| 5 | li@http://localhost:7110/assets/index-BOtVUl4o.js:5:31226 | li@http://localhost:7110/assets/index-DvtLrm67.js:5:31237 |

#### R0176 (G25; B) / R0343 (G24; B)

- environment: browser-prod; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad38366d52d8cbf0f6b0ca8
- message A: `RuntimeError: Unreachable code should not be executed (evaluating 't.apply(n,l)')`
- message B: `RuntimeError: Unreachable code should not be executed (evaluating 't.apply(n,l)')`

| frame | A | B |
|---|---|---|
| 1 | 1@wasm-function[1] | 1@wasm-function[1] |
| 2 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9810 | ct@http://localhost:7110/assets/index-DvtLrm67.js:5:9811 |
| 3 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9964 | mt@http://localhost:7110/assets/index-DvtLrm67.js:5:9965 |
| 4 | ht@http://localhost:7110/assets/index-BOtVUl4o.js:5:10021 | ht@http://localhost:7110/assets/index-DvtLrm67.js:5:10022 |
| 5 | li@http://localhost:7110/assets/index-BOtVUl4o.js:5:31226 | li@http://localhost:7110/assets/index-DvtLrm67.js:5:31237 |

#### R0179 (G28; B) / R0180 (G29; B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad38314d52d8cbf0f6b0998
- message A: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`
- message B: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`

| frame | A | B |
|---|---|---|
| 1 | se@http://localhost:7110/assets/index-BOtVUl4o.js:9:405 | se@http://localhost:7110/assets/index-BOtVUl4o.js:9:405 |

#### R0189 (A8a; U, B) / R0190 (A8b; U, B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad383b5d52d8cbf0f6b0f68
- message A: `Uncaught TypeError: Cannot read properties of undefined (reading 'toFixed')`
- message B: `Uncaught TypeError: Cannot read properties of undefined (reading 'toFixed')`

| frame | A | B |
|---|---|---|
| 1 | at Ri (http://localhost:7110/assets/index-DvtLrm67.js:17:9132) | at Ri (http://localhost:7110/assets/index-DvtLrm67.js:17:9132) |
| 2 | at n (http://localhost:7110/assets/index-DvtLrm67.js:17:9239) | at n (http://localhost:7110/assets/index-DvtLrm67.js:17:17094) |
| 3 | at Object.ct (http://localhost:7110/assets/index-DvtLrm67.js:5:9806) | at Object.ct (http://localhost:7110/assets/index-DvtLrm67.js:5:9806) |
| 4 | at mt (http://localhost:7110/assets/index-DvtLrm67.js:5:9960) | at mt (http://localhost:7110/assets/index-DvtLrm67.js:5:9960) |
| 5 | at ht (http://localhost:7110/assets/index-DvtLrm67.js:5:10017) | at ht (http://localhost:7110/assets/index-DvtLrm67.js:5:10017) |

#### R0196 (C1; U, B) / R0197 (C2; U, B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad383b2d52d8cbf0f6b0f48
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 500`

| frame | A | B |
|---|---|---|
| 1 | at Kn (http://localhost:7110/assets/index-DvtLrm67.js:11:11885) | at Kn (http://localhost:7110/assets/index-DvtLrm67.js:11:11885) |
| 2 | at XMLHttpRequest._ (http://localhost:7110/assets/index-DvtLrm67.js:11:18956) | at XMLHttpRequest._ (http://localhost:7110/assets/index-DvtLrm67.js:11:18956) |
| 3 | at ti.request (http://localhost:7110/assets/index-DvtLrm67.js:13:2170) |  |
| 4 | at async si (http://localhost:7110/assets/index-DvtLrm67.js:17:5639) |  |
| 5 | at async e (http://localhost:7110/assets/index-DvtLrm67.js:17:7063) |  |

#### R0196 (C1; U, B) / R0198 (C3; U, D, B)

- environment: browser-prod; axes that differ: incident
- bug: 6ad383b2d52d8cbf0f6b0f48
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 404`

| frame | A | B |
|---|---|---|
| 1 | at Kn (http://localhost:7110/assets/index-DvtLrm67.js:11:11885) | at Kn (http://localhost:7110/assets/index-DvtLrm67.js:11:11885) |
| 2 | at XMLHttpRequest._ (http://localhost:7110/assets/index-DvtLrm67.js:11:18956) | at XMLHttpRequest._ (http://localhost:7110/assets/index-DvtLrm67.js:11:18956) |
| 3 | at ti.request (http://localhost:7110/assets/index-DvtLrm67.js:13:2170) | at ti.request (http://localhost:7110/assets/index-DvtLrm67.js:13:2170) |
| 4 | at async si (http://localhost:7110/assets/index-DvtLrm67.js:17:5639) | at async Yi (http://localhost:7110/assets/index-DvtLrm67.js:17:10856) |
| 5 | at async e (http://localhost:7110/assets/index-DvtLrm67.js:17:7063) | at async t (http://localhost:7110/assets/index-DvtLrm67.js:17:15027) |

#### R0197 (C2; U, B) / R0198 (C3; U, D, B)

- environment: browser-prod; axes that differ: incident
- bug: 6ad383b2d52d8cbf0f6b0f48
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 404`

| frame | A | B |
|---|---|---|
| 1 | at Kn (http://localhost:7110/assets/index-DvtLrm67.js:11:11885) | at Kn (http://localhost:7110/assets/index-DvtLrm67.js:11:11885) |
| 2 | at XMLHttpRequest._ (http://localhost:7110/assets/index-DvtLrm67.js:11:18956) | at XMLHttpRequest._ (http://localhost:7110/assets/index-DvtLrm67.js:11:18956) |
| 3 |  | at ti.request (http://localhost:7110/assets/index-DvtLrm67.js:13:2170) |
| 4 |  | at async Yi (http://localhost:7110/assets/index-DvtLrm67.js:17:10856) |
| 5 |  | at async t (http://localhost:7110/assets/index-DvtLrm67.js:17:15027) |

#### R0224 (G19; B) / R0225 (G20; B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad3840fd52d8cbf0f6b125f
- message A: `Uncaught TypeError: Cannot read properties of undefined (reading 'zip')`
- message B: `Uncaught TypeError: Cannot read properties of undefined (reading 'zip')`

| frame | A | B |
|---|---|---|
| 1 | at Ka (http://localhost:7110/assets/index-DvtLrm67.js:17:19465) | at Ka (http://localhost:7110/assets/index-DvtLrm67.js:17:19494) |
| 2 | at onClick (http://localhost:7110/assets/index-DvtLrm67.js:17:23297) | at onClick (http://localhost:7110/assets/index-DvtLrm67.js:17:23508) |
| 3 | at Object.ct (http://localhost:7110/assets/index-DvtLrm67.js:5:9806) | at Object.ct (http://localhost:7110/assets/index-DvtLrm67.js:5:9806) |
| 4 | at mt (http://localhost:7110/assets/index-DvtLrm67.js:5:9960) | at mt (http://localhost:7110/assets/index-DvtLrm67.js:5:9960) |
| 5 | at ht (http://localhost:7110/assets/index-DvtLrm67.js:5:10017) | at ht (http://localhost:7110/assets/index-DvtLrm67.js:5:10017) |

#### R0226 (G21; B) / R0227 (G22; B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad38443d52d8cbf0f6b1420
- message A: `Uncaught Error: Payments SDK not ready`
- message B: `Uncaught Error: Payments SDK not ready`

| frame | A | B |
|---|---|---|
| 1 | at http://localhost:7110/assets/index-DvtLrm67.js:17:6436 | at http://localhost:7110/assets/index-DvtLrm67.js:17:6436 |

#### R0233 (G28; B) / R0234 (G29; B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad3831fd52d8cbf0f6b0a06
- message A: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`
- message B: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`

| frame | A | B |
|---|---|---|
| 1 | at reserve (file:///srv/mock/server.mjs:29:28) | at reserve (file:///srv/mock/server.mjs:29:28) |
| 2 | at Server.<anonymous> (file:///srv/mock/server.mjs:51:29) | at Server.<anonymous> (file:///srv/mock/server.mjs:51:29) |
| 3 | at process.processTicksAndRejections (node:internal/process/task_queues:103:5) | at process.processTicksAndRejections (node:internal/process/task_queues:103:5) |
| 4 | at E (http://localhost:7110/assets/index-DvtLrm67.js:9:419) | at E (http://localhost:7110/assets/index-DvtLrm67.js:9:419) |

#### R0243 (A8a; U, B) / R0244 (A8b; U, B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad38310d52d8cbf0f6b0969
- message A: `TypeError: can't access property "toFixed", e is undefined`
- message B: `TypeError: can't access property "toFixed", e is undefined`

| frame | A | B |
|---|---|---|
| 1 | Ri@http://localhost:7110/assets/index-DvtLrm67.js:17:9130 | Ri@http://localhost:7110/assets/index-DvtLrm67.js:17:9130 |
| 2 | n@http://localhost:7110/assets/index-DvtLrm67.js:17:9239 | n@http://localhost:7110/assets/index-DvtLrm67.js:17:17094 |
| 3 | ct@http://localhost:7110/assets/index-DvtLrm67.js:5:9806 | ct@http://localhost:7110/assets/index-DvtLrm67.js:5:9806 |
| 4 | mt@http://localhost:7110/assets/index-DvtLrm67.js:5:9960 | mt@http://localhost:7110/assets/index-DvtLrm67.js:5:9960 |
| 5 | ht@http://localhost:7110/assets/index-DvtLrm67.js:5:10017 | ht@http://localhost:7110/assets/index-DvtLrm67.js:5:10017 |

#### R0243 (A8a; U, B) / R0301 (A8b; U, B)

- environment: browser-prod; axes that differ: incident, browser; designated hard-negative pair
- bug: 6ad38310d52d8cbf0f6b0969
- message A: `TypeError: can't access property "toFixed", e is undefined`
- message B: `TypeError: undefined is not an object (evaluating 'e.toFixed')`

| frame | A | B |
|---|---|---|
| 1 | Ri@http://localhost:7110/assets/index-DvtLrm67.js:17:9130 | Ri@http://localhost:7110/assets/index-DvtLrm67.js:17:9131 |
| 2 | n@http://localhost:7110/assets/index-DvtLrm67.js:17:9239 | n@http://localhost:7110/assets/index-DvtLrm67.js:17:17096 |
| 3 | ct@http://localhost:7110/assets/index-DvtLrm67.js:5:9806 | ct@http://localhost:7110/assets/index-DvtLrm67.js:5:9811 |
| 4 | mt@http://localhost:7110/assets/index-DvtLrm67.js:5:9960 | mt@http://localhost:7110/assets/index-DvtLrm67.js:5:9965 |
| 5 | ht@http://localhost:7110/assets/index-DvtLrm67.js:5:10017 | ht@http://localhost:7110/assets/index-DvtLrm67.js:5:10022 |

#### R0244 (A8b; U, B) / R0300 (A8a; U, B)

- environment: browser-prod; axes that differ: incident, browser; designated hard-negative pair
- bug: 6ad38310d52d8cbf0f6b0969
- message A: `TypeError: can't access property "toFixed", e is undefined`
- message B: `TypeError: undefined is not an object (evaluating 'e.toFixed')`

| frame | A | B |
|---|---|---|
| 1 | Ri@http://localhost:7110/assets/index-DvtLrm67.js:17:9130 | Ri@http://localhost:7110/assets/index-DvtLrm67.js:17:9131 |
| 2 | n@http://localhost:7110/assets/index-DvtLrm67.js:17:17094 | n@http://localhost:7110/assets/index-DvtLrm67.js:17:9241 |
| 3 | ct@http://localhost:7110/assets/index-DvtLrm67.js:5:9806 | ct@http://localhost:7110/assets/index-DvtLrm67.js:5:9811 |
| 4 | mt@http://localhost:7110/assets/index-DvtLrm67.js:5:9960 | mt@http://localhost:7110/assets/index-DvtLrm67.js:5:9965 |
| 5 | ht@http://localhost:7110/assets/index-DvtLrm67.js:5:10017 | ht@http://localhost:7110/assets/index-DvtLrm67.js:5:10022 |

#### R0247 (B2; U, D, B) / R0248 (B3; U, D, B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad382fad52d8cbf0f6b0895
- message A: `↵ td↵ tr↵ tbody↵ table↵ H@http://localhost:7110/assets/index-DvtLrm67.js:17:17269↵ Ki@http://localhost:7110/assets/index-DvtLrm67.js:17:10094↵ main↵ b@http://localhost:7110/assets/index-DvtLrm67.js:8:58019↵ Za`
- message B: `↵ small↵ span↵ Da@http://localhost:7110/assets/index-DvtLrm67.js:17:17503↵ Ki@http://localhost:7110/assets/index-DvtLrm67.js:17:10094↵ main↵ b@http://localhost:7110/assets/index-DvtLrm67.js:8:58019↵ Qa@http:`

| frame | A | B |
|---|---|---|
| 1 | za@http://localhost:7110/assets/index-DvtLrm67.js:6:6266 | za@http://localhost:7110/assets/index-DvtLrm67.js:6:6266 |
| 2 | _@http://localhost:7110/assets/index-DvtLrm67.js:6:11239 | f@http://localhost:7110/assets/index-DvtLrm67.js:6:8038 |
| 3 | Rs@http://localhost:7110/assets/index-DvtLrm67.js:8:1472 | h@http://localhost:7110/assets/index-DvtLrm67.js:6:9168 |
| 4 | Ul@http://localhost:7110/assets/index-DvtLrm67.js:8:45266 | _@http://localhost:7110/assets/index-DvtLrm67.js:6:11200 |
| 5 | Nl@http://localhost:7110/assets/index-DvtLrm67.js:8:39386 | Rs@http://localhost:7110/assets/index-DvtLrm67.js:8:1472 |

#### R0247 (B2; U, D, B) / R0305 (B3; U, D, B)

- environment: browser-prod; axes that differ: incident, browser; designated hard-negative pair
- bug: 6ad382fad52d8cbf0f6b0895
- message A: `↵ td↵ tr↵ tbody↵ table↵ H@http://localhost:7110/assets/index-DvtLrm67.js:17:17269↵ Ki@http://localhost:7110/assets/index-DvtLrm67.js:17:10094↵ main↵ b@http://localhost:7110/assets/index-DvtLrm67.js:8:58019↵ Za`
- message B: `↵ small↵ span↵ Da@http://localhost:7110/assets/index-DvtLrm67.js:17:17524↵ Ki@http://localhost:7110/assets/index-DvtLrm67.js:17:10099↵ main↵ b@http://localhost:7110/assets/index-DvtLrm67.js:8:58052↵ Qa@http:`

| frame | A | B |
|---|---|---|
| 1 | za@http://localhost:7110/assets/index-DvtLrm67.js:6:6266 | za@http://localhost:7110/assets/index-DvtLrm67.js:6:6271 |
| 2 | _@http://localhost:7110/assets/index-DvtLrm67.js:6:11239 | f@http://localhost:7110/assets/index-DvtLrm67.js:6:8038 |
| 3 | Rs@http://localhost:7110/assets/index-DvtLrm67.js:8:1472 | h@http://localhost:7110/assets/index-DvtLrm67.js:6:9169 |
| 4 | Ul@http://localhost:7110/assets/index-DvtLrm67.js:8:45266 | Rs@http://localhost:7110/assets/index-DvtLrm67.js:8:1474 |
| 5 | Nl@http://localhost:7110/assets/index-DvtLrm67.js:8:39386 | Ul@http://localhost:7110/assets/index-DvtLrm67.js:8:45268 |

#### R0248 (B3; U, D, B) / R0304 (B2; U, D, B)

- environment: browser-prod; axes that differ: incident, browser; designated hard-negative pair
- bug: 6ad382fad52d8cbf0f6b0895
- message A: `↵ small↵ span↵ Da@http://localhost:7110/assets/index-DvtLrm67.js:17:17503↵ Ki@http://localhost:7110/assets/index-DvtLrm67.js:17:10094↵ main↵ b@http://localhost:7110/assets/index-DvtLrm67.js:8:58019↵ Qa@http:`
- message B: `↵ td↵ tr↵ tbody↵ table↵ H@http://localhost:7110/assets/index-DvtLrm67.js:17:17292↵ Ki@http://localhost:7110/assets/index-DvtLrm67.js:17:10099↵ main↵ b@http://localhost:7110/assets/index-DvtLrm67.js:8:58052↵ Za`

| frame | A | B |
|---|---|---|
| 1 | za@http://localhost:7110/assets/index-DvtLrm67.js:6:6266 | za@http://localhost:7110/assets/index-DvtLrm67.js:6:6271 |
| 2 | f@http://localhost:7110/assets/index-DvtLrm67.js:6:8038 | _@http://localhost:7110/assets/index-DvtLrm67.js:6:11239 |
| 3 | h@http://localhost:7110/assets/index-DvtLrm67.js:6:9168 | Rs@http://localhost:7110/assets/index-DvtLrm67.js:8:1474 |
| 4 | _@http://localhost:7110/assets/index-DvtLrm67.js:6:11200 | Ul@http://localhost:7110/assets/index-DvtLrm67.js:8:45268 |
| 5 | Rs@http://localhost:7110/assets/index-DvtLrm67.js:8:1472 | Nl@http://localhost:7110/assets/index-DvtLrm67.js:8:39386 |

#### R0250 (C1; U, B) / R0251 (C2; U, B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad383a8d52d8cbf0f6b0eec
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 500`

| frame | A | B |
|---|---|---|
| 1 | e@http://localhost:7110/assets/index-DvtLrm67.js:11:2004 | e@http://localhost:7110/assets/index-DvtLrm67.js:11:2004 |
| 2 | Kn@http://localhost:7110/assets/index-DvtLrm67.js:11:11885 | Kn@http://localhost:7110/assets/index-DvtLrm67.js:11:11885 |
| 3 | _@http://localhost:7110/assets/index-DvtLrm67.js:11:18958 | _@http://localhost:7110/assets/index-DvtLrm67.js:11:18958 |
| 4 | EventHandlerNonNull*_r</<@http://localhost:7110/assets/index-DvtLrm67.js:11:19154 | EventHandlerNonNull*_r</<@http://localhost:7110/assets/index-DvtLrm67.js:11:19154 |
| 5 | _r<@http://localhost:7110/assets/index-DvtLrm67.js:11:18260 | _r<@http://localhost:7110/assets/index-DvtLrm67.js:11:18260 |

#### R0250 (C1; U, B) / R0252 (C3; U, D, B)

- environment: browser-prod; axes that differ: incident
- bug: 6ad383a8d52d8cbf0f6b0eec
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 404`

| frame | A | B |
|---|---|---|
| 1 | e@http://localhost:7110/assets/index-DvtLrm67.js:11:2004 | e@http://localhost:7110/assets/index-DvtLrm67.js:11:2004 |
| 2 | Kn@http://localhost:7110/assets/index-DvtLrm67.js:11:11885 | Kn@http://localhost:7110/assets/index-DvtLrm67.js:11:11885 |
| 3 | _@http://localhost:7110/assets/index-DvtLrm67.js:11:18958 | _@http://localhost:7110/assets/index-DvtLrm67.js:11:18958 |
| 4 | EventHandlerNonNull*_r</<@http://localhost:7110/assets/index-DvtLrm67.js:11:19154 | EventHandlerNonNull*_r</<@http://localhost:7110/assets/index-DvtLrm67.js:11:19154 |
| 5 | _r<@http://localhost:7110/assets/index-DvtLrm67.js:11:18260 | _r<@http://localhost:7110/assets/index-DvtLrm67.js:11:18260 |

#### R0250 (C1; U, B) / R0265 (G3; B)

- environment: browser-prod; axes that differ: incident
- bug: 6ad383a8d52d8cbf0f6b0eec
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `TypeError: ui().trackPurchase is not a function`

| frame | A | B |
|---|---|---|
| 1 | e@http://localhost:7110/assets/index-DvtLrm67.js:11:2004 | e@http://localhost:7110/assets/index-DvtLrm67.js:17:7370 |
| 2 | Kn@http://localhost:7110/assets/index-DvtLrm67.js:11:11885 | ct@http://localhost:7110/assets/index-DvtLrm67.js:5:9806 |
| 3 | _@http://localhost:7110/assets/index-DvtLrm67.js:11:18958 | mt@http://localhost:7110/assets/index-DvtLrm67.js:5:9960 |
| 4 | EventHandlerNonNull*_r</<@http://localhost:7110/assets/index-DvtLrm67.js:11:19154 | ht@http://localhost:7110/assets/index-DvtLrm67.js:5:10017 |
| 5 | _r<@http://localhost:7110/assets/index-DvtLrm67.js:11:18260 | li@http://localhost:7110/assets/index-DvtLrm67.js:5:31235 |

#### R0250 (C1; U, B) / R0322 (G3; B)

- environment: browser-prod; axes that differ: incident, browser
- bug: 6ad383a8d52d8cbf0f6b0eec
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `TypeError: ui().trackPurchase is not a function. (In 'ui().trackPurchase({orderId:`o-5521`,value:42})', 'ui().trackPurchase' is undefined)`

| frame | A | B |
|---|---|---|
| 1 | e@http://localhost:7110/assets/index-DvtLrm67.js:11:2004 | e@http://localhost:7110/assets/index-DvtLrm67.js:17:7383 |
| 2 | Kn@http://localhost:7110/assets/index-DvtLrm67.js:11:11885 | ct@http://localhost:7110/assets/index-DvtLrm67.js:5:9811 |
| 3 | _@http://localhost:7110/assets/index-DvtLrm67.js:11:18958 | mt@http://localhost:7110/assets/index-DvtLrm67.js:5:9965 |
| 4 | EventHandlerNonNull*_r</<@http://localhost:7110/assets/index-DvtLrm67.js:11:19154 | ht@http://localhost:7110/assets/index-DvtLrm67.js:5:10022 |
| 5 | _r<@http://localhost:7110/assets/index-DvtLrm67.js:11:18260 | li@http://localhost:7110/assets/index-DvtLrm67.js:5:31237 |

#### R0251 (C2; U, B) / R0252 (C3; U, D, B)

- environment: browser-prod; axes that differ: incident
- bug: 6ad383a8d52d8cbf0f6b0eec
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 404`

| frame | A | B |
|---|---|---|
| 1 | e@http://localhost:7110/assets/index-DvtLrm67.js:11:2004 | e@http://localhost:7110/assets/index-DvtLrm67.js:11:2004 |
| 2 | Kn@http://localhost:7110/assets/index-DvtLrm67.js:11:11885 | Kn@http://localhost:7110/assets/index-DvtLrm67.js:11:11885 |
| 3 | _@http://localhost:7110/assets/index-DvtLrm67.js:11:18958 | _@http://localhost:7110/assets/index-DvtLrm67.js:11:18958 |
| 4 | EventHandlerNonNull*_r</<@http://localhost:7110/assets/index-DvtLrm67.js:11:19154 | EventHandlerNonNull*_r</<@http://localhost:7110/assets/index-DvtLrm67.js:11:19154 |
| 5 | _r<@http://localhost:7110/assets/index-DvtLrm67.js:11:18260 | _r<@http://localhost:7110/assets/index-DvtLrm67.js:11:18260 |

#### R0251 (C2; U, B) / R0265 (G3; B)

- environment: browser-prod; axes that differ: incident
- bug: 6ad383a8d52d8cbf0f6b0eec
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `TypeError: ui().trackPurchase is not a function`

| frame | A | B |
|---|---|---|
| 1 | e@http://localhost:7110/assets/index-DvtLrm67.js:11:2004 | e@http://localhost:7110/assets/index-DvtLrm67.js:17:7370 |
| 2 | Kn@http://localhost:7110/assets/index-DvtLrm67.js:11:11885 | ct@http://localhost:7110/assets/index-DvtLrm67.js:5:9806 |
| 3 | _@http://localhost:7110/assets/index-DvtLrm67.js:11:18958 | mt@http://localhost:7110/assets/index-DvtLrm67.js:5:9960 |
| 4 | EventHandlerNonNull*_r</<@http://localhost:7110/assets/index-DvtLrm67.js:11:19154 | ht@http://localhost:7110/assets/index-DvtLrm67.js:5:10017 |
| 5 | _r<@http://localhost:7110/assets/index-DvtLrm67.js:11:18260 | li@http://localhost:7110/assets/index-DvtLrm67.js:5:31235 |

#### R0251 (C2; U, B) / R0322 (G3; B)

- environment: browser-prod; axes that differ: incident, browser
- bug: 6ad383a8d52d8cbf0f6b0eec
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `TypeError: ui().trackPurchase is not a function. (In 'ui().trackPurchase({orderId:`o-5521`,value:42})', 'ui().trackPurchase' is undefined)`

| frame | A | B |
|---|---|---|
| 1 | e@http://localhost:7110/assets/index-DvtLrm67.js:11:2004 | e@http://localhost:7110/assets/index-DvtLrm67.js:17:7383 |
| 2 | Kn@http://localhost:7110/assets/index-DvtLrm67.js:11:11885 | ct@http://localhost:7110/assets/index-DvtLrm67.js:5:9811 |
| 3 | _@http://localhost:7110/assets/index-DvtLrm67.js:11:18958 | mt@http://localhost:7110/assets/index-DvtLrm67.js:5:9965 |
| 4 | EventHandlerNonNull*_r</<@http://localhost:7110/assets/index-DvtLrm67.js:11:19154 | ht@http://localhost:7110/assets/index-DvtLrm67.js:5:10022 |
| 5 | _r<@http://localhost:7110/assets/index-DvtLrm67.js:11:18260 | li@http://localhost:7110/assets/index-DvtLrm67.js:5:31237 |

#### R0252 (C3; U, D, B) / R0265 (G3; B)

- environment: browser-prod; axes that differ: incident
- bug: 6ad383a8d52d8cbf0f6b0eec
- message A: `Unhandled Promise Rejection: Request failed with status code 404`
- message B: `TypeError: ui().trackPurchase is not a function`

| frame | A | B |
|---|---|---|
| 1 | e@http://localhost:7110/assets/index-DvtLrm67.js:11:2004 | e@http://localhost:7110/assets/index-DvtLrm67.js:17:7370 |
| 2 | Kn@http://localhost:7110/assets/index-DvtLrm67.js:11:11885 | ct@http://localhost:7110/assets/index-DvtLrm67.js:5:9806 |
| 3 | _@http://localhost:7110/assets/index-DvtLrm67.js:11:18958 | mt@http://localhost:7110/assets/index-DvtLrm67.js:5:9960 |
| 4 | EventHandlerNonNull*_r</<@http://localhost:7110/assets/index-DvtLrm67.js:11:19154 | ht@http://localhost:7110/assets/index-DvtLrm67.js:5:10017 |
| 5 | _r<@http://localhost:7110/assets/index-DvtLrm67.js:11:18260 | li@http://localhost:7110/assets/index-DvtLrm67.js:5:31235 |

#### R0252 (C3; U, D, B) / R0322 (G3; B)

- environment: browser-prod; axes that differ: incident, browser
- bug: 6ad383a8d52d8cbf0f6b0eec
- message A: `Unhandled Promise Rejection: Request failed with status code 404`
- message B: `TypeError: ui().trackPurchase is not a function. (In 'ui().trackPurchase({orderId:`o-5521`,value:42})', 'ui().trackPurchase' is undefined)`

| frame | A | B |
|---|---|---|
| 1 | e@http://localhost:7110/assets/index-DvtLrm67.js:11:2004 | e@http://localhost:7110/assets/index-DvtLrm67.js:17:7383 |
| 2 | Kn@http://localhost:7110/assets/index-DvtLrm67.js:11:11885 | ct@http://localhost:7110/assets/index-DvtLrm67.js:5:9811 |
| 3 | _@http://localhost:7110/assets/index-DvtLrm67.js:11:18958 | mt@http://localhost:7110/assets/index-DvtLrm67.js:5:9965 |
| 4 | EventHandlerNonNull*_r</<@http://localhost:7110/assets/index-DvtLrm67.js:11:19154 | ht@http://localhost:7110/assets/index-DvtLrm67.js:5:10022 |
| 5 | _r<@http://localhost:7110/assets/index-DvtLrm67.js:11:18260 | li@http://localhost:7110/assets/index-DvtLrm67.js:5:31237 |

#### R0253 (C4; U, D, B) / R0254 (C5; U, D, B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad382f2d52d8cbf0f6b0847
- message A: `Unhandled Promise Rejection: NetworkError when attempting to fetch resource.`
- message B: `Unhandled Promise Rejection: NetworkError when attempting to fetch resource.`

| frame | A | B |
|---|---|---|
| 1 | (no frames) | (no frames) |

#### R0268 (G6; B) / R0269 (G7; B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad38370d52d8cbf0f6b0d06
- message A: `Error: Operation failed after retries`
- message B: `Error: Operation failed after retries`

| frame | A | B |
|---|---|---|
| 1 | R@http://localhost:7110/assets/index-DvtLrm67.js:17:6055 | R@http://localhost:7110/assets/index-DvtLrm67.js:17:6055 |
| 2 | za@http://localhost:7110/assets/index-DvtLrm67.js:17:18615 | pi@http://localhost:7110/assets/index-DvtLrm67.js:17:6206 |
| 3 | onClick@http://localhost:7110/assets/index-DvtLrm67.js:17:22049 | onClick@http://localhost:7110/assets/index-DvtLrm67.js:17:7604 |
| 4 | ct@http://localhost:7110/assets/index-DvtLrm67.js:5:9806 | ct@http://localhost:7110/assets/index-DvtLrm67.js:5:9806 |
| 5 | mt@http://localhost:7110/assets/index-DvtLrm67.js:5:9960 | mt@http://localhost:7110/assets/index-DvtLrm67.js:5:9960 |

#### R0268 (G6; B) / R0326 (G7; B)

- environment: browser-prod; axes that differ: incident, browser; designated hard-negative pair
- bug: 6ad38370d52d8cbf0f6b0d06
- message A: `Error: Operation failed after retries`
- message B: `Error: Operation failed after retries`

| frame | A | B |
|---|---|---|
| 1 | R@http://localhost:7110/assets/index-DvtLrm67.js:17:6055 | R@http://localhost:7110/assets/index-DvtLrm67.js:17:6060 |
| 2 | za@http://localhost:7110/assets/index-DvtLrm67.js:17:18615 | ct@http://localhost:7110/assets/index-DvtLrm67.js:5:9811 |
| 3 | onClick@http://localhost:7110/assets/index-DvtLrm67.js:17:22049 | mt@http://localhost:7110/assets/index-DvtLrm67.js:5:9965 |
| 4 | ct@http://localhost:7110/assets/index-DvtLrm67.js:5:9806 | ht@http://localhost:7110/assets/index-DvtLrm67.js:5:10022 |
| 5 | mt@http://localhost:7110/assets/index-DvtLrm67.js:5:9960 | li@http://localhost:7110/assets/index-DvtLrm67.js:5:31237 |

#### R0269 (G7; B) / R0325 (G6; B)

- environment: browser-prod; axes that differ: incident, browser; designated hard-negative pair
- bug: 6ad38370d52d8cbf0f6b0d06
- message A: `Error: Operation failed after retries`
- message B: `Error: Operation failed after retries`

| frame | A | B |
|---|---|---|
| 1 | R@http://localhost:7110/assets/index-DvtLrm67.js:17:6055 | R@http://localhost:7110/assets/index-DvtLrm67.js:17:6060 |
| 2 | pi@http://localhost:7110/assets/index-DvtLrm67.js:17:6206 | ct@http://localhost:7110/assets/index-DvtLrm67.js:5:9811 |
| 3 | onClick@http://localhost:7110/assets/index-DvtLrm67.js:17:7604 | mt@http://localhost:7110/assets/index-DvtLrm67.js:5:9965 |
| 4 | ct@http://localhost:7110/assets/index-DvtLrm67.js:5:9806 | ht@http://localhost:7110/assets/index-DvtLrm67.js:5:10022 |
| 5 | mt@http://localhost:7110/assets/index-DvtLrm67.js:5:9960 | li@http://localhost:7110/assets/index-DvtLrm67.js:5:31237 |

#### R0281 (G19; B) / R0282 (G20; B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad383ded52d8cbf0f6b10c9
- message A: `TypeError: can't access property "zip", e.billing.address is undefined`
- message B: `TypeError: can't access property "zip", e.shipping.address is undefined`

| frame | A | B |
|---|---|---|
| 1 | Ka@http://localhost:7110/assets/index-DvtLrm67.js:17:19439 | Ka@http://localhost:7110/assets/index-DvtLrm67.js:17:19469 |
| 2 | onClick@http://localhost:7110/assets/index-DvtLrm67.js:17:23299 | onClick@http://localhost:7110/assets/index-DvtLrm67.js:17:23510 |
| 3 | ct@http://localhost:7110/assets/index-DvtLrm67.js:5:9806 | ct@http://localhost:7110/assets/index-DvtLrm67.js:5:9806 |
| 4 | mt@http://localhost:7110/assets/index-DvtLrm67.js:5:9960 | mt@http://localhost:7110/assets/index-DvtLrm67.js:5:9960 |
| 5 | ht@http://localhost:7110/assets/index-DvtLrm67.js:5:10017 | ht@http://localhost:7110/assets/index-DvtLrm67.js:5:10017 |

#### R0281 (G19; B) / R0339 (G20; B)

- environment: browser-prod; axes that differ: incident, browser; designated hard-negative pair
- bug: 6ad383ded52d8cbf0f6b10c9
- message A: `TypeError: can't access property "zip", e.billing.address is undefined`
- message B: `TypeError: undefined is not an object (evaluating 'e.shipping.address.zip')`

| frame | A | B |
|---|---|---|
| 1 | Ka@http://localhost:7110/assets/index-DvtLrm67.js:17:19439 | Ka@http://localhost:7110/assets/index-DvtLrm67.js:17:19493 |
| 2 | onClick@http://localhost:7110/assets/index-DvtLrm67.js:17:23299 | ct@http://localhost:7110/assets/index-DvtLrm67.js:5:9811 |
| 3 | ct@http://localhost:7110/assets/index-DvtLrm67.js:5:9806 | mt@http://localhost:7110/assets/index-DvtLrm67.js:5:9965 |
| 4 | mt@http://localhost:7110/assets/index-DvtLrm67.js:5:9960 | ht@http://localhost:7110/assets/index-DvtLrm67.js:5:10022 |
| 5 | ht@http://localhost:7110/assets/index-DvtLrm67.js:5:10017 | li@http://localhost:7110/assets/index-DvtLrm67.js:5:31237 |

#### R0282 (G20; B) / R0338 (G19; B)

- environment: browser-prod; axes that differ: incident, browser; designated hard-negative pair
- bug: 6ad383ded52d8cbf0f6b10c9
- message A: `TypeError: can't access property "zip", e.shipping.address is undefined`
- message B: `TypeError: undefined is not an object (evaluating 'e.billing.address.zip')`

| frame | A | B |
|---|---|---|
| 1 | Ka@http://localhost:7110/assets/index-DvtLrm67.js:17:19469 | Ka@http://localhost:7110/assets/index-DvtLrm67.js:17:19464 |
| 2 | onClick@http://localhost:7110/assets/index-DvtLrm67.js:17:23510 | ct@http://localhost:7110/assets/index-DvtLrm67.js:5:9811 |
| 3 | ct@http://localhost:7110/assets/index-DvtLrm67.js:5:9806 | mt@http://localhost:7110/assets/index-DvtLrm67.js:5:9965 |
| 4 | mt@http://localhost:7110/assets/index-DvtLrm67.js:5:9960 | ht@http://localhost:7110/assets/index-DvtLrm67.js:5:10022 |
| 5 | ht@http://localhost:7110/assets/index-DvtLrm67.js:5:10017 | li@http://localhost:7110/assets/index-DvtLrm67.js:5:31237 |

#### R0283 (G21; B) / R0284 (G22; B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad38455d52d8cbf0f6b14b8
- message A: `Error: Payments SDK not ready`
- message B: `Error: Payments SDK not ready`

| frame | A | B |
|---|---|---|
| 1 | @http://localhost:7110/assets/index-DvtLrm67.js:17:6441 | @http://localhost:7110/assets/index-DvtLrm67.js:17:6441 |

#### R0283 (G21; B) / R0317 (D5; D, B)

- environment: browser-prod; axes that differ: incident, browser
- bug: 6ad38455d52d8cbf0f6b14b8
- message A: `Error: Payments SDK not ready`
- message B: `Error: Session refresh failed: no refresh token`

| frame | A | B |
|---|---|---|
| 1 | @http://localhost:7110/assets/index-DvtLrm67.js:17:6441 | @http://localhost:7110/assets/index-DvtLrm67.js:17:18371 |

#### R0284 (G22; B) / R0317 (D5; D, B)

- environment: browser-prod; axes that differ: incident, browser
- bug: 6ad38455d52d8cbf0f6b14b8
- message A: `Error: Payments SDK not ready`
- message B: `Error: Session refresh failed: no refresh token`

| frame | A | B |
|---|---|---|
| 1 | @http://localhost:7110/assets/index-DvtLrm67.js:17:6441 | @http://localhost:7110/assets/index-DvtLrm67.js:17:18371 |

#### R0286 (G24; B) / R0287 (G25; B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad3833fd52d8cbf0f6b0b2d
- message A: `RuntimeError: unreachable executed`
- message B: `RuntimeError: unreachable executed`

| frame | A | B |
|---|---|---|
| 1 | @http://localhost:7110/assets/index-DvtLrm67.js line 8 > WebAssembly.instantiate:wasm-function[1]:0x5e | @http://localhost:7110/assets/index-DvtLrm67.js line 8 > WebAssembly.instantiate:wasm-function[2]:0x75 |
| 2 | oe@http://localhost:7110/assets/index-DvtLrm67.js:8:59260 | se@http://localhost:7110/assets/index-DvtLrm67.js:8:59311 |
| 3 | w@http://localhost:7110/assets/index-DvtLrm67.js:8:59366 | bi@http://localhost:7110/assets/index-DvtLrm67.js:17:6620 |
| 4 | onClick@http://localhost:7110/assets/index-DvtLrm67.js:9:2079 | onClick@http://localhost:7110/assets/index-DvtLrm67.js:17:8341 |
| 5 | ct@http://localhost:7110/assets/index-DvtLrm67.js:5:9806 | ct@http://localhost:7110/assets/index-DvtLrm67.js:5:9806 |

#### R0290 (G28; B) / R0291 (G29; B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad384fbd52d8cbf0f6b1a1b
- message A: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`
- message B: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`

| frame | A | B |
|---|---|---|
| 1 | E@http://localhost:7110/assets/index-DvtLrm67.js:9:419 | E@http://localhost:7110/assets/index-DvtLrm67.js:9:419 |
| 2 | async*le@http://localhost:7110/assets/index-DvtLrm67.js:9:545 | async*Si@http://localhost:7110/assets/index-DvtLrm67.js:17:6757 |
| 3 | onClick@http://localhost:7110/assets/index-DvtLrm67.js:9:2479 | onClick@http://localhost:7110/assets/index-DvtLrm67.js:17:8738 |
| 4 | ct@http://localhost:7110/assets/index-DvtLrm67.js:5:9806 | ct@http://localhost:7110/assets/index-DvtLrm67.js:5:9806 |
| 5 | mt@http://localhost:7110/assets/index-DvtLrm67.js:5:9960 | mt@http://localhost:7110/assets/index-DvtLrm67.js:5:9960 |

#### R0290 (G28; B) / R0348 (G29; B)

- environment: browser-prod; axes that differ: incident, browser; designated hard-negative pair
- bug: 6ad384fbd52d8cbf0f6b1a1b
- message A: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`
- message B: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`

| frame | A | B |
|---|---|---|
| 1 | E@http://localhost:7110/assets/index-DvtLrm67.js:9:419 | E@http://localhost:7110/assets/index-DvtLrm67.js:9:424 |
| 2 | async*le@http://localhost:7110/assets/index-DvtLrm67.js:9:545 |  |
| 3 | onClick@http://localhost:7110/assets/index-DvtLrm67.js:9:2479 |  |
| 4 | ct@http://localhost:7110/assets/index-DvtLrm67.js:5:9806 |  |
| 5 | mt@http://localhost:7110/assets/index-DvtLrm67.js:5:9960 |  |

#### R0291 (G29; B) / R0347 (G28; B)

- environment: browser-prod; axes that differ: incident, browser; designated hard-negative pair
- bug: 6ad384fbd52d8cbf0f6b1a1b
- message A: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`
- message B: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`

| frame | A | B |
|---|---|---|
| 1 | E@http://localhost:7110/assets/index-DvtLrm67.js:9:419 | E@http://localhost:7110/assets/index-DvtLrm67.js:9:424 |
| 2 | async*Si@http://localhost:7110/assets/index-DvtLrm67.js:17:6757 |  |
| 3 | onClick@http://localhost:7110/assets/index-DvtLrm67.js:17:8738 |  |
| 4 | ct@http://localhost:7110/assets/index-DvtLrm67.js:5:9806 |  |
| 5 | mt@http://localhost:7110/assets/index-DvtLrm67.js:5:9960 |  |

#### R0300 (A8a; U, B) / R0301 (A8b; U, B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad38310d52d8cbf0f6b0969
- message A: `TypeError: undefined is not an object (evaluating 'e.toFixed')`
- message B: `TypeError: undefined is not an object (evaluating 'e.toFixed')`

| frame | A | B |
|---|---|---|
| 1 | Ri@http://localhost:7110/assets/index-DvtLrm67.js:17:9131 | Ri@http://localhost:7110/assets/index-DvtLrm67.js:17:9131 |
| 2 | n@http://localhost:7110/assets/index-DvtLrm67.js:17:9241 | n@http://localhost:7110/assets/index-DvtLrm67.js:17:17096 |
| 3 | ct@http://localhost:7110/assets/index-DvtLrm67.js:5:9811 | ct@http://localhost:7110/assets/index-DvtLrm67.js:5:9811 |
| 4 | mt@http://localhost:7110/assets/index-DvtLrm67.js:5:9965 | mt@http://localhost:7110/assets/index-DvtLrm67.js:5:9965 |
| 5 | ht@http://localhost:7110/assets/index-DvtLrm67.js:5:10022 | ht@http://localhost:7110/assets/index-DvtLrm67.js:5:10022 |

#### R0304 (B2; U, D, B) / R0305 (B3; U, D, B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad382fad52d8cbf0f6b0895
- message A: `↵ td↵ tr↵ tbody↵ table↵ H@http://localhost:7110/assets/index-DvtLrm67.js:17:17292↵ Ki@http://localhost:7110/assets/index-DvtLrm67.js:17:10099↵ main↵ b@http://localhost:7110/assets/index-DvtLrm67.js:8:58052↵ Za`
- message B: `↵ small↵ span↵ Da@http://localhost:7110/assets/index-DvtLrm67.js:17:17524↵ Ki@http://localhost:7110/assets/index-DvtLrm67.js:17:10099↵ main↵ b@http://localhost:7110/assets/index-DvtLrm67.js:8:58052↵ Qa@http:`

| frame | A | B |
|---|---|---|
| 1 | za@http://localhost:7110/assets/index-DvtLrm67.js:6:6271 | za@http://localhost:7110/assets/index-DvtLrm67.js:6:6271 |
| 2 | _@http://localhost:7110/assets/index-DvtLrm67.js:6:11239 | f@http://localhost:7110/assets/index-DvtLrm67.js:6:8038 |
| 3 | Rs@http://localhost:7110/assets/index-DvtLrm67.js:8:1474 | h@http://localhost:7110/assets/index-DvtLrm67.js:6:9169 |
| 4 | Ul@http://localhost:7110/assets/index-DvtLrm67.js:8:45268 | Rs@http://localhost:7110/assets/index-DvtLrm67.js:8:1474 |
| 5 | Nl@http://localhost:7110/assets/index-DvtLrm67.js:8:39386 | Ul@http://localhost:7110/assets/index-DvtLrm67.js:8:45268 |

#### R0307 (C1; U, B) / R0308 (C2; U, B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad383fdd52d8cbf0f6b11ca
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 500`

| frame | A | B |
|---|---|---|
| 1 | Kn@http://localhost:7110/assets/index-DvtLrm67.js:11:11890 | Kn@http://localhost:7110/assets/index-DvtLrm67.js:11:11890 |
| 2 | _@http://localhost:7110/assets/index-DvtLrm67.js:11:18958 | _@http://localhost:7110/assets/index-DvtLrm67.js:11:18958 |

#### R0307 (C1; U, B) / R0309 (C3; U, D, B)

- environment: browser-prod; axes that differ: incident
- bug: 6ad383fdd52d8cbf0f6b11ca
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 404`

| frame | A | B |
|---|---|---|
| 1 | Kn@http://localhost:7110/assets/index-DvtLrm67.js:11:11890 | Kn@http://localhost:7110/assets/index-DvtLrm67.js:11:11890 |
| 2 | _@http://localhost:7110/assets/index-DvtLrm67.js:11:18958 | _@http://localhost:7110/assets/index-DvtLrm67.js:11:18958 |

#### R0308 (C2; U, B) / R0309 (C3; U, D, B)

- environment: browser-prod; axes that differ: incident
- bug: 6ad383fdd52d8cbf0f6b11ca
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 404`

| frame | A | B |
|---|---|---|
| 1 | Kn@http://localhost:7110/assets/index-DvtLrm67.js:11:11890 | Kn@http://localhost:7110/assets/index-DvtLrm67.js:11:11890 |
| 2 | _@http://localhost:7110/assets/index-DvtLrm67.js:11:18958 | _@http://localhost:7110/assets/index-DvtLrm67.js:11:18958 |

#### R0310 (C4; U, D, B) / R0311 (C5; U, D, B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad3834ed52d8cbf0f6b0bb4
- message A: `Unhandled Promise Rejection: Load failed`
- message B: `Unhandled Promise Rejection: Load failed`

| frame | A | B |
|---|---|---|
| 1 | (no frames) | (no frames) |

#### R0325 (G6; B) / R0326 (G7; B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad38370d52d8cbf0f6b0d06
- message A: `Error: Operation failed after retries`
- message B: `Error: Operation failed after retries`

| frame | A | B |
|---|---|---|
| 1 | R@http://localhost:7110/assets/index-DvtLrm67.js:17:6060 | R@http://localhost:7110/assets/index-DvtLrm67.js:17:6060 |
| 2 | ct@http://localhost:7110/assets/index-DvtLrm67.js:5:9811 | ct@http://localhost:7110/assets/index-DvtLrm67.js:5:9811 |
| 3 | mt@http://localhost:7110/assets/index-DvtLrm67.js:5:9965 | mt@http://localhost:7110/assets/index-DvtLrm67.js:5:9965 |
| 4 | ht@http://localhost:7110/assets/index-DvtLrm67.js:5:10022 | ht@http://localhost:7110/assets/index-DvtLrm67.js:5:10022 |
| 5 | li@http://localhost:7110/assets/index-DvtLrm67.js:5:31237 | li@http://localhost:7110/assets/index-DvtLrm67.js:5:31237 |

#### R0338 (G19; B) / R0339 (G20; B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad383ded52d8cbf0f6b10c9
- message A: `TypeError: undefined is not an object (evaluating 'e.billing.address.zip')`
- message B: `TypeError: undefined is not an object (evaluating 'e.shipping.address.zip')`

| frame | A | B |
|---|---|---|
| 1 | Ka@http://localhost:7110/assets/index-DvtLrm67.js:17:19464 | Ka@http://localhost:7110/assets/index-DvtLrm67.js:17:19493 |
| 2 | ct@http://localhost:7110/assets/index-DvtLrm67.js:5:9811 | ct@http://localhost:7110/assets/index-DvtLrm67.js:5:9811 |
| 3 | mt@http://localhost:7110/assets/index-DvtLrm67.js:5:9965 | mt@http://localhost:7110/assets/index-DvtLrm67.js:5:9965 |
| 4 | ht@http://localhost:7110/assets/index-DvtLrm67.js:5:10022 | ht@http://localhost:7110/assets/index-DvtLrm67.js:5:10022 |
| 5 | li@http://localhost:7110/assets/index-DvtLrm67.js:5:31237 | li@http://localhost:7110/assets/index-DvtLrm67.js:5:31237 |

#### R0340 (G21; B) / R0341 (G22; B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad384b3d52d8cbf0f6b17cb
- message A: `Error: Payments SDK not ready`
- message B: `Error: Payments SDK not ready`

| frame | A | B |
|---|---|---|
| 1 | module code@http://localhost:7110/assets/index-DvtLrm67.js:17:6441 | module code@http://localhost:7110/assets/index-DvtLrm67.js:17:6441 |

#### R0343 (G24; B) / R0344 (G25; B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad38366d52d8cbf0f6b0ca8
- message A: `RuntimeError: Unreachable code should not be executed (evaluating 't.apply(n,l)')`
- message B: `RuntimeError: Unreachable code should not be executed (evaluating 't.apply(n,l)')`

| frame | A | B |
|---|---|---|
| 1 | 1@wasm-function[1] | 2@wasm-function[2] |
| 2 | ct@http://localhost:7110/assets/index-DvtLrm67.js:5:9811 | ct@http://localhost:7110/assets/index-DvtLrm67.js:5:9811 |
| 3 | mt@http://localhost:7110/assets/index-DvtLrm67.js:5:9965 | mt@http://localhost:7110/assets/index-DvtLrm67.js:5:9965 |
| 4 | ht@http://localhost:7110/assets/index-DvtLrm67.js:5:10022 | ht@http://localhost:7110/assets/index-DvtLrm67.js:5:10022 |
| 5 | li@http://localhost:7110/assets/index-DvtLrm67.js:5:31237 | li@http://localhost:7110/assets/index-DvtLrm67.js:5:31237 |

#### R0347 (G28; B) / R0348 (G29; B)

- environment: browser-prod; axes that differ: incident; designated hard-negative pair
- bug: 6ad384fbd52d8cbf0f6b1a1b
- message A: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`
- message B: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`

| frame | A | B |
|---|---|---|
| 1 | E@http://localhost:7110/assets/index-DvtLrm67.js:9:424 | E@http://localhost:7110/assets/index-DvtLrm67.js:9:424 |

#### R0364 (C1; U, B) / R0365 (C2; U, B)

- environment: browser-dev; axes that differ: incident; designated hard-negative pair
- bug: 6ad3837fd52d8cbf0f6b0d8a
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 500`

| frame | A | B |
|---|---|---|
| 1 | at settle (http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14) | at settle (http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14) |
| 2 | at XMLHttpRequest.onloadend (http://localhost:7120/node_modules/.vite/deps/axios.js:2539:4) | at XMLHttpRequest.onloadend (http://localhost:7120/node_modules/.vite/deps/axios.js:2539:4) |
| 3 | at Axios$1.request (http://localhost:7120/node_modules/.vite/deps/axios.js:3391:37) |  |
| 4 | at async placeOrder (http://localhost:7120/src/checkout/placeOrder.js:5:14) |  |
| 5 | at async handlePlaceOrder (http://localhost:7120/src/pages/checkoutPages.jsx:52:17) |  |

#### R0364 (C1; U, B) / R0366 (C3; U, D, B)

- environment: browser-dev; axes that differ: incident
- bug: 6ad3837fd52d8cbf0f6b0d8a
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 404`

| frame | A | B |
|---|---|---|
| 1 | at settle (http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14) | at settle (http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14) |
| 2 | at XMLHttpRequest.onloadend (http://localhost:7120/node_modules/.vite/deps/axios.js:2539:4) | at XMLHttpRequest.onloadend (http://localhost:7120/node_modules/.vite/deps/axios.js:2539:4) |
| 3 | at Axios$1.request (http://localhost:7120/node_modules/.vite/deps/axios.js:3391:37) | at Axios$1.request (http://localhost:7120/node_modules/.vite/deps/axios.js:3391:37) |
| 4 | at async placeOrder (http://localhost:7120/src/checkout/placeOrder.js:5:14) | at async fetchProduct (http://localhost:7120/src/catalog/productApi.js:5:14) |
| 5 | at async handlePlaceOrder (http://localhost:7120/src/pages/checkoutPages.jsx:52:17) | at async openProduct (http://localhost:7120/src/pages/catalogPages.jsx:257:19) |

#### R0364 (C1; U, B) / R0367 (C3; U, D, B)

- environment: browser-dev; axes that differ: incident, variant
- bug: 6ad3837fd52d8cbf0f6b0d8a
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 404`

| frame | A | B |
|---|---|---|
| 1 | at settle (http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14) | at settle (http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14) |
| 2 | at XMLHttpRequest.onloadend (http://localhost:7120/node_modules/.vite/deps/axios.js:2539:4) | at XMLHttpRequest.onloadend (http://localhost:7120/node_modules/.vite/deps/axios.js:2539:4) |
| 3 | at Axios$1.request (http://localhost:7120/node_modules/.vite/deps/axios.js:3391:37) | at Axios$1.request (http://localhost:7120/node_modules/.vite/deps/axios.js:3391:37) |
| 4 | at async placeOrder (http://localhost:7120/src/checkout/placeOrder.js:5:14) | at async fetchProduct (http://localhost:7120/src/catalog/productApi.js:5:14) |
| 5 | at async handlePlaceOrder (http://localhost:7120/src/pages/checkoutPages.jsx:52:17) | at async openProduct (http://localhost:7120/src/pages/catalogPages.jsx:257:19) |

#### R0364 (C1; U, B) / R0534 (C2; U, B)

- environment: browser-dev; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad3837fd52d8cbf0f6b0d8a
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 500`

| frame | A | B |
|---|---|---|
| 1 | at settle (http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14) | at settle (http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14) |
| 2 | at XMLHttpRequest.onloadend (http://localhost:7120/node_modules/.vite/deps/axios.js:2539:4) | at XMLHttpRequest.onloadend (http://localhost:7120/node_modules/.vite/deps/axios.js:2539:4) |
| 3 | at Axios$1.request (http://localhost:7120/node_modules/.vite/deps/axios.js:3391:37) |  |
| 4 | at async placeOrder (http://localhost:7120/src/checkout/placeOrder.js:5:14) |  |
| 5 | at async handlePlaceOrder (http://localhost:7120/src/pages/checkoutPages.jsx:52:17) |  |

#### R0364 (C1; U, B) / R0535 (C3; U, D, B)

- environment: browser-dev; axes that differ: incident, version
- bug: 6ad3837fd52d8cbf0f6b0d8a
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 404`

| frame | A | B |
|---|---|---|
| 1 | at settle (http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14) | at settle (http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14) |
| 2 | at XMLHttpRequest.onloadend (http://localhost:7120/node_modules/.vite/deps/axios.js:2539:4) | at XMLHttpRequest.onloadend (http://localhost:7120/node_modules/.vite/deps/axios.js:2539:4) |
| 3 | at Axios$1.request (http://localhost:7120/node_modules/.vite/deps/axios.js:3391:37) | at Axios$1.request (http://localhost:7120/node_modules/.vite/deps/axios.js:3391:37) |
| 4 | at async placeOrder (http://localhost:7120/src/checkout/placeOrder.js:5:14) | at async fetchProduct (http://localhost:7120/src/catalog/productApi.js:8:14) |
| 5 | at async handlePlaceOrder (http://localhost:7120/src/pages/checkoutPages.jsx:52:17) | at async openProduct (http://localhost:7120/src/pages/catalogPages.jsx:260:19) |

#### R0365 (C2; U, B) / R0366 (C3; U, D, B)

- environment: browser-dev; axes that differ: incident
- bug: 6ad3837fd52d8cbf0f6b0d8a
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 404`

| frame | A | B |
|---|---|---|
| 1 | at settle (http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14) | at settle (http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14) |
| 2 | at XMLHttpRequest.onloadend (http://localhost:7120/node_modules/.vite/deps/axios.js:2539:4) | at XMLHttpRequest.onloadend (http://localhost:7120/node_modules/.vite/deps/axios.js:2539:4) |
| 3 |  | at Axios$1.request (http://localhost:7120/node_modules/.vite/deps/axios.js:3391:37) |
| 4 |  | at async fetchProduct (http://localhost:7120/src/catalog/productApi.js:5:14) |
| 5 |  | at async openProduct (http://localhost:7120/src/pages/catalogPages.jsx:257:19) |

#### R0365 (C2; U, B) / R0367 (C3; U, D, B)

- environment: browser-dev; axes that differ: incident, variant
- bug: 6ad3837fd52d8cbf0f6b0d8a
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 404`

| frame | A | B |
|---|---|---|
| 1 | at settle (http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14) | at settle (http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14) |
| 2 | at XMLHttpRequest.onloadend (http://localhost:7120/node_modules/.vite/deps/axios.js:2539:4) | at XMLHttpRequest.onloadend (http://localhost:7120/node_modules/.vite/deps/axios.js:2539:4) |
| 3 |  | at Axios$1.request (http://localhost:7120/node_modules/.vite/deps/axios.js:3391:37) |
| 4 |  | at async fetchProduct (http://localhost:7120/src/catalog/productApi.js:5:14) |
| 5 |  | at async openProduct (http://localhost:7120/src/pages/catalogPages.jsx:257:19) |

#### R0365 (C2; U, B) / R0533 (C1; U, B)

- environment: browser-dev; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad3837fd52d8cbf0f6b0d8a
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 500`

| frame | A | B |
|---|---|---|
| 1 | at settle (http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14) | at settle (http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14) |
| 2 | at XMLHttpRequest.onloadend (http://localhost:7120/node_modules/.vite/deps/axios.js:2539:4) | at XMLHttpRequest.onloadend (http://localhost:7120/node_modules/.vite/deps/axios.js:2539:4) |
| 3 |  | at Axios$1.request (http://localhost:7120/node_modules/.vite/deps/axios.js:3391:37) |
| 4 |  | at async placeOrder (http://localhost:7120/src/checkout/placeOrder.js:8:14) |
| 5 |  | at async handlePlaceOrder (http://localhost:7120/src/pages/checkoutPages.jsx:55:17) |

#### R0365 (C2; U, B) / R0535 (C3; U, D, B)

- environment: browser-dev; axes that differ: incident, version
- bug: 6ad3837fd52d8cbf0f6b0d8a
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 404`

| frame | A | B |
|---|---|---|
| 1 | at settle (http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14) | at settle (http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14) |
| 2 | at XMLHttpRequest.onloadend (http://localhost:7120/node_modules/.vite/deps/axios.js:2539:4) | at XMLHttpRequest.onloadend (http://localhost:7120/node_modules/.vite/deps/axios.js:2539:4) |
| 3 |  | at Axios$1.request (http://localhost:7120/node_modules/.vite/deps/axios.js:3391:37) |
| 4 |  | at async fetchProduct (http://localhost:7120/src/catalog/productApi.js:8:14) |
| 5 |  | at async openProduct (http://localhost:7120/src/pages/catalogPages.jsx:260:19) |

#### R0366 (C3; U, D, B) / R0533 (C1; U, B)

- environment: browser-dev; axes that differ: incident, version
- bug: 6ad3837fd52d8cbf0f6b0d8a
- message A: `Unhandled Promise Rejection: Request failed with status code 404`
- message B: `Unhandled Promise Rejection: Request failed with status code 500`

| frame | A | B |
|---|---|---|
| 1 | at settle (http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14) | at settle (http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14) |
| 2 | at XMLHttpRequest.onloadend (http://localhost:7120/node_modules/.vite/deps/axios.js:2539:4) | at XMLHttpRequest.onloadend (http://localhost:7120/node_modules/.vite/deps/axios.js:2539:4) |
| 3 | at Axios$1.request (http://localhost:7120/node_modules/.vite/deps/axios.js:3391:37) | at Axios$1.request (http://localhost:7120/node_modules/.vite/deps/axios.js:3391:37) |
| 4 | at async fetchProduct (http://localhost:7120/src/catalog/productApi.js:5:14) | at async placeOrder (http://localhost:7120/src/checkout/placeOrder.js:8:14) |
| 5 | at async openProduct (http://localhost:7120/src/pages/catalogPages.jsx:257:19) | at async handlePlaceOrder (http://localhost:7120/src/pages/checkoutPages.jsx:55:17) |

#### R0366 (C3; U, D, B) / R0534 (C2; U, B)

- environment: browser-dev; axes that differ: incident, version
- bug: 6ad3837fd52d8cbf0f6b0d8a
- message A: `Unhandled Promise Rejection: Request failed with status code 404`
- message B: `Unhandled Promise Rejection: Request failed with status code 500`

| frame | A | B |
|---|---|---|
| 1 | at settle (http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14) | at settle (http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14) |
| 2 | at XMLHttpRequest.onloadend (http://localhost:7120/node_modules/.vite/deps/axios.js:2539:4) | at XMLHttpRequest.onloadend (http://localhost:7120/node_modules/.vite/deps/axios.js:2539:4) |
| 3 | at Axios$1.request (http://localhost:7120/node_modules/.vite/deps/axios.js:3391:37) |  |
| 4 | at async fetchProduct (http://localhost:7120/src/catalog/productApi.js:5:14) |  |
| 5 | at async openProduct (http://localhost:7120/src/pages/catalogPages.jsx:257:19) |  |

#### R0367 (C3; U, D, B) / R0533 (C1; U, B)

- environment: browser-dev; axes that differ: incident, version, variant
- bug: 6ad3837fd52d8cbf0f6b0d8a
- message A: `Unhandled Promise Rejection: Request failed with status code 404`
- message B: `Unhandled Promise Rejection: Request failed with status code 500`

| frame | A | B |
|---|---|---|
| 1 | at settle (http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14) | at settle (http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14) |
| 2 | at XMLHttpRequest.onloadend (http://localhost:7120/node_modules/.vite/deps/axios.js:2539:4) | at XMLHttpRequest.onloadend (http://localhost:7120/node_modules/.vite/deps/axios.js:2539:4) |
| 3 | at Axios$1.request (http://localhost:7120/node_modules/.vite/deps/axios.js:3391:37) | at Axios$1.request (http://localhost:7120/node_modules/.vite/deps/axios.js:3391:37) |
| 4 | at async fetchProduct (http://localhost:7120/src/catalog/productApi.js:5:14) | at async placeOrder (http://localhost:7120/src/checkout/placeOrder.js:8:14) |
| 5 | at async openProduct (http://localhost:7120/src/pages/catalogPages.jsx:257:19) | at async handlePlaceOrder (http://localhost:7120/src/pages/checkoutPages.jsx:55:17) |

#### R0367 (C3; U, D, B) / R0534 (C2; U, B)

- environment: browser-dev; axes that differ: incident, version, variant
- bug: 6ad3837fd52d8cbf0f6b0d8a
- message A: `Unhandled Promise Rejection: Request failed with status code 404`
- message B: `Unhandled Promise Rejection: Request failed with status code 500`

| frame | A | B |
|---|---|---|
| 1 | at settle (http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14) | at settle (http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14) |
| 2 | at XMLHttpRequest.onloadend (http://localhost:7120/node_modules/.vite/deps/axios.js:2539:4) | at XMLHttpRequest.onloadend (http://localhost:7120/node_modules/.vite/deps/axios.js:2539:4) |
| 3 | at Axios$1.request (http://localhost:7120/node_modules/.vite/deps/axios.js:3391:37) |  |
| 4 | at async fetchProduct (http://localhost:7120/src/catalog/productApi.js:5:14) |  |
| 5 | at async openProduct (http://localhost:7120/src/pages/catalogPages.jsx:257:19) |  |

#### R0402 (G19; B) / R0403 (G20; B)

- environment: browser-dev; axes that differ: incident; designated hard-negative pair
- bug: 6ad38345d52d8cbf0f6b0b5f
- message A: `Uncaught TypeError: Cannot read properties of undefined (reading 'zip')`
- message B: `Uncaught TypeError: Cannot read properties of undefined (reading 'zip')`

| frame | A | B |
|---|---|---|
| 1 | at buildShippingLabel (http://localhost:7120/src/shipping/label.js:4:40) | at buildShippingLabel (http://localhost:7120/src/shipping/label.js:6:39) |
| 2 | at onClick (http://localhost:7120/src/pages/accountPages.jsx:559:19) | at onClick (http://localhost:7120/src/pages/accountPages.jsx:587:19) |
| 3 | at HTMLUnknownElement.callCallback (http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11) | at HTMLUnknownElement.callCallback (http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11) |
| 4 | at Object.invokeGuardedCallbackDev (http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14) | at Object.invokeGuardedCallbackDev (http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14) |
| 5 | at invokeGuardedCallback (http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:32) | at invokeGuardedCallback (http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:32) |

#### R0402 (G19; B) / R0562 (G20; B)

- environment: browser-dev; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad38345d52d8cbf0f6b0b5f
- message A: `Uncaught TypeError: Cannot read properties of undefined (reading 'zip')`
- message B: `Uncaught TypeError: Cannot read properties of undefined (reading 'zip')`

| frame | A | B |
|---|---|---|
| 1 | at buildShippingLabel (http://localhost:7120/src/shipping/label.js:4:40) | at buildShippingLabel (http://localhost:7120/src/shipping/label.js:9:39) |
| 2 | at onClick (http://localhost:7120/src/pages/accountPages.jsx:559:19) | at onClick (http://localhost:7120/src/pages/accountPages.jsx:590:19) |
| 3 | at HTMLUnknownElement.callCallback (http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11) | at HTMLUnknownElement.callCallback (http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11) |
| 4 | at Object.invokeGuardedCallbackDev (http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14) | at Object.invokeGuardedCallbackDev (http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14) |
| 5 | at invokeGuardedCallback (http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:32) | at invokeGuardedCallback (http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:32) |

#### R0403 (G20; B) / R0561 (G19; B)

- environment: browser-dev; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad38345d52d8cbf0f6b0b5f
- message A: `Uncaught TypeError: Cannot read properties of undefined (reading 'zip')`
- message B: `Uncaught TypeError: Cannot read properties of undefined (reading 'zip')`

| frame | A | B |
|---|---|---|
| 1 | at buildShippingLabel (http://localhost:7120/src/shipping/label.js:6:39) | at buildShippingLabel (http://localhost:7120/src/shipping/label.js:7:40) |
| 2 | at onClick (http://localhost:7120/src/pages/accountPages.jsx:587:19) | at onClick (http://localhost:7120/src/pages/accountPages.jsx:562:19) |
| 3 | at HTMLUnknownElement.callCallback (http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11) | at HTMLUnknownElement.callCallback (http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11) |
| 4 | at Object.invokeGuardedCallbackDev (http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14) | at Object.invokeGuardedCallbackDev (http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14) |
| 5 | at invokeGuardedCallback (http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:32) | at invokeGuardedCallback (http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:32) |

#### R0404 (G21; B) / R0405 (G22; B)

- environment: browser-dev; axes that differ: incident; designated hard-negative pair
- bug: 6ad38399d52d8cbf0f6b0e67
- message A: `Uncaught Error: Payments SDK not ready`
- message B: `Uncaught Error: Payments SDK not ready`

| frame | A | B |
|---|---|---|
| 1 | at http://localhost:7120/src/payments/state.js:2:35 | at http://localhost:7120/src/payments/state.js:2:35 |

#### R0404 (G21; B) / R0564 (G22; B)

- environment: browser-dev; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad38399d52d8cbf0f6b0e67
- message A: `Uncaught Error: Payments SDK not ready`
- message B: `Uncaught Error: Payments SDK not ready`

| frame | A | B |
|---|---|---|
| 1 | at http://localhost:7120/src/payments/state.js:2:35 | at http://localhost:7120/src/payments/state.js:5:35 |

#### R0405 (G22; B) / R0563 (G21; B)

- environment: browser-dev; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad38399d52d8cbf0f6b0e67
- message A: `Uncaught Error: Payments SDK not ready`
- message B: `Uncaught Error: Payments SDK not ready`

| frame | A | B |
|---|---|---|
| 1 | at http://localhost:7120/src/payments/state.js:2:35 | at http://localhost:7120/src/payments/state.js:5:35 |

#### R0411 (G28; B) / R0412 (G29; B)

- environment: browser-dev; axes that differ: incident; designated hard-negative pair
- bug: 6ad3831fd52d8cbf0f6b0a06
- message A: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`
- message B: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`

| frame | A | B |
|---|---|---|
| 1 | at reserve (file:///srv/mock/server.mjs:29:28) | at reserve (file:///srv/mock/server.mjs:29:28) |
| 2 | at Server.<anonymous> (file:///srv/mock/server.mjs:51:29) | at Server.<anonymous> (file:///srv/mock/server.mjs:51:29) |
| 3 | at process.processTicksAndRejections (node:internal/process/task_queues:103:5) | at process.processTicksAndRejections (node:internal/process/task_queues:103:5) |
| 4 | at reserveInventory (http://localhost:7120/src/inventory/api.js:11:9) | at reserveInventory (http://localhost:7120/src/inventory/api.js:11:9) |

#### R0411 (G28; B) / R0571 (G29; B)

- environment: browser-dev; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad3831fd52d8cbf0f6b0a06
- message A: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`
- message B: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`

| frame | A | B |
|---|---|---|
| 1 | at reserve (file:///srv/mock/server.mjs:29:28) | at reserve (file:///srv/mock/server.mjs:29:28) |
| 2 | at Server.<anonymous> (file:///srv/mock/server.mjs:51:29) | at Server.<anonymous> (file:///srv/mock/server.mjs:51:29) |
| 3 | at process.processTicksAndRejections (node:internal/process/task_queues:103:5) | at process.processTicksAndRejections (node:internal/process/task_queues:103:5) |
| 4 | at reserveInventory (http://localhost:7120/src/inventory/api.js:11:9) | at reserveInventory (http://localhost:7120/src/inventory/api.js:14:9) |

#### R0412 (G29; B) / R0570 (G28; B)

- environment: browser-dev; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad3831fd52d8cbf0f6b0a06
- message A: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`
- message B: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`

| frame | A | B |
|---|---|---|
| 1 | at reserve (file:///srv/mock/server.mjs:29:28) | at reserve (file:///srv/mock/server.mjs:29:28) |
| 2 | at Server.<anonymous> (file:///srv/mock/server.mjs:51:29) | at Server.<anonymous> (file:///srv/mock/server.mjs:51:29) |
| 3 | at process.processTicksAndRejections (node:internal/process/task_queues:103:5) | at process.processTicksAndRejections (node:internal/process/task_queues:103:5) |
| 4 | at reserveInventory (http://localhost:7120/src/inventory/api.js:11:9) | at reserveInventory (http://localhost:7120/src/inventory/api.js:14:9) |

#### R0421 (A8a; U, B) / R0422 (A8b; U, B)

- environment: browser-dev; axes that differ: incident; designated hard-negative pair
- bug: 6ad382dcd52d8cbf0f6b0786
- message A: `TypeError: can't access property "toFixed", amount is undefined`
- message B: `TypeError: can't access property "toFixed", amount is undefined`

| frame | A | B |
|---|---|---|
| 1 | formatPrice@http://localhost:7120/src/utils/formatPrice.js:3:15 | formatPrice@http://localhost:7120/src/utils/formatPrice.js:3:15 |
| 2 | handleQuickView@http://localhost:7120/src/components/ProductCard.jsx:8:35 | handleMoveToCart@http://localhost:7120/src/components/WishlistRow.jsx:8:43 |
| 3 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 |
| 4 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 |
| 5 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:32 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:32 |

#### R0421 (A8a; U, B) / R0476 (A8b; U, B)

- environment: browser-dev; axes that differ: incident, browser; designated hard-negative pair
- bug: 6ad382dcd52d8cbf0f6b0786
- message A: `TypeError: can't access property "toFixed", amount is undefined`
- message B: `TypeError: undefined is not an object (evaluating 'amount.toFixed')`

| frame | A | B |
|---|---|---|
| 1 | formatPrice@http://localhost:7120/src/utils/formatPrice.js:3:15 | formatPrice@http://localhost:7120/src/utils/formatPrice.js:3:21 |
| 2 | handleQuickView@http://localhost:7120/src/components/ProductCard.jsx:8:35 | handleMoveToCart@http://localhost:7120/src/components/WishlistRow.jsx:8:54 |
| 3 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 |
| 4 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 | dispatchEvent@[native code] |
| 5 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:32 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 |

#### R0421 (A8a; U, B) / R0581 (A8b; U, B)

- environment: browser-dev; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad382dcd52d8cbf0f6b0786
- message A: `TypeError: can't access property "toFixed", amount is undefined`
- message B: `TypeError: can't access property "toFixed", amount is undefined`

| frame | A | B |
|---|---|---|
| 1 | formatPrice@http://localhost:7120/src/utils/formatPrice.js:3:15 | formatPrice@http://localhost:7120/src/utils/formatPrice.js:6:15 |
| 2 | handleQuickView@http://localhost:7120/src/components/ProductCard.jsx:8:35 | handleMoveToCart@http://localhost:7120/src/components/WishlistRow.jsx:11:43 |
| 3 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 |
| 4 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 |
| 5 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:32 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:32 |

#### R0421 (A8a; U, B) / R0635 (A8b; U, B)

- environment: browser-dev; axes that differ: incident, browser, version; designated hard-negative pair
- bug: 6ad382dcd52d8cbf0f6b0786
- message A: `TypeError: can't access property "toFixed", amount is undefined`
- message B: `TypeError: undefined is not an object (evaluating 'amount.toFixed')`

| frame | A | B |
|---|---|---|
| 1 | formatPrice@http://localhost:7120/src/utils/formatPrice.js:3:15 | formatPrice@http://localhost:7120/src/utils/formatPrice.js:6:21 |
| 2 | handleQuickView@http://localhost:7120/src/components/ProductCard.jsx:8:35 | handleMoveToCart@http://localhost:7120/src/components/WishlistRow.jsx:11:54 |
| 3 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 |
| 4 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 | dispatchEvent@[native code] |
| 5 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:32 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 |

#### R0422 (A8b; U, B) / R0475 (A8a; U, B)

- environment: browser-dev; axes that differ: incident, browser; designated hard-negative pair
- bug: 6ad382dcd52d8cbf0f6b0786
- message A: `TypeError: can't access property "toFixed", amount is undefined`
- message B: `TypeError: undefined is not an object (evaluating 'amount.toFixed')`

| frame | A | B |
|---|---|---|
| 1 | formatPrice@http://localhost:7120/src/utils/formatPrice.js:3:15 | formatPrice@http://localhost:7120/src/utils/formatPrice.js:3:21 |
| 2 | handleMoveToCart@http://localhost:7120/src/components/WishlistRow.jsx:8:43 | handleQuickView@http://localhost:7120/src/components/ProductCard.jsx:8:46 |
| 3 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 |
| 4 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 | dispatchEvent@[native code] |
| 5 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:32 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 |

#### R0422 (A8b; U, B) / R0580 (A8a; U, B)

- environment: browser-dev; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad382dcd52d8cbf0f6b0786
- message A: `TypeError: can't access property "toFixed", amount is undefined`
- message B: `TypeError: can't access property "toFixed", amount is undefined`

| frame | A | B |
|---|---|---|
| 1 | formatPrice@http://localhost:7120/src/utils/formatPrice.js:3:15 | formatPrice@http://localhost:7120/src/utils/formatPrice.js:6:15 |
| 2 | handleMoveToCart@http://localhost:7120/src/components/WishlistRow.jsx:8:43 | handleQuickView@http://localhost:7120/src/components/ProductCard.jsx:11:35 |
| 3 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 |
| 4 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 |
| 5 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:32 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:32 |

#### R0422 (A8b; U, B) / R0634 (A8a; U, B)

- environment: browser-dev; axes that differ: incident, browser, version; designated hard-negative pair
- bug: 6ad382dcd52d8cbf0f6b0786
- message A: `TypeError: can't access property "toFixed", amount is undefined`
- message B: `TypeError: undefined is not an object (evaluating 'amount.toFixed')`

| frame | A | B |
|---|---|---|
| 1 | formatPrice@http://localhost:7120/src/utils/formatPrice.js:3:15 | formatPrice@http://localhost:7120/src/utils/formatPrice.js:6:21 |
| 2 | handleMoveToCart@http://localhost:7120/src/components/WishlistRow.jsx:8:43 | handleQuickView@http://localhost:7120/src/components/ProductCard.jsx:11:46 |
| 3 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 |
| 4 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 | dispatchEvent@[native code] |
| 5 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:32 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 |

#### R0425 (C1; U, B) / R0426 (C2; U, B)

- environment: browser-dev; axes that differ: incident; designated hard-negative pair
- bug: 6ad38362d52d8cbf0f6b0c78
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 500`

| frame | A | B |
|---|---|---|
| 1 | AxiosError$1@http://localhost:7120/node_modules/.vite/deps/axios.js:1317:3 | AxiosError$1@http://localhost:7120/node_modules/.vite/deps/axios.js:1317:3 |
| 2 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14 |
| 3 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 |
| 4 | EventHandlerNonNull*dispatchXhrRequest@http://localhost:7120/node_modules/.vite/deps/axios.js:2555:31 | EventHandlerNonNull*dispatchXhrRequest@http://localhost:7120/node_modules/.vite/deps/axios.js:2555:31 |
| 5 | xhr_default<@http://localhost:7120/node_modules/.vite/deps/axios.js:2504:9 | xhr_default<@http://localhost:7120/node_modules/.vite/deps/axios.js:2504:9 |

#### R0425 (C1; U, B) / R0427 (C3; U, D, B)

- environment: browser-dev; axes that differ: incident
- bug: 6ad38362d52d8cbf0f6b0c78
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 404`

| frame | A | B |
|---|---|---|
| 1 | AxiosError$1@http://localhost:7120/node_modules/.vite/deps/axios.js:1317:3 | AxiosError$1@http://localhost:7120/node_modules/.vite/deps/axios.js:1317:3 |
| 2 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14 |
| 3 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 |
| 4 | EventHandlerNonNull*dispatchXhrRequest@http://localhost:7120/node_modules/.vite/deps/axios.js:2555:31 | EventHandlerNonNull*dispatchXhrRequest@http://localhost:7120/node_modules/.vite/deps/axios.js:2555:31 |
| 5 | xhr_default<@http://localhost:7120/node_modules/.vite/deps/axios.js:2504:9 | xhr_default<@http://localhost:7120/node_modules/.vite/deps/axios.js:2504:9 |

#### R0425 (C1; U, B) / R0585 (C2; U, B)

- environment: browser-dev; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad38362d52d8cbf0f6b0c78
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 500`

| frame | A | B |
|---|---|---|
| 1 | AxiosError$1@http://localhost:7120/node_modules/.vite/deps/axios.js:1317:3 | AxiosError$1@http://localhost:7120/node_modules/.vite/deps/axios.js:1317:3 |
| 2 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14 |
| 3 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 |
| 4 | EventHandlerNonNull*dispatchXhrRequest@http://localhost:7120/node_modules/.vite/deps/axios.js:2555:31 | EventHandlerNonNull*dispatchXhrRequest@http://localhost:7120/node_modules/.vite/deps/axios.js:2555:31 |
| 5 | xhr_default<@http://localhost:7120/node_modules/.vite/deps/axios.js:2504:9 | xhr_default<@http://localhost:7120/node_modules/.vite/deps/axios.js:2504:9 |

#### R0425 (C1; U, B) / R0586 (C3; U, D, B)

- environment: browser-dev; axes that differ: incident, version
- bug: 6ad38362d52d8cbf0f6b0c78
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 404`

| frame | A | B |
|---|---|---|
| 1 | AxiosError$1@http://localhost:7120/node_modules/.vite/deps/axios.js:1317:3 | AxiosError$1@http://localhost:7120/node_modules/.vite/deps/axios.js:1317:3 |
| 2 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14 |
| 3 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 |
| 4 | EventHandlerNonNull*dispatchXhrRequest@http://localhost:7120/node_modules/.vite/deps/axios.js:2555:31 | EventHandlerNonNull*dispatchXhrRequest@http://localhost:7120/node_modules/.vite/deps/axios.js:2555:31 |
| 5 | xhr_default<@http://localhost:7120/node_modules/.vite/deps/axios.js:2504:9 | xhr_default<@http://localhost:7120/node_modules/.vite/deps/axios.js:2504:9 |

#### R0426 (C2; U, B) / R0427 (C3; U, D, B)

- environment: browser-dev; axes that differ: incident
- bug: 6ad38362d52d8cbf0f6b0c78
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 404`

| frame | A | B |
|---|---|---|
| 1 | AxiosError$1@http://localhost:7120/node_modules/.vite/deps/axios.js:1317:3 | AxiosError$1@http://localhost:7120/node_modules/.vite/deps/axios.js:1317:3 |
| 2 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14 |
| 3 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 |
| 4 | EventHandlerNonNull*dispatchXhrRequest@http://localhost:7120/node_modules/.vite/deps/axios.js:2555:31 | EventHandlerNonNull*dispatchXhrRequest@http://localhost:7120/node_modules/.vite/deps/axios.js:2555:31 |
| 5 | xhr_default<@http://localhost:7120/node_modules/.vite/deps/axios.js:2504:9 | xhr_default<@http://localhost:7120/node_modules/.vite/deps/axios.js:2504:9 |

#### R0426 (C2; U, B) / R0584 (C1; U, B)

- environment: browser-dev; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad38362d52d8cbf0f6b0c78
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 500`

| frame | A | B |
|---|---|---|
| 1 | AxiosError$1@http://localhost:7120/node_modules/.vite/deps/axios.js:1317:3 | AxiosError$1@http://localhost:7120/node_modules/.vite/deps/axios.js:1317:3 |
| 2 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14 |
| 3 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 |
| 4 | EventHandlerNonNull*dispatchXhrRequest@http://localhost:7120/node_modules/.vite/deps/axios.js:2555:31 | EventHandlerNonNull*dispatchXhrRequest@http://localhost:7120/node_modules/.vite/deps/axios.js:2555:31 |
| 5 | xhr_default<@http://localhost:7120/node_modules/.vite/deps/axios.js:2504:9 | xhr_default<@http://localhost:7120/node_modules/.vite/deps/axios.js:2504:9 |

#### R0426 (C2; U, B) / R0586 (C3; U, D, B)

- environment: browser-dev; axes that differ: incident, version
- bug: 6ad38362d52d8cbf0f6b0c78
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 404`

| frame | A | B |
|---|---|---|
| 1 | AxiosError$1@http://localhost:7120/node_modules/.vite/deps/axios.js:1317:3 | AxiosError$1@http://localhost:7120/node_modules/.vite/deps/axios.js:1317:3 |
| 2 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14 |
| 3 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 |
| 4 | EventHandlerNonNull*dispatchXhrRequest@http://localhost:7120/node_modules/.vite/deps/axios.js:2555:31 | EventHandlerNonNull*dispatchXhrRequest@http://localhost:7120/node_modules/.vite/deps/axios.js:2555:31 |
| 5 | xhr_default<@http://localhost:7120/node_modules/.vite/deps/axios.js:2504:9 | xhr_default<@http://localhost:7120/node_modules/.vite/deps/axios.js:2504:9 |

#### R0427 (C3; U, D, B) / R0584 (C1; U, B)

- environment: browser-dev; axes that differ: incident, version
- bug: 6ad38362d52d8cbf0f6b0c78
- message A: `Unhandled Promise Rejection: Request failed with status code 404`
- message B: `Unhandled Promise Rejection: Request failed with status code 500`

| frame | A | B |
|---|---|---|
| 1 | AxiosError$1@http://localhost:7120/node_modules/.vite/deps/axios.js:1317:3 | AxiosError$1@http://localhost:7120/node_modules/.vite/deps/axios.js:1317:3 |
| 2 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14 |
| 3 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 |
| 4 | EventHandlerNonNull*dispatchXhrRequest@http://localhost:7120/node_modules/.vite/deps/axios.js:2555:31 | EventHandlerNonNull*dispatchXhrRequest@http://localhost:7120/node_modules/.vite/deps/axios.js:2555:31 |
| 5 | xhr_default<@http://localhost:7120/node_modules/.vite/deps/axios.js:2504:9 | xhr_default<@http://localhost:7120/node_modules/.vite/deps/axios.js:2504:9 |

#### R0427 (C3; U, D, B) / R0585 (C2; U, B)

- environment: browser-dev; axes that differ: incident, version
- bug: 6ad38362d52d8cbf0f6b0c78
- message A: `Unhandled Promise Rejection: Request failed with status code 404`
- message B: `Unhandled Promise Rejection: Request failed with status code 500`

| frame | A | B |
|---|---|---|
| 1 | AxiosError$1@http://localhost:7120/node_modules/.vite/deps/axios.js:1317:3 | AxiosError$1@http://localhost:7120/node_modules/.vite/deps/axios.js:1317:3 |
| 2 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14 |
| 3 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 |
| 4 | EventHandlerNonNull*dispatchXhrRequest@http://localhost:7120/node_modules/.vite/deps/axios.js:2555:31 | EventHandlerNonNull*dispatchXhrRequest@http://localhost:7120/node_modules/.vite/deps/axios.js:2555:31 |
| 5 | xhr_default<@http://localhost:7120/node_modules/.vite/deps/axios.js:2504:9 | xhr_default<@http://localhost:7120/node_modules/.vite/deps/axios.js:2504:9 |

#### R0428 (C4; U, D, B) / R0429 (C5; U, D, B)

- environment: browser-dev; axes that differ: incident; designated hard-negative pair
- bug: 6ad382f2d52d8cbf0f6b0847
- message A: `Unhandled Promise Rejection: NetworkError when attempting to fetch resource.`
- message B: `Unhandled Promise Rejection: NetworkError when attempting to fetch resource.`

| frame | A | B |
|---|---|---|
| 1 | (no frames) | (no frames) |

#### R0428 (C4; U, D, B) / R0588 (C5; U, D, B)

- environment: browser-dev; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad382f2d52d8cbf0f6b0847
- message A: `Unhandled Promise Rejection: NetworkError when attempting to fetch resource.`
- message B: `Unhandled Promise Rejection: NetworkError when attempting to fetch resource.`

| frame | A | B |
|---|---|---|
| 1 | (no frames) | (no frames) |

#### R0429 (C5; U, D, B) / R0587 (C4; U, D, B)

- environment: browser-dev; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad382f2d52d8cbf0f6b0847
- message A: `Unhandled Promise Rejection: NetworkError when attempting to fetch resource.`
- message B: `Unhandled Promise Rejection: NetworkError when attempting to fetch resource.`

| frame | A | B |
|---|---|---|
| 1 | (no frames) | (no frames) |

#### R0443 (G6; B) / R0444 (G7; B)

- environment: browser-dev; axes that differ: incident; designated hard-negative pair
- bug: 6ad382cbd52d8cbf0f6b06b3
- message A: `Error: Operation failed after retries`
- message B: `Error: Operation failed after retries`

| frame | A | B |
|---|---|---|
| 1 | withRetry@http://localhost:7120/src/utils/withRetry.js:11:8 | withRetry@http://localhost:7120/src/utils/withRetry.js:11:8 |
| 2 | saveAddress@http://localhost:7120/src/account/address.js:10:9 | computeTax@http://localhost:7120/src/checkout/tax.js:11:9 |
| 3 | onClick@http://localhost:7120/src/pages/accountPages.jsx:378:30 | onClick@http://localhost:7120/src/pages/checkoutPages.jsx:139:29 |
| 4 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 |
| 5 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 |

#### R0443 (G6; B) / R0498 (G7; B)

- environment: browser-dev; axes that differ: incident, browser; designated hard-negative pair
- bug: 6ad382cbd52d8cbf0f6b06b3
- message A: `Error: Operation failed after retries`
- message B: `Error: Operation failed after retries`

| frame | A | B |
|---|---|---|
| 1 | withRetry@http://localhost:7120/src/utils/withRetry.js:11:8 | withRetry@http://localhost:7120/src/utils/withRetry.js:11:17 |
| 2 | saveAddress@http://localhost:7120/src/account/address.js:10:9 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 |
| 3 | onClick@http://localhost:7120/src/pages/accountPages.jsx:378:30 | dispatchEvent@[native code] |
| 4 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 |
| 5 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 |

#### R0443 (G6; B) / R0603 (G7; B)

- environment: browser-dev; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad382cbd52d8cbf0f6b06b3
- message A: `Error: Operation failed after retries`
- message B: `Error: Operation failed after retries`

| frame | A | B |
|---|---|---|
| 1 | withRetry@http://localhost:7120/src/utils/withRetry.js:11:8 | withRetry@http://localhost:7120/src/utils/withRetry.js:14:8 |
| 2 | saveAddress@http://localhost:7120/src/account/address.js:10:9 | computeTax@http://localhost:7120/src/checkout/tax.js:14:9 |
| 3 | onClick@http://localhost:7120/src/pages/accountPages.jsx:378:30 | onClick@http://localhost:7120/src/pages/checkoutPages.jsx:142:29 |
| 4 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 |
| 5 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 |

#### R0443 (G6; B) / R0657 (G7; B)

- environment: browser-dev; axes that differ: incident, browser, version; designated hard-negative pair
- bug: 6ad382cbd52d8cbf0f6b06b3
- message A: `Error: Operation failed after retries`
- message B: `Error: Operation failed after retries`

| frame | A | B |
|---|---|---|
| 1 | withRetry@http://localhost:7120/src/utils/withRetry.js:11:8 | withRetry@http://localhost:7120/src/utils/withRetry.js:14:17 |
| 2 | saveAddress@http://localhost:7120/src/account/address.js:10:9 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 |
| 3 | onClick@http://localhost:7120/src/pages/accountPages.jsx:378:30 | dispatchEvent@[native code] |
| 4 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 |
| 5 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 |

#### R0444 (G7; B) / R0497 (G6; B)

- environment: browser-dev; axes that differ: incident, browser; designated hard-negative pair
- bug: 6ad382cbd52d8cbf0f6b06b3
- message A: `Error: Operation failed after retries`
- message B: `Error: Operation failed after retries`

| frame | A | B |
|---|---|---|
| 1 | withRetry@http://localhost:7120/src/utils/withRetry.js:11:8 | withRetry@http://localhost:7120/src/utils/withRetry.js:11:17 |
| 2 | computeTax@http://localhost:7120/src/checkout/tax.js:11:9 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 |
| 3 | onClick@http://localhost:7120/src/pages/checkoutPages.jsx:139:29 | dispatchEvent@[native code] |
| 4 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 |
| 5 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 |

#### R0444 (G7; B) / R0602 (G6; B)

- environment: browser-dev; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad382cbd52d8cbf0f6b06b3
- message A: `Error: Operation failed after retries`
- message B: `Error: Operation failed after retries`

| frame | A | B |
|---|---|---|
| 1 | withRetry@http://localhost:7120/src/utils/withRetry.js:11:8 | withRetry@http://localhost:7120/src/utils/withRetry.js:14:8 |
| 2 | computeTax@http://localhost:7120/src/checkout/tax.js:11:9 | saveAddress@http://localhost:7120/src/account/address.js:13:9 |
| 3 | onClick@http://localhost:7120/src/pages/checkoutPages.jsx:139:29 | onClick@http://localhost:7120/src/pages/accountPages.jsx:381:30 |
| 4 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 |
| 5 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 |

#### R0444 (G7; B) / R0656 (G6; B)

- environment: browser-dev; axes that differ: incident, browser, version; designated hard-negative pair
- bug: 6ad382cbd52d8cbf0f6b06b3
- message A: `Error: Operation failed after retries`
- message B: `Error: Operation failed after retries`

| frame | A | B |
|---|---|---|
| 1 | withRetry@http://localhost:7120/src/utils/withRetry.js:11:8 | withRetry@http://localhost:7120/src/utils/withRetry.js:14:17 |
| 2 | computeTax@http://localhost:7120/src/checkout/tax.js:11:9 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 |
| 3 | onClick@http://localhost:7120/src/pages/checkoutPages.jsx:139:29 | dispatchEvent@[native code] |
| 4 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 |
| 5 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 |

#### R0456 (G19; B) / R0457 (G20; B)

- environment: browser-dev; axes that differ: incident; designated hard-negative pair
- bug: 6ad38313d52d8cbf0f6b098c
- message A: `TypeError: can't access property "zip", order.billing.address is undefined`
- message B: `TypeError: can't access property "zip", order.shipping.address is undefined`

| frame | A | B |
|---|---|---|
| 1 | buildShippingLabel@http://localhost:7120/src/shipping/label.js:4:18 | buildShippingLabel@http://localhost:7120/src/shipping/label.js:6:16 |
| 2 | onClick@http://localhost:7120/src/pages/accountPages.jsx:559:37 | onClick@http://localhost:7120/src/pages/accountPages.jsx:587:37 |
| 3 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 |
| 4 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 |
| 5 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:32 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:32 |

#### R0456 (G19; B) / R0511 (G20; B)

- environment: browser-dev; axes that differ: incident, browser; designated hard-negative pair
- bug: 6ad38313d52d8cbf0f6b098c
- message A: `TypeError: can't access property "zip", order.billing.address is undefined`
- message B: `TypeError: undefined is not an object (evaluating 'order.shipping.address.zip')`

| frame | A | B |
|---|---|---|
| 1 | buildShippingLabel@http://localhost:7120/src/shipping/label.js:4:18 | buildShippingLabel@http://localhost:7120/src/shipping/label.js:6:38 |
| 2 | onClick@http://localhost:7120/src/pages/accountPages.jsx:559:37 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 |
| 3 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 | dispatchEvent@[native code] |
| 4 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 |
| 5 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:32 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 |

#### R0456 (G19; B) / R0616 (G20; B)

- environment: browser-dev; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad38313d52d8cbf0f6b098c
- message A: `TypeError: can't access property "zip", order.billing.address is undefined`
- message B: `TypeError: can't access property "zip", order.shipping.address is undefined`

| frame | A | B |
|---|---|---|
| 1 | buildShippingLabel@http://localhost:7120/src/shipping/label.js:4:18 | buildShippingLabel@http://localhost:7120/src/shipping/label.js:9:16 |
| 2 | onClick@http://localhost:7120/src/pages/accountPages.jsx:559:37 | onClick@http://localhost:7120/src/pages/accountPages.jsx:590:37 |
| 3 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 |
| 4 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 |
| 5 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:32 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:32 |

#### R0456 (G19; B) / R0670 (G20; B)

- environment: browser-dev; axes that differ: incident, browser, version; designated hard-negative pair
- bug: 6ad38313d52d8cbf0f6b098c
- message A: `TypeError: can't access property "zip", order.billing.address is undefined`
- message B: `TypeError: undefined is not an object (evaluating 'order.shipping.address.zip')`

| frame | A | B |
|---|---|---|
| 1 | buildShippingLabel@http://localhost:7120/src/shipping/label.js:4:18 | buildShippingLabel@http://localhost:7120/src/shipping/label.js:9:38 |
| 2 | onClick@http://localhost:7120/src/pages/accountPages.jsx:559:37 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 |
| 3 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 | dispatchEvent@[native code] |
| 4 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 |
| 5 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:32 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 |

#### R0457 (G20; B) / R0510 (G19; B)

- environment: browser-dev; axes that differ: incident, browser; designated hard-negative pair
- bug: 6ad38313d52d8cbf0f6b098c
- message A: `TypeError: can't access property "zip", order.shipping.address is undefined`
- message B: `TypeError: undefined is not an object (evaluating 'order.billing.address.zip')`

| frame | A | B |
|---|---|---|
| 1 | buildShippingLabel@http://localhost:7120/src/shipping/label.js:6:16 | buildShippingLabel@http://localhost:7120/src/shipping/label.js:4:39 |
| 2 | onClick@http://localhost:7120/src/pages/accountPages.jsx:587:37 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 |
| 3 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 | dispatchEvent@[native code] |
| 4 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 |
| 5 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:32 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 |

#### R0457 (G20; B) / R0615 (G19; B)

- environment: browser-dev; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad38313d52d8cbf0f6b098c
- message A: `TypeError: can't access property "zip", order.shipping.address is undefined`
- message B: `TypeError: can't access property "zip", order.billing.address is undefined`

| frame | A | B |
|---|---|---|
| 1 | buildShippingLabel@http://localhost:7120/src/shipping/label.js:6:16 | buildShippingLabel@http://localhost:7120/src/shipping/label.js:7:18 |
| 2 | onClick@http://localhost:7120/src/pages/accountPages.jsx:587:37 | onClick@http://localhost:7120/src/pages/accountPages.jsx:562:37 |
| 3 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 |
| 4 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 |
| 5 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:32 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:32 |

#### R0457 (G20; B) / R0669 (G19; B)

- environment: browser-dev; axes that differ: incident, browser, version; designated hard-negative pair
- bug: 6ad38313d52d8cbf0f6b098c
- message A: `TypeError: can't access property "zip", order.shipping.address is undefined`
- message B: `TypeError: undefined is not an object (evaluating 'order.billing.address.zip')`

| frame | A | B |
|---|---|---|
| 1 | buildShippingLabel@http://localhost:7120/src/shipping/label.js:6:16 | buildShippingLabel@http://localhost:7120/src/shipping/label.js:7:39 |
| 2 | onClick@http://localhost:7120/src/pages/accountPages.jsx:587:37 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 |
| 3 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 | dispatchEvent@[native code] |
| 4 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 |
| 5 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:32 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 |

#### R0458 (G21; B) / R0459 (G22; B)

- environment: browser-dev; axes that differ: incident; designated hard-negative pair
- bug: 6ad3833bd52d8cbf0f6b0b04
- message A: `Error: Payments SDK not ready`
- message B: `Error: Payments SDK not ready`

| frame | A | B |
|---|---|---|
| 1 | @http://localhost:7120/src/payments/state.js:2:35 | @http://localhost:7120/src/payments/state.js:2:35 |

#### R0458 (G21; B) / R0618 (G22; B)

- environment: browser-dev; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad3833bd52d8cbf0f6b0b04
- message A: `Error: Payments SDK not ready`
- message B: `Error: Payments SDK not ready`

| frame | A | B |
|---|---|---|
| 1 | @http://localhost:7120/src/payments/state.js:2:35 | @http://localhost:7120/src/payments/state.js:5:35 |

#### R0459 (G22; B) / R0617 (G21; B)

- environment: browser-dev; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad3833bd52d8cbf0f6b0b04
- message A: `Error: Payments SDK not ready`
- message B: `Error: Payments SDK not ready`

| frame | A | B |
|---|---|---|
| 1 | @http://localhost:7120/src/payments/state.js:2:35 | @http://localhost:7120/src/payments/state.js:5:35 |

#### R0461 (G24; B) / R0462 (G25; B)

- environment: browser-dev; axes that differ: incident; designated hard-negative pair
- bug: 6ad382d0d52d8cbf0f6b06f0
- message A: `RuntimeError: unreachable executed`
- message B: `RuntimeError: unreachable executed`

| frame | A | B |
|---|---|---|
| 1 | @http://localhost:7120/src/pricing/wasm.js line 5 > WebAssembly.instantiate:wasm-function[0]:0x44 | @http://localhost:7120/src/pricing/wasm.js line 5 > WebAssembly.instantiate:wasm-function[1]:0x5b |
| 2 | kernelApplyDiscount@http://localhost:7120/src/pricing/wasm.js:8:24 | kernelComputeTax@http://localhost:7120/src/pricing/wasm.js:11:24 |
| 3 | applyMemberDiscount@http://localhost:7120/src/cart/discount.js:5:9 | estimateTax@http://localhost:7120/src/checkout/kernelTax.js:5:9 |
| 4 | onClick@http://localhost:7120/src/pages/cartPages.jsx:217:38 | onClick@http://localhost:7120/src/pages/checkoutPages.jsx:245:30 |
| 5 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 |

#### R0461 (G24; B) / R0621 (G25; B)

- environment: browser-dev; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad382d0d52d8cbf0f6b06f0
- message A: `RuntimeError: unreachable executed`
- message B: `RuntimeError: unreachable executed`

| frame | A | B |
|---|---|---|
| 1 | @http://localhost:7120/src/pricing/wasm.js line 5 > WebAssembly.instantiate:wasm-function[0]:0x44 | @http://localhost:7120/src/pricing/wasm.js line 8 > WebAssembly.instantiate:wasm-function[2]:0x75 |
| 2 | kernelApplyDiscount@http://localhost:7120/src/pricing/wasm.js:8:24 | kernelComputeTax@http://localhost:7120/src/pricing/wasm.js:14:24 |
| 3 | applyMemberDiscount@http://localhost:7120/src/cart/discount.js:5:9 | estimateTax@http://localhost:7120/src/checkout/kernelTax.js:8:9 |
| 4 | onClick@http://localhost:7120/src/pages/cartPages.jsx:217:38 | onClick@http://localhost:7120/src/pages/checkoutPages.jsx:248:30 |
| 5 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 |

#### R0462 (G25; B) / R0620 (G24; B)

- environment: browser-dev; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad382d0d52d8cbf0f6b06f0
- message A: `RuntimeError: unreachable executed`
- message B: `RuntimeError: unreachable executed`

| frame | A | B |
|---|---|---|
| 1 | @http://localhost:7120/src/pricing/wasm.js line 5 > WebAssembly.instantiate:wasm-function[1]:0x5b | @http://localhost:7120/src/pricing/wasm.js line 8 > WebAssembly.instantiate:wasm-function[1]:0x5e |
| 2 | kernelComputeTax@http://localhost:7120/src/pricing/wasm.js:11:24 | kernelApplyDiscount@http://localhost:7120/src/pricing/wasm.js:11:24 |
| 3 | estimateTax@http://localhost:7120/src/checkout/kernelTax.js:5:9 | applyMemberDiscount@http://localhost:7120/src/cart/discount.js:8:9 |
| 4 | onClick@http://localhost:7120/src/pages/checkoutPages.jsx:245:30 | onClick@http://localhost:7120/src/pages/cartPages.jsx:220:38 |
| 5 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 |

#### R0465 (G28; B) / R0466 (G29; B)

- environment: browser-dev; axes that differ: incident; designated hard-negative pair
- bug: 6ad38325d52d8cbf0f6b0a3b
- message A: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`
- message B: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`

| frame | A | B |
|---|---|---|
| 1 | reserveInventory@http://localhost:7120/src/inventory/api.js:11:9 | reserveInventory@http://localhost:7120/src/inventory/api.js:11:9 |
| 2 | async*reserveOnCartOpen@http://localhost:7120/src/cart/reserveFromCart.js:5:9 | async*reserveForCheckout@http://localhost:7120/src/checkout/reserveAtCheckout.js:5:9 |
| 3 | onClick@http://localhost:7120/src/pages/cartPages.jsx:271:22 | onClick@http://localhost:7120/src/pages/checkoutPages.jsx:305:23 |
| 4 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 |
| 5 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 |

#### R0465 (G28; B) / R0520 (G29; B)

- environment: browser-dev; axes that differ: incident, browser; designated hard-negative pair
- bug: 6ad38325d52d8cbf0f6b0a3b
- message A: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`
- message B: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`

| frame | A | B |
|---|---|---|
| 1 | reserveInventory@http://localhost:7120/src/inventory/api.js:11:9 | reserveInventory@http://localhost:7120/src/inventory/api.js:11:18 |
| 2 | async*reserveOnCartOpen@http://localhost:7120/src/cart/reserveFromCart.js:5:9 |  |
| 3 | onClick@http://localhost:7120/src/pages/cartPages.jsx:271:22 |  |
| 4 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 |  |
| 5 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 |  |

#### R0465 (G28; B) / R0625 (G29; B)

- environment: browser-dev; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad38325d52d8cbf0f6b0a3b
- message A: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`
- message B: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`

| frame | A | B |
|---|---|---|
| 1 | reserveInventory@http://localhost:7120/src/inventory/api.js:11:9 | reserveInventory@http://localhost:7120/src/inventory/api.js:14:9 |
| 2 | async*reserveOnCartOpen@http://localhost:7120/src/cart/reserveFromCart.js:5:9 | async*reserveForCheckout@http://localhost:7120/src/checkout/reserveAtCheckout.js:8:9 |
| 3 | onClick@http://localhost:7120/src/pages/cartPages.jsx:271:22 | onClick@http://localhost:7120/src/pages/checkoutPages.jsx:308:23 |
| 4 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 |
| 5 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 |

#### R0465 (G28; B) / R0679 (G29; B)

- environment: browser-dev; axes that differ: incident, browser, version; designated hard-negative pair
- bug: 6ad38325d52d8cbf0f6b0a3b
- message A: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`
- message B: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`

| frame | A | B |
|---|---|---|
| 1 | reserveInventory@http://localhost:7120/src/inventory/api.js:11:9 | reserveInventory@http://localhost:7120/src/inventory/api.js:14:18 |
| 2 | async*reserveOnCartOpen@http://localhost:7120/src/cart/reserveFromCart.js:5:9 |  |
| 3 | onClick@http://localhost:7120/src/pages/cartPages.jsx:271:22 |  |
| 4 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 |  |
| 5 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 |  |

#### R0466 (G29; B) / R0519 (G28; B)

- environment: browser-dev; axes that differ: incident, browser; designated hard-negative pair
- bug: 6ad38325d52d8cbf0f6b0a3b
- message A: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`
- message B: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`

| frame | A | B |
|---|---|---|
| 1 | reserveInventory@http://localhost:7120/src/inventory/api.js:11:9 | reserveInventory@http://localhost:7120/src/inventory/api.js:11:18 |
| 2 | async*reserveForCheckout@http://localhost:7120/src/checkout/reserveAtCheckout.js:5:9 |  |
| 3 | onClick@http://localhost:7120/src/pages/checkoutPages.jsx:305:23 |  |
| 4 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 |  |
| 5 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 |  |

#### R0466 (G29; B) / R0624 (G28; B)

- environment: browser-dev; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad38325d52d8cbf0f6b0a3b
- message A: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`
- message B: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`

| frame | A | B |
|---|---|---|
| 1 | reserveInventory@http://localhost:7120/src/inventory/api.js:11:9 | reserveInventory@http://localhost:7120/src/inventory/api.js:14:9 |
| 2 | async*reserveForCheckout@http://localhost:7120/src/checkout/reserveAtCheckout.js:5:9 | async*reserveOnCartOpen@http://localhost:7120/src/cart/reserveFromCart.js:8:9 |
| 3 | onClick@http://localhost:7120/src/pages/checkoutPages.jsx:305:23 | onClick@http://localhost:7120/src/pages/cartPages.jsx:274:22 |
| 4 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 |
| 5 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 |

#### R0466 (G29; B) / R0678 (G28; B)

- environment: browser-dev; axes that differ: incident, browser, version; designated hard-negative pair
- bug: 6ad38325d52d8cbf0f6b0a3b
- message A: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`
- message B: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`

| frame | A | B |
|---|---|---|
| 1 | reserveInventory@http://localhost:7120/src/inventory/api.js:11:9 | reserveInventory@http://localhost:7120/src/inventory/api.js:14:18 |
| 2 | async*reserveForCheckout@http://localhost:7120/src/checkout/reserveAtCheckout.js:5:9 |  |
| 3 | onClick@http://localhost:7120/src/pages/checkoutPages.jsx:305:23 |  |
| 4 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 |  |
| 5 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 |  |

#### R0475 (A8a; U, B) / R0476 (A8b; U, B)

- environment: browser-dev; axes that differ: incident; designated hard-negative pair
- bug: 6ad382dcd52d8cbf0f6b0786
- message A: `TypeError: undefined is not an object (evaluating 'amount.toFixed')`
- message B: `TypeError: undefined is not an object (evaluating 'amount.toFixed')`

| frame | A | B |
|---|---|---|
| 1 | formatPrice@http://localhost:7120/src/utils/formatPrice.js:3:21 | formatPrice@http://localhost:7120/src/utils/formatPrice.js:3:21 |
| 2 | handleQuickView@http://localhost:7120/src/components/ProductCard.jsx:8:46 | handleMoveToCart@http://localhost:7120/src/components/WishlistRow.jsx:8:54 |
| 3 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 |
| 4 | dispatchEvent@[native code] | dispatchEvent@[native code] |
| 5 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 |

#### R0475 (A8a; U, B) / R0581 (A8b; U, B)

- environment: browser-dev; axes that differ: incident, browser, version; designated hard-negative pair
- bug: 6ad382dcd52d8cbf0f6b0786
- message A: `TypeError: undefined is not an object (evaluating 'amount.toFixed')`
- message B: `TypeError: can't access property "toFixed", amount is undefined`

| frame | A | B |
|---|---|---|
| 1 | formatPrice@http://localhost:7120/src/utils/formatPrice.js:3:21 | formatPrice@http://localhost:7120/src/utils/formatPrice.js:6:15 |
| 2 | handleQuickView@http://localhost:7120/src/components/ProductCard.jsx:8:46 | handleMoveToCart@http://localhost:7120/src/components/WishlistRow.jsx:11:43 |
| 3 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 |
| 4 | dispatchEvent@[native code] | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 |
| 5 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:32 |

#### R0475 (A8a; U, B) / R0635 (A8b; U, B)

- environment: browser-dev; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad382dcd52d8cbf0f6b0786
- message A: `TypeError: undefined is not an object (evaluating 'amount.toFixed')`
- message B: `TypeError: undefined is not an object (evaluating 'amount.toFixed')`

| frame | A | B |
|---|---|---|
| 1 | formatPrice@http://localhost:7120/src/utils/formatPrice.js:3:21 | formatPrice@http://localhost:7120/src/utils/formatPrice.js:6:21 |
| 2 | handleQuickView@http://localhost:7120/src/components/ProductCard.jsx:8:46 | handleMoveToCart@http://localhost:7120/src/components/WishlistRow.jsx:11:54 |
| 3 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 |
| 4 | dispatchEvent@[native code] | dispatchEvent@[native code] |
| 5 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 |

#### R0476 (A8b; U, B) / R0580 (A8a; U, B)

- environment: browser-dev; axes that differ: incident, browser, version; designated hard-negative pair
- bug: 6ad382dcd52d8cbf0f6b0786
- message A: `TypeError: undefined is not an object (evaluating 'amount.toFixed')`
- message B: `TypeError: can't access property "toFixed", amount is undefined`

| frame | A | B |
|---|---|---|
| 1 | formatPrice@http://localhost:7120/src/utils/formatPrice.js:3:21 | formatPrice@http://localhost:7120/src/utils/formatPrice.js:6:15 |
| 2 | handleMoveToCart@http://localhost:7120/src/components/WishlistRow.jsx:8:54 | handleQuickView@http://localhost:7120/src/components/ProductCard.jsx:11:35 |
| 3 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 |
| 4 | dispatchEvent@[native code] | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 |
| 5 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:32 |

#### R0476 (A8b; U, B) / R0634 (A8a; U, B)

- environment: browser-dev; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad382dcd52d8cbf0f6b0786
- message A: `TypeError: undefined is not an object (evaluating 'amount.toFixed')`
- message B: `TypeError: undefined is not an object (evaluating 'amount.toFixed')`

| frame | A | B |
|---|---|---|
| 1 | formatPrice@http://localhost:7120/src/utils/formatPrice.js:3:21 | formatPrice@http://localhost:7120/src/utils/formatPrice.js:6:21 |
| 2 | handleMoveToCart@http://localhost:7120/src/components/WishlistRow.jsx:8:54 | handleQuickView@http://localhost:7120/src/components/ProductCard.jsx:11:46 |
| 3 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 |
| 4 | dispatchEvent@[native code] | dispatchEvent@[native code] |
| 5 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 |

#### R0479 (C1; U, B) / R0480 (C2; U, B)

- environment: browser-dev; axes that differ: incident; designated hard-negative pair
- bug: 6ad3831bd52d8cbf0f6b09d8
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 500`

| frame | A | B |
|---|---|---|
| 1 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:30 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:30 |
| 2 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 |

#### R0479 (C1; U, B) / R0481 (C3; U, D, B)

- environment: browser-dev; axes that differ: incident
- bug: 6ad3831bd52d8cbf0f6b09d8
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 404`

| frame | A | B |
|---|---|---|
| 1 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:30 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:30 |
| 2 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 |

#### R0479 (C1; U, B) / R0639 (C2; U, B)

- environment: browser-dev; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad3831bd52d8cbf0f6b09d8
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 500`

| frame | A | B |
|---|---|---|
| 1 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:30 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:30 |
| 2 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 |

#### R0479 (C1; U, B) / R0640 (C3; U, D, B)

- environment: browser-dev; axes that differ: incident, version
- bug: 6ad3831bd52d8cbf0f6b09d8
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 404`

| frame | A | B |
|---|---|---|
| 1 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:30 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:30 |
| 2 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 |

#### R0480 (C2; U, B) / R0481 (C3; U, D, B)

- environment: browser-dev; axes that differ: incident
- bug: 6ad3831bd52d8cbf0f6b09d8
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 404`

| frame | A | B |
|---|---|---|
| 1 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:30 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:30 |
| 2 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 |

#### R0480 (C2; U, B) / R0638 (C1; U, B)

- environment: browser-dev; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad3831bd52d8cbf0f6b09d8
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 500`

| frame | A | B |
|---|---|---|
| 1 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:30 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:30 |
| 2 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 |

#### R0480 (C2; U, B) / R0640 (C3; U, D, B)

- environment: browser-dev; axes that differ: incident, version
- bug: 6ad3831bd52d8cbf0f6b09d8
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 404`

| frame | A | B |
|---|---|---|
| 1 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:30 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:30 |
| 2 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 |

#### R0481 (C3; U, D, B) / R0638 (C1; U, B)

- environment: browser-dev; axes that differ: incident, version
- bug: 6ad3831bd52d8cbf0f6b09d8
- message A: `Unhandled Promise Rejection: Request failed with status code 404`
- message B: `Unhandled Promise Rejection: Request failed with status code 500`

| frame | A | B |
|---|---|---|
| 1 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:30 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:30 |
| 2 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 |

#### R0481 (C3; U, D, B) / R0639 (C2; U, B)

- environment: browser-dev; axes that differ: incident, version
- bug: 6ad3831bd52d8cbf0f6b09d8
- message A: `Unhandled Promise Rejection: Request failed with status code 404`
- message B: `Unhandled Promise Rejection: Request failed with status code 500`

| frame | A | B |
|---|---|---|
| 1 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:30 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:30 |
| 2 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 |

#### R0482 (C4; U, D, B) / R0483 (C5; U, D, B)

- environment: browser-dev; axes that differ: incident; designated hard-negative pair
- bug: 6ad3834ed52d8cbf0f6b0bb4
- message A: `Unhandled Promise Rejection: Load failed`
- message B: `Unhandled Promise Rejection: Load failed`

| frame | A | B |
|---|---|---|
| 1 | (no frames) | (no frames) |

#### R0482 (C4; U, D, B) / R0642 (C5; U, D, B)

- environment: browser-dev; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad3834ed52d8cbf0f6b0bb4
- message A: `Unhandled Promise Rejection: Load failed`
- message B: `Unhandled Promise Rejection: Load failed`

| frame | A | B |
|---|---|---|
| 1 | (no frames) | (no frames) |

#### R0483 (C5; U, D, B) / R0641 (C4; U, D, B)

- environment: browser-dev; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad3834ed52d8cbf0f6b0bb4
- message A: `Unhandled Promise Rejection: Load failed`
- message B: `Unhandled Promise Rejection: Load failed`

| frame | A | B |
|---|---|---|
| 1 | (no frames) | (no frames) |

#### R0497 (G6; B) / R0498 (G7; B)

- environment: browser-dev; axes that differ: incident; designated hard-negative pair
- bug: 6ad382cbd52d8cbf0f6b06b3
- message A: `Error: Operation failed after retries`
- message B: `Error: Operation failed after retries`

| frame | A | B |
|---|---|---|
| 1 | withRetry@http://localhost:7120/src/utils/withRetry.js:11:17 | withRetry@http://localhost:7120/src/utils/withRetry.js:11:17 |
| 2 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 |
| 3 | dispatchEvent@[native code] | dispatchEvent@[native code] |
| 4 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 |
| 5 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 |

#### R0497 (G6; B) / R0603 (G7; B)

- environment: browser-dev; axes that differ: incident, browser, version; designated hard-negative pair
- bug: 6ad382cbd52d8cbf0f6b06b3
- message A: `Error: Operation failed after retries`
- message B: `Error: Operation failed after retries`

| frame | A | B |
|---|---|---|
| 1 | withRetry@http://localhost:7120/src/utils/withRetry.js:11:17 | withRetry@http://localhost:7120/src/utils/withRetry.js:14:8 |
| 2 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 | computeTax@http://localhost:7120/src/checkout/tax.js:14:9 |
| 3 | dispatchEvent@[native code] | onClick@http://localhost:7120/src/pages/checkoutPages.jsx:142:29 |
| 4 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 |
| 5 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 |

#### R0497 (G6; B) / R0657 (G7; B)

- environment: browser-dev; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad382cbd52d8cbf0f6b06b3
- message A: `Error: Operation failed after retries`
- message B: `Error: Operation failed after retries`

| frame | A | B |
|---|---|---|
| 1 | withRetry@http://localhost:7120/src/utils/withRetry.js:11:17 | withRetry@http://localhost:7120/src/utils/withRetry.js:14:17 |
| 2 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 |
| 3 | dispatchEvent@[native code] | dispatchEvent@[native code] |
| 4 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 |
| 5 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 |

#### R0498 (G7; B) / R0602 (G6; B)

- environment: browser-dev; axes that differ: incident, browser, version; designated hard-negative pair
- bug: 6ad382cbd52d8cbf0f6b06b3
- message A: `Error: Operation failed after retries`
- message B: `Error: Operation failed after retries`

| frame | A | B |
|---|---|---|
| 1 | withRetry@http://localhost:7120/src/utils/withRetry.js:11:17 | withRetry@http://localhost:7120/src/utils/withRetry.js:14:8 |
| 2 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 | saveAddress@http://localhost:7120/src/account/address.js:13:9 |
| 3 | dispatchEvent@[native code] | onClick@http://localhost:7120/src/pages/accountPages.jsx:381:30 |
| 4 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 |
| 5 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 |

#### R0498 (G7; B) / R0656 (G6; B)

- environment: browser-dev; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad382cbd52d8cbf0f6b06b3
- message A: `Error: Operation failed after retries`
- message B: `Error: Operation failed after retries`

| frame | A | B |
|---|---|---|
| 1 | withRetry@http://localhost:7120/src/utils/withRetry.js:11:17 | withRetry@http://localhost:7120/src/utils/withRetry.js:14:17 |
| 2 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 |
| 3 | dispatchEvent@[native code] | dispatchEvent@[native code] |
| 4 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 |
| 5 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 |

#### R0510 (G19; B) / R0511 (G20; B)

- environment: browser-dev; axes that differ: incident; designated hard-negative pair
- bug: 6ad38313d52d8cbf0f6b098c
- message A: `TypeError: undefined is not an object (evaluating 'order.billing.address.zip')`
- message B: `TypeError: undefined is not an object (evaluating 'order.shipping.address.zip')`

| frame | A | B |
|---|---|---|
| 1 | buildShippingLabel@http://localhost:7120/src/shipping/label.js:4:39 | buildShippingLabel@http://localhost:7120/src/shipping/label.js:6:38 |
| 2 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 |
| 3 | dispatchEvent@[native code] | dispatchEvent@[native code] |
| 4 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 |
| 5 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 |

#### R0510 (G19; B) / R0616 (G20; B)

- environment: browser-dev; axes that differ: incident, browser, version; designated hard-negative pair
- bug: 6ad38313d52d8cbf0f6b098c
- message A: `TypeError: undefined is not an object (evaluating 'order.billing.address.zip')`
- message B: `TypeError: can't access property "zip", order.shipping.address is undefined`

| frame | A | B |
|---|---|---|
| 1 | buildShippingLabel@http://localhost:7120/src/shipping/label.js:4:39 | buildShippingLabel@http://localhost:7120/src/shipping/label.js:9:16 |
| 2 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 | onClick@http://localhost:7120/src/pages/accountPages.jsx:590:37 |
| 3 | dispatchEvent@[native code] | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 |
| 4 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 |
| 5 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:32 |

#### R0510 (G19; B) / R0670 (G20; B)

- environment: browser-dev; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad38313d52d8cbf0f6b098c
- message A: `TypeError: undefined is not an object (evaluating 'order.billing.address.zip')`
- message B: `TypeError: undefined is not an object (evaluating 'order.shipping.address.zip')`

| frame | A | B |
|---|---|---|
| 1 | buildShippingLabel@http://localhost:7120/src/shipping/label.js:4:39 | buildShippingLabel@http://localhost:7120/src/shipping/label.js:9:38 |
| 2 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 |
| 3 | dispatchEvent@[native code] | dispatchEvent@[native code] |
| 4 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 |
| 5 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 |

#### R0511 (G20; B) / R0615 (G19; B)

- environment: browser-dev; axes that differ: incident, browser, version; designated hard-negative pair
- bug: 6ad38313d52d8cbf0f6b098c
- message A: `TypeError: undefined is not an object (evaluating 'order.shipping.address.zip')`
- message B: `TypeError: can't access property "zip", order.billing.address is undefined`

| frame | A | B |
|---|---|---|
| 1 | buildShippingLabel@http://localhost:7120/src/shipping/label.js:6:38 | buildShippingLabel@http://localhost:7120/src/shipping/label.js:7:18 |
| 2 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 | onClick@http://localhost:7120/src/pages/accountPages.jsx:562:37 |
| 3 | dispatchEvent@[native code] | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 |
| 4 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 |
| 5 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:32 |

#### R0511 (G20; B) / R0669 (G19; B)

- environment: browser-dev; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad38313d52d8cbf0f6b098c
- message A: `TypeError: undefined is not an object (evaluating 'order.shipping.address.zip')`
- message B: `TypeError: undefined is not an object (evaluating 'order.billing.address.zip')`

| frame | A | B |
|---|---|---|
| 1 | buildShippingLabel@http://localhost:7120/src/shipping/label.js:6:38 | buildShippingLabel@http://localhost:7120/src/shipping/label.js:7:39 |
| 2 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 |
| 3 | dispatchEvent@[native code] | dispatchEvent@[native code] |
| 4 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 |
| 5 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 |

#### R0512 (G21; B) / R0513 (G22; B)

- environment: browser-dev; axes that differ: incident; designated hard-negative pair
- bug: 6ad383a1d52d8cbf0f6b0eaa
- message A: `Error: Payments SDK not ready`
- message B: `Error: Payments SDK not ready`

| frame | A | B |
|---|---|---|
| 1 | module code@http://localhost:7120/src/payments/state.js:2:44 | module code@http://localhost:7120/src/payments/state.js:2:44 |

#### R0512 (G21; B) / R0672 (G22; B)

- environment: browser-dev; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad383a1d52d8cbf0f6b0eaa
- message A: `Error: Payments SDK not ready`
- message B: `Error: Payments SDK not ready`

| frame | A | B |
|---|---|---|
| 1 | module code@http://localhost:7120/src/payments/state.js:2:44 | module code@http://localhost:7120/src/payments/state.js:5:44 |

#### R0513 (G22; B) / R0671 (G21; B)

- environment: browser-dev; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad383a1d52d8cbf0f6b0eaa
- message A: `Error: Payments SDK not ready`
- message B: `Error: Payments SDK not ready`

| frame | A | B |
|---|---|---|
| 1 | module code@http://localhost:7120/src/payments/state.js:2:44 | module code@http://localhost:7120/src/payments/state.js:5:44 |

#### R0515 (G24; B) / R0516 (G25; B)

- environment: browser-dev; axes that differ: incident; designated hard-negative pair
- bug: 6ad38366d52d8cbf0f6b0ca8
- message A: `RuntimeError: Unreachable code should not be executed (evaluating 'func.apply(context, funcArgs)')`
- message B: `RuntimeError: Unreachable code should not be executed (evaluating 'func.apply(context, funcArgs)')`

| frame | A | B |
|---|---|---|
| 1 | 0@wasm-function[0] | 1@wasm-function[1] |
| 2 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 |
| 3 | dispatchEvent@[native code] | dispatchEvent@[native code] |
| 4 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 |
| 5 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 |

#### R0515 (G24; B) / R0675 (G25; B)

- environment: browser-dev; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad38366d52d8cbf0f6b0ca8
- message A: `RuntimeError: Unreachable code should not be executed (evaluating 'func.apply(context, funcArgs)')`
- message B: `RuntimeError: Unreachable code should not be executed (evaluating 'func.apply(context, funcArgs)')`

| frame | A | B |
|---|---|---|
| 1 | 0@wasm-function[0] | 2@wasm-function[2] |
| 2 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 |
| 3 | dispatchEvent@[native code] | dispatchEvent@[native code] |
| 4 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 |
| 5 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 |

#### R0516 (G25; B) / R0674 (G24; B)

- environment: browser-dev; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad38366d52d8cbf0f6b0ca8
- message A: `RuntimeError: Unreachable code should not be executed (evaluating 'func.apply(context, funcArgs)')`
- message B: `RuntimeError: Unreachable code should not be executed (evaluating 'func.apply(context, funcArgs)')`

| frame | A | B |
|---|---|---|
| 1 | 1@wasm-function[1] | 1@wasm-function[1] |
| 2 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 |
| 3 | dispatchEvent@[native code] | dispatchEvent@[native code] |
| 4 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 |
| 5 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 |

#### R0519 (G28; B) / R0520 (G29; B)

- environment: browser-dev; axes that differ: incident; designated hard-negative pair
- bug: 6ad38325d52d8cbf0f6b0a3b
- message A: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`
- message B: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`

| frame | A | B |
|---|---|---|
| 1 | reserveInventory@http://localhost:7120/src/inventory/api.js:11:18 | reserveInventory@http://localhost:7120/src/inventory/api.js:11:18 |

#### R0519 (G28; B) / R0625 (G29; B)

- environment: browser-dev; axes that differ: incident, browser, version; designated hard-negative pair
- bug: 6ad38325d52d8cbf0f6b0a3b
- message A: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`
- message B: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`

| frame | A | B |
|---|---|---|
| 1 | reserveInventory@http://localhost:7120/src/inventory/api.js:11:18 | reserveInventory@http://localhost:7120/src/inventory/api.js:14:9 |
| 2 |  | async*reserveForCheckout@http://localhost:7120/src/checkout/reserveAtCheckout.js:8:9 |
| 3 |  | onClick@http://localhost:7120/src/pages/checkoutPages.jsx:308:23 |
| 4 |  | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 |
| 5 |  | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 |

#### R0519 (G28; B) / R0679 (G29; B)

- environment: browser-dev; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad38325d52d8cbf0f6b0a3b
- message A: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`
- message B: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`

| frame | A | B |
|---|---|---|
| 1 | reserveInventory@http://localhost:7120/src/inventory/api.js:11:18 | reserveInventory@http://localhost:7120/src/inventory/api.js:14:18 |

#### R0520 (G29; B) / R0624 (G28; B)

- environment: browser-dev; axes that differ: incident, browser, version; designated hard-negative pair
- bug: 6ad38325d52d8cbf0f6b0a3b
- message A: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`
- message B: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`

| frame | A | B |
|---|---|---|
| 1 | reserveInventory@http://localhost:7120/src/inventory/api.js:11:18 | reserveInventory@http://localhost:7120/src/inventory/api.js:14:9 |
| 2 |  | async*reserveOnCartOpen@http://localhost:7120/src/cart/reserveFromCart.js:8:9 |
| 3 |  | onClick@http://localhost:7120/src/pages/cartPages.jsx:274:22 |
| 4 |  | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 |
| 5 |  | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 |

#### R0520 (G29; B) / R0678 (G28; B)

- environment: browser-dev; axes that differ: incident, version; designated hard-negative pair
- bug: 6ad38325d52d8cbf0f6b0a3b
- message A: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`
- message B: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`

| frame | A | B |
|---|---|---|
| 1 | reserveInventory@http://localhost:7120/src/inventory/api.js:11:18 | reserveInventory@http://localhost:7120/src/inventory/api.js:14:18 |

#### R0533 (C1; U, B) / R0534 (C2; U, B)

- environment: browser-dev; axes that differ: incident; designated hard-negative pair
- bug: 6ad3837fd52d8cbf0f6b0d8a
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 500`

| frame | A | B |
|---|---|---|
| 1 | at settle (http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14) | at settle (http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14) |
| 2 | at XMLHttpRequest.onloadend (http://localhost:7120/node_modules/.vite/deps/axios.js:2539:4) | at XMLHttpRequest.onloadend (http://localhost:7120/node_modules/.vite/deps/axios.js:2539:4) |
| 3 | at Axios$1.request (http://localhost:7120/node_modules/.vite/deps/axios.js:3391:37) |  |
| 4 | at async placeOrder (http://localhost:7120/src/checkout/placeOrder.js:8:14) |  |
| 5 | at async handlePlaceOrder (http://localhost:7120/src/pages/checkoutPages.jsx:55:17) |  |

#### R0533 (C1; U, B) / R0535 (C3; U, D, B)

- environment: browser-dev; axes that differ: incident
- bug: 6ad3837fd52d8cbf0f6b0d8a
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 404`

| frame | A | B |
|---|---|---|
| 1 | at settle (http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14) | at settle (http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14) |
| 2 | at XMLHttpRequest.onloadend (http://localhost:7120/node_modules/.vite/deps/axios.js:2539:4) | at XMLHttpRequest.onloadend (http://localhost:7120/node_modules/.vite/deps/axios.js:2539:4) |
| 3 | at Axios$1.request (http://localhost:7120/node_modules/.vite/deps/axios.js:3391:37) | at Axios$1.request (http://localhost:7120/node_modules/.vite/deps/axios.js:3391:37) |
| 4 | at async placeOrder (http://localhost:7120/src/checkout/placeOrder.js:8:14) | at async fetchProduct (http://localhost:7120/src/catalog/productApi.js:8:14) |
| 5 | at async handlePlaceOrder (http://localhost:7120/src/pages/checkoutPages.jsx:55:17) | at async openProduct (http://localhost:7120/src/pages/catalogPages.jsx:260:19) |

#### R0534 (C2; U, B) / R0535 (C3; U, D, B)

- environment: browser-dev; axes that differ: incident
- bug: 6ad3837fd52d8cbf0f6b0d8a
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 404`

| frame | A | B |
|---|---|---|
| 1 | at settle (http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14) | at settle (http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14) |
| 2 | at XMLHttpRequest.onloadend (http://localhost:7120/node_modules/.vite/deps/axios.js:2539:4) | at XMLHttpRequest.onloadend (http://localhost:7120/node_modules/.vite/deps/axios.js:2539:4) |
| 3 |  | at Axios$1.request (http://localhost:7120/node_modules/.vite/deps/axios.js:3391:37) |
| 4 |  | at async fetchProduct (http://localhost:7120/src/catalog/productApi.js:8:14) |
| 5 |  | at async openProduct (http://localhost:7120/src/pages/catalogPages.jsx:260:19) |

#### R0561 (G19; B) / R0562 (G20; B)

- environment: browser-dev; axes that differ: incident; designated hard-negative pair
- bug: 6ad38345d52d8cbf0f6b0b5f
- message A: `Uncaught TypeError: Cannot read properties of undefined (reading 'zip')`
- message B: `Uncaught TypeError: Cannot read properties of undefined (reading 'zip')`

| frame | A | B |
|---|---|---|
| 1 | at buildShippingLabel (http://localhost:7120/src/shipping/label.js:7:40) | at buildShippingLabel (http://localhost:7120/src/shipping/label.js:9:39) |
| 2 | at onClick (http://localhost:7120/src/pages/accountPages.jsx:562:19) | at onClick (http://localhost:7120/src/pages/accountPages.jsx:590:19) |
| 3 | at HTMLUnknownElement.callCallback (http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11) | at HTMLUnknownElement.callCallback (http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11) |
| 4 | at Object.invokeGuardedCallbackDev (http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14) | at Object.invokeGuardedCallbackDev (http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14) |
| 5 | at invokeGuardedCallback (http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:32) | at invokeGuardedCallback (http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:32) |

#### R0563 (G21; B) / R0564 (G22; B)

- environment: browser-dev; axes that differ: incident; designated hard-negative pair
- bug: 6ad38399d52d8cbf0f6b0e67
- message A: `Uncaught Error: Payments SDK not ready`
- message B: `Uncaught Error: Payments SDK not ready`

| frame | A | B |
|---|---|---|
| 1 | at http://localhost:7120/src/payments/state.js:5:35 | at http://localhost:7120/src/payments/state.js:5:35 |

#### R0570 (G28; B) / R0571 (G29; B)

- environment: browser-dev; axes that differ: incident; designated hard-negative pair
- bug: 6ad3831fd52d8cbf0f6b0a06
- message A: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`
- message B: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`

| frame | A | B |
|---|---|---|
| 1 | at reserve (file:///srv/mock/server.mjs:29:28) | at reserve (file:///srv/mock/server.mjs:29:28) |
| 2 | at Server.<anonymous> (file:///srv/mock/server.mjs:51:29) | at Server.<anonymous> (file:///srv/mock/server.mjs:51:29) |
| 3 | at process.processTicksAndRejections (node:internal/process/task_queues:103:5) | at process.processTicksAndRejections (node:internal/process/task_queues:103:5) |
| 4 | at reserveInventory (http://localhost:7120/src/inventory/api.js:14:9) | at reserveInventory (http://localhost:7120/src/inventory/api.js:14:9) |

#### R0580 (A8a; U, B) / R0581 (A8b; U, B)

- environment: browser-dev; axes that differ: incident; designated hard-negative pair
- bug: 6ad382dcd52d8cbf0f6b0786
- message A: `TypeError: can't access property "toFixed", amount is undefined`
- message B: `TypeError: can't access property "toFixed", amount is undefined`

| frame | A | B |
|---|---|---|
| 1 | formatPrice@http://localhost:7120/src/utils/formatPrice.js:6:15 | formatPrice@http://localhost:7120/src/utils/formatPrice.js:6:15 |
| 2 | handleQuickView@http://localhost:7120/src/components/ProductCard.jsx:11:35 | handleMoveToCart@http://localhost:7120/src/components/WishlistRow.jsx:11:43 |
| 3 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 |
| 4 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 |
| 5 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:32 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:32 |

#### R0580 (A8a; U, B) / R0635 (A8b; U, B)

- environment: browser-dev; axes that differ: incident, browser; designated hard-negative pair
- bug: 6ad382dcd52d8cbf0f6b0786
- message A: `TypeError: can't access property "toFixed", amount is undefined`
- message B: `TypeError: undefined is not an object (evaluating 'amount.toFixed')`

| frame | A | B |
|---|---|---|
| 1 | formatPrice@http://localhost:7120/src/utils/formatPrice.js:6:15 | formatPrice@http://localhost:7120/src/utils/formatPrice.js:6:21 |
| 2 | handleQuickView@http://localhost:7120/src/components/ProductCard.jsx:11:35 | handleMoveToCart@http://localhost:7120/src/components/WishlistRow.jsx:11:54 |
| 3 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 |
| 4 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 | dispatchEvent@[native code] |
| 5 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:32 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 |

#### R0581 (A8b; U, B) / R0634 (A8a; U, B)

- environment: browser-dev; axes that differ: incident, browser; designated hard-negative pair
- bug: 6ad382dcd52d8cbf0f6b0786
- message A: `TypeError: can't access property "toFixed", amount is undefined`
- message B: `TypeError: undefined is not an object (evaluating 'amount.toFixed')`

| frame | A | B |
|---|---|---|
| 1 | formatPrice@http://localhost:7120/src/utils/formatPrice.js:6:15 | formatPrice@http://localhost:7120/src/utils/formatPrice.js:6:21 |
| 2 | handleMoveToCart@http://localhost:7120/src/components/WishlistRow.jsx:11:43 | handleQuickView@http://localhost:7120/src/components/ProductCard.jsx:11:46 |
| 3 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 |
| 4 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 | dispatchEvent@[native code] |
| 5 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:32 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 |

#### R0584 (C1; U, B) / R0585 (C2; U, B)

- environment: browser-dev; axes that differ: incident; designated hard-negative pair
- bug: 6ad38362d52d8cbf0f6b0c78
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 500`

| frame | A | B |
|---|---|---|
| 1 | AxiosError$1@http://localhost:7120/node_modules/.vite/deps/axios.js:1317:3 | AxiosError$1@http://localhost:7120/node_modules/.vite/deps/axios.js:1317:3 |
| 2 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14 |
| 3 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 |
| 4 | EventHandlerNonNull*dispatchXhrRequest@http://localhost:7120/node_modules/.vite/deps/axios.js:2555:31 | EventHandlerNonNull*dispatchXhrRequest@http://localhost:7120/node_modules/.vite/deps/axios.js:2555:31 |
| 5 | xhr_default<@http://localhost:7120/node_modules/.vite/deps/axios.js:2504:9 | xhr_default<@http://localhost:7120/node_modules/.vite/deps/axios.js:2504:9 |

#### R0584 (C1; U, B) / R0586 (C3; U, D, B)

- environment: browser-dev; axes that differ: incident
- bug: 6ad38362d52d8cbf0f6b0c78
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 404`

| frame | A | B |
|---|---|---|
| 1 | AxiosError$1@http://localhost:7120/node_modules/.vite/deps/axios.js:1317:3 | AxiosError$1@http://localhost:7120/node_modules/.vite/deps/axios.js:1317:3 |
| 2 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14 |
| 3 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 |
| 4 | EventHandlerNonNull*dispatchXhrRequest@http://localhost:7120/node_modules/.vite/deps/axios.js:2555:31 | EventHandlerNonNull*dispatchXhrRequest@http://localhost:7120/node_modules/.vite/deps/axios.js:2555:31 |
| 5 | xhr_default<@http://localhost:7120/node_modules/.vite/deps/axios.js:2504:9 | xhr_default<@http://localhost:7120/node_modules/.vite/deps/axios.js:2504:9 |

#### R0585 (C2; U, B) / R0586 (C3; U, D, B)

- environment: browser-dev; axes that differ: incident
- bug: 6ad38362d52d8cbf0f6b0c78
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 404`

| frame | A | B |
|---|---|---|
| 1 | AxiosError$1@http://localhost:7120/node_modules/.vite/deps/axios.js:1317:3 | AxiosError$1@http://localhost:7120/node_modules/.vite/deps/axios.js:1317:3 |
| 2 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:14 |
| 3 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 |
| 4 | EventHandlerNonNull*dispatchXhrRequest@http://localhost:7120/node_modules/.vite/deps/axios.js:2555:31 | EventHandlerNonNull*dispatchXhrRequest@http://localhost:7120/node_modules/.vite/deps/axios.js:2555:31 |
| 5 | xhr_default<@http://localhost:7120/node_modules/.vite/deps/axios.js:2504:9 | xhr_default<@http://localhost:7120/node_modules/.vite/deps/axios.js:2504:9 |

#### R0587 (C4; U, D, B) / R0588 (C5; U, D, B)

- environment: browser-dev; axes that differ: incident; designated hard-negative pair
- bug: 6ad382f2d52d8cbf0f6b0847
- message A: `Unhandled Promise Rejection: NetworkError when attempting to fetch resource.`
- message B: `Unhandled Promise Rejection: NetworkError when attempting to fetch resource.`

| frame | A | B |
|---|---|---|
| 1 | (no frames) | (no frames) |

#### R0602 (G6; B) / R0603 (G7; B)

- environment: browser-dev; axes that differ: incident; designated hard-negative pair
- bug: 6ad382cbd52d8cbf0f6b06b3
- message A: `Error: Operation failed after retries`
- message B: `Error: Operation failed after retries`

| frame | A | B |
|---|---|---|
| 1 | withRetry@http://localhost:7120/src/utils/withRetry.js:14:8 | withRetry@http://localhost:7120/src/utils/withRetry.js:14:8 |
| 2 | saveAddress@http://localhost:7120/src/account/address.js:13:9 | computeTax@http://localhost:7120/src/checkout/tax.js:14:9 |
| 3 | onClick@http://localhost:7120/src/pages/accountPages.jsx:381:30 | onClick@http://localhost:7120/src/pages/checkoutPages.jsx:142:29 |
| 4 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 |
| 5 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 |

#### R0602 (G6; B) / R0657 (G7; B)

- environment: browser-dev; axes that differ: incident, browser; designated hard-negative pair
- bug: 6ad382cbd52d8cbf0f6b06b3
- message A: `Error: Operation failed after retries`
- message B: `Error: Operation failed after retries`

| frame | A | B |
|---|---|---|
| 1 | withRetry@http://localhost:7120/src/utils/withRetry.js:14:8 | withRetry@http://localhost:7120/src/utils/withRetry.js:14:17 |
| 2 | saveAddress@http://localhost:7120/src/account/address.js:13:9 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 |
| 3 | onClick@http://localhost:7120/src/pages/accountPages.jsx:381:30 | dispatchEvent@[native code] |
| 4 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 |
| 5 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 |

#### R0603 (G7; B) / R0656 (G6; B)

- environment: browser-dev; axes that differ: incident, browser; designated hard-negative pair
- bug: 6ad382cbd52d8cbf0f6b06b3
- message A: `Error: Operation failed after retries`
- message B: `Error: Operation failed after retries`

| frame | A | B |
|---|---|---|
| 1 | withRetry@http://localhost:7120/src/utils/withRetry.js:14:8 | withRetry@http://localhost:7120/src/utils/withRetry.js:14:17 |
| 2 | computeTax@http://localhost:7120/src/checkout/tax.js:14:9 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 |
| 3 | onClick@http://localhost:7120/src/pages/checkoutPages.jsx:142:29 | dispatchEvent@[native code] |
| 4 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 |
| 5 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 |

#### R0615 (G19; B) / R0616 (G20; B)

- environment: browser-dev; axes that differ: incident; designated hard-negative pair
- bug: 6ad38313d52d8cbf0f6b098c
- message A: `TypeError: can't access property "zip", order.billing.address is undefined`
- message B: `TypeError: can't access property "zip", order.shipping.address is undefined`

| frame | A | B |
|---|---|---|
| 1 | buildShippingLabel@http://localhost:7120/src/shipping/label.js:7:18 | buildShippingLabel@http://localhost:7120/src/shipping/label.js:9:16 |
| 2 | onClick@http://localhost:7120/src/pages/accountPages.jsx:562:37 | onClick@http://localhost:7120/src/pages/accountPages.jsx:590:37 |
| 3 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 |
| 4 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 |
| 5 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:32 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:32 |

#### R0615 (G19; B) / R0670 (G20; B)

- environment: browser-dev; axes that differ: incident, browser; designated hard-negative pair
- bug: 6ad38313d52d8cbf0f6b098c
- message A: `TypeError: can't access property "zip", order.billing.address is undefined`
- message B: `TypeError: undefined is not an object (evaluating 'order.shipping.address.zip')`

| frame | A | B |
|---|---|---|
| 1 | buildShippingLabel@http://localhost:7120/src/shipping/label.js:7:18 | buildShippingLabel@http://localhost:7120/src/shipping/label.js:9:38 |
| 2 | onClick@http://localhost:7120/src/pages/accountPages.jsx:562:37 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 |
| 3 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 | dispatchEvent@[native code] |
| 4 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 |
| 5 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:32 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 |

#### R0616 (G20; B) / R0669 (G19; B)

- environment: browser-dev; axes that differ: incident, browser; designated hard-negative pair
- bug: 6ad38313d52d8cbf0f6b098c
- message A: `TypeError: can't access property "zip", order.shipping.address is undefined`
- message B: `TypeError: undefined is not an object (evaluating 'order.billing.address.zip')`

| frame | A | B |
|---|---|---|
| 1 | buildShippingLabel@http://localhost:7120/src/shipping/label.js:9:16 | buildShippingLabel@http://localhost:7120/src/shipping/label.js:7:39 |
| 2 | onClick@http://localhost:7120/src/pages/accountPages.jsx:590:37 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 |
| 3 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 | dispatchEvent@[native code] |
| 4 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 |
| 5 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:32 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 |

#### R0617 (G21; B) / R0618 (G22; B)

- environment: browser-dev; axes that differ: incident; designated hard-negative pair
- bug: 6ad3833bd52d8cbf0f6b0b04
- message A: `Error: Payments SDK not ready`
- message B: `Error: Payments SDK not ready`

| frame | A | B |
|---|---|---|
| 1 | @http://localhost:7120/src/payments/state.js:5:35 | @http://localhost:7120/src/payments/state.js:5:35 |

#### R0620 (G24; B) / R0621 (G25; B)

- environment: browser-dev; axes that differ: incident; designated hard-negative pair
- bug: 6ad382d0d52d8cbf0f6b06f0
- message A: `RuntimeError: unreachable executed`
- message B: `RuntimeError: unreachable executed`

| frame | A | B |
|---|---|---|
| 1 | @http://localhost:7120/src/pricing/wasm.js line 8 > WebAssembly.instantiate:wasm-function[1]:0x5e | @http://localhost:7120/src/pricing/wasm.js line 8 > WebAssembly.instantiate:wasm-function[2]:0x75 |
| 2 | kernelApplyDiscount@http://localhost:7120/src/pricing/wasm.js:11:24 | kernelComputeTax@http://localhost:7120/src/pricing/wasm.js:14:24 |
| 3 | applyMemberDiscount@http://localhost:7120/src/cart/discount.js:8:9 | estimateTax@http://localhost:7120/src/checkout/kernelTax.js:8:9 |
| 4 | onClick@http://localhost:7120/src/pages/cartPages.jsx:220:38 | onClick@http://localhost:7120/src/pages/checkoutPages.jsx:248:30 |
| 5 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 |

#### R0624 (G28; B) / R0625 (G29; B)

- environment: browser-dev; axes that differ: incident; designated hard-negative pair
- bug: 6ad38325d52d8cbf0f6b0a3b
- message A: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`
- message B: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`

| frame | A | B |
|---|---|---|
| 1 | reserveInventory@http://localhost:7120/src/inventory/api.js:14:9 | reserveInventory@http://localhost:7120/src/inventory/api.js:14:9 |
| 2 | async*reserveOnCartOpen@http://localhost:7120/src/cart/reserveFromCart.js:8:9 | async*reserveForCheckout@http://localhost:7120/src/checkout/reserveAtCheckout.js:8:9 |
| 3 | onClick@http://localhost:7120/src/pages/cartPages.jsx:274:22 | onClick@http://localhost:7120/src/pages/checkoutPages.jsx:308:23 |
| 4 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 |
| 5 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 |

#### R0624 (G28; B) / R0679 (G29; B)

- environment: browser-dev; axes that differ: incident, browser; designated hard-negative pair
- bug: 6ad38325d52d8cbf0f6b0a3b
- message A: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`
- message B: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`

| frame | A | B |
|---|---|---|
| 1 | reserveInventory@http://localhost:7120/src/inventory/api.js:14:9 | reserveInventory@http://localhost:7120/src/inventory/api.js:14:18 |
| 2 | async*reserveOnCartOpen@http://localhost:7120/src/cart/reserveFromCart.js:8:9 |  |
| 3 | onClick@http://localhost:7120/src/pages/cartPages.jsx:274:22 |  |
| 4 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 |  |
| 5 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 |  |

#### R0625 (G29; B) / R0678 (G28; B)

- environment: browser-dev; axes that differ: incident, browser; designated hard-negative pair
- bug: 6ad38325d52d8cbf0f6b0a3b
- message A: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`
- message B: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`

| frame | A | B |
|---|---|---|
| 1 | reserveInventory@http://localhost:7120/src/inventory/api.js:14:9 | reserveInventory@http://localhost:7120/src/inventory/api.js:14:18 |
| 2 | async*reserveForCheckout@http://localhost:7120/src/checkout/reserveAtCheckout.js:8:9 |  |
| 3 | onClick@http://localhost:7120/src/pages/checkoutPages.jsx:308:23 |  |
| 4 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:11 |  |
| 5 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:14 |  |

#### R0634 (A8a; U, B) / R0635 (A8b; U, B)

- environment: browser-dev; axes that differ: incident; designated hard-negative pair
- bug: 6ad382dcd52d8cbf0f6b0786
- message A: `TypeError: undefined is not an object (evaluating 'amount.toFixed')`
- message B: `TypeError: undefined is not an object (evaluating 'amount.toFixed')`

| frame | A | B |
|---|---|---|
| 1 | formatPrice@http://localhost:7120/src/utils/formatPrice.js:6:21 | formatPrice@http://localhost:7120/src/utils/formatPrice.js:6:21 |
| 2 | handleQuickView@http://localhost:7120/src/components/ProductCard.jsx:11:46 | handleMoveToCart@http://localhost:7120/src/components/WishlistRow.jsx:11:54 |
| 3 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 |
| 4 | dispatchEvent@[native code] | dispatchEvent@[native code] |
| 5 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 |

#### R0638 (C1; U, B) / R0639 (C2; U, B)

- environment: browser-dev; axes that differ: incident; designated hard-negative pair
- bug: 6ad3831bd52d8cbf0f6b09d8
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 500`

| frame | A | B |
|---|---|---|
| 1 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:30 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:30 |
| 2 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 |

#### R0638 (C1; U, B) / R0640 (C3; U, D, B)

- environment: browser-dev; axes that differ: incident
- bug: 6ad3831bd52d8cbf0f6b09d8
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 404`

| frame | A | B |
|---|---|---|
| 1 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:30 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:30 |
| 2 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 |

#### R0639 (C2; U, B) / R0640 (C3; U, D, B)

- environment: browser-dev; axes that differ: incident
- bug: 6ad3831bd52d8cbf0f6b09d8
- message A: `Unhandled Promise Rejection: Request failed with status code 500`
- message B: `Unhandled Promise Rejection: Request failed with status code 404`

| frame | A | B |
|---|---|---|
| 1 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:30 | settle@http://localhost:7120/node_modules/.vite/deps/axios.js:2078:30 |
| 2 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 | onloadend@http://localhost:7120/node_modules/.vite/deps/axios.js:2539:10 |

#### R0641 (C4; U, D, B) / R0642 (C5; U, D, B)

- environment: browser-dev; axes that differ: incident; designated hard-negative pair
- bug: 6ad3834ed52d8cbf0f6b0bb4
- message A: `Unhandled Promise Rejection: Load failed`
- message B: `Unhandled Promise Rejection: Load failed`

| frame | A | B |
|---|---|---|
| 1 | (no frames) | (no frames) |

#### R0656 (G6; B) / R0657 (G7; B)

- environment: browser-dev; axes that differ: incident; designated hard-negative pair
- bug: 6ad382cbd52d8cbf0f6b06b3
- message A: `Error: Operation failed after retries`
- message B: `Error: Operation failed after retries`

| frame | A | B |
|---|---|---|
| 1 | withRetry@http://localhost:7120/src/utils/withRetry.js:14:17 | withRetry@http://localhost:7120/src/utils/withRetry.js:14:17 |
| 2 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 |
| 3 | dispatchEvent@[native code] | dispatchEvent@[native code] |
| 4 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 |
| 5 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 |

#### R0669 (G19; B) / R0670 (G20; B)

- environment: browser-dev; axes that differ: incident; designated hard-negative pair
- bug: 6ad38313d52d8cbf0f6b098c
- message A: `TypeError: undefined is not an object (evaluating 'order.billing.address.zip')`
- message B: `TypeError: undefined is not an object (evaluating 'order.shipping.address.zip')`

| frame | A | B |
|---|---|---|
| 1 | buildShippingLabel@http://localhost:7120/src/shipping/label.js:7:39 | buildShippingLabel@http://localhost:7120/src/shipping/label.js:9:38 |
| 2 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 |
| 3 | dispatchEvent@[native code] | dispatchEvent@[native code] |
| 4 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 |
| 5 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 |

#### R0671 (G21; B) / R0672 (G22; B)

- environment: browser-dev; axes that differ: incident; designated hard-negative pair
- bug: 6ad383a1d52d8cbf0f6b0eaa
- message A: `Error: Payments SDK not ready`
- message B: `Error: Payments SDK not ready`

| frame | A | B |
|---|---|---|
| 1 | module code@http://localhost:7120/src/payments/state.js:5:44 | module code@http://localhost:7120/src/payments/state.js:5:44 |

#### R0674 (G24; B) / R0675 (G25; B)

- environment: browser-dev; axes that differ: incident; designated hard-negative pair
- bug: 6ad38366d52d8cbf0f6b0ca8
- message A: `RuntimeError: Unreachable code should not be executed (evaluating 'func.apply(context, funcArgs)')`
- message B: `RuntimeError: Unreachable code should not be executed (evaluating 'func.apply(context, funcArgs)')`

| frame | A | B |
|---|---|---|
| 1 | 1@wasm-function[1] | 2@wasm-function[2] |
| 2 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 |
| 3 | dispatchEvent@[native code] | dispatchEvent@[native code] |
| 4 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 |
| 5 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 |

#### R0678 (G28; B) / R0679 (G29; B)

- environment: browser-dev; axes that differ: incident; designated hard-negative pair
- bug: 6ad38325d52d8cbf0f6b0a3b
- message A: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`
- message B: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`

| frame | A | B |
|---|---|---|
| 1 | reserveInventory@http://localhost:7120/src/inventory/api.js:14:18 | reserveInventory@http://localhost:7120/src/inventory/api.js:14:18 |

#### R0065 (G28; B) / R0412 (G29; B)

- environment: browser-prod x browser-dev; axes that differ: incident, environment; designated hard-negative pair
- bug: 6ad3831fd52d8cbf0f6b0a06
- message A: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`
- message B: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`

| frame | A | B |
|---|---|---|
| 1 | at reserve (file:///srv/mock/server.mjs:29:28) | at reserve (file:///srv/mock/server.mjs:29:28) |
| 2 | at Server.<anonymous> (file:///srv/mock/server.mjs:51:29) | at Server.<anonymous> (file:///srv/mock/server.mjs:51:29) |
| 3 | at process.processTicksAndRejections (node:internal/process/task_queues:103:5) | at process.processTicksAndRejections (node:internal/process/task_queues:103:5) |
| 4 | at se (http://localhost:7110/assets/index-BOtVUl4o.js:9:400) | at reserveInventory (http://localhost:7120/src/inventory/api.js:11:9) |

#### R0065 (G28; B) / R0571 (G29; B)

- environment: browser-prod x browser-dev; axes that differ: incident, environment, version; designated hard-negative pair
- bug: 6ad3831fd52d8cbf0f6b0a06
- message A: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`
- message B: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`

| frame | A | B |
|---|---|---|
| 1 | at reserve (file:///srv/mock/server.mjs:29:28) | at reserve (file:///srv/mock/server.mjs:29:28) |
| 2 | at Server.<anonymous> (file:///srv/mock/server.mjs:51:29) | at Server.<anonymous> (file:///srv/mock/server.mjs:51:29) |
| 3 | at process.processTicksAndRejections (node:internal/process/task_queues:103:5) | at process.processTicksAndRejections (node:internal/process/task_queues:103:5) |
| 4 | at se (http://localhost:7110/assets/index-BOtVUl4o.js:9:400) | at reserveInventory (http://localhost:7120/src/inventory/api.js:14:9) |

#### R0066 (G29; B) / R0411 (G28; B)

- environment: browser-prod x browser-dev; axes that differ: incident, environment; designated hard-negative pair
- bug: 6ad3831fd52d8cbf0f6b0a06
- message A: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`
- message B: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`

| frame | A | B |
|---|---|---|
| 1 | at reserve (file:///srv/mock/server.mjs:29:28) | at reserve (file:///srv/mock/server.mjs:29:28) |
| 2 | at Server.<anonymous> (file:///srv/mock/server.mjs:51:29) | at Server.<anonymous> (file:///srv/mock/server.mjs:51:29) |
| 3 | at process.processTicksAndRejections (node:internal/process/task_queues:103:5) | at process.processTicksAndRejections (node:internal/process/task_queues:103:5) |
| 4 | at se (http://localhost:7110/assets/index-BOtVUl4o.js:9:400) | at reserveInventory (http://localhost:7120/src/inventory/api.js:11:9) |

#### R0066 (G29; B) / R0570 (G28; B)

- environment: browser-prod x browser-dev; axes that differ: incident, environment, version; designated hard-negative pair
- bug: 6ad3831fd52d8cbf0f6b0a06
- message A: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`
- message B: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`

| frame | A | B |
|---|---|---|
| 1 | at reserve (file:///srv/mock/server.mjs:29:28) | at reserve (file:///srv/mock/server.mjs:29:28) |
| 2 | at Server.<anonymous> (file:///srv/mock/server.mjs:51:29) | at Server.<anonymous> (file:///srv/mock/server.mjs:51:29) |
| 3 | at process.processTicksAndRejections (node:internal/process/task_queues:103:5) | at process.processTicksAndRejections (node:internal/process/task_queues:103:5) |
| 4 | at se (http://localhost:7110/assets/index-BOtVUl4o.js:9:400) | at reserveInventory (http://localhost:7120/src/inventory/api.js:14:9) |

#### R0085 (C4; U, D, B) / R0429 (C5; U, D, B)

- environment: browser-prod x browser-dev; axes that differ: incident, environment; designated hard-negative pair
- bug: 6ad382f2d52d8cbf0f6b0847
- message A: `Unhandled Promise Rejection: NetworkError when attempting to fetch resource.`
- message B: `Unhandled Promise Rejection: NetworkError when attempting to fetch resource.`

| frame | A | B |
|---|---|---|
| 1 | (no frames) | (no frames) |

#### R0085 (C4; U, D, B) / R0588 (C5; U, D, B)

- environment: browser-prod x browser-dev; axes that differ: incident, environment, version; designated hard-negative pair
- bug: 6ad382f2d52d8cbf0f6b0847
- message A: `Unhandled Promise Rejection: NetworkError when attempting to fetch resource.`
- message B: `Unhandled Promise Rejection: NetworkError when attempting to fetch resource.`

| frame | A | B |
|---|---|---|
| 1 | (no frames) | (no frames) |

#### R0086 (C5; U, D, B) / R0428 (C4; U, D, B)

- environment: browser-prod x browser-dev; axes that differ: incident, environment; designated hard-negative pair
- bug: 6ad382f2d52d8cbf0f6b0847
- message A: `Unhandled Promise Rejection: NetworkError when attempting to fetch resource.`
- message B: `Unhandled Promise Rejection: NetworkError when attempting to fetch resource.`

| frame | A | B |
|---|---|---|
| 1 | (no frames) | (no frames) |

#### R0086 (C5; U, D, B) / R0587 (C4; U, D, B)

- environment: browser-prod x browser-dev; axes that differ: incident, environment, version; designated hard-negative pair
- bug: 6ad382f2d52d8cbf0f6b0847
- message A: `Unhandled Promise Rejection: NetworkError when attempting to fetch resource.`
- message B: `Unhandled Promise Rejection: NetworkError when attempting to fetch resource.`

| frame | A | B |
|---|---|---|
| 1 | (no frames) | (no frames) |

#### R0142 (C4; U, D, B) / R0483 (C5; U, D, B)

- environment: browser-prod x browser-dev; axes that differ: incident, environment; designated hard-negative pair
- bug: 6ad3834ed52d8cbf0f6b0bb4
- message A: `Unhandled Promise Rejection: Load failed`
- message B: `Unhandled Promise Rejection: Load failed`

| frame | A | B |
|---|---|---|
| 1 | (no frames) | (no frames) |

#### R0142 (C4; U, D, B) / R0642 (C5; U, D, B)

- environment: browser-prod x browser-dev; axes that differ: incident, environment, version; designated hard-negative pair
- bug: 6ad3834ed52d8cbf0f6b0bb4
- message A: `Unhandled Promise Rejection: Load failed`
- message B: `Unhandled Promise Rejection: Load failed`

| frame | A | B |
|---|---|---|
| 1 | (no frames) | (no frames) |

#### R0143 (C5; U, D, B) / R0482 (C4; U, D, B)

- environment: browser-prod x browser-dev; axes that differ: incident, environment; designated hard-negative pair
- bug: 6ad3834ed52d8cbf0f6b0bb4
- message A: `Unhandled Promise Rejection: Load failed`
- message B: `Unhandled Promise Rejection: Load failed`

| frame | A | B |
|---|---|---|
| 1 | (no frames) | (no frames) |

#### R0143 (C5; U, D, B) / R0641 (C4; U, D, B)

- environment: browser-prod x browser-dev; axes that differ: incident, environment, version; designated hard-negative pair
- bug: 6ad3834ed52d8cbf0f6b0bb4
- message A: `Unhandled Promise Rejection: Load failed`
- message B: `Unhandled Promise Rejection: Load failed`

| frame | A | B |
|---|---|---|
| 1 | (no frames) | (no frames) |

#### R0175 (G24; B) / R0516 (G25; B)

- environment: browser-prod x browser-dev; axes that differ: incident, environment; designated hard-negative pair
- bug: 6ad38366d52d8cbf0f6b0ca8
- message A: `RuntimeError: Unreachable code should not be executed (evaluating 't.apply(n,l)')`
- message B: `RuntimeError: Unreachable code should not be executed (evaluating 'func.apply(context, funcArgs)')`

| frame | A | B |
|---|---|---|
| 1 | 0@wasm-function[0] | 1@wasm-function[1] |
| 2 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9810 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 |
| 3 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9964 | dispatchEvent@[native code] |
| 4 | ht@http://localhost:7110/assets/index-BOtVUl4o.js:5:10021 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 |
| 5 | li@http://localhost:7110/assets/index-BOtVUl4o.js:5:31226 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 |

#### R0175 (G24; B) / R0675 (G25; B)

- environment: browser-prod x browser-dev; axes that differ: incident, environment, version; designated hard-negative pair
- bug: 6ad38366d52d8cbf0f6b0ca8
- message A: `RuntimeError: Unreachable code should not be executed (evaluating 't.apply(n,l)')`
- message B: `RuntimeError: Unreachable code should not be executed (evaluating 'func.apply(context, funcArgs)')`

| frame | A | B |
|---|---|---|
| 1 | 0@wasm-function[0] | 2@wasm-function[2] |
| 2 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9810 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 |
| 3 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9964 | dispatchEvent@[native code] |
| 4 | ht@http://localhost:7110/assets/index-BOtVUl4o.js:5:10021 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 |
| 5 | li@http://localhost:7110/assets/index-BOtVUl4o.js:5:31226 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 |

#### R0176 (G25; B) / R0515 (G24; B)

- environment: browser-prod x browser-dev; axes that differ: incident, environment; designated hard-negative pair
- bug: 6ad38366d52d8cbf0f6b0ca8
- message A: `RuntimeError: Unreachable code should not be executed (evaluating 't.apply(n,l)')`
- message B: `RuntimeError: Unreachable code should not be executed (evaluating 'func.apply(context, funcArgs)')`

| frame | A | B |
|---|---|---|
| 1 | 1@wasm-function[1] | 0@wasm-function[0] |
| 2 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9810 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 |
| 3 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9964 | dispatchEvent@[native code] |
| 4 | ht@http://localhost:7110/assets/index-BOtVUl4o.js:5:10021 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 |
| 5 | li@http://localhost:7110/assets/index-BOtVUl4o.js:5:31226 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 |

#### R0176 (G25; B) / R0674 (G24; B)

- environment: browser-prod x browser-dev; axes that differ: incident, environment, version; designated hard-negative pair
- bug: 6ad38366d52d8cbf0f6b0ca8
- message A: `RuntimeError: Unreachable code should not be executed (evaluating 't.apply(n,l)')`
- message B: `RuntimeError: Unreachable code should not be executed (evaluating 'func.apply(context, funcArgs)')`

| frame | A | B |
|---|---|---|
| 1 | 1@wasm-function[1] | 1@wasm-function[1] |
| 2 | ct@http://localhost:7110/assets/index-BOtVUl4o.js:5:9810 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 |
| 3 | mt@http://localhost:7110/assets/index-BOtVUl4o.js:5:9964 | dispatchEvent@[native code] |
| 4 | ht@http://localhost:7110/assets/index-BOtVUl4o.js:5:10021 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 |
| 5 | li@http://localhost:7110/assets/index-BOtVUl4o.js:5:31226 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 |

#### R0233 (G28; B) / R0412 (G29; B)

- environment: browser-prod x browser-dev; axes that differ: incident, environment, version; designated hard-negative pair
- bug: 6ad3831fd52d8cbf0f6b0a06
- message A: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`
- message B: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`

| frame | A | B |
|---|---|---|
| 1 | at reserve (file:///srv/mock/server.mjs:29:28) | at reserve (file:///srv/mock/server.mjs:29:28) |
| 2 | at Server.<anonymous> (file:///srv/mock/server.mjs:51:29) | at Server.<anonymous> (file:///srv/mock/server.mjs:51:29) |
| 3 | at process.processTicksAndRejections (node:internal/process/task_queues:103:5) | at process.processTicksAndRejections (node:internal/process/task_queues:103:5) |
| 4 | at E (http://localhost:7110/assets/index-DvtLrm67.js:9:419) | at reserveInventory (http://localhost:7120/src/inventory/api.js:11:9) |

#### R0233 (G28; B) / R0571 (G29; B)

- environment: browser-prod x browser-dev; axes that differ: incident, environment; designated hard-negative pair
- bug: 6ad3831fd52d8cbf0f6b0a06
- message A: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`
- message B: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`

| frame | A | B |
|---|---|---|
| 1 | at reserve (file:///srv/mock/server.mjs:29:28) | at reserve (file:///srv/mock/server.mjs:29:28) |
| 2 | at Server.<anonymous> (file:///srv/mock/server.mjs:51:29) | at Server.<anonymous> (file:///srv/mock/server.mjs:51:29) |
| 3 | at process.processTicksAndRejections (node:internal/process/task_queues:103:5) | at process.processTicksAndRejections (node:internal/process/task_queues:103:5) |
| 4 | at E (http://localhost:7110/assets/index-DvtLrm67.js:9:419) | at reserveInventory (http://localhost:7120/src/inventory/api.js:14:9) |

#### R0234 (G29; B) / R0411 (G28; B)

- environment: browser-prod x browser-dev; axes that differ: incident, environment, version; designated hard-negative pair
- bug: 6ad3831fd52d8cbf0f6b0a06
- message A: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`
- message B: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`

| frame | A | B |
|---|---|---|
| 1 | at reserve (file:///srv/mock/server.mjs:29:28) | at reserve (file:///srv/mock/server.mjs:29:28) |
| 2 | at Server.<anonymous> (file:///srv/mock/server.mjs:51:29) | at Server.<anonymous> (file:///srv/mock/server.mjs:51:29) |
| 3 | at process.processTicksAndRejections (node:internal/process/task_queues:103:5) | at process.processTicksAndRejections (node:internal/process/task_queues:103:5) |
| 4 | at E (http://localhost:7110/assets/index-DvtLrm67.js:9:419) | at reserveInventory (http://localhost:7120/src/inventory/api.js:11:9) |

#### R0234 (G29; B) / R0570 (G28; B)

- environment: browser-prod x browser-dev; axes that differ: incident, environment; designated hard-negative pair
- bug: 6ad3831fd52d8cbf0f6b0a06
- message A: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`
- message B: `Unhandled Promise Rejection: Inventory reservation failed: Cannot read properties of undefined (reading 'sku')↵ TypeError: Cannot read properties of undefined (reading 'sku')↵     a`

| frame | A | B |
|---|---|---|
| 1 | at reserve (file:///srv/mock/server.mjs:29:28) | at reserve (file:///srv/mock/server.mjs:29:28) |
| 2 | at Server.<anonymous> (file:///srv/mock/server.mjs:51:29) | at Server.<anonymous> (file:///srv/mock/server.mjs:51:29) |
| 3 | at process.processTicksAndRejections (node:internal/process/task_queues:103:5) | at process.processTicksAndRejections (node:internal/process/task_queues:103:5) |
| 4 | at E (http://localhost:7110/assets/index-DvtLrm67.js:9:419) | at reserveInventory (http://localhost:7120/src/inventory/api.js:14:9) |

#### R0253 (C4; U, D, B) / R0429 (C5; U, D, B)

- environment: browser-prod x browser-dev; axes that differ: incident, environment, version; designated hard-negative pair
- bug: 6ad382f2d52d8cbf0f6b0847
- message A: `Unhandled Promise Rejection: NetworkError when attempting to fetch resource.`
- message B: `Unhandled Promise Rejection: NetworkError when attempting to fetch resource.`

| frame | A | B |
|---|---|---|
| 1 | (no frames) | (no frames) |

#### R0253 (C4; U, D, B) / R0588 (C5; U, D, B)

- environment: browser-prod x browser-dev; axes that differ: incident, environment; designated hard-negative pair
- bug: 6ad382f2d52d8cbf0f6b0847
- message A: `Unhandled Promise Rejection: NetworkError when attempting to fetch resource.`
- message B: `Unhandled Promise Rejection: NetworkError when attempting to fetch resource.`

| frame | A | B |
|---|---|---|
| 1 | (no frames) | (no frames) |

#### R0254 (C5; U, D, B) / R0428 (C4; U, D, B)

- environment: browser-prod x browser-dev; axes that differ: incident, environment, version; designated hard-negative pair
- bug: 6ad382f2d52d8cbf0f6b0847
- message A: `Unhandled Promise Rejection: NetworkError when attempting to fetch resource.`
- message B: `Unhandled Promise Rejection: NetworkError when attempting to fetch resource.`

| frame | A | B |
|---|---|---|
| 1 | (no frames) | (no frames) |

#### R0254 (C5; U, D, B) / R0587 (C4; U, D, B)

- environment: browser-prod x browser-dev; axes that differ: incident, environment; designated hard-negative pair
- bug: 6ad382f2d52d8cbf0f6b0847
- message A: `Unhandled Promise Rejection: NetworkError when attempting to fetch resource.`
- message B: `Unhandled Promise Rejection: NetworkError when attempting to fetch resource.`

| frame | A | B |
|---|---|---|
| 1 | (no frames) | (no frames) |

#### R0310 (C4; U, D, B) / R0483 (C5; U, D, B)

- environment: browser-prod x browser-dev; axes that differ: incident, environment, version; designated hard-negative pair
- bug: 6ad3834ed52d8cbf0f6b0bb4
- message A: `Unhandled Promise Rejection: Load failed`
- message B: `Unhandled Promise Rejection: Load failed`

| frame | A | B |
|---|---|---|
| 1 | (no frames) | (no frames) |

#### R0310 (C4; U, D, B) / R0642 (C5; U, D, B)

- environment: browser-prod x browser-dev; axes that differ: incident, environment; designated hard-negative pair
- bug: 6ad3834ed52d8cbf0f6b0bb4
- message A: `Unhandled Promise Rejection: Load failed`
- message B: `Unhandled Promise Rejection: Load failed`

| frame | A | B |
|---|---|---|
| 1 | (no frames) | (no frames) |

#### R0311 (C5; U, D, B) / R0482 (C4; U, D, B)

- environment: browser-prod x browser-dev; axes that differ: incident, environment, version; designated hard-negative pair
- bug: 6ad3834ed52d8cbf0f6b0bb4
- message A: `Unhandled Promise Rejection: Load failed`
- message B: `Unhandled Promise Rejection: Load failed`

| frame | A | B |
|---|---|---|
| 1 | (no frames) | (no frames) |

#### R0311 (C5; U, D, B) / R0641 (C4; U, D, B)

- environment: browser-prod x browser-dev; axes that differ: incident, environment; designated hard-negative pair
- bug: 6ad3834ed52d8cbf0f6b0bb4
- message A: `Unhandled Promise Rejection: Load failed`
- message B: `Unhandled Promise Rejection: Load failed`

| frame | A | B |
|---|---|---|
| 1 | (no frames) | (no frames) |

#### R0343 (G24; B) / R0516 (G25; B)

- environment: browser-prod x browser-dev; axes that differ: incident, environment, version; designated hard-negative pair
- bug: 6ad38366d52d8cbf0f6b0ca8
- message A: `RuntimeError: Unreachable code should not be executed (evaluating 't.apply(n,l)')`
- message B: `RuntimeError: Unreachable code should not be executed (evaluating 'func.apply(context, funcArgs)')`

| frame | A | B |
|---|---|---|
| 1 | 1@wasm-function[1] | 1@wasm-function[1] |
| 2 | ct@http://localhost:7110/assets/index-DvtLrm67.js:5:9811 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 |
| 3 | mt@http://localhost:7110/assets/index-DvtLrm67.js:5:9965 | dispatchEvent@[native code] |
| 4 | ht@http://localhost:7110/assets/index-DvtLrm67.js:5:10022 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 |
| 5 | li@http://localhost:7110/assets/index-DvtLrm67.js:5:31237 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 |

#### R0343 (G24; B) / R0675 (G25; B)

- environment: browser-prod x browser-dev; axes that differ: incident, environment; designated hard-negative pair
- bug: 6ad38366d52d8cbf0f6b0ca8
- message A: `RuntimeError: Unreachable code should not be executed (evaluating 't.apply(n,l)')`
- message B: `RuntimeError: Unreachable code should not be executed (evaluating 'func.apply(context, funcArgs)')`

| frame | A | B |
|---|---|---|
| 1 | 1@wasm-function[1] | 2@wasm-function[2] |
| 2 | ct@http://localhost:7110/assets/index-DvtLrm67.js:5:9811 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 |
| 3 | mt@http://localhost:7110/assets/index-DvtLrm67.js:5:9965 | dispatchEvent@[native code] |
| 4 | ht@http://localhost:7110/assets/index-DvtLrm67.js:5:10022 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 |
| 5 | li@http://localhost:7110/assets/index-DvtLrm67.js:5:31237 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 |

#### R0344 (G25; B) / R0515 (G24; B)

- environment: browser-prod x browser-dev; axes that differ: incident, environment, version; designated hard-negative pair
- bug: 6ad38366d52d8cbf0f6b0ca8
- message A: `RuntimeError: Unreachable code should not be executed (evaluating 't.apply(n,l)')`
- message B: `RuntimeError: Unreachable code should not be executed (evaluating 'func.apply(context, funcArgs)')`

| frame | A | B |
|---|---|---|
| 1 | 2@wasm-function[2] | 0@wasm-function[0] |
| 2 | ct@http://localhost:7110/assets/index-DvtLrm67.js:5:9811 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 |
| 3 | mt@http://localhost:7110/assets/index-DvtLrm67.js:5:9965 | dispatchEvent@[native code] |
| 4 | ht@http://localhost:7110/assets/index-DvtLrm67.js:5:10022 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 |
| 5 | li@http://localhost:7110/assets/index-DvtLrm67.js:5:31237 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 |

#### R0344 (G25; B) / R0674 (G24; B)

- environment: browser-prod x browser-dev; axes that differ: incident, environment; designated hard-negative pair
- bug: 6ad38366d52d8cbf0f6b0ca8
- message A: `RuntimeError: Unreachable code should not be executed (evaluating 't.apply(n,l)')`
- message B: `RuntimeError: Unreachable code should not be executed (evaluating 'func.apply(context, funcArgs)')`

| frame | A | B |
|---|---|---|
| 1 | 2@wasm-function[2] | 1@wasm-function[1] |
| 2 | ct@http://localhost:7110/assets/index-DvtLrm67.js:5:9811 | callCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3143:16 |
| 3 | mt@http://localhost:7110/assets/index-DvtLrm67.js:5:9965 | dispatchEvent@[native code] |
| 4 | ht@http://localhost:7110/assets/index-DvtLrm67.js:5:10022 | invokeGuardedCallbackDev@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3163:27 |
| 5 | li@http://localhost:7110/assets/index-DvtLrm67.js:5:31237 | invokeGuardedCallback@http://localhost:7120/node_modules/.vite/deps/react-dom-RTgNV8HK.js:3202:37 |


