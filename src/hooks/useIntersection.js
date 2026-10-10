import { useEffect, useRef, useState } from 'react';

/**
 * Intersection Observer hook for lazy animations and visibility tracking.
 * Uses GPU-friendly threshold to avoid excessive callbacks.
 *
 * @param {Object} options - IntersectionObserver options
 * @param {boolean} options.once - If true, unobserves after first intersection
 * @param {number} options.threshold - Visibility threshold (0-1)
 * @param {string} options.rootMargin - Root margin string
 * @returns {[React.RefObject, boolean]} ref and isIntersecting state
 */
export function useIntersection({
  once = true,
  threshold = 0.1,
  rootMargin = '-50px',
} = {}) {
  const ref = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (once) observer.unobserve(element);
        } else if (!once) {
          setIsIntersecting(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once, threshold, rootMargin]);

  return [ref, isIntersecting];
}
