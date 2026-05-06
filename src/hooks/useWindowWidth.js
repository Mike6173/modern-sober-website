import { useState, useEffect } from 'react';

// Single shared resize listener so all consumers update in one React batch.
const handlers = new Set();
let rafId = null;

if (typeof window !== 'undefined') {
  window.addEventListener('resize', () => {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      const w = window.innerWidth;
      handlers.forEach(fn => fn(w));
    });
  });
}

export function useWindowWidth() {
  const [w, setW] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1280
  );
  useEffect(() => {
    handlers.add(setW);
    return () => handlers.delete(setW);
  }, []);
  return w;
}
