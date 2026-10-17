import { withRetry } from '../utils/withRetry.js';

const RATES = { 'DE-BE': 0.19, 'FR-IDF': 0.2 };

function taxRate(region) {
  return RATES[region];
}

export function computeTax(cart) {
  // G7: regions without a configured rate return undefined.
  return withRetry(() => taxRate(cart.region).toFixed(2));
}
