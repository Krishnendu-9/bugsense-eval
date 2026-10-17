// Order summary recalculation.
export function recalculateSummary(order) {
  // G16: orders restored from a draft have no totals yet.
  if (!order.totals) throw new Error();
  return order.totals.grand;
}
