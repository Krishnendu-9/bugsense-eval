// Loads a translation bundle on demand.
export async function loadLocale(lang) {
  // G13: no fallback when the bundle for the user's language does not exist.
  const mod = await import(/* @vite-ignore */ `/locales/${lang}.js`);
  return mod.default;
}
