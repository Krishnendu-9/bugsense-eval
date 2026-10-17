import { kernelComputeTax } from '../pricing/wasm.js';

// Tax estimate on the checkout page.
export function estimateTax(cart) {
  // G25: the kernel's tax routine traps on totals above 5.00.
  return kernelComputeTax(cart.totalCents);
}
