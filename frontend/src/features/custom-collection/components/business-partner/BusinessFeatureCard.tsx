'use client';

import { memo } from 'react';
import type { BusinessFeature } from '../../types';

interface BusinessFeatureCardProps {
  feature: BusinessFeature;
  className?: string;
}

export const BusinessFeatureCard = memo<BusinessFeatureCardProps>(({ 
  feature, 
  className = '' 
}) => {
  return (
    <div className={`group relative bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${className}`}>
      {/* Icon */}
      <div className="mb-4">
        <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
          {feature.icon}
        </div>
      </div>
      
      {/* Content */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-gray-800 transition-colors duration-300">
          {feature.title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {feature.description}
        </p>
      </div>
      
      {/* Hover Effect Overlay */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" 
        style={{ 
          background: 'linear-gradient(135deg, rgba(204, 22, 22, 0.05) 0%, rgba(204, 22, 22, 0.1) 100%)' 
        }}
      />
    </div>
  );
});

BusinessFeatureCard.displayName = 'BusinessFeatureCard';