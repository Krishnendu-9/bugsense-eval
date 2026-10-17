// Checkout validation before the payment step.
export function validateCheckout(cart) {
  const currencies = new Set(cart.lines.map((line) => line.currency));
  // A4: mixed-currency carts are legitimate since multi-currency pricing shipped.
  if (currencies.size !== 1) throw new Error('Invalid cart state');
  return true;
}
