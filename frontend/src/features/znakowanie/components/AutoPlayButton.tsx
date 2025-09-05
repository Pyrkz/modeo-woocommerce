// Optimized auto-play toggle button component
'use client';

import React, { useState, useMemo } from 'react';
import { getScaleStyles } from '../utils/nativeAnimations';

interface AutoPlayButtonProps {
  isAutoPlaying: boolean;
  onClick: () => void;
  shouldAnimate: boolean;
  variant?: 'desktop' | 'mobile';
  className?: string;
}

export const AutoPlayButton = React.memo(({
  isAutoPlaying,
  onClick,
  shouldAnimate,
  variant = 'desktop',
  className = ''
}: AutoPlayButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const buttonStyle = useMemo(() => 
    getScaleStyles(isHovered, isPressed, shouldAnimate),
    [isHovered, isPressed, shouldAnimate]
  );

  const iconSize = variant === 'mobile' ? { width: 14, height: 14 } : { width: 20, height: 20 };
  const iconClasses = variant === 'mobile' ? 'sm:w-4 sm:h-4' : '';

  const pauseIcon = (
    <svg {...iconSize} viewBox="0 0 24 24" fill="currentColor" className={iconClasses}>
      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
    </svg>
  );

  const playIcon = (
    <svg {...iconSize} viewBox="0 0 24 24" fill="currentColor" className={iconClasses}>
      <path d="M8 5v14l11-7z"/>
    </svg>
  );

  const baseClasses = variant === 'desktop'
    ? `bg-white shadow-lg rounded-full p-3 transition-all duration-300 ${
        isAutoPlaying ? 'text-primary' : 'text-gray-400'
      }`
    : `bg-white shadow-lg rounded-full p-2.5 sm:p-3 transition-colors ${
        isAutoPlaying ? 'text-primary' : 'text-gray-400'
      }`;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      className={`${baseClasses} ${className}`}
      style={buttonStyle}
      aria-label={isAutoPlaying ? 'Wstrzymaj automatyczne przewijanie' : 'Rozpocznij automatyczne przewijanie'}
      title={isAutoPlaying ? 'Wstrzymaj automatyczne przewijanie' : 'Rozpocznij automatyczne przewijanie'}
    >
      {isAutoPlaying ? pauseIcon : playIcon}
    </button>
  );
});

AutoPlayButton.displayName = 'AutoPlayButton';