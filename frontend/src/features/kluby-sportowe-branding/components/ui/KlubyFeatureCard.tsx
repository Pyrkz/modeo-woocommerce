'use client';

import React from 'react';
import { KlubyBenefit } from '../../types';

interface KlubyFeatureCardProps {
  benefit: KlubyBenefit;
  className?: string;
}

export const KlubyFeatureCard = React.memo(({ 
  benefit, 
  className = '' 
}: KlubyFeatureCardProps) => (
  <div className={`${benefit.highlight ? 'bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20' : 'bg-white border border-gray-200'} rounded-xl p-6 hover:shadow-lg transition-all duration-200 group ${className}`}>
    <div className="flex items-start">
      <div className="flex-shrink-0">
        <div className={`text-2xl mb-2 group-hover:scale-110 transition-transform duration-200 ${benefit.highlight ? 'filter drop-shadow-sm' : ''}`}>
          {benefit.icon}
        </div>
      </div>
      <div className="ml-4 flex-1">
        <h3 className={`text-lg font-bold mb-2 ${benefit.highlight ? 'text-primary' : 'text-gray-900'}`}>
          {benefit.title}
        </h3>
        <p className={`text-sm leading-relaxed ${benefit.highlight ? 'text-primary/80' : 'text-gray-600'}`}>
          {benefit.description}
        </p>
      </div>
    </div>
    
    {benefit.highlight && (
      <div className="mt-3 pt-3 border-t border-primary/20">
        <span className="inline-flex items-center text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Rekomendowane
        </span>
      </div>
    )}
  </div>
));

KlubyFeatureCard.displayName = 'KlubyFeatureCard';