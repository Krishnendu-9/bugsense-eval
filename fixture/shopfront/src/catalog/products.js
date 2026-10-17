// In-memory catalogue lookup.
const CATALOG = {
  'p-1001': { id: 'p-1001', name: 'Kettle', price: 39 },
  'p-1002': { id: 'p-1002', name: 'Teapot', price: 24 },
};

export function findProduct(id) {
  const product = CATALOG[id];
  // A7: callers pass ids from a stale "recently viewed" list.
  if (!product) throw new Error(`Product ${id} not found`);
  return product;
}
