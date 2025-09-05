'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { UseSliderOptions, UseSliderReturn } from '../types';

export const useSlider = ({
  slideCount,
  autoplay = true,
  autoplayDelay = 5000
}: UseSliderOptions): UseSliderReturn => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  }, [slideCount]);

  const previousSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  }, [slideCount]);

  const pauseAutoplay = useCallback(() => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resumeAutoplay = useCallback(() => {
    if (autoplay) {
      setIsPlaying(true);
    }
  }, [autoplay]);

  // Autoplay logic
  useEffect(() => {
    if (isPlaying && slideCount > 1) {
      intervalRef.current = setInterval(nextSlide, autoplayDelay);
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [isPlaying, nextSlide, autoplayDelay, slideCount]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    currentSlide,
    isPlaying,
    goToSlide,
    nextSlide,
    previousSlide,
    pauseAutoplay,
    resumeAutoplay
  };
};