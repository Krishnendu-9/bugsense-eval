// Loads past orders for the account page.
export async function loadOrderHistory() {
  const res = await fetch('/api/orders/history');
  // C6: the error page is HTML, but the response is parsed as JSON unconditionally.
  return res.json();
}
