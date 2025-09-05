// Custom hook for gallery navigation and controls with performance optimizations
'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { GALLERY_CONFIG } from '../config/gallery-data';
import type { GalleryControls, GalleryNavigation } from '../types/gallery';

interface UseGalleryControlsOptions {
  totalItems: number;
}

export const useGalleryControls = ({ totalItems }: UseGalleryControlsOptions) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Navigation functions with performance optimization
  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === totalItems - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsTransitioning(false), 50);
  }, [isTransitioning, totalItems]);

  const goToPrevious = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? totalItems - 1 : prevIndex - 1
    );
    setTimeout(() => setIsTransitioning(false), 50);
  }, [isTransitioning, totalItems]);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 50);
  }, [currentIndex, isTransitioning]);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying(!isAutoPlaying);
  }, [isAutoPlaying]);

  // Auto-play functionality with optimized cleanup
  useEffect(() => {
    if (isAutoPlaying && !isHovered && !isTransitioning) {
      intervalRef.current = setInterval(() => {
        goToNext();
      }, GALLERY_CONFIG.AUTOPLAY_INTERVAL);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, isHovered, isTransitioning, goToNext]);

  const controls: GalleryControls = {
    currentIndex,
    isAutoPlaying,
    isTransitioning,
    isHovered,
    direction
  };

  const navigation: GalleryNavigation = {
    goToNext,
    goToPrevious,
    goToSlide,
    toggleAutoPlay
  };

  const hoverHandlers = {
    onHoverStart: () => setIsHovered(true),
    onHoverEnd: () => setIsHovered(false)
  };

  return {
    controls,
    navigation,
    hoverHandlers
  };
};