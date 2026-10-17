// Talks to the same-origin card entry frame.
export function validateCardInFrame(frame, cardNumber) {
  // G14: the card number is passed as a number; the frame expects a string.
  return frame.contentWindow.validateCardNumber(cardNumber);
}
