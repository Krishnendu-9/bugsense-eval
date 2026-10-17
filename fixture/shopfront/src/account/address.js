import { withRetry } from '../utils/withRetry.js';

function normalizeAddress(form) {
  // G6: the country picker is optional, but its code is read unconditionally.
  return { ...form, country: form.country.code.toUpperCase() };
}

export function saveAddress(form) {
  return withRetry(() => normalizeAddress(form));
}
