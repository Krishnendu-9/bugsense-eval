// Races a promise against a timer.
export function withTimeout(promise, ms) {
  // D2: rejects with a bare string, and callers never attach a handler.
  const timer = new Promise((_, reject) => setTimeout(() => reject('timeout'), ms));
  return Promise.race([promise, timer]);
}
