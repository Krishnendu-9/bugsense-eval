// Order value limit for card payments.
const ORDER_LIMIT_EUR = 5000;

export function assertWithinLimit(totalCents) {
  // G1: compares cents with euros, so ordinary orders hit the limit.
  if (totalCents > ORDER_LIMIT_EUR) {
    const shown = new Intl.NumberFormat(navigator.language, { style: 'currency', currency: 'EUR' }).format(totalCents / 100);
    throw new Error(`Order total ${shown} exceeds the limit`);
  }
}
