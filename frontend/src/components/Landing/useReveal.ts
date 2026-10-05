import {useEffect, useRef} from 'react';

/**
 * Marks an element with data-in="true" once it scrolls into view (once). The CSS does the rest, so the
 * animations stay on transform and opacity. `?reveal=all` (debug, screenshots) shows everything at once.
 */
export function useReveal<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.location.search.includes('reveal=all') || !('IntersectionObserver' in window)) {
      el.dataset.in = 'true';
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.in = 'true';
          io.disconnect();
        }
      },
      {threshold, rootMargin: '0px 0px -8% 0px'},
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return ref;
}
