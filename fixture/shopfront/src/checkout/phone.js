// Phone number clean-up for the checkout contact step.
export function normalizePhone(raw) {
  // G26: the phone field is optional at checkout.
  return raw.replace(/[^\d+]/g, '');
}
