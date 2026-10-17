// The incident list: the label set of the corpus (DESIGN.md section 1, "Ground
// truth"). Two reports are the same incident iff the same trigger fired them.
//
// origin: U = owner's prompt, D = design session, B = builder (builder-categories.md).
// variant: one extra report in the Chromium/v1 cell that differs from the
// standard report only in the variant (data value or call path).

const inventory = (n) =>
  JSON.stringify({ data: { items: Array.from({ length: n }, (_, i) => ({ sku: `sku-${1000 + i}`, onHand: (i * 7) % 23, warehouse: 'LDS-1' })) } });

export const BROWSER_INCIDENTS = [
  { id: 'A1', route: '/cart/coupon', origin: ['U', 'B'], defect: 'Click handler reads a property of undefined (coupon on an empty cart)', hard: 'baseline' },
  { id: 'A2', route: '/promotions/spring', origin: ['D', 'B'], defect: 'ReferenceError inside a lazy-loaded chunk', hard: 'the chunk file name changes per build' },
  { id: 'A3', route: '/cart/edit', origin: ['D', 'B'], defect: "Cart reducer throws new Error('Invalid cart state')", hard: 'same message as A4' },
  { id: 'A4', route: '/checkout/review', origin: ['D', 'B'], defect: 'Checkout validator throws the same message', hard: 'hard negative with A3: same message, different site' },
  { id: 'A5', route: '/catalog/categories', origin: ['D', 'B'], defect: 'Unbounded recursion in the category tree', hard: 'engine-specific recursion messages, long repetitive stacks' },
  {
    id: 'A6', route: '/cart/restore', origin: ['D', 'B'], defect: 'JSON.parse of a corrupt localStorage value', hard: 'message embeds the bad value; wording differs per engine',
    data: { localStorage: { 'shop:cart': 'sku-1x2|sku-4x1' } },
    variant: { type: 'data', localStorage: { 'shop:cart': 'sku-9x3' } },
  },
  {
    id: 'A7', route: '/products/lookup', origin: ['D', 'B'], defect: 'throw new Error(`Product ${id} not found`)', hard: 'ID in the message',
    data: { fixture: { productId: 'p-1042' } },
    variant: { type: 'data', fixture: { productId: 'p-2177' } },
  },
  { id: 'A8a', route: '/catalog/drafts', origin: ['U', 'B'], defect: 'formatPrice(undefined) from ProductCard (draft products have no price)', hard: 'hard negative with A8b' },
  { id: 'A8b', route: '/wishlist', origin: ['U', 'B'], defect: 'formatPrice(undefined) from WishlistRow (stale cache shape)', hard: 'identical message and top frame as A8a' },
  {
    id: 'A9', route: '/share', origin: ['D', 'B'], defect: 'slugify mishandles emoji, reached from ProductPage or SearchResults', hard: 'same bug, different frames below the top',
    variant: { type: 'callpath', selector: '#go-alt' },
  },
  { id: 'B1', route: '/products/reviews', origin: ['U'], defect: 'Render TypeError in ProductReviews, caught by an error boundary', hard: 'React component stack via captureError' },
  { id: 'B2', route: '/account/orders', origin: ['U', 'D', 'B'], defect: '"Objects are not valid as a React child" in OrderHistory (boundary)', hard: 'production React error #31 with decoder URL and args' },
  { id: 'B3', route: '/account/profile', origin: ['U', 'D', 'B'], defect: 'The same invariant in ProfileBadge (boundary)', hard: 'hard negative with B2: top frames inside react-dom' },
  { id: 'B4', route: '/catalog/filters', origin: ['U', 'D', 'B'], defect: 'Conditional hook ("Rendered more hooks") in Filters, no boundary', hard: 'React error via the uncaught-error path' },
  { id: 'C1', route: '/checkout/place-order', origin: ['U', 'B'], defect: 'axios POST /api/orders -> 500', hard: 'top frames are axios internals' },
  { id: 'C2', route: '/home/recommendations', origin: ['U', 'B'], defect: 'axios GET /api/recommendations -> 500 from a different component', hard: 'hard negative with C1' },
  {
    id: 'C3', route: '/products/detail', origin: ['U', 'D', 'B'], defect: 'axios GET /api/products/:id -> 404 for deleted products', hard: 'different IDs in the route',
    data: { fixture: { productId: 'p-3310' } },
    variant: { type: 'data', fixture: { productId: 'p-5521' } },
  },
  { id: 'C4', route: '/blog/brewing-guide', origin: ['U', 'D', 'B'], defect: 'fetch to the analytics endpoint fails at the network level', hard: 'engine-specific network error messages' },
  { id: 'C5', route: '/sell/upload-photo', origin: ['U', 'D', 'B'], defect: 'fetch to the image-upload endpoint fails the same way', hard: 'hard negative with C4' },
  { id: 'C6', route: '/account/order-history', origin: ['D', 'B'], defect: 'res.json() on an HTML error page', hard: 'messages differ completely per engine' },
  { id: 'D1', route: '/cart/refresh', origin: ['U', 'B'], defect: 'Unhandled rejection: Error thrown inside async loadCart', hard: 'async frames' },
  { id: 'D2', route: '/products/stock', origin: ['D', 'B'], defect: "Unhandled rejection with the string reason 'timeout'", hard: 'no stack' },
  { id: 'D3', route: '/reviews/draft', origin: ['D', 'B'], defect: "Unhandled rejection with the string reason 'quota exceeded' elsewhere", hard: 'hard negative with D2' },
  { id: 'D4', route: '/account/security', origin: ['D', 'B'], defect: "Unhandled rejection with a plain object reason { code: 'E_AUTH' }", hard: 'not an Error at all' },
  { id: 'D5', route: '/account/session', origin: ['D', 'B'], defect: 'Error thrown in a setTimeout callback', hard: 'short stack cut at the timer boundary' },
  { id: 'E1', route: '/products/reviews-widget', origin: ['D', 'B'], defect: 'Error in a cross-origin script served without CORS', hard: 'Script error., no stack' },
  { id: 'E2', route: '/support/chat', origin: ['D', 'B'], defect: 'A different error in another cross-origin script', hard: 'hard negative with E1; likely byte-identical' },

  // Builder incidents (CATEGORIES.md, origin B).
  {
    id: 'G1', route: '/checkout/pay', origin: ['B'], defect: 'Order-limit check compares cents with euros; message embeds a locale-formatted total', hard: 'locale changes the formatted value in the message',
    variant: { type: 'data', locale: 'de-DE' },
  },
  {
    id: 'G2', route: '/cart/shipping', origin: ['B'], defect: 'Cached shipping quote has no shipping block; quote.shipping.zone', hard: 'value is sometimes undefined, sometimes null',
    data: { localStorage: { 'shop:quote': '{"total":1290}' } },
    variant: { type: 'data', localStorage: { 'shop:quote': '{"total":1290,"shipping":null}' } },
  },
  { id: 'G3', route: '/checkout/confirm', origin: ['B'], defect: 'Fallback tracker stub lacks trackPurchase(): "x is not a function"', hard: 'message embeds a local variable name the minifier renames' },
  {
    id: 'G4', route: '/compare', origin: ['B'], defect: 'Shared describeItem() assumes a meta block; installed on Product and Bundle', hard: 'receiver type changes the frame name',
    variant: { type: 'callpath', selector: '#go-alt' },
  },
  {
    id: 'G5', route: '/giftcards', origin: ['B'], defect: 'parseGiftCard does not trim or upper-case codes', hard: 'same defect reached synchronously (uncaught) or from an async function (unhandled rejection)',
    variant: { type: 'callpath', selector: '#go-alt' },
  },
  { id: 'G6', route: '/account/address', origin: ['B'], defect: 'normalizeAddress reads form.country.code; wrapped by withRetry', hard: "hard negative with G7: shared wrapper rethrows 'Operation failed after retries' with a cause" },
  { id: 'G7', route: '/checkout/tax', origin: ['B'], defect: 'taxRate() undefined for unconfigured regions; wrapped by withRetry', hard: 'hard negative with G6' },
  {
    id: 'G8', route: '/community/thread', origin: ['B'], defect: 'flattenThread reads author.name of a deleted comment', hard: 'recursion depth changes which frames survive stack truncation',
    data: { fixture: { depth: 3 } },
    variant: { type: 'data', fixture: { depth: 14 } },
  },
  {
    id: 'G9', route: '/inventory/snapshot', origin: ['B'], defect: 'Inventory response shape changed; whole payload embedded in the message', hard: 'very long, data-dependent message length',
    data: { localStorage: { 'shop:inventory': inventory(3) } },
    variant: { type: 'data', localStorage: { 'shop:inventory': inventory(150) } },
  },
  {
    id: 'G10', route: '/recently-viewed/12', origin: ['B'], defect: 'Legacy inline <script> in index.html reads a removed config block', hard: 'inline-script frames carry the page URL, which embeds the product id',
    variant: { type: 'data', route: '/recently-viewed/97' },
  },
  { id: 'G11', route: '/promotions/gold', origin: ['B'], defect: 'CMS promotion rule compiled with new Function assumes a signed-in customer', hard: 'eval/Function frames' },
  { id: 'G12', route: '/cart/pricing', origin: ['B'], defect: 'Pricing plugin loaded from a blob: URL mishandles lines without a discount', hard: 'blob: URL with a random UUID per page load' },
  {
    id: 'G13', route: '/settings/language', origin: ['B'], defect: 'Dynamic import of a missing locale bundle, no fallback', hard: 'module URL in the message; per-engine wording',
    data: { fixture: { lang: 'pt-BR' } },
    variant: { type: 'data', fixture: { lang: 'sv-SE' } },
  },
  { id: 'G14', route: '/checkout/card', origin: ['B'], defect: 'Parent passes the card number as a number to a same-origin iframe function that throws TypeError', hard: 'error object from another realm' },
  {
    id: 'G15', route: '/wishlist/sync', origin: ['B'], defect: 'Wishlist sync rejects items without sku; retry layer appends the attempt count to the message', hard: 'message mutated after creation',
    data: { fixture: { attempts: 3 } },
    variant: { type: 'data', fixture: { attempts: 5 } },
  },
  { id: 'G16', route: '/checkout/summary', origin: ['B'], defect: 'recalculateSummary throws new Error() with no message', hard: 'hard negative with G17: empty messages' },
  { id: 'G17', route: '/account/address-form', origin: ['B'], defect: 'submitAddressForm throws new Error() with no message', hard: 'hard negative with G16' },
  { id: 'G18', route: '/cart/quantity', origin: ['B'], defect: "Quantity picker throws the bare string 'Invalid quantity' synchronously", hard: 'non-Error thrown through the uncaught path' },
  { id: 'G19', route: '/orders/invoice-label', origin: ['B'], defect: 'buildShippingLabel: guest orders have no billing address', hard: 'hard negative with G20: same function, same V8 message, different line' },
  { id: 'G20', route: '/orders/pickup-label', origin: ['B'], defect: 'buildShippingLabel: pickup orders have no shipping address', hard: 'hard negative with G19' },
  { id: 'G21', route: '/checkout/start', origin: ['B'], defect: 'startCheckout throws a shared, pre-constructed PAYMENTS_NOT_READY error', hard: 'hard negative with G22: stack captured at module load, identical' },
  { id: 'G22', route: '/account/payment-methods', origin: ['B'], defect: 'savePaymentMethod throws the same pre-constructed error', hard: 'hard negative with G21' },
  { id: 'G23', route: '/home/banner', origin: ['B'], defect: 'Banner resizes itself inside its ResizeObserver callback', hard: 'browser-generated error with no error object' },
  { id: 'G24', route: '/cart/member-discount', origin: ['B'], defect: 'WebAssembly apply_discount traps (unreachable)', hard: 'hard negative with G25: wasm traps, numbered frames' },
  { id: 'G25', route: '/checkout/tax-estimate', origin: ['B'], defect: 'WebAssembly compute_tax traps (unreachable)', hard: 'hard negative with G24' },
  { id: 'G26', route: '/checkout/contact', origin: ['B'], defect: 'normalizePhone(undefined) in checkout/phone.js', hard: 'hard negative with G27: copy-pasted function, same name and message' },
  { id: 'G27', route: '/account/phone', origin: ['B'], defect: 'normalizePhone(undefined) in account/phone.js (copy)', hard: 'hard negative with G26' },
  { id: 'G28', route: '/cart/reserve', origin: ['B'], defect: 'Cart page reserves inventory before the cart loads (empty list); server stack embedded in the message', hard: 'hard negative with G29: multi-line message with stack-like server frames, shared helper' },
  { id: 'G29', route: '/checkout/reserve', origin: ['B'], defect: 'Checkout in-stock filter inverted (empty list); same server failure', hard: 'hard negative with G28' },
  { id: 'G30', route: '/catalog/saved-filters', origin: ['B'], defect: 'deepClone recurses forever on a back-reference', hard: 'hard negative with A5: both stack overflows' },
];

