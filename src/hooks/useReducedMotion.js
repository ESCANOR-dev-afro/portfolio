import { useEffect, useState } from 'react';

/**
 * Custom React hook detecting user preference for reduced motion.
 * Enables graceful degradation of complex animations and transitions.
 *
 * @returns {boolean} true if user has enabled prefers-reduced-motion
 */
export function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);

    const listener = (event) => {
      setPrefersReduced(event.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    } else {
      mediaQuery.addListener(listener);
      return () => mediaQuery.removeListener(listener);
    }
  }, []);

  return prefersReduced;
}

export default useReducedMotion;
