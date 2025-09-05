'use client';

import React, { useState, useEffect } from 'react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import { useSmoothScroll } from './SmoothScrollProvider';

interface ScrollToTopProps {
  threshold?: number;
  className?: string;
  showOnMobile?: boolean;
}

/**
 * Scroll to top button component with smooth scroll
 */
export const ScrollToTop: React.FC<ScrollToTopProps> = ({ 
  threshold = 400,
  className = '',
  showOnMobile = true 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollTo, scrollProgress } = useSmoothScroll();

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > threshold);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [threshold]);

  const handleClick = () => {
    scrollTo(0, { duration: 1.5 });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={handleClick}
      className={`
        scroll-to-top
        fixed bottom-6 right-6 z-50
        w-12 h-12 
        bg-gray-900 hover:bg-gray-700 
        text-white 
        rounded-full 
        shadow-lg hover:shadow-xl 
        transition-all duration-300 ease-out
        flex items-center justify-center
        group
        scroll-enhanced
        ${!showOnMobile ? 'hidden md:flex' : ''}
        ${className}
      `}
      aria-label="Scroll to top"
    >
      <ChevronUpIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
      
      {/* Progress indicator */}
      <div 
        className="scroll-progress-ring absolute inset-0 rounded-full border-2 border-white/20"
        style={{
          background: `conic-gradient(white ${scrollProgress * 360}deg, transparent 0deg)`
        }}
      />
    </button>
  );
};