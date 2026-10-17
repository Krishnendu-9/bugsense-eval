import axios from 'axios';

// Loads one product from the API.
export async function fetchProduct(id) {
  // C3: deleted products return 404 and nothing handles it.
  const res = await axios.get(`/api/products/${id}`);
  return res.data;
}
