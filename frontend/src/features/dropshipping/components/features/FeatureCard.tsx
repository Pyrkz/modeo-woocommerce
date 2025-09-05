'use client';

import React from 'react';
import { DropshippingFeature } from '../../types';

interface FeatureCardProps {
  feature: DropshippingFeature;
}

export const FeatureCard = React.memo(function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start space-x-4">
        {/* Icon */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
            <span className="text-2xl">{feature.icon}</span>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">
            {feature.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  );
});