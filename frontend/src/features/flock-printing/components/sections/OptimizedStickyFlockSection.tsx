'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { OptimizedHeroSection } from './OptimizedHeroSection';
import { OptimizedProductSection } from './OptimizedProductSection';
import { useScrollEffects } from '../../hooks/useScrollEffects';

interface OptimizedStickyFlockSectionProps {
  onQuoteClick?: () => void;
}

export const OptimizedStickyFlockSection: React.FC<OptimizedStickyFlockSectionProps> = ({ 
  onQuoteClick 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { imageScale, imageOpacity } = useScrollEffects();

  return (
    <div ref={containerRef} className="relative min-h-screen lg:h-[200vh] mb-20 md:mb-24 lg:mb-0">
      
      {/* Skip link for accessibility */}
      <a 
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-primary text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        tabIndex={0}
      >
        Przejdź do głównej treści
      </a>

      {/* DESKTOP: FLOCK BACKGROUND - NOT STICKY, just positioned */}
      <div className="hidden lg:block absolute top-0 left-0 w-full h-screen pointer-events-none z-0">
        <div className="flex items-center justify-center h-full">
          <div 
            className="transition-all duration-1000 ease-out"
            style={{
              opacity: 0.3,
              transform: 'scale(1)'
            }}
          >
            <Image
              src="/znakowanie/flock-min.png"
              alt="Flock Background"
              width={1200}
              height={500}
              className="w-full h-auto max-w-[900px] xl:max-w-[1200px]"
              loading="eager"
              priority
            />
          </div>
        </div>
      </div>

      {/* DESKTOP: STICKY T-SHIRT - ONLY THIS IS STICKY */}
      <div className="hidden lg:block sticky top-0 h-screen pointer-events-none z-30">
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="transition-all duration-300 ease-out"
            style={{ 
              transform: `scale(${imageScale})`,
              opacity: imageOpacity
            }}
          >
            <Image
              src="/resources/Odpicuj-swoja-koszulke-min.webp"
              alt="Personalizowana koszulka z flock"
              width={500}
              height={500}
              className="drop-shadow-2xl w-[500px] h-[500px]"
              priority
              quality={90}
            />
          </div>
        </div>
      </div>

      {/* MAIN CONTENT - normal flow on mobile, absolute on desktop */}
      <main id="main-content" className="relative lg:absolute lg:top-0 lg:left-0 w-full z-10">
        
        {/* HERO SECTION */}
        <section aria-labelledby="hero-heading">
          <h1 id="hero-heading" className="sr-only">Sekcja główna - Flock</h1>
          <OptimizedHeroSection />
        </section>
        
        {/* PRODUCT SECTION - normal flow on mobile, absolute on desktop */}
        <section 
          className="relative lg:absolute lg:top-[100vh] lg:left-0 w-full z-10"
          aria-labelledby="products-heading"
        >
          <h2 id="products-heading" className="sr-only">Sekcja produktów - Flock</h2>
          <OptimizedProductSection onQuoteClick={onQuoteClick} />
        </section>
      </main>
    </div>
  );
};

export default React.memo(OptimizedStickyFlockSection);