'use client';

import { memo } from 'react';

interface SliderControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  currentSlide: number;
  totalSlides: number;
  onSlideSelect: (index: number) => void;
  className?: string;
}

const SliderControls = memo(({
  onPrevious,
  onNext,
  currentSlide,
  totalSlides,
  onSlideSelect,
  className = ''
}: SliderControlsProps) => (
  <div className={`flex flex-col items-center space-y-4 ${className}`}>
    {/* Navigation arrows */}
    <div className="flex items-center space-x-4">
      <button
        onClick={onPrevious}
        className="
          p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200
          hover:bg-gray-50 border border-gray-200
          focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
          group
        "
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5 text-gray-600 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={onNext}
        className="
          p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200
          hover:bg-gray-50 border border-gray-200
          focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
          group
        "
        aria-label="Next slide"
      >
        <svg className="w-5 h-5 text-gray-600 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
    
    {/* Dot indicators */}
    <div className="flex space-x-2">
      {Array.from({ length: totalSlides }, (_, index) => (
        <button
          key={index}
          onClick={() => onSlideSelect(index)}
          className={`
            w-2 h-2 rounded-full transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
            ${
              index === currentSlide
                ? 'bg-red-600 w-6'
                : 'bg-gray-300 hover:bg-gray-400'
            }
          `}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  </div>
));

SliderControls.displayName = 'SliderControls';

export default SliderControls;