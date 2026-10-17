// Analytics tracker with a no-op fallback when the vendor script is blocked.
export function getTracker() {
  // G3: the fallback stub only implements track(), not trackPurchase().
  return window.shopAnalytics || { track() {} };
}
