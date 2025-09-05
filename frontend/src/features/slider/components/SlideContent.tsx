'use client';

import { memo } from 'react';
import Link from 'next/link';

interface SlideData {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  imagePath: string;
  imageAlt: string;
}

interface SlideContentProps {
  slide: SlideData;
}

const SlideContent = memo(({ slide }: SlideContentProps) => {
  return (
    <div className="relative z-10 h-full flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl lg:max-w-3xl">
          {slide.subtitle && (
            <p className="text-white/95 text-base sm:text-lg lg:text-xl mb-3 sm:mb-4 font-medium tracking-wide">
              {slide.subtitle}
            </p>
          )}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow-lg">
            {slide.title}
          </h1>
          <p className="text-white/95 text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 leading-relaxed max-w-2xl drop-shadow-md">
            {slide.description}
          </p>
          <Link
            href={slide.ctaHref}
            className="inline-block bg-primary hover:bg-primary/90 focus:bg-primary/90 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-200 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-primary/30 focus:outline-none"
            aria-label={`${slide.ctaText} - ${slide.title}`}
          >
            {slide.ctaText}
          </Link>
        </div>
      </div>
    </div>
  );
});

SlideContent.displayName = 'SlideContent';

export default SlideContent;