import axios from 'axios';

// Submits the order to the API.
export async function placeOrder(cart) {
  // C1: the orders API returns 500 for carts with gift wrapping.
  const res = await axios.post('/api/orders', cart);
  return res.data;
}
