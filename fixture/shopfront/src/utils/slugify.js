// URL slug builder for share links.
const TRANSLIT = { 'é': 'e', 'è': 'e', 'ü': 'u', 'ö': 'o', 'ñ': 'n', 'ç': 'c', 'å': 'a' };

export function slugify(title) {
  let out = '';
  for (const ch of title.toLowerCase()) {
    if (ch.charCodeAt(0) < 128) out += /[a-z0-9]/.test(ch) ? ch : '-';
    // A9: assumes every non-ASCII character is an accented letter.
    else out += TRANSLIT[ch].replace(/[^a-z]/g, '');
  }
  return out.replace(/-+/g, '-');
}
