'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface UseScrollVisibilityOptions {
  /** Threshold in pixels from top to start showing the button */
  showThreshold?: number;
  /** Debounce delay in milliseconds for performance optimization */
  debounceDelay?: number;
}

interface UseScrollVisibilityReturn {
  isVisible: boolean;
  isScrollingDown: boolean;
  scrollY: number;
}

/**
 * Custom hook for managing sticky button visibility based on scroll position and direction
 * Optimized for performance with debouncing and RAF scheduling
 */
export function useScrollVisibility({
  showThreshold = 400,
  debounceDelay = 16
}: UseScrollVisibilityOptions = {}): UseScrollVisibilityReturn {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const updateScrollState = useCallback(() => {
    const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
    const scrollingDown = currentScrollY > lastScrollY.current;
    
    setScrollY(currentScrollY);
    setIsScrollingDown(scrollingDown);
    setIsVisible(currentScrollY > showThreshold);
    
    lastScrollY.current = currentScrollY;
    ticking.current = false;
  }, [showThreshold]);

  const handleScroll = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      if (!ticking.current) {
        requestAnimationFrame(updateScrollState);
        ticking.current = true;
      }
    }, debounceDelay);
  }, [updateScrollState, debounceDelay]);

  useEffect(() => {
    // Initial state
    const initialScrollY = window.pageYOffset || document.documentElement.scrollTop;
    setScrollY(initialScrollY);
    setIsVisible(initialScrollY > showThreshold);
    lastScrollY.current = initialScrollY;

    // Add scroll listener with passive option for performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleScroll, showThreshold]);

  return {
    isVisible,
    isScrollingDown,
    scrollY
  };
}