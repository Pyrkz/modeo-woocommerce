'use client';

import { memo } from 'react';
import { useSlider } from '../../hooks/useSlider';
import { useImagePreloader } from '../../hooks/useImagePreloader';
import { HeroSliderProps } from '../../types';
import SliderSlide from './SliderSlide';
import SliderControls from './SliderControls';

const HeroSlider = memo(({
  slides,
  autoPlay = true,
  interval = 5000,
  className = ''
}: HeroSliderProps) => {
  const {
    currentSlide,
    nextSlide,
    prevSlide,
    goToSlide,
    pauseAutoPlay,
    resumeAutoPlay
  } = useSlider({
    totalSlides: slides.length,
    autoPlay,
    interval
  });

  // Preload images for better performance
  useImagePreloader({
    currentIndex: currentSlide,
    galleryItems: slides.map((slide, index) => ({ 
      image: slide.image,
      alt: slide.name || slide.description || '',
      id: index
    }))
  });

  if (!slides.length) return null;

  // Debug info
  console.log('Current slide:', currentSlide, 'Total slides:', slides.length);

  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
    >
      {/* Slider container */}
      <div className="relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl">
        {slides.map((method, index) => (
          <div
            key={method.id}
            className={`
              absolute inset-0 transition-all duration-500 ease-out
              ${index === currentSlide 
                ? 'opacity-100 transform translate-x-0' 
                : index < currentSlide 
                  ? 'opacity-0 transform -translate-x-full'
                  : 'opacity-0 transform translate-x-full'
              }
            `}
          >
            <SliderSlide
              method={method}
              isActive={index === currentSlide}
            />
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <SliderControls
          onPrevious={prevSlide}
          onNext={nextSlide}
          currentSlide={currentSlide}
          totalSlides={slides.length}
          onSlideSelect={goToSlide}
        />
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div 
          className="h-full bg-red-600 transition-all duration-500"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
    </div>
  );
});

HeroSlider.displayName = 'HeroSlider';

export default HeroSlider;