'use client';

import { memo } from 'react';

interface ScrollNavigationProps {
  onScrollLeft: () => void;
  onScrollRight: () => void;
  isScrolling?: boolean;
  isMobile?: boolean;
  className?: string;
}

const ScrollNavigation = memo(({ 
  onScrollLeft, 
  onScrollRight, 
  isScrolling = false,
  isMobile: _isMobile = false,
  className = '' 
}: ScrollNavigationProps) => {
  void _isMobile; // ESLint: intentionally unused
  return (
  <>
    {/* Desktop Navigation - Side arrows */}
    <div className={`hidden lg:block ${className}`}>
      {/* Left Arrow */}
      <button
        onClick={onScrollLeft}
        disabled={isScrolling}
        className="
          absolute left-2 top-1/2 -translate-y-1/2 z-10 
          w-12 h-12
          bg-white/95 backdrop-blur-sm rounded-full shadow-lg 
          flex items-center justify-center
          transition-all duration-200 ease-out
          hover:bg-white hover:shadow-xl hover:scale-105
          focus:outline-none focus:ring-2 focus:ring-primary/50
          disabled:opacity-50 disabled:cursor-not-allowed
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
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Right Arrow */}
      <button
        onClick={onScrollRight}
        disabled={isScrolling}
        className="
          absolute right-2 top-1/2 -translate-y-1/2 z-10 
          w-12 h-12
          bg-white/95 backdrop-blur-sm rounded-full shadow-lg 
          flex items-center justify-center
          transition-all duration-200 ease-out
          hover:bg-white hover:shadow-xl hover:scale-105
          focus:outline-none focus:ring-2 focus:ring-primary/50
          disabled:opacity-50 disabled:cursor-not-allowed
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
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>

    {/* Mobile Navigation - Bottom arrows */}
    <div className="flex lg:hidden justify-center mt-6 gap-4">
      <button
        onClick={onScrollLeft}
        disabled={isScrolling}
        className="
          w-10 h-10 
          bg-white/95 backdrop-blur-sm rounded-full shadow-lg 
          flex items-center justify-center
          transition-all duration-200 ease-out
          hover:bg-white hover:shadow-xl hover:scale-105
          focus:outline-none focus:ring-2 focus:ring-primary/50
          disabled:opacity-50 disabled:cursor-not-allowed
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
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button
        onClick={onScrollRight}
        disabled={isScrolling}
        className="
          w-10 h-10 
          bg-white/95 backdrop-blur-sm rounded-full shadow-lg 
          flex items-center justify-center
          transition-all duration-200 ease-out
          hover:bg-white hover:shadow-xl hover:scale-105
          focus:outline-none focus:ring-2 focus:ring-primary/50
          disabled:opacity-50 disabled:cursor-not-allowed
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
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  </>
  );
});

ScrollNavigation.displayName = 'ScrollNavigation';

export default ScrollNavigation;