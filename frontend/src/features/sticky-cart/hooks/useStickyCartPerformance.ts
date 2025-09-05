'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface UseStickyCartPerformanceOptions {
  /** Threshold for showing the button */
  showThreshold?: number;
  /** Hide threshold when scrolling up */
  hideThreshold?: number;
  /** Debounce delay for scroll events */
  debounceDelay?: number;
  /** Throttle delay for RAF scheduling */
  throttleDelay?: number;
  /** Auto-hide after this many milliseconds of no scroll */
  autoHideDelay?: number;
}

interface UseStickyCartPerformanceReturn {
  isVisible: boolean;
  shouldAnimate: boolean;
  scrollPercentage: number;
  isNearBottom: boolean;
}

/**
 * High-performance hook for managing sticky cart button visibility and animations
 * Optimized for 60fps performance with minimal reflows and CPU usage
 */
export function useStickyCartPerformance({
  showThreshold = 300,
  hideThreshold = 100,
  debounceDelay = 8,
  throttleDelay = 16,
  autoHideDelay = 3000
}: UseStickyCartPerformanceOptions = {}): UseStickyCartPerformanceReturn {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isNearBottom, setIsNearBottom] = useState(false);

  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(0);
  const rafId = useRef<number | undefined>(undefined);
  const timeoutId = useRef<NodeJS.Timeout | undefined>(undefined);
  const isScrolling = useRef(false);

  const calculateMetrics = useCallback(() => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const maxScroll = documentHeight - windowHeight;
    
    const scrollPercent = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;
    const nearBottom = scrollPercent > 80;
    const shouldShow = scrollY > showThreshold && scrollY < maxScroll - hideThreshold;
    
    return {
      scrollY,
      scrollPercent: Math.min(100, Math.max(0, scrollPercent)),
      nearBottom,
      shouldShow
    };
  }, [showThreshold, hideThreshold]);

  const updateState = useCallback(() => {
    const metrics = calculateMetrics();
    
    setScrollPercentage(metrics.scrollPercent);
    setIsNearBottom(metrics.nearBottom);
    setIsVisible(metrics.shouldShow);
    
    lastScrollY.current = metrics.scrollY;
    lastScrollTime.current = Date.now();
    
    rafId.current = undefined;
  }, [calculateMetrics]);

  const handleScroll = useCallback(() => {
    if (!isScrolling.current) {
      isScrolling.current = true;
      setShouldAnimate(true);
    }

    // Clear existing RAF and timeout
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    // Schedule update with RAF
    rafId.current = requestAnimationFrame(() => {
      setTimeout(updateState, debounceDelay);
    });

    // Auto-hide animation after scroll stops
    timeoutId.current = setTimeout(() => {
      isScrolling.current = false;
      setShouldAnimate(false);
    }, autoHideDelay);
  }, [updateState, debounceDelay, autoHideDelay]);

  useEffect(() => {
    // Initial calculation
    updateState();

    // Add optimized scroll listener
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        setTimeout(() => {
          handleScroll();
          ticking = false;
        }, throttleDelay);
        ticking = true;
      }
    };

    // Use passive listeners for performance
    const scrollOptions: AddEventListenerOptions = { 
      passive: true, 
      capture: false 
    };

    window.addEventListener('scroll', throttledScroll, scrollOptions);
    window.addEventListener('resize', updateState, scrollOptions);

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('resize', updateState);
      
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [handleScroll, updateState, throttleDelay]);

  return {
    isVisible,
    shouldAnimate,
    scrollPercentage,
    isNearBottom
  };
}