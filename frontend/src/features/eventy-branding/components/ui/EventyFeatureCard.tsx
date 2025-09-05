'use client';

import React from 'react';
import { EventyFeature } from '../../types';

interface EventyFeatureCardProps {
  feature: EventyFeature;
}

export const EventyFeatureCard = React.memo(({ feature }: EventyFeatureCardProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-2xl">{feature.icon}</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {feature.title}
          </h3>
          <p className="text-gray-600">
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  );
});

EventyFeatureCard.displayName = 'EventyFeatureCard';