'use client';

import { useEffect, useState, useRef, RefObject } from 'react';

export interface ViewportAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useViewportAnimation = (
  options: ViewportAnimationOptions = {}
): [RefObject<HTMLDivElement | null>, boolean] => {
  const { 
    threshold = 0.1, 
    rootMargin = '0px', 
    triggerOnce = true 
  } = options;
  
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [elementRef, isVisible];
};