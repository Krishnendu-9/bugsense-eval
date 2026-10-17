// Promotion rules are authored in the CMS as expressions and compiled at runtime.
const GOLD_RULE = 'return cart.total >= 100 && cart.customer.tier === "gold";';

export function compileRule(source) {
  return new Function('cart', source);
}

export function isEligible(cart) {
  // G11: the rule assumes a signed-in customer; guest carts have none.
  return compileRule(GOLD_RULE)(cart);
}
