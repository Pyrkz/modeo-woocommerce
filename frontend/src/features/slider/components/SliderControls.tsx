'use client';

import { memo } from 'react';
import { SliderControlsProps } from '../types';

const SliderControls = memo(({
  currentSlide,
  totalSlides,
  onSlideChange,
  showDots = true,
  showArrows = true,
  onPrevious,
  onNext
}: SliderControlsProps) => {
  return (
    <>
      {/* Arrow Controls - Hidden on mobile and tablet */}
      {showArrows && (
        <>
          {/* Previous Arrow */}
          <button
            onClick={onPrevious}
            className="absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-primary hover:bg-primary-hover text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105 hidden lg:flex z-30"
            aria-label="Poprzedni slajd"
          >
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            className="text-white lg:w-5 lg:h-5"
          >
            <path
              d="M12.5 15L7.5 10L12.5 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          </button>

          {/* Next Arrow */}
          <button
            onClick={onNext}
            className="absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-primary hover:bg-primary-hover text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105 hidden lg:flex z-30"
            aria-label="Następny slajd"
          >
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            className="text-white lg:w-5 lg:h-5"
          >
            <path
              d="M7.5 5L12.5 10L7.5 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          </button>
        </>
      )}

      {/* Dots Navigation */}
      {showDots && (
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30">
          <div className="flex space-x-1.5 sm:space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => onSlideChange(index)}
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide
                    ? 'bg-white scale-110 shadow-md'
                    : 'bg-white/60 hover:bg-white/80'
                }`}
                aria-label={`Przejdź do slajdu ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
});

SliderControls.displayName = 'SliderControls';

export default SliderControls;