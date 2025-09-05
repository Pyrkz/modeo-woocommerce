// iPhone mockup component with optimized image carousel
'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import { SlideTransition } from './SlideTransition';
import { ProgressBars } from './ProgressBars';
import { getFadeInUpStyles } from '../utils/nativeAnimations';
import { useAnimationClasses } from '../hooks';
import type { PhoneMockupProps } from '../types/gallery';

export const PhoneMockup = React.memo(({
  currentIndex,
  direction,
  galleryItems,
  isAutoPlaying,
  isHovered,
  isTransitioning,
  isInView,
  onHoverStart,
  onHoverEnd,
  goToNext,
  goToPrevious,
  goToSlide,
  shouldAnimate
}: PhoneMockupProps) => {
  const { isVisible } = useAnimationClasses(isInView, shouldAnimate, 0);

  const phoneStyle = useMemo(() => 
    getFadeInUpStyles(isVisible, shouldAnimate, 0),
    [isVisible, shouldAnimate]
  );

  const screenContainment = useMemo(() => ({
    contain: 'layout style paint' as const
  }), []);

  return (
    <div
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      className="relative flex-shrink-0"
      style={phoneStyle}
    >
      {/* Phone Frame */}
      <div className="relative w-[260px] h-[520px] sm:w-[280px] sm:h-[560px] md:w-[320px] md:h-[640px]">
        <Image
          src="/resources/Phone-mockup-min.webp"
          alt="iPhone mockup"
          fill
          className="object-contain z-10 pointer-events-none"
          sizes="(max-width: 640px) 280px, 320px"
          priority
          style={{
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden'
          }}
        />
        
        {/* Screen Content Area */}
        <div 
          className="absolute top-[3%] left-[8%] right-[8%] bottom-[3%] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden bg-black"
          style={screenContainment}
        >
          <SlideTransition
            items={galleryItems}
            currentIndex={currentIndex}
            direction={direction}
          />
          
          {/* Instagram-like Stories Progress Bars */}
          <ProgressBars
            items={galleryItems}
            currentIndex={currentIndex}
            isAutoPlaying={isAutoPlaying}
            isHovered={isHovered}
            isTransitioning={isTransitioning}
            onBarClick={goToSlide}
          />

          {/* Touch Areas for Mobile Navigation */}
          <div 
            className="absolute left-0 top-0 w-1/3 h-full z-10 cursor-pointer lg:hidden"
            onClick={goToPrevious}
            aria-label="Poprzednie zdjęcie"
          />
          <div 
            className="absolute right-0 top-0 w-1/3 h-full z-10 cursor-pointer lg:hidden"
            onClick={goToNext}
            aria-label="Następne zdjęcie"
          />
        </div>

        {/* Floating shadow */}
        <div 
          className="absolute inset-0 bg-black/10 rounded-[2.5rem] sm:rounded-[3rem] blur-2xl scale-95 -z-10"
          style={{
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden'
          }}
        />
      </div>
    </div>
  );
});

PhoneMockup.displayName = 'PhoneMockup';