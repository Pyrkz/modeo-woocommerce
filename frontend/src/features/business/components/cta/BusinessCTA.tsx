'use client';

import { memo } from 'react';
import Link from 'next/link';
import SectionBadge from '@/components/ui/SectionBadge';
import { BusinessCTAProps } from '../../types/cta';

const BusinessCTA = memo<BusinessCTAProps>(({ 
  badge, 
  title, 
  description, 
  primaryButton, 
  secondaryButton 
}) => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl p-12 lg:p-16 relative overflow-hidden">
          
          {/* Background decorative elements */}
          <div className="absolute top-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/3 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 max-w-4xl">
            
            {/* Badge */}
            <div className="mb-6">
              <SectionBadge variant="secondary" className="bg-white/10 text-white/80 border border-white/20">
                {badge}
              </SectionBadge>
            </div>
            
            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {title}
            </h2>
            
            {/* Description */}
            <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 max-w-3xl">
              {description}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={primaryButton.href}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 hover:bg-gray-100 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                {primaryButton.text}
              </Link>
              
              <Link
                href={secondaryButton.href}
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white/30 text-white hover:border-white/50 hover:bg-white/10 font-semibold rounded-full transition-all duration-300"
              >
                {secondaryButton.text}
              </Link>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
});

BusinessCTA.displayName = 'BusinessCTA';

export default BusinessCTA;