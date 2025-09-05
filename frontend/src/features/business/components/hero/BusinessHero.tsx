'use client';

import { memo } from 'react';
import Image from 'next/image';

interface BusinessHeroProps {
  title: string;
  subtitle: string;
  description: string;
  ctaButton: {
    text: string;
    href: string;
  };
  backgroundImage: string;
}

const BusinessHero = memo<BusinessHeroProps>(({ 
  title, 
  subtitle, 
  description, 
  backgroundImage 
}) => {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Modeo dla firm"
          fill
          className="object-cover object-center"
          priority
          quality={85}
          sizes="100vw"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-2xl">
          {/* Breadcrumb/Category */}
          <p className="text-primary font-semibold text-lg mb-4 tracking-wide">
            {subtitle}
          </p>
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {title}
          </h1>
          
          {/* Description */}
          <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-xl">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
});

BusinessHero.displayName = 'BusinessHero';

export default BusinessHero;