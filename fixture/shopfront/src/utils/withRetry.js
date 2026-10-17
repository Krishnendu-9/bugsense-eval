// Runs a task a few times before giving up.
export function withRetry(task, attempts = 3) {
  let lastError;
  for (let i = 0; i < attempts; i++) {
    try {
      return task();
    } catch (err) {
      lastError = err;
    }
  }
  throw new Error('Operation failed after retries', { cause: lastError });
}
