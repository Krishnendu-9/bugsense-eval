// Fires one planned trigger in a fresh browser context and returns every
// request the SDK sent to the capture server while it ran.

const FIRST_REPORT_TIMEOUT_MS = 8000;
const SETTLE_MS = 2500;
const AFTER_CLOSE_MS = 600;

export async function runTrigger(browser, cap, origin, t) {
  const context = await browser.newContext({ locale: t.locale || 'en-US' });
  const data = t.data || {};
  await context.addInitScript((d) => {
    if (window !== window.top) return;
    window.__FIXTURE__ = d.fixture || {};
    for (const [k, v] of Object.entries(d.localStorage || {})) localStorage.setItem(k, v);
  }, data);
  const page = await context.newPage();
  const pageErrors = [];
  page.on('pageerror', (e) => pageErrors.push(String(e && e.message).slice(0, 200)));
  const startSeq = cap.lastSeq;
  let clickedSeq = null;
  let failure = null;
  try {
    await page.goto(origin + t.route, { waitUntil: 'load', timeout: 30000 });
    await page.waitForFunction(() => document.body && document.body.dataset.ready === '1', null, { timeout: 15000 });
    clickedSeq = cap.lastSeq;
    await page.click(t.selector || '#go', { timeout: 10000, noWaitAfter: true });
    const deadline = Date.now() + FIRST_REPORT_TIMEOUT_MS;
    while (Date.now() < deadline && !cap.since(startSeq).some((r) => r.method === 'POST')) await page.waitForTimeout(100);
    await page.waitForTimeout(SETTLE_MS);
  } catch (e) {
    failure = String(e.message || e).split('\n')[0];
  }
  await context.close();
  await new Promise((r) => setTimeout(r, AFTER_CLOSE_MS));
  const records = cap.since(startSeq);
  const posts = records.filter((r) => r.method === 'POST');
  const beforeClick = clickedSeq === null ? posts.length : posts.filter((r) => r.seq <= clickedSeq).length;
  return { posts, records, beforeClick, failure, pageErrors };
}
