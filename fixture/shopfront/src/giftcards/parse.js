// Gift card code parsing.
export function parseGiftCard(code) {
  // G5: codes are not trimmed or upper-cased before matching.
  const digits = code.match(/^GC-(\d{8})$/)[1];
  return Number(digits);
}
