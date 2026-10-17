// Quantity picker handling.
export function setQuantity(line, value) {
  const qty = parseInt(value, 10);
  // G18: the empty "choose" option is submitted as a value, and a bare string is thrown.
  if (!(qty > 0)) throw 'Invalid quantity';
  return { ...line, qty };
}
