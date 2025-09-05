'use client';

import { useEffect, useState, useCallback } from 'react';

export interface ScrollEffects {
  scrollY: number;
  imageScale: number;
  imageOpacity: number;
  isVisible: boolean;
}

export const useScrollEffects = (): ScrollEffects => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const updateScrollValues = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    const currentScrollY = window.scrollY;
    setScrollY(currentScrollY);
    
    // Calculate viewport height for responsive calculations
    const viewportHeight = window.innerHeight;
    const scrollProgress = Math.min(currentScrollY / (viewportHeight * 2), 1);
    
    // Update visibility based on scroll position
    setIsVisible(scrollProgress < 0.9);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Set initial values
    updateScrollValues();

    // Add scroll listener with throttling for performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScrollValues();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [updateScrollValues]);

  // Calculate derived values
  const normalizedProgress = typeof window !== 'undefined' 
    ? Math.min(scrollY / (window.innerHeight || 1), 1) 
    : 0;
  
  // Image scale: starts at 1, scales down to 0.75 as user scrolls
  const imageScale = Math.max(1 - (normalizedProgress * 0.25), 0.75);
  
  // Image opacity: starts at 1, fades to 0.85
  const imageOpacity = Math.max(1 - (normalizedProgress * 0.15), 0.85);

  return {
    scrollY,
    imageScale,
    imageOpacity,
    isVisible
  };
};