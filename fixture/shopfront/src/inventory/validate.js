// Validates the cached inventory snapshot.
export function readInventorySnapshot() {
  const payload = JSON.parse(localStorage.getItem('shop:inventory') || '{}');
  // G9: the inventory API moved items under "data"; the whole payload goes into the message.
  if (!Array.isArray(payload.items)) throw new Error('Unexpected inventory response: ' + JSON.stringify(payload));
  return payload.items;
}
