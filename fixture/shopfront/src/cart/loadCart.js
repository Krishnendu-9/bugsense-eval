// Loads the server-side cart.
export async function loadCart() {
  const res = await fetch('/api/cart');
  const payload = await res.json();
  // D1: the API nests items under "cart" since v3 of the cart service.
  if (!Array.isArray(payload.items)) throw new Error('Cart payload has no items array');
  return payload.items;
}