export const HARD_NEGATIVE_PAIRS = [
  ['A3', 'A4', 'D'], ['A8a', 'A8b', 'D'], ['B2', 'B3', 'D'], ['C1', 'C2', 'D'], ['C4', 'C5', 'D'], ['D2', 'D3', 'D'], ['E1', 'E2', 'D'],
  ['G6', 'G7', 'B'], ['G16', 'G17', 'B'], ['G19', 'G20', 'B'], ['G21', 'G22', 'B'], ['G24', 'G25', 'B'], ['G26', 'G27', 'B'], ['G28', 'G29', 'B'], ['A5', 'G30', 'B'],
];

// Section 4 (not graded).
export const NODE_INCIDENTS = [
  { id: 'F1', origin: ['U'], defect: 'POST /orders reads req.body.customer.id with no customer', hard: 'sync throw through Express router frames', request: { method: 'POST', path: '/orders?src=web', body: { items: [] } } },
  { id: 'F2', origin: ['U'], defect: "Async route handler rejects; Express 4 doesn't catch it", hard: 'process-level unhandledRejection', request: { method: 'GET', path: '/reports/daily' } },
  {
    id: 'F3', origin: ['U', 'D'], defect: 'Mongoose CastError for an invalid ObjectId', hard: 'message embeds the bad value', request: { method: 'GET', path: '/orders/abc123' },
    variant: { type: 'data', request: { method: 'GET', path: '/orders/order-77' } },
  },
  { id: 'F4', origin: ['U'], defect: 'Auth middleware reads req.user.id with no user', hard: 'hard negative with F1: same message', request: { method: 'GET', path: '/account' } },
  { id: 'F5', origin: ['U'], defect: 'axios to the payment provider -> 502', hard: "top frames are axios's Node adapter", request: { method: 'POST', path: '/checkout/pay', body: { amount: 1200 } } },
  { id: 'F6', origin: ['U', 'D'], defect: 'Node fetch to the inventory service -> fetch failed (ECONNREFUSED)', hard: 'undici internal frames shift with the Node version', request: { method: 'GET', path: '/inventory/sku-1' } },
  { id: 'F7', origin: ['U', 'D'], defect: 'Node fetch to the email service -> fetch failed', hard: 'hard negative with F6', request: { method: 'POST', path: '/notifications/email', body: { to: 'a@example.com' } } },
  {
    id: 'F8', origin: ['U', 'D'], defect: 'parseMoney itself is wrong, reached from two routes', hard: 'call-path variant', request: { method: 'POST', path: '/cart/total', body: { amount: '12' } },
    variant: { type: 'callpath', request: { method: 'POST', path: '/refunds', body: { amount: '12' } } },
  },
];

