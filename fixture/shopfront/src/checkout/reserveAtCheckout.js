import { reserveInventory } from '../inventory/api.js';

// Reserves stock when the customer confirms the order.
export function reserveForCheckout(lines) {
  // G29: the in-stock filter is inverted, so every line is dropped.
  return reserveInventory(lines.filter((line) => !line.inStock));
}
