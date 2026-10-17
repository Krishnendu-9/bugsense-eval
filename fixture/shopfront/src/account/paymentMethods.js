import { PAYMENTS_NOT_READY, paymentsReady } from '../payments/state.js';

// Saves a card on the account page.
export function savePaymentMethod() {
  // G22: the account page never initialises the payment provider.
  if (!paymentsReady()) throw PAYMENTS_NOT_READY;
  return 'saved';
}
