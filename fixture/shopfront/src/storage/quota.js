// Saves a review draft if it fits the storage budget.
const BUDGET_KB = 50;

export function saveDraft(draft) {
  return new Promise((resolve, reject) => {
    const size = JSON.stringify(draft).length;
    // D3: compares bytes with kilobytes, so every draft is "too large".
    if (size > BUDGET_KB) reject('quota exceeded');
    else resolve(size);
  });
}
