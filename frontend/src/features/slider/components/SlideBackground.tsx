'use client';

import { memo } from 'react';
import Image from 'next/image';
import SliderOverlay from './SliderOverlay';

interface SlideBackgroundProps {
  slides: Array<{
    id: string;
    imagePath: string;
    imageAlt: string;
  }>;
  currentSlide: number;
}

const SlideBackground = memo(({ slides, currentSlide }: SlideBackgroundProps) => {
  return (
    <div className="absolute inset-0">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.imagePath}
            alt={slide.imageAlt}
            fill
            className="object-cover"
            priority={index === 0}
            loading={index === 0 ? 'eager' : 'lazy'}
            sizes="100vw"
          />
          <SliderOverlay variant="gradient" opacity="medium" />
        </div>
      ))}
    </div>
  );
});

SlideBackground.displayName = 'SlideBackground';

export default SlideBackground;