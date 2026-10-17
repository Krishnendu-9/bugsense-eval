// Background session refresh.
export function scheduleRefresh(session) {
  setTimeout(function refreshSession() {
    // D5: guest sessions have no refresh token.
    if (!session.refreshToken) throw new Error('Session refresh failed: no refresh token');
  }, 20);
}
