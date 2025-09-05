'use client';

import { useCallback, useRef, useState, useEffect } from 'react';

interface UseSmoothSliderProps {
  itemWidth: number;
  gap: number;
  visibleItems: number;
  totalItems: number;
  smoothDuration?: number;
}

interface SliderState {
  currentIndex: number;
  isScrolling: boolean;
  canScrollLeft: boolean;
  canScrollRight: boolean;
}

export const useSmoothSlider = ({ 
  itemWidth, 
  gap, 
  visibleItems,
  totalItems,
  smoothDuration = 400
}: UseSmoothSliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const [sliderState, setSliderState] = useState<SliderState>({
    currentIndex: 0,
    isScrolling: false,
    canScrollLeft: false,
    canScrollRight: totalItems > visibleItems
  });

  // Calculate scroll positions and boundaries
  const itemFullWidth = itemWidth + gap;
  const maxIndex = Math.max(0, totalItems - visibleItems);

  const updateScrollState = useCallback((newIndex: number) => {
    setSliderState(prev => ({
      ...prev,
      currentIndex: newIndex,
      canScrollLeft: newIndex > 0,
      canScrollRight: newIndex < maxIndex
    }));
  }, [maxIndex]);

  const smoothScrollToIndex = useCallback((targetIndex: number) => {
    if (!containerRef.current) return;
    
    const clampedIndex = Math.max(0, Math.min(targetIndex, maxIndex));
    const targetPosition = clampedIndex * itemFullWidth;
    
    setSliderState(prev => ({ ...prev, isScrolling: true }));
    
    // Clear any existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    containerRef.current.scrollTo({
      left: targetPosition,
      behavior: 'smooth'
    });
    
    // Update state after smooth scroll completes
    scrollTimeoutRef.current = setTimeout(() => {
      setSliderState(prev => ({ ...prev, isScrolling: false }));
      updateScrollState(clampedIndex);
    }, smoothDuration);
    
  }, [itemFullWidth, maxIndex, smoothDuration, updateScrollState]);

  const scrollToPrevious = useCallback(() => {
    if (sliderState.isScrolling || !sliderState.canScrollLeft) return;
    // Move by exactly one product to the left
    smoothScrollToIndex(sliderState.currentIndex - 1);
  }, [sliderState.isScrolling, sliderState.canScrollLeft, sliderState.currentIndex, smoothScrollToIndex]);

  const scrollToNext = useCallback(() => {
    if (sliderState.isScrolling || !sliderState.canScrollRight) return;
    // Move by exactly one product to the right  
    smoothScrollToIndex(sliderState.currentIndex + 1);
  }, [sliderState.isScrolling, sliderState.canScrollRight, sliderState.currentIndex, smoothScrollToIndex]);

  // Handle manual scroll updates - debounced for better performance
  const handleScroll = useCallback(() => {
    if (!containerRef.current || sliderState.isScrolling) return;
    
    const scrollLeft = containerRef.current.scrollLeft;
    const newIndex = Math.round(scrollLeft / itemFullWidth);
    
    // Only update if index actually changed
    if (newIndex !== sliderState.currentIndex && newIndex >= 0 && newIndex <= maxIndex) {
      updateScrollState(newIndex);
    }
  }, [itemFullWidth, maxIndex, sliderState.currentIndex, sliderState.isScrolling, updateScrollState]);

  // Attach scroll listener with throttling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    container.addEventListener('scroll', throttledHandleScroll, { passive: true });
    return () => container.removeEventListener('scroll', throttledHandleScroll);
  }, [handleScroll]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return {
    containerRef,
    scrollToPrevious,
    scrollToNext,
    scrollToIndex: smoothScrollToIndex,
    currentIndex: sliderState.currentIndex,
    canScrollLeft: sliderState.canScrollLeft,
    canScrollRight: sliderState.canScrollRight,
    isScrolling: sliderState.isScrolling
  };
};