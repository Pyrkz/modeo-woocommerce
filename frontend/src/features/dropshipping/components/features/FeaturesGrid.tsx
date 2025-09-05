'use client';

import React from 'react';
import { FeatureCard } from './FeatureCard';
import { DropshippingFeature } from '../../types';

interface FeaturesGridProps {
  features: DropshippingFeature[];
}

export function FeaturesGrid({ features }: FeaturesGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature) => (
        <FeatureCard key={feature.id} feature={feature} />
      ))}
    </div>
  );
}