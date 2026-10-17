// Restores the cart saved by a previous visit.
export function loadSavedCart() {
  const raw = localStorage.getItem('shop:cart');
  // A6: the old storefront saved carts in a non-JSON format.
  return raw ? JSON.parse(raw) : { lines: [] };
}
