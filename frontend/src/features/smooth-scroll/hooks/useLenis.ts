'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import Lenis from 'lenis';
import type { LenisOptions, ScrollToOptions } from '../types';
import { getOptimalLenisConfig } from '../utils/lenisConfig';

/**
 * Custom hook for managing Lenis smooth scroll
 */
export const useLenis = (options?: Partial<LenisOptions>) => {
  const lenisRef = useRef<Lenis | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [velocity, setVelocity] = useState(0);

  // Initialize Lenis
  useEffect(() => {
    const config = {
      ...getOptimalLenisConfig(),
      ...options,
    };

    const lenis = new Lenis(config);
    lenisRef.current = lenis;

    // Animation frame for smooth scrolling
    let animationId: number;

    const raf = (time: number) => {
      lenis.raf(time);
      animationId = requestAnimationFrame(raf);
    };

    animationId = requestAnimationFrame(raf);

    // Event listeners for scroll state
    lenis.on('scroll', ({ velocity: vel, progress }) => {
      setScrollProgress(progress);
      setVelocity(Math.abs(vel));
      
      // Track scrolling state based on velocity
      const isCurrentlyScrolling = Math.abs(vel) > 0.01;
      setIsScrolling(isCurrentlyScrolling);
    });

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [options]);

  // Scroll to function
  const scrollTo = useCallback((target: string | Element | number, options?: ScrollToOptions) => {
    if (!lenisRef.current) return;

    // Convert Element to HTMLElement if needed
    const scrollTarget = target instanceof Element ? target as HTMLElement : target;

    lenisRef.current.scrollTo(scrollTarget, {
      offset: 0,
      duration: undefined, // Use default from config
      easing: undefined, // Use default from config
      immediate: false,
      lock: false,
      ...options,
    });
  }, []);

  // Scroll to top function
  const scrollToTop = useCallback((options?: ScrollToOptions) => {
    scrollTo(0, options);
  }, [scrollTo]);

  // Get current scroll position
  const getScrollPosition = useCallback(() => {
    return lenisRef.current?.scroll || 0;
  }, []);

  // Stop scrolling
  const stop = useCallback(() => {
    lenisRef.current?.stop();
  }, []);

  // Start scrolling
  const start = useCallback(() => {
    lenisRef.current?.start();
  }, []);

  return {
    lenis: lenisRef.current,
    scrollTo,
    scrollToTop,
    getScrollPosition,
    stop,
    start,
    isScrolling,
    scrollProgress,
    velocity,
  };
};