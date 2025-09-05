'use client';

import React from 'react';
import { RestauracjeFeature } from '../../types';

interface RestauracjeFeatureCardProps {
  feature: RestauracjeFeature;
  className?: string;
}

export const RestauracjeFeatureCard = React.memo(({ 
  feature, 
  className = '' 
}: RestauracjeFeatureCardProps) => {
  return (
    <div className={`group p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ${className}`}>
      {/* Icon */}
      <div className="text-4xl mb-4">
        {feature.icon}
      </div>
      
      {/* Title */}
      <h3 className={`text-lg font-semibold mb-3 ${feature.color} group-hover:text-primary-dark transition-colors`}>
        {feature.title}
      </h3>
      
      {/* Description */}
      <p className="text-gray-600 leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
});

RestauracjeFeatureCard.displayName = 'RestauracjeFeatureCard';