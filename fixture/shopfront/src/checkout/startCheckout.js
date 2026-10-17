import { PAYMENTS_NOT_READY, paymentsReady } from '../payments/state.js';

// Starts checkout.
export function startCheckout() {
  // G21: checkout starts before the payment provider finished initialising.
  if (!paymentsReady()) throw PAYMENTS_NOT_READY;
  return 'started';
}
