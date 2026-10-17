// Payment provider state, shared by checkout and account pages.
export const PAYMENTS_NOT_READY = new Error('Payments SDK not ready');

let ready = false;

export function paymentsReady() {
  return ready;
}

export function initPayments() {
  ready = true;
}
