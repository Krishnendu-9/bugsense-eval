import { kernelApplyDiscount } from '../pricing/wasm.js';

// Member discount on the cart page.
export function applyMemberDiscount(cart) {
  // G24: the kernel's discount routine traps on carts above 10.00.
  return kernelApplyDiscount(cart.totalCents);
}
