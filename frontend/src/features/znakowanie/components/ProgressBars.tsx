// Instagram-style story progress bars component
'use client';

import React, { useMemo } from 'react';
import { getProgressStyles } from '../utils/nativeAnimations';
import type { GalleryItem } from '../types/gallery';

interface ProgressBarsProps {
  items: readonly GalleryItem[];
  currentIndex: number;
  isAutoPlaying: boolean;
  isHovered: boolean;
  isTransitioning: boolean;
  onBarClick: (index: number) => void;
}

export const ProgressBars = React.memo(({
  items,
  currentIndex,
  isAutoPlaying,
  isHovered,
  isTransitioning,
  onBarClick
}: ProgressBarsProps) => {
  const containerStyle = useMemo(() => ({
    transform: 'translate3d(0, 0, 0)',
    backfaceVisibility: 'hidden' as const
  }), []);

  return (
    <div 
      className="absolute top-2 sm:top-3 left-2 sm:left-3 right-2 sm:right-3 flex gap-0.5 sm:gap-1 z-20"
      style={containerStyle}
    >
      {items.map((_, index) => (
        <div
          key={index}
          className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden cursor-pointer"
          onClick={() => onBarClick(index)}
          style={{
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden'
          }}
        >
          <div
            style={getProgressStyles(
              index === currentIndex ? "100%" : index < currentIndex ? "100%" : "0%",
              index === currentIndex,
              isAutoPlaying,
              isHovered,
              isTransitioning
            )}
          />
        </div>
      ))}
    </div>
  );
});

ProgressBars.displayName = 'ProgressBars';