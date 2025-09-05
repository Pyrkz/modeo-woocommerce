'use client';

import { memo } from 'react';
import TechniquesHeader from './TechniquesHeader';
import TechniquesGrid from './TechniquesGrid';
import { techniquesData, techniquesSectionContent } from '../../data/techniquesData';
import { TechniquesSectionProps } from '../../types/techniques';

const TechniquesSection = memo(({
  title = techniquesSectionContent.title,
  subtitle = techniquesSectionContent.subtitle,
  badgeText = techniquesSectionContent.badgeText,
  techniques = techniquesData,
  className = ''
}: TechniquesSectionProps) => (
  <section 
    className={`py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white ${className}`}
    aria-labelledby="techniques-section-title"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 lg:mb-16">
        <TechniquesHeader
          badgeText={badgeText}
          title={title}
          subtitle={subtitle}
        />
      </div>
      
      <div className="relative">
        <TechniquesGrid
          techniques={techniques}
          className="max-w-6xl mx-auto"
        />
        
        {/* Subtle background decoration */}
        <div 
          className="absolute inset-0 -z-10 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)',
          }}
        />
      </div>
    </div>
  </section>
));

TechniquesSection.displayName = 'TechniquesSection';

export default TechniquesSection;