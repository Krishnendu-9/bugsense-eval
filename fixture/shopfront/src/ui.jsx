import { useEffect } from 'react';

// Per-run data the harness injects with an init script (a stand-in for the
// data a particular user happens to have). Never part of a report.
export function fixtureData() {
  return window.__FIXTURE__ || {};
}

export function markReady() {
  document.body.dataset.ready = '1';
}

export function useReady(enabled = true) {
  useEffect(() => {
    if (enabled) markReady();
  }, [enabled]);
}

export function Page({ title, children }) {
  return (
    <main>
      <h1>{title}</h1>
      {children}
    </main>
  );
}

export function Go({ id = 'go', onClick, children }) {
  return (
    <button id={id} type="button" onClick={onClick}>
      {children}
    </button>
  );
}
