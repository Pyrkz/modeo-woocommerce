'use client';

import { memo } from 'react';
import type { HeroSectionData } from '../../types';
import { HeroTitle } from './HeroTitle';
import { HeroCTA } from './HeroCTA';

interface HeroHeaderProps {
  data: HeroSectionData;
}

const HeroHeaderComponent = ({ data }: HeroHeaderProps) => {
  return (
    <div className="relative mb-16">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl opacity-20" />
      </div>
      
      {/* Content */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
        <HeroTitle title={data.title} subtitle={data.subtitle} />
        
        <div className="flex-shrink-0">
          <HeroCTA text={data.cta.text} href={data.cta.href} />
        </div>
      </div>
    </div>
  );
};

export const HeroHeader = memo(HeroHeaderComponent);