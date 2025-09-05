// Optimized thumbnail button component with memoization
'use client';

import React, { useCallback, useMemo, useState } from 'react';
import Image from 'next/image';
import { getScaleStyles } from '../utils/nativeAnimations';
import { GALLERY_CONFIG } from '../config/gallery-data';
import type { ThumbnailButtonProps } from '../types/gallery';

export const ThumbnailButton = React.memo(({ 
  item, 
  index, 
  currentIndex, 
  isTransitioning, 
  goToSlide, 
  shouldAnimate 
}: ThumbnailButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = useCallback(() => {
    goToSlide(index);
  }, [goToSlide, index]);

  // GPU accelerated styles with hover effects
  const buttonStyle = useMemo(() => {
    const baseStyle = getScaleStyles(isHovered, isPressed, shouldAnimate);
    // Add slight y-offset when hovered
    if (isHovered && shouldAnimate) {
      return {
        ...baseStyle,
        transform: baseStyle.transform + ' translateY(-2px)'
      };
    }
    return baseStyle;
  }, [isHovered, isPressed, shouldAnimate]);

  const isActive = index === currentIndex;

  return (
    <button
      onClick={handleClick}
      disabled={isTransitioning}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      className={`relative w-10 h-14 sm:w-12 sm:h-16 rounded-lg overflow-hidden transition-all duration-300 disabled:opacity-50 ${
        isActive 
          ? 'ring-2 ring-primary shadow-lg' 
          : 'opacity-60 hover:opacity-100'
      }`}
      style={buttonStyle}
      aria-label={`Przejdź do zdjęcia ${index + 1}: ${item.alt || `Realizacja ${index + 1}`}`}
    >
      <Image
        src={item.image}
        alt={item.alt || `Miniatura ${index + 1}`}
        fill
        className="object-cover"
        sizes="48px"
        quality={GALLERY_CONFIG.THUMBNAIL_QUALITY}
        style={{
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden'
        }}
      />
    </button>
  );
});

ThumbnailButton.displayName = 'ThumbnailButton';