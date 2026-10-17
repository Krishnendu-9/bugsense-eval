// Fires one planned trigger in a fresh browser context and returns every
// request the SDK sent to the capture server while it ran, plus what the page
// itself observed (so a run with no report can be told apart from a trigger
// that never raised).
import crypto from 'node:crypto';

const FIRST_REPORT_TIMEOUT_MS = 8000;
const SETTLE_MS = 2500;
const AFTER_CLOSE_MS = 600;
export const MARKER_PATH = '/__harness_marker';

// probes: optional { beforeClick(), afterError() } async functions returning
// plain objects (endpoint reachability), and evidence: optional
// { requestFailed: url } | { response: { path, status } } for triggers whose
// failure happens inside the browser's network stack.
export async function runTrigger(browser, cap, origin, t, { probes = null, evidence = null } = {}) {
  const pageSessionId = crypto.randomUUID();
  const context = await browser.newContext({ locale: t.locale || 'en-US' });
  const data = t.data || {};
  // Registered before any page script (and so before the SDK): records every
  // error and unhandledrejection event the page dispatches.
  await context.addInitScript((d) => {
    if (window !== window.top) return;
    window.__FIXTURE__ = d.fixture || {};
    for (const [k, v] of Object.entries(d.localStorage || {})) localStorage.setItem(k, v);
    window.__observed = [];
    const msg = (x) => { try { return String(x && x.message !== undefined ? x.message : x).slice(0, 300); } catch { return '<unprintable>'; } };
    window.addEventListener('error', (e) => window.__observed.push({ type: 'error', t: Date.now(), message: msg(e.message || e.error) }), true);
    window.addEventListener('unhandledrejection', (e) => window.__observed.push({ type: 'unhandledrejection', t: Date.now(), message: msg(e.reason) }));
  }, data);
  const page = await context.newPage();
  const pageErrors = [];
  const requestFailures = [];
  const responses = [];
  page.on('pageerror', (e) => pageErrors.push({ t: Date.now(), message: String(e && e.message).slice(0, 300) }));
  page.on('requestfailed', (r) => requestFailures.push({ t: Date.now(), url: r.url(), failure: r.failure() ? r.failure().errorText : null }));
  page.on('response', (r) => { if (evidence && evidence.response && r.url().endsWith(evidence.response.path)) responses.push({ t: Date.now(), url: r.url(), status: r.status(), contentType: r.headers()['content-type'] || null }); });

  const startSeq = cap.lastSeq;
  let clickedSeq = null;
  let clickedAt = null;
  let harnessError = null;
  let reachability = null;
  let observed = [];
  try {
    await page.goto(origin + t.route, { waitUntil: 'load', timeout: 30000 });
    await page.waitForFunction(() => document.body && document.body.dataset.ready === '1', null, { timeout: 15000 });
    if (probes) reachability = { beforeClick: await probes.beforeClick() };
    clickedSeq = cap.lastSeq;
    clickedAt = Date.now();
    await page.click(t.selector || '#go', { timeout: 10000, noWaitAfter: true });
    const raisedInBrowser = () => {
      if (evidence && evidence.requestFailed) return requestFailures.some((f) => f.url.startsWith(evidence.requestFailed));
      if (evidence && evidence.response) return responses.some((r) => r.status === evidence.response.status);
      return false;
    };
    const deadline = Date.now() + FIRST_REPORT_TIMEOUT_MS;
    let afterDone = false;
    while (Date.now() < deadline && !cap.since(startSeq).some((r) => r.method === 'POST' && !r.url.startsWith(MARKER_PATH))) {
      if (probes && !afterDone && raisedInBrowser()) { reachability.afterError = await probes.afterError(); afterDone = true; }
      await page.waitForTimeout(100);
    }
    if (probes && !afterDone && raisedInBrowser()) { reachability.afterError = await probes.afterError(); afterDone = true; }
    await page.waitForTimeout(SETTLE_MS);
    if (probes && !afterDone) reachability.afterError = { note: 'no browser-side failure observed; probed at end of wait', ...(await probes.afterError()) };
    observed = await page.evaluate(() => window.__observed || []);
  } catch (e) {
    harnessError = String(e.message || e).split('\n')[0];
  }
  await context.close();
  const endedAt = Date.now();
  await new Promise((r) => setTimeout(r, AFTER_CLOSE_MS));
  const records = cap.since(startSeq).filter((r) => !r.url.startsWith(MARKER_PATH));
  const posts = records.filter((r) => r.method === 'POST');
  const beforeClick = clickedSeq === null ? posts.length : posts.filter((r) => r.seq <= clickedSeq).length;
  const afterClick = (x) => clickedAt !== null && x.t >= clickedAt;
  const raised = {
    errorEvents: observed.filter((o) => o.type === 'error' && afterClick(o)),
    rejectionEvents: observed.filter((o) => o.type === 'unhandledrejection' && afterClick(o)),
    pageErrors: pageErrors.filter(afterClick),
    requestFailures: requestFailures.filter(afterClick),
    responses: responses.filter(afterClick),
  };
  const triggerRaised = evidence
    ? (evidence.requestFailed ? raised.requestFailures.some((f) => f.url.startsWith(evidence.requestFailed)) : raised.responses.some((r) => r.status === evidence.response.status))
    : raised.errorEvents.length + raised.rejectionEvents.length + raised.pageErrors.length > 0;
  let outcome;
  if (harnessError) outcome = 'harness_error';
  else if (beforeClick > 0) outcome = 'report_before_click';
  else if (posts.length === 1) outcome = 'ok';
  else if (posts.length > 1) outcome = 'multiple_reports';
  else if (!triggerRaised) outcome = 'trigger_failed';
  else outcome = 'zero_reports';
  return {
    pageSessionId, outcome, posts, records, beforeClick, failure: harnessError,
    postsReceived: posts.length, requestsReceived: records.length,
    triggerRaised, raised, reachability, clickedAt, endedAt,
    pageErrors: pageErrors.map((p) => p.message),
  };
}
