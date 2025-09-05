// Gallery control panels for desktop and mobile
'use client';

import React, { useMemo } from 'react';
import { NavigationButton } from './NavigationButton';
import { AutoPlayButton } from './AutoPlayButton';
import { getFadeInUpStyles } from '../utils/nativeAnimations';
import { useAnimationClasses } from '../hooks';
import type { ControlsProps } from '../types/gallery';

interface DesktopControlsProps extends Omit<ControlsProps, 'totalItems'> {
  position: 'left' | 'right';
}

export const DesktopControls = React.memo(({
  position,
  currentIndex,
  isAutoPlaying,
  isTransitioning,
  shouldAnimate,
  isInView,
  goToNext,
  goToPrevious,
  toggleAutoPlay
}: DesktopControlsProps) => {
  const { isVisible } = useAnimationClasses(isInView, shouldAnimate, 0.3);

  const controlStyle = useMemo(() => 
    getFadeInUpStyles(isVisible, shouldAnimate, 0.3),
    [isVisible, shouldAnimate]
  );

  return (
    <div
      className="hidden lg:flex flex-col items-center space-y-6"
      style={controlStyle}
    >
      {position === 'left' ? (
        <>
          <NavigationButton
            onClick={goToPrevious}
            disabled={isTransitioning}
            shouldAnimate={shouldAnimate}
            direction="prev"
            variant="desktop"
          />
          <AutoPlayButton
            isAutoPlaying={isAutoPlaying}
            onClick={toggleAutoPlay}
            shouldAnimate={shouldAnimate}
            variant="desktop"
          />
        </>
      ) : (
        <>
          <NavigationButton
            onClick={goToNext}
            disabled={isTransitioning}
            shouldAnimate={shouldAnimate}
            direction="next"
            variant="desktop"
          />
          <div 
            className="bg-white shadow-lg rounded-full px-4 py-2 text-sm font-medium text-gray-600"
            style={{
              transform: 'translate3d(0, 0, 0)',
              backfaceVisibility: 'hidden'
            }}
          >
            {currentIndex + 1} / {20}
          </div>
        </>
      )}
    </div>
  );
});

DesktopControls.displayName = 'DesktopControls';

export const MobileControls = React.memo(({
  currentIndex,
  totalItems,
  isAutoPlaying,
  isTransitioning,
  shouldAnimate,
  isInView,
  goToNext,
  goToPrevious,
  toggleAutoPlay
}: ControlsProps) => {
  const { isVisible } = useAnimationClasses(isInView, shouldAnimate, 0.6);

  const controlStyle = useMemo(() => 
    getFadeInUpStyles(isVisible, shouldAnimate, 0.6),
    [isVisible, shouldAnimate]
  );

  return (
    <div
      className="flex lg:hidden justify-center items-center gap-3 sm:gap-4 mt-6 sm:mt-8"
      style={controlStyle}
    >
      <NavigationButton
        onClick={goToPrevious}
        disabled={isTransitioning}
        shouldAnimate={shouldAnimate}
        direction="prev"
        variant="mobile"
      />

      <div 
        className="bg-white shadow-lg rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-600"
        style={{
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden'
        }}
      >
        {currentIndex + 1} / {totalItems}
      </div>

      <AutoPlayButton
        isAutoPlaying={isAutoPlaying}
        onClick={toggleAutoPlay}
        shouldAnimate={shouldAnimate}
        variant="mobile"
      />

      <NavigationButton
        onClick={goToNext}
        disabled={isTransitioning}
        shouldAnimate={shouldAnimate}
        direction="next"
        variant="mobile"
      />
    </div>
  );
});

MobileControls.displayName = 'MobileControls';