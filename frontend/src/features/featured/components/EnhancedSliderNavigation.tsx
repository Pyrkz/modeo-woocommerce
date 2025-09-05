'use client';

import { memo } from 'react';

interface EnhancedSliderNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  canScrollLeft: boolean;
  canScrollRight: boolean;
  isScrolling: boolean;
  showMobileNavigation?: boolean;
  className?: string;
}

const EnhancedSliderNavigation = memo(({ 
  onPrevious, 
  onNext, 
  canScrollLeft,
  canScrollRight,
  isScrolling,
  showMobileNavigation = true,
  className = '' 
}: EnhancedSliderNavigationProps) => {
  const NavigationButton = ({ 
    onClick, 
    disabled, 
    direction, 
    size = 'large',
    'aria-label': ariaLabel 
  }: {
    onClick: () => void;
    disabled: boolean;
    direction: 'left' | 'right';
    size?: 'small' | 'large';
    'aria-label': string;
  }) => (
    <button
      onClick={onClick}
      disabled={disabled || isScrolling}
      className={`
        slider-nav-button
        ${size === 'large' ? 'w-12 h-12' : 'w-10 h-10'}
        bg-white/95 backdrop-blur-sm rounded-full shadow-lg 
        flex items-center justify-center
        ${disabled || isScrolling 
          ? 'opacity-40 cursor-not-allowed' 
          : 'hover:bg-white hover:shadow-xl cursor-pointer'
        }
        focus:outline-none focus:ring-2 focus:ring-primary/50
      `}
      aria-label={ariaLabel}
    >
      <svg
        width={size === 'large' ? '20' : '18'}
        height={size === 'large' ? '20' : '18'}
        viewBox="0 0 20 20"
        fill="none"
        className={`
          transition-colors duration-200
          ${disabled || isScrolling 
            ? 'text-gray-300' 
            : 'text-gray-600 hover:text-primary'
          }
        `}
      >
        <path
          d={direction === 'left' ? 'M12.5 15L7.5 10L12.5 5' : 'M7.5 5L12.5 10L7.5 15'}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );

  return (
    <>
      {/* Desktop Navigation - Side arrows */}
      <div className={`hidden lg:block ${className}`}>
        <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10">
          <NavigationButton
            onClick={onPrevious}
            disabled={!canScrollLeft}
            direction="left"
            aria-label="Poprzednie produkty"
          />
        </div>

        <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10">
          <NavigationButton
            onClick={onNext}
            disabled={!canScrollRight}
            direction="right"
            aria-label="Następne produkty"
          />
        </div>
      </div>

      {/* Mobile Navigation - Bottom arrows */}
      {showMobileNavigation && (
        <div className="flex lg:hidden justify-center mt-6 gap-4">
          <NavigationButton
            onClick={onPrevious}
            disabled={!canScrollLeft}
            direction="left"
            size="small"
            aria-label="Poprzednie produkty"
          />
          
          <NavigationButton
            onClick={onNext}
            disabled={!canScrollRight}
            direction="right"
            size="small"
            aria-label="Następne produkty"
          />
        </div>
      )}
    </>
  );
});

EnhancedSliderNavigation.displayName = 'EnhancedSliderNavigation';

export default EnhancedSliderNavigation;