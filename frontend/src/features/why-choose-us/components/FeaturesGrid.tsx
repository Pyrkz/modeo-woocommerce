import { memo } from 'react';
import type { Feature } from '../types';
import FeatureCard from './FeatureCard';

interface FeaturesGridProps {
  features: Feature[];
  className?: string;
}

function FeaturesGrid({ features, className = '' }: FeaturesGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 ${className}`}>
      {features.map((feature) => (
        <FeatureCard 
          key={feature.id}
          feature={feature}
        />
      ))}
    </div>
  );
}

export default memo(FeaturesGrid);