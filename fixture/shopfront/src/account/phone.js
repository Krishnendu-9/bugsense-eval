// Phone number clean-up for the account profile (copied from checkout).
export function normalizePhone(raw) {
  // G27: profiles imported from the old shop have no phone.
  return raw.replace(/[^\d+]/g, '');
}
