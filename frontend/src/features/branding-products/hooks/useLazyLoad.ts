import { useEffect, useRef, useState, useCallback } from 'react';
import { createIntersectionObserver } from '../utils/performance';

export const useLazyLoad = <T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef<T>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const cleanup = useCallback(() => {
    if (observerRef.current && targetRef.current) {
      observerRef.current.unobserve(targetRef.current);
    }
  }, []);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          // Once loaded, we can disconnect
          cleanup();
        }
      });
    };

    observerRef.current = createIntersectionObserver(callback, options);
    
    if (observerRef.current) {
      observerRef.current.observe(target);
    } else {
      // Fallback for browsers without IntersectionObserver
      setIsIntersecting(true);
    }

    return cleanup;
  }, [options, cleanup]);

  return { ref: targetRef, isIntersecting };
};