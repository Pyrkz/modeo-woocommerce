'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseSliderProps {
  totalSlides: number;
  autoPlay?: boolean;
  interval?: number;
}

export const useSlider = ({ 
  totalSlides, 
  autoPlay = true, 
  interval = 5000 
}: UseSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  const nextSlide = useCallback(() => {
    console.log('Next slide clicked'); // Debug
    setCurrentSlide((prev) => {
      const next = (prev + 1) % totalSlides;
      console.log('Moving from', prev, 'to', next); // Debug
      return next;
    });
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    console.log('Previous slide clicked'); // Debug
    setCurrentSlide((prev) => {
      const next = (prev - 1 + totalSlides) % totalSlides;
      console.log('Moving from', prev, 'to', next); // Debug
      return next;
    });
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const pauseAutoPlay = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const resumeAutoPlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  useEffect(() => {
    if (!isPlaying || totalSlides <= 1) return;

    const slideInterval = setInterval(nextSlide, interval);
    return () => clearInterval(slideInterval);
  }, [isPlaying, interval, nextSlide, totalSlides]);

  return {
    currentSlide,
    nextSlide,
    prevSlide,
    goToSlide,
    pauseAutoPlay,
    resumeAutoPlay,
    isPlaying
  };
};