'use client';

import { useCallback, useRef, useEffect, useState } from 'react';

interface UseSmoothScrollOptions {
  mobileScrollDistance?: number;
  desktopScrollDistance?: number;
  scrollDuration?: number;
}

export const useSmoothScroll = ({ 
  mobileScrollDistance = 340,  // ~2 cards on mobile (160px + gap)
  desktopScrollDistance = 680, // ~4 cards on desktop (160px + gap)
  scrollDuration = 400
}: UseSmoothScrollOptions = {}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const isScrollingRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const smoothScrollTo = useCallback((targetScrollLeft: number) => {
    if (!scrollContainerRef.current || isScrollingRef.current) return;

    const container = scrollContainerRef.current;
    const startScrollLeft = container.scrollLeft;
    const distance = targetScrollLeft - startScrollLeft;

    if (Math.abs(distance) < 1) {
      return; // Don't animate for tiny distances
    }

    const startTime = performance.now();
    isScrollingRef.current = true;

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / scrollDuration, 1);
      
      // Enhanced easing function for ultra-smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      container.scrollLeft = startScrollLeft + (distance * easeOutQuart);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animateScroll);
      } else {
        isScrollingRef.current = false;
        animationRef.current = null;
        // Snap to exact position to prevent sub-pixel issues
        container.scrollLeft = targetScrollLeft;
      }
    };

    animationRef.current = requestAnimationFrame(animateScroll);
  }, [scrollDuration]);

  const getScrollDistance = useCallback(() => {
    return isMobile ? mobileScrollDistance : desktopScrollDistance;
  }, [isMobile, mobileScrollDistance, desktopScrollDistance]);

  const scrollLeft = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const currentScroll = scrollContainerRef.current.scrollLeft;
    const scrollDistance = getScrollDistance();
    const targetScroll = Math.max(0, currentScroll - scrollDistance);
    smoothScrollTo(targetScroll);
  }, [getScrollDistance, smoothScrollTo]);

  const scrollRight = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const currentScroll = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const scrollDistance = getScrollDistance();
    const targetScroll = Math.min(maxScroll, currentScroll + scrollDistance);
    smoothScrollTo(targetScroll);
  }, [getScrollDistance, smoothScrollTo]);

  return {
    scrollContainerRef,
    scrollLeft,
    scrollRight,
    isScrolling: isScrollingRef.current,
    isMobile
  };
};