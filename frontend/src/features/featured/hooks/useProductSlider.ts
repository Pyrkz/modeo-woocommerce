'use client';

import { useCallback, useRef } from 'react';

interface UseProductSliderProps {
  itemWidth: number;
  gap: number;
  visibleItems: number;
}

export const useProductSlider = ({ 
  itemWidth, 
  gap, 
  visibleItems 
}: UseProductSliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToPosition = useCallback((position: number) => {
    if (!containerRef.current) return;
    
    containerRef.current.scrollTo({
      left: position,
      behavior: 'smooth'
    });
  }, []);

  const scrollLeft = useCallback(() => {
    if (!containerRef.current) return;
    
    const scrollDistance = (itemWidth + gap) * visibleItems;
    const currentPosition = containerRef.current.scrollLeft;
    const newPosition = Math.max(0, currentPosition - scrollDistance);
    
    scrollToPosition(newPosition);
  }, [itemWidth, gap, visibleItems, scrollToPosition]);

  const scrollRight = useCallback(() => {
    if (!containerRef.current) return;
    
    const scrollDistance = (itemWidth + gap) * visibleItems;
    const currentPosition = containerRef.current.scrollLeft;
    const maxScroll = containerRef.current.scrollWidth - containerRef.current.clientWidth;
    const newPosition = Math.min(maxScroll, currentPosition + scrollDistance);
    
    scrollToPosition(newPosition);
  }, [itemWidth, gap, visibleItems, scrollToPosition]);

  return {
    containerRef,
    scrollLeft,
    scrollRight
  };
};