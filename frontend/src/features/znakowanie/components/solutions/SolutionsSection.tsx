'use client';

import { memo } from 'react';
import SolutionsHeader from './SolutionsHeader';
import SolutionsGrid from './SolutionsGrid';
import SolutionsCTA from './SolutionsCTA';
import { solutionsData, solutionsSectionContent } from '../../data/solutionsData';
import { SolutionsSectionProps } from '../../types/solutions';

const SolutionsSection = memo(({
  title = solutionsSectionContent.title,
  subtitle = solutionsSectionContent.subtitle,
  badgeText = solutionsSectionContent.badgeText,
  solutions = solutionsData,
  className = ''
}: SolutionsSectionProps) => (
  <section className={`py-16 lg:py-20 bg-gray-50 ${className}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SolutionsHeader
        badgeText={badgeText}
        title={title}
        subtitle={subtitle}
      />
      
      <SolutionsGrid
        solutions={solutions}
        className="max-w-6xl mx-auto"
      />
      
      <SolutionsCTA />
    </div>
  </section>
));

SolutionsSection.displayName = 'SolutionsSection';

export default SolutionsSection;