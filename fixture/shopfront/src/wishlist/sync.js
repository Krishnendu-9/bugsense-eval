// Pushes the wishlist to the server, retrying a configurable number of times.
function pushWishlist(items) {
  // G15: items added from search results carry no sku.
  if (items.some((item) => !item.sku)) throw new Error('Wishlist sync rejected: item without sku');
  return items.length;
}

export function syncWishlist(items, maxAttempts) {
  let attempt = 0;
  for (;;) {
    attempt++;
    try {
      return pushWishlist(items);
    } catch (err) {
      if (attempt >= maxAttempts) {
        err.message += ` (after ${attempt} attempts)`;
        throw err;
      }
    }
  }
}
