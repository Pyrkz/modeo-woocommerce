// Custom hook for reduced motion preferences with performance optimizations
'use client';

import { useMemo, useState, useEffect } from 'react';
import { GALLERY_CONFIG } from '../config/gallery-data';

// Custom implementation of useReducedMotion without framer-motion dependency
const useReducedMotion = () => {
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
  
  return prefersReducedMotion;
};

export const useOptimizedReducedMotion = () => {
  const prefersReducedMotion = useReducedMotion();
  
  return useMemo(() => ({
    shouldAnimate: !prefersReducedMotion,
    transitionDuration: prefersReducedMotion ? 0 : GALLERY_CONFIG.TRANSITION_DURATION,
    slideTransition: prefersReducedMotion ? 0 : GALLERY_CONFIG.SLIDE_TRANSITION,
    staggerDelay: prefersReducedMotion ? 0 : GALLERY_CONFIG.STAGGER_DELAY
  }), [prefersReducedMotion]);
};