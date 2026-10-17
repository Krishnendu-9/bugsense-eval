// Reads the cached shipping quote.
export function shippingZone() {
  const quote = JSON.parse(localStorage.getItem('shop:quote') || '{}');
  // G2: quotes for collection orders have no shipping block (absent or null).
  return quote.shipping.zone;
}
