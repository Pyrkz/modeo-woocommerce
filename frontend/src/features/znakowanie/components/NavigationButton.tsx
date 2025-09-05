// Optimized navigation button component
'use client';

import React, { useState, useMemo } from 'react';
import { getScaleStyles } from '../utils/nativeAnimations';

interface NavigationButtonProps {
  onClick: () => void;
  disabled?: boolean;
  shouldAnimate: boolean;
  direction: 'prev' | 'next';
  variant?: 'desktop' | 'mobile';
  className?: string;
  children?: React.ReactNode;
  ariaLabel?: string;
}

export const NavigationButton = React.memo(({
  onClick,
  disabled = false,
  shouldAnimate,
  direction,
  variant = 'desktop',
  className = '',
  children,
  ariaLabel
}: NavigationButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const buttonStyle = useMemo(() => {
    const baseStyle = getScaleStyles(isHovered, isPressed, shouldAnimate);
    // Add slight y-offset for desktop variant when hovered
    if (variant === 'desktop' && isHovered && shouldAnimate) {
      return {
        ...baseStyle,
        transform: baseStyle.transform + ' translateY(-2px)'
      };
    }
    return baseStyle;
  }, [isHovered, isPressed, shouldAnimate, variant]);

  const iconSize = variant === 'mobile' ? { width: 18, height: 18 } : { width: 24, height: 24 };
  const iconClasses = variant === 'mobile' ? 'sm:w-5 sm:h-5' : '';

  const arrowTransform = shouldAnimate && isHovered ? 
    (direction === 'prev' ? 'translateX(-2px)' : 'translateX(2px)') : 
    'translateX(0)';

  const defaultIcon = direction === 'prev' ? (
    <svg 
      {...iconSize} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      className={iconClasses}
      style={{ 
        transform: arrowTransform, 
        transition: 'transform 0.2s ease' 
      }}
    >
      <path d="M15 18l-6-6 6-6"/>
    </svg>
  ) : (
    <svg 
      {...iconSize} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      className={iconClasses}
      style={{ 
        transform: arrowTransform, 
        transition: 'transform 0.2s ease' 
      }}
    >
      <path d="M9 18l6-6-6-6"/>
    </svg>
  );

  const baseClasses = variant === 'desktop' 
    ? 'bg-white shadow-lg rounded-full p-4 text-gray-600 hover:text-primary hover:shadow-xl transition-all duration-300 group disabled:opacity-50'
    : 'bg-white shadow-lg rounded-full p-2.5 sm:p-3 text-gray-600 hover:text-primary transition-colors disabled:opacity-50';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      className={`${baseClasses} ${className}`}
      style={buttonStyle}
      aria-label={ariaLabel || `${direction === 'prev' ? 'Poprzednie' : 'Następne'} zdjęcie`}
    >
      {children || defaultIcon}
    </button>
  );
});

NavigationButton.displayName = 'NavigationButton';