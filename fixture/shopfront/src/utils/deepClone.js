// Generic deep clone used for saved filters.
export function deepClone(value) {
  if (value === null || typeof value !== 'object') return value;
  const out = Array.isArray(value) ? [] : {};
  // G30: no cycle detection; saved filters keep a back-reference to their group.
  for (const key of Object.keys(value)) out[key] = deepClone(value[key]);
  return out;
}
