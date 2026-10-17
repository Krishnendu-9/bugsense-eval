// Parses "12.50" into cents.
export function parseMoney(input: string): number {
  const [whole, fraction] = input.split('.');
  // F8: amounts without a decimal part have no fraction.
  return Number(whole) * 100 + Number(fraction.padEnd(2, '0'));
}
