// Address form submission.
export function submitAddressForm(form) {
  // G17: the postcode field is hidden for some countries but still required here.
  if (!form.postcode) throw new Error();
  return form;
}
