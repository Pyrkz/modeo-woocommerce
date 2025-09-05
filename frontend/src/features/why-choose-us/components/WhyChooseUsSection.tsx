'use client';

import { memo } from 'react';
import type { WhyChooseUsSectionProps } from '../types';
import { useWhyChooseUs } from '../hooks';
import WhyChooseUsHeader from './WhyChooseUsHeader';
import FeaturesGrid from './FeaturesGrid';
import StatisticsSection from './StatisticsSection';

function WhyChooseUsSection({ data, className = '' }: WhyChooseUsSectionProps) {
  const { data: defaultData } = useWhyChooseUs();
  const sectionData = data || defaultData;
  
  const { 
    badge, 
    title, 
    subtitle, 
    description, 
    features, 
    statisticsTitle, 
    statistics 
  } = sectionData;

  return (
    <section className={`py-16 md:py-24 bg-white ${className}`}>
      <div className="container mx-auto px-4">
        <WhyChooseUsHeader
          badge={badge}
          title={title}
          subtitle={subtitle}
          description={description}
        />
        
        <FeaturesGrid 
          features={features}
          className="max-w-6xl mx-auto"
        />
        
        <StatisticsSection
          title={statisticsTitle}
          statistics={statistics}
          className="max-w-5xl mx-auto"
        />
      </div>
    </section>
  );
}

export default memo(WhyChooseUsSection);