export const NODE_HARD_NEGATIVE_PAIRS = [['F1', 'F4', 'D'], ['F6', 'F7', 'D']];

export const BROWSERS = ['chromium', 'firefox', 'webkit'];
export const APP_VERSIONS = ['v1', 'v2'];
export const BROWSER_ENVS = ['browser-prod', 'browser-dev'];
export const NODE_ENVS = ['node-plain', 'node-mapped'];
export const NODE_VERSIONS = ['22', '24'];

// Every planned browser trigger for one environment, in capture order.
export function browserPlan(env) {
  const out = [];
  for (const version of APP_VERSIONS)
    for (const browser of BROWSERS)
      for (const inc of BROWSER_INCIDENTS) {
        out.push({ env, version, browser, incident: inc.id, variant: 'standard', route: inc.route, selector: '#go', data: inc.data || {}, locale: 'en-US' });
        if (inc.variant && version === 'v1' && browser === 'chromium') {
          const v = inc.variant;
          out.push({
            env, version, browser, incident: inc.id, variant: v.type,
            route: v.route || inc.route,
            selector: v.selector || '#go',
            data: { fixture: { ...(inc.data?.fixture || {}), ...(v.fixture || {}) }, localStorage: { ...(inc.data?.localStorage || {}), ...(v.localStorage || {}) } },
            locale: v.locale || 'en-US',
          });
        }
      }
  return out;
}

export function nodePlan(env) {
  const out = [];
  for (const version of APP_VERSIONS)
    for (const node of NODE_VERSIONS)
      for (const inc of NODE_INCIDENTS) {
        out.push({ env, version, node, incident: inc.id, variant: 'standard', request: inc.request });
        if (inc.variant && version === 'v1' && node === '24') out.push({ env, version, node, incident: inc.id, variant: inc.variant.type, request: inc.variant.request });
      }
  return out;
}
