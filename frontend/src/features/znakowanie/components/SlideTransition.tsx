// Native slide transition component without framer-motion
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getSlideStyles } from '../utils/nativeAnimations';
import { GALLERY_CONFIG } from '../config/gallery-data';
import type { GalleryItem } from '../types/gallery';

interface SlideTransitionProps {
  items: readonly GalleryItem[];
  currentIndex: number;
  direction: number;
}

export const SlideTransition = React.memo(({
  items,
  currentIndex,
  direction
}: SlideTransitionProps) => {
  const [displayedIndex, setDisplayedIndex] = useState(currentIndex);

  useEffect(() => {
    if (displayedIndex !== currentIndex) {
      // Start transition
      const timer = setTimeout(() => {
        setDisplayedIndex(currentIndex);
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, displayedIndex]);

  const currentItem = items[displayedIndex];

  return (
    <div className="absolute inset-0">
      <div
        style={getSlideStyles(
          direction, 
          true, // isActive
          false, // isEntering 
          false  // isExiting
        )}
        key={displayedIndex}
      >
        <Image
          src={currentItem.image}
          alt={currentItem.alt || `Realizacja ${displayedIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 280px, 320px"
          priority={displayedIndex < 5}
          quality={GALLERY_CONFIG.MAIN_IMAGE_QUALITY}
          style={{
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden'
          }}
        />
      </div>
    </div>
  );
});

SlideTransition.displayName = 'SlideTransition';