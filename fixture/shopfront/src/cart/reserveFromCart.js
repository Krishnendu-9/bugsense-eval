import { reserveInventory } from '../inventory/api.js';

// Reserves stock when the cart page opens.
export function reserveOnCartOpen(cartState) {
  // G28: runs before the cart has loaded, so it reserves an empty list.
  return reserveInventory(cartState.loaded ? cartState.items : []);
}
