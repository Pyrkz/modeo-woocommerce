'use client';

import { memo } from 'react';
import TechniqueCard from './TechniqueCard';
import { TechniquesGridProps } from '../../types/techniques';
import { useTechniquesPreload } from '../../hooks/useTechniquesPreload';

const TechniquesGrid = memo(({
  techniques,
  className = ''
}: TechniquesGridProps) => {
  // Preload technique pages for better performance
  useTechniquesPreload(techniques);

  return (
    <div className={`
      grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8
      ${className}
    `}>
      {techniques.map((technique, index) => (
        <TechniqueCard
          key={technique.id}
          technique={technique}
          priority={index < 6} // Prioritize first 6 images for LCP optimization
          className={`
            animate-in fade-in slide-in-from-bottom-4 duration-700
          `}
          style={{ 
            animationDelay: `${index * 100}ms`,
            animationFillMode: 'both'
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
});

TechniquesGrid.displayName = 'TechniquesGrid';

export default TechniquesGrid;