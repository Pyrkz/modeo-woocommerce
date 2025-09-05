'use client';

import { useState, useEffect, useCallback } from 'react';
import { SLIDER_BREAKPOINTS, type SliderBreakpoint, type SliderBreakpointKey } from '../config/sliderConfig';

export const useResponsiveSlider = () => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<SliderBreakpoint>(SLIDER_BREAKPOINTS.desktop);
  const [breakpointKey, setBreakpointKey] = useState<SliderBreakpointKey>('desktop');

  const updateBreakpoint = useCallback(() => {
    const width = window.innerWidth;
    
    let newKey: SliderBreakpointKey;
    if (width < 640) {
      newKey = 'mobile';
    } else if (width < 1024) {
      newKey = 'tablet';
    } else {
      newKey = 'desktop';
    }
    
    if (newKey !== breakpointKey) {
      setBreakpointKey(newKey);
      setCurrentBreakpoint(SLIDER_BREAKPOINTS[newKey]);
    }
  }, [breakpointKey]);

  useEffect(() => {
    // Initial setup
    updateBreakpoint();
    
    // Debounced resize handler for better performance
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateBreakpoint, 150);
    };
    
    window.addEventListener('resize', debouncedResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, [updateBreakpoint]);

  return {
    ...currentBreakpoint,
    breakpointKey,
    isMobile: breakpointKey === 'mobile',
    isTablet: breakpointKey === 'tablet',
    isDesktop: breakpointKey === 'desktop'
  };
};