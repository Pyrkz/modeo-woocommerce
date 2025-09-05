'use client';

import { memo } from 'react';
import { AccentTitle, ServiceHeading, ServiceDescription, SectionDivider } from './ui';
import { ExpertServicesWrapper } from './layout';
import { useExpertServicesData } from '../hooks';

const ExpertServicesSectionComponent = () => {
  const data = useExpertServicesData();
  return (
    <ExpertServicesWrapper>
      {/* Left Column - Content */}
      <div className="space-y-6">
        <AccentTitle>
          {data.accentTitle}
        </AccentTitle>
        
        <SectionDivider />
        
        <ServiceHeading
          beforeAccent={data.mainHeading.beforeAccent}
          accent={data.mainHeading.accent}
          afterAccent={data.mainHeading.afterAccent}
        />
        
        <ServiceDescription
          intro={data.description.intro}
          highlight={data.description.highlight}
          conclusion={data.description.conclusion}
        />
      </div>

      {/* Right Column - Visual Element (can be added later) */}
      <div className="relative">
        {/* This space is reserved for future visual content like images, graphics, or CTA */}
        <div className="hidden lg:block h-96 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl opacity-20" />
      </div>
    </ExpertServicesWrapper>
  );
};

export const ExpertServicesSection = memo(ExpertServicesSectionComponent);