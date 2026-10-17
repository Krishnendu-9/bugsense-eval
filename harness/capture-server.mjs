// Capture server: stands in for the BugSense API as the SDK's data-api-url.
// It records every request verbatim (method, path, headers, raw body bytes)
// and forwards nothing anywhere. It answers CORS preflights so the browser
// lets the SDK's request through.
import http from 'node:http';

export function startCaptureServer({ port = 7102, host = '0.0.0.0' } = {}) {
  const records = [];
  let seq = 0;
  const server = http.createServer((req, res) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => {
      const body = Buffer.concat(chunks);
      records.push({
        seq: ++seq,
        receivedAt: new Date().toISOString(),
        receivedMs: Date.now(),
        method: req.method,
        url: req.url,
        headers: req.headers,
        bodyBase64: body.toString('base64'),
      });
      const origin = req.headers.origin;
      const cors = {
        'Access-Control-Allow-Origin': origin || '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
        'Access-Control-Allow-Headers': req.headers['access-control-request-headers'] || '*',
        'Access-Control-Max-Age': '0',
        Vary: 'Origin',
      };
      if (req.method === 'OPTIONS') {
        res.writeHead(204, cors);
        res.end();
        return;
      }
      res.writeHead(200, { ...cors, 'Content-Type': 'application/json' });
      res.end('{"success":true}');
    });
  });
  return new Promise((resolve) => {
    server.listen(port, host, () =>
      resolve({
        server,
        records,
        since: (n) => records.filter((r) => r.seq > n),
        get lastSeq() {
          return seq;
        },
        close: () => new Promise((r) => server.close(r)),
      }),
    );
  });
}

export function bodyText(record) {
  return Buffer.from(record.bodyBase64, 'base64').toString('utf8');
}
