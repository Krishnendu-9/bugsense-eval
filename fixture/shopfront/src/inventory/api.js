// Inventory reservation client.
export async function reserveInventory(items) {
  const res = await fetch('/api/inventory/reserve', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items }),
  });
  if (!res.ok) {
    const body = await res.json();
    // The debug backend returns its own error and stack; both go into the message.
    throw new Error(`Inventory reservation failed: ${body.error}\n${body.stack}`);
  }
  return res.json();
}
