// Modular, optimized Znakowanie Gallery component
'use client';

import React, { useMemo } from 'react';

// Hooks
import { 
  useOptimizedReducedMotion, 
  useViewportAnimation, 
  useGalleryControls,
  useImagePreloader,
  useAnimationClasses
} from '../hooks';

// Components
import {
  PhoneMockup,
  DesktopControls,
  MobileControls,
  InstagramLink,
  ThumbnailButton
} from './index';

// Configuration and utilities
import { GALLERY_ITEMS } from '../config/gallery-data';
import { getSectionStyle, useWillChangeCleanup } from '../utils/performanceHelpers';
import { getFadeInUpStyles } from '../utils/nativeAnimations';
import { createAnimationVariants } from '../utils/animationVariants';

export default function ZnakowanieGallery() {
  // Hooks for performance and animations
  const animationConfig = useOptimizedReducedMotion();
  const { ref, isInView } = useViewportAnimation();
  
  // Create animation variants based on config
  const animationVariants = useMemo(() => 
    createAnimationVariants(animationConfig), 
    [animationConfig]
  );
  
  // Animation classes for different sections
  const { isVisible: thumbnailsVisible } = useAnimationClasses(isInView, animationConfig.shouldAnimate, 1);
  
  // Gallery controls and navigation
  const { controls, navigation, hoverHandlers } = useGalleryControls({
    totalItems: GALLERY_ITEMS.length
  });

  // Image preloading for better performance
  useImagePreloader({
    currentIndex: controls.currentIndex,
    galleryItems: GALLERY_ITEMS
  });

  // Performance-optimized styles
  const sectionStyle = useMemo(() => 
    getSectionStyle(animationConfig.shouldAnimate),
    [animationConfig.shouldAnimate]
  );

  const thumbnailStyle = useMemo(() => 
    getFadeInUpStyles(thumbnailsVisible, animationConfig.shouldAnimate, 1),
    [thumbnailsVisible, animationConfig.shouldAnimate]
  );

  // Cleanup will-change after animations
  useWillChangeCleanup(ref, animationConfig.shouldAnimate, animationConfig.transitionDuration);

  return (
    <section 
      ref={ref}
      className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden"
      style={sectionStyle}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div 
          className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        />
        <div 
          className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        />
        <div 
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-green-500/5 rounded-full blur-2xl"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative">

        {/* Main Gallery Display */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 xl:gap-16">
          
          {/* Left Controls - Desktop */}
          <DesktopControls
            position="left"
            currentIndex={controls.currentIndex}
            isAutoPlaying={controls.isAutoPlaying}
            isTransitioning={controls.isTransitioning}
            shouldAnimate={animationConfig.shouldAnimate}
            animationVariants={animationVariants}
            isInView={isInView}
            goToNext={navigation.goToNext}
            goToPrevious={navigation.goToPrevious}
            toggleAutoPlay={navigation.toggleAutoPlay}
          />

          {/* iPhone Mockup */}
          <PhoneMockup
            currentIndex={controls.currentIndex}
            direction={controls.direction}
            galleryItems={GALLERY_ITEMS}
            isAutoPlaying={controls.isAutoPlaying}
            isHovered={controls.isHovered}
            isTransitioning={controls.isTransitioning}
            animationVariants={animationVariants}
            isInView={isInView}
            onHoverStart={hoverHandlers.onHoverStart}
            onHoverEnd={hoverHandlers.onHoverEnd}
            goToNext={navigation.goToNext}
            goToPrevious={navigation.goToPrevious}
            goToSlide={navigation.goToSlide}
            shouldAnimate={animationConfig.shouldAnimate}
          />

          {/* Right Controls - Desktop */}
          <DesktopControls
            position="right"
            currentIndex={controls.currentIndex}
            isAutoPlaying={controls.isAutoPlaying}
            isTransitioning={controls.isTransitioning}
            shouldAnimate={animationConfig.shouldAnimate}
            animationVariants={animationVariants}
            isInView={isInView}
            goToNext={navigation.goToNext}
            goToPrevious={navigation.goToPrevious}
            toggleAutoPlay={navigation.toggleAutoPlay}
          />
        </div>

        {/* Mobile Controls */}
        <MobileControls
          currentIndex={controls.currentIndex}
          totalItems={GALLERY_ITEMS.length}
          isAutoPlaying={controls.isAutoPlaying}
          isTransitioning={controls.isTransitioning}
          shouldAnimate={animationConfig.shouldAnimate}
          animationVariants={animationVariants}
          isInView={isInView}
          goToNext={navigation.goToNext}
          goToPrevious={navigation.goToPrevious}
          toggleAutoPlay={navigation.toggleAutoPlay}
        />

        {/* Instagram Link */}
        <InstagramLink
          shouldAnimate={animationConfig.shouldAnimate}
          isInView={isInView}
        />

        {/* Thumbnail Grid - Desktop Only */}
        <div
          className="hidden md:flex justify-center mt-8 sm:mt-12 gap-1.5 sm:gap-2 max-w-4xl mx-auto flex-wrap"
          style={thumbnailStyle}
        >
          {GALLERY_ITEMS.map((item, index) => (
            <ThumbnailButton
              key={item.id}
              item={item}
              index={index}
              currentIndex={controls.currentIndex}
              isTransitioning={controls.isTransitioning}
              goToSlide={navigation.goToSlide}
              shouldAnimate={animationConfig.shouldAnimate}
            />
          ))}
        </div>
      </div>
    </section>
  );
}