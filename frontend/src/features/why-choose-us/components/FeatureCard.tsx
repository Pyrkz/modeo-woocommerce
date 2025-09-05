import { memo } from 'react';
import type { FeatureCardProps } from '../types';
import { FeatureIcon, FeatureContent } from './ui';

function FeatureCard({ feature, className = '' }: FeatureCardProps) {
  const { icon, title, description, iconBgColor } = feature;

  return (
    <div className={`text-center p-6 ${className}`}>
      <FeatureIcon 
        icon={icon} 
        iconBgColor={iconBgColor}
        className="mx-auto"
      />
      <FeatureContent 
        title={title}
        description={description}
      />
    </div>
  );
}

export default memo(FeatureCard);