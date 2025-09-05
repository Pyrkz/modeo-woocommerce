// Native animation hooks without framer-motion dependency
'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { GALLERY_CONFIG } from '../config/gallery-data';

// Native reduced motion detection
export const useOptimizedReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return useMemo(() => ({
    shouldAnimate: !prefersReducedMotion,
    transitionDuration: prefersReducedMotion ? 0 : GALLERY_CONFIG.TRANSITION_DURATION,
    slideTransition: prefersReducedMotion ? 0 : GALLERY_CONFIG.SLIDE_TRANSITION,
    staggerDelay: prefersReducedMotion ? 0 : GALLERY_CONFIG.STAGGER_DELAY
  }), [prefersReducedMotion]);
};

// Native Intersection Observer hook
export const useViewportAnimation = (threshold = GALLERY_CONFIG.INTERSECTION_THRESHOLD) => {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
          // Once in view, disconnect for performance (one-time animation)
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin: GALLERY_CONFIG.INTERSECTION_MARGIN
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, isInView]);

  return { ref, isInView };
};

// Animation classes generator
export const useAnimationClasses = (
  isInView: boolean,
  shouldAnimate: boolean,
  delay = 0
) => {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      const timer = setTimeout(() => {
        setHasAnimated(true);
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [isInView, hasAnimated, delay]);

  return {
    isVisible: hasAnimated || !shouldAnimate,
    animationClass: shouldAnimate ? 'animate-fade-in-up' : '',
    style: shouldAnimate ? {
      opacity: hasAnimated ? 1 : 0,
      transform: hasAnimated ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity ${GALLERY_CONFIG.TRANSITION_DURATION}s ease-out ${delay}s, transform ${GALLERY_CONFIG.TRANSITION_DURATION}s ease-out ${delay}s`
    } : {}
  };
};