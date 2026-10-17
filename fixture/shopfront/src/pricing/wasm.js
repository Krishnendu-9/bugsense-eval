// Pricing kernel compiled to WebAssembly.
let kernel = null;

export async function loadPricingKernel() {
  const bytes = await (await fetch('/pricing.wasm')).arrayBuffer();
  kernel = (await WebAssembly.instantiate(bytes)).instance;
}

export function kernelApplyDiscount(cents) {
  return kernel.exports.apply_discount(cents);
}

export function kernelComputeTax(cents) {
  return kernel.exports.compute_tax(cents);
}
