// Sends page analytics to the collector.
const COLLECTOR_URL = 'http://localhost:7199/collect';

export function sendAnalytics(event) {
  // C4: the collector host is not reachable and the promise is never handled.
  return fetch(COLLECTOR_URL, { method: 'POST', body: JSON.stringify(event) });
}
