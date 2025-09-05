'use client';

import { useCallback, useRef, useState, useEffect } from 'react';

interface UseTrueSmoothSliderProps {
  itemWidth: number;
  gap: number;
  visibleItems: number;
  totalItems: number;
  animationDuration?: number;
}

interface SliderState {
  currentIndex: number;
  isAnimating: boolean;
  canScrollLeft: boolean;
  canScrollRight: boolean;
}

// Easing function for smooth animation
const easeOutCubic = (t: number): number => {
  return 1 - Math.pow(1 - t, 3);
};

export const useTrueSmoothSlider = ({ 
  itemWidth, 
  gap, 
  visibleItems,
  totalItems,
  animationDuration = 400
}: UseTrueSmoothSliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const startScrollRef = useRef<number>(0);
  const targetScrollRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  
  const [sliderState, setSliderState] = useState<SliderState>({
    currentIndex: 0,
    isAnimating: false,
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

  // Custom smooth animation function
  const animateScroll = useCallback((startTime: number) => {
    if (!containerRef.current) return;

    const currentTime = Date.now();
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / animationDuration, 1);
    
    // Apply easing function
    const easedProgress = easeOutCubic(progress);
    
    // Calculate current scroll position
    const startScroll = startScrollRef.current;
    const targetScroll = targetScrollRef.current;
    const currentScroll = startScroll + (targetScroll - startScroll) * easedProgress;
    
    // Apply scroll position
    containerRef.current.scrollLeft = currentScroll;
    
    if (progress < 1) {
      // Continue animation
      animationFrameRef.current = requestAnimationFrame(() => animateScroll(startTime));
    } else {
      // Animation complete
      setSliderState(prev => ({ ...prev, isAnimating: false }));
      const finalIndex = Math.round(targetScroll / itemFullWidth);
      updateScrollState(finalIndex);
    }
  }, [animationDuration, itemFullWidth, updateScrollState]);

  const smoothScrollToIndex = useCallback((targetIndex: number) => {
    if (!containerRef.current || sliderState.isAnimating) return;
    
    const clampedIndex = Math.max(0, Math.min(targetIndex, maxIndex));
    const targetPosition = clampedIndex * itemFullWidth;
    const currentPosition = containerRef.current.scrollLeft;
    
    // Don't animate if we're already at the target position
    if (Math.abs(targetPosition - currentPosition) < 1) return;
    
    // Cancel any existing animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    // Set up animation parameters
    startScrollRef.current = currentPosition;
    targetScrollRef.current = targetPosition;
    startTimeRef.current = Date.now();
    
    setSliderState(prev => ({ ...prev, isAnimating: true }));
    
    // Start animation
    animationFrameRef.current = requestAnimationFrame(() => animateScroll(startTimeRef.current));
    
  }, [maxIndex, itemFullWidth, sliderState.isAnimating, animateScroll]);

  const scrollToPrevious = useCallback(() => {
    if (sliderState.isAnimating || !sliderState.canScrollLeft) return;
    smoothScrollToIndex(sliderState.currentIndex - 1);
  }, [sliderState.isAnimating, sliderState.canScrollLeft, sliderState.currentIndex, smoothScrollToIndex]);

  const scrollToNext = useCallback(() => {
    if (sliderState.isAnimating || !sliderState.canScrollRight) return;
    smoothScrollToIndex(sliderState.currentIndex + 1);
  }, [sliderState.isAnimating, sliderState.canScrollRight, sliderState.currentIndex, smoothScrollToIndex]);

  // Handle manual scroll updates (for touch/drag)
  const handleScroll = useCallback(() => {
    if (!containerRef.current || sliderState.isAnimating) return;
    
    const scrollLeft = containerRef.current.scrollLeft;
    const newIndex = Math.round(scrollLeft / itemFullWidth);
    
    if (newIndex !== sliderState.currentIndex && newIndex >= 0 && newIndex <= maxIndex) {
      updateScrollState(newIndex);
    }
  }, [itemFullWidth, maxIndex, sliderState.currentIndex, sliderState.isAnimating, updateScrollState]);

  // Attach scroll listener for manual scrolling (touch/drag)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollTimeout: NodeJS.Timeout;
    const debouncedHandleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 50);
    };

    container.addEventListener('scroll', debouncedHandleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', debouncedHandleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [handleScroll]);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
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
    isAnimating: sliderState.isAnimating
  };
};