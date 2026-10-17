// Builds the shipping label for an order.
export function buildShippingLabel(order) {
  // G19: guest orders have no billing address.
  const fromZip = order.billing.address.zip;
  // G20: store-pickup orders have no shipping address.
  const toZip = order.shipping.address.zip;
  return { fromZip, toZip };
}
