import { useEffect, useRef } from 'react';

// Banner that sizes itself to its content.
export function AutoHeightBanner() {
  const ref = useRef(null);
  useEffect(() => {
    // G23: resizing the observed element inside its own observer callback.
    const observer = new ResizeObserver(([entry]) => {
      ref.current.style.height = `${entry.contentRect.height + 10}px`;
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref}>Free shipping this week</div>;
}
