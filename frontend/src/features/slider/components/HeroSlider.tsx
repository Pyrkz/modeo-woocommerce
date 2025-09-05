'use client';

import { memo, useMemo, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSlider } from '../hooks/useSlider';
import SliderControls from './SliderControls';
import { HeroSliderProps } from '../types';
import { preloadSliderImages, prefetchSliderRoutes } from '../utils/preload';

const HeroSlider = memo(({
  slides,
  autoplay = true,
  autoplayDelay = 5000,
  showDots = true,
  showArrows = true,
  className = ''
}: HeroSliderProps) => {
  const {
    currentSlide,
    goToSlide,
    nextSlide,
    previousSlide,
    pauseAutoplay,
    resumeAutoplay
  } = useSlider({
    slideCount: slides.length,
    autoplay,
    autoplayDelay
  });

  const currentSlideData = useMemo(() => slides[currentSlide], [slides, currentSlide]);
  
  // Touch handling for mobile swipe gestures
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const sliderRef = useRef<HTMLElement>(null);
  
  // Memoized handlers for performance
  const handleMouseEnter = useCallback(() => {
    pauseAutoplay();
  }, [pauseAutoplay]);
  
  const handleMouseLeave = useCallback(() => {
    resumeAutoplay();
  }, [resumeAutoplay]);

  // Touch handlers for swipe functionality (mobile only)
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    // Only handle touch on mobile devices
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) return;
    
    touchStartX.current = e.touches[0].clientX;
    pauseAutoplay();
  }, [pauseAutoplay]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) return;
    
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) return;
    if (!touchStartX.current || !touchEndX.current) return;
    
    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        // Swipe left - next slide
        nextSlide();
      } else {
        // Swipe right - previous slide
        previousSlide();
      }
    }

    // Reset touch values
    touchStartX.current = 0;
    touchEndX.current = 0;
    resumeAutoplay();
  }, [nextSlide, previousSlide, resumeAutoplay]);

  // Performance optimizations
  useEffect(() => {
    if (slides.length > 0) {
      const imagePaths = slides.map(slide => slide.imagePath);
      const hrefs = slides.map(slide => slide.ctaHref);
      
      // Preload images for faster transitions
      preloadSliderImages(imagePaths);
      
      // Prefetch route pages for instant navigation
      prefetchSliderRoutes(hrefs);
    }
  }, [slides]);

  if (!slides.length) return null;

  return (
    <section 
      ref={sliderRef}
      className={`relative h-[450px] sm:h-[500px] md:h-[550px] lg:h-[600px] xl:h-[650px] overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: 'pan-y pinch-zoom' }}
      aria-label="Slider główny"
    >
      {/* Background Images */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.imagePath}
              alt={slide.imageAlt}
              fill
              className="object-cover"
              priority={index === 0}
              loading={index === 0 ? 'eager' : 'lazy'}
              sizes="100vw"
            />
            {/* Gradient Overlay - ciemniejszy po lewej, jaśniejszy po prawej */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 w-full">
          <div className="max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
            {currentSlideData.subtitle && (
              <p className="text-white/95 text-sm sm:text-base lg:text-lg mb-2 sm:mb-3 lg:mb-4 font-medium tracking-wide">
                {currentSlideData.subtitle}
              </p>
            )}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 lg:mb-6 leading-tight drop-shadow-lg">
              {currentSlideData.title}
            </h1>
            <p className="text-white/95 text-sm sm:text-base lg:text-lg mb-5 sm:mb-6 lg:mb-8 leading-relaxed max-w-xl sm:max-w-2xl drop-shadow-md">
              {currentSlideData.description}
            </p>
            <Link
              href={currentSlideData.ctaHref}
              className="inline-block bg-primary hover:bg-primary-hover focus:bg-primary-hover text-white px-5 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 rounded-lg font-semibold text-sm sm:text-base lg:text-lg transition-all duration-200 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-primary/30 focus:outline-none"
              aria-label={`${currentSlideData.ctaText} - ${currentSlideData.title}`}
            >
              {currentSlideData.ctaText}
            </Link>
          </div>
        </div>
      </div>

      {/* Controls */}
      <SliderControls
        currentSlide={currentSlide}
        totalSlides={slides.length}
        onSlideChange={goToSlide}
        showDots={showDots}
        showArrows={showArrows}
        onPrevious={previousSlide}
        onNext={nextSlide}
      />
    </section>
  );
});

HeroSlider.displayName = 'HeroSlider';

export default HeroSlider;