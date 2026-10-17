// Makes sure the user has a valid session before account actions.
export function ensureSession(token) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // D4: the expiry check is inverted, and the rejection is a plain object.
      if (token.expiresAt > Date.now()) reject({ code: 'E_AUTH' });
      else resolve(token);
    }, 10);
  });
}
