// Mock backend for the Shopfront fixture and the Node fixture's payment
// provider. Returns the deliberate 404/500/502 responses. Runs in a
// node:22-alpine container (see harness/services.mjs) on port 7103.
import http from 'node:http';

function json(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => {
      const text = Buffer.concat(chunks).toString('utf8');
      try {
        resolve(text ? JSON.parse(text) : {});
      } catch {
        resolve({});
      }
    });
  });
}

// Debug-mode handler with a real defect: it assumes at least one item.
function reserve(body) {
  const first = body.items[0];
  return { reserved: first.sku };
}

const ERROR_PAGE = `<!DOCTYPE html>
<html><head><title>500 Internal Server Error</title></head>
<body><h1>Internal Server Error</h1><p>The server encountered an unexpected condition.</p></body></html>`;

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://mock');
  const path = url.pathname;
  const body = await readBody(req);

  if (req.method === 'POST' && path === '/api/orders') return json(res, 500, { error: 'Internal Server Error' });
  if (req.method === 'GET' && path === '/api/recommendations') return json(res, 500, { error: 'Internal Server Error' });
  if (req.method === 'GET' && path.startsWith('/api/products/')) return json(res, 404, { error: 'Product not found' });
  if (req.method === 'GET' && path === '/api/orders/history') {
    res.writeHead(500, { 'Content-Type': 'text/html' });
    return res.end(ERROR_PAGE);
  }
  if (req.method === 'GET' && path === '/api/cart') return json(res, 200, { cart: { items: [{ sku: 'sku-1', qty: 1 }] } });
  if (req.method === 'POST' && path === '/api/inventory/reserve') {
    try {
      return json(res, 200, reserve(body));
    } catch (err) {
      return json(res, 500, { error: err.message, stack: err.stack });
    }
  }
  if (path === '/payments/charge') return json(res, 502, { error: 'Bad Gateway' });
  if (path === '/health') return json(res, 200, { ok: true });
  return json(res, 404, { error: 'Not found' });
});

server.listen(7103, '0.0.0.0', () => console.log('mock backend on 7103'));
