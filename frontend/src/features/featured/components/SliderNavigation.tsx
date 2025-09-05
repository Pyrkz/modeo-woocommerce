'use client';

import { memo } from 'react';

interface SliderNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  showMobileNavigation?: boolean;
  className?: string;
}

const SliderNavigation = memo(({ 
  onPrevious, 
  onNext, 
  showMobileNavigation = true,
  className = '' 
}: SliderNavigationProps) => (
  <>
    {/* Desktop Navigation - Side arrows */}
    <div className={`hidden lg:block ${className}`}>
      <button
        onClick={onPrevious}
        className="
          absolute left-2 top-1/2 -translate-y-1/2 z-10 
          w-12 h-12 bg-white/95 backdrop-blur-sm rounded-full shadow-lg 
          flex items-center justify-center
          transition-all duration-200 ease-out
          hover:bg-white hover:shadow-xl hover:scale-105
          focus:outline-none focus:ring-2 focus:ring-primary/50
        "
        aria-label="Poprzednie produkty"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="text-gray-600 hover:text-primary transition-colors duration-200"
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

      <button
        onClick={onNext}
        className="
          absolute right-2 top-1/2 -translate-y-1/2 z-10 
          w-12 h-12 bg-white/95 backdrop-blur-sm rounded-full shadow-lg 
          flex items-center justify-center
          transition-all duration-200 ease-out
          hover:bg-white hover:shadow-xl hover:scale-105
          focus:outline-none focus:ring-2 focus:ring-primary/50
        "
        aria-label="Następne produkty"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="text-gray-600 hover:text-primary transition-colors duration-200"
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
    </div>

    {/* Mobile Navigation - Bottom arrows */}
    {showMobileNavigation && (
      <div className="flex lg:hidden justify-center mt-6 gap-4">
        <button
          onClick={onPrevious}
          className="
            w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full shadow-lg 
            flex items-center justify-center
            transition-all duration-200 ease-out
            hover:bg-white hover:shadow-xl hover:scale-105
            focus:outline-none focus:ring-2 focus:ring-primary/50
          "
          aria-label="Poprzednie produkty"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            className="text-gray-600 hover:text-primary transition-colors duration-200"
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

        <button
          onClick={onNext}
          className="
            w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full shadow-lg 
            flex items-center justify-center
            transition-all duration-200 ease-out
            hover:bg-white hover:shadow-xl hover:scale-105
            focus:outline-none focus:ring-2 focus:ring-primary/50
          "
          aria-label="Następne produkty"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            className="text-gray-600 hover:text-primary transition-colors duration-200"
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
      </div>
    )}
  </>
));

SliderNavigation.displayName = 'SliderNavigation';

export default SliderNavigation;