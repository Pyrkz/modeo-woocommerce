'use client';

import { memo } from 'react';
import Image from 'next/image';
import { BusinessFeatureCard } from './BusinessFeatureCard';
import type { BusinessPartnerData } from '../../types';

interface BusinessPartnerSectionProps {
  data: BusinessPartnerData;
  className?: string;
}

export const BusinessPartnerSection = memo<BusinessPartnerSectionProps>(({ 
  data, 
  className = '' 
}) => {
  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block">
            <span className="inline-block text-white text-sm font-medium px-4 py-2 rounded-full mb-4" style={{ backgroundColor: 'var(--primary)' }}>
              {data.badge}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {data.title}
          </h2>
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--primary)' }}>
            {data.subtitle}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Features Grid - All 6 features */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.features.map((feature, index) => (
                <div 
                  key={feature.id}
                  className="opacity-0 animate-fade-in"
                  style={{ 
                    animationDelay: `${index * 150}ms`, 
                    animationFillMode: 'forwards' 
                  }}
                >
                  <BusinessFeatureCard feature={feature} />
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={data.image.src}
                  alt={data.image.alt}
                  width={400}
                  height={500}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  priority={data.image.priority}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

BusinessPartnerSection.displayName = 'BusinessPartnerSection';