// Error reporter written for this evaluation (BugSense has no server SDK).
// It posts the JSON shape the browser SDK puts on the wire, filling the
// fields the SDK fills from an Error (title from the message, errorLog from
// the stack, the page path from the request path without its query) and
// leaving fields with no server equivalent empty.

const CAPTURE_URL = process.env.REPORT_URL || 'http://host.docker.internal:7102/api/telemetry/report';
const PROJECT = 'Fingerprint Eval';

type Channel = 'uncaught' | 'rejection';

function describeReason(reason: unknown): { message: string; stack: string } {
  if (reason instanceof Error) return { message: `${reason.name}: ${reason.message}`, stack: reason.stack || String(reason) };
  const text = typeof reason === 'string' ? reason : JSON.stringify(reason);
  return { message: text, stack: text };
}

export async function report(reason: unknown, channel: Channel, path: string | null): Promise<void> {
  const { message, stack } = describeReason(reason);
  const body = {
    title: channel === 'uncaught' ? `Uncaught ${message}` : `Unhandled Promise Rejection: ${reason instanceof Error ? reason.message : message}`,
    errorLog: stack,
    description: path ? `Auto-captured crash on ${path}` : '',
    severity: 'major',
    priority: 'high',
    project: PROJECT,
    breadcrumbs: [],
    browserInfo: { browser: '', version: '', os: '', screenSize: '', userAgent: '' },
  };
  try {
    await fetch(CAPTURE_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  } catch {
    // The reporter must never take the process down.
  }
}
