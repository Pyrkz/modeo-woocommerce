'use client';

import React from 'react';
import { HeroContent } from './HeroContent';
import { HeroImage } from './HeroImage';
import { FeaturesGrid } from '../features/FeaturesGrid';
import { BenefitsList } from '../benefits/BenefitsList';
import { useDropshippingData } from '../../hooks/useDropshippingData';

export const DropshippingHero = React.memo(function DropshippingHero() {
  const { heroData, features, benefits } = useDropshippingData();
  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-white py-16 lg:py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/images/pattern/subtle-grid.svg')] opacity-5"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative">
        {/* Main Hero Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          <HeroContent data={heroData} />
          <HeroImage data={heroData} />
        </div>

        {/* Features Grid */}
        <FeaturesGrid features={features} />

        {/* Benefits List */}
        <BenefitsList benefits={benefits} />
      </div>
    </section>
  );
});