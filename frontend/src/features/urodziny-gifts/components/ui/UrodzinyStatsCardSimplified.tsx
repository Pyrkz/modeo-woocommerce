'use client';

import React from 'react';
import { GiftIcon, CakeIcon } from '@heroicons/react/24/outline';

interface UrodzinyStatsCardSimplifiedProps {
  title: string;
  value: string;
  icon: 'gift' | 'cake' | 'party';
  description?: string;
}

const iconMap = {
  gift: GiftIcon,
  cake: CakeIcon,
  party: () => <span className="text-2xl">🎉</span>
};

export const UrodzinyStatsCardSimplified = React.memo(({ 
  title, 
  value, 
  icon, 
  description 
}: UrodzinyStatsCardSimplifiedProps) => {
  const IconComponent = iconMap[icon];

  return (
    <div className="bg-yellow-50 rounded-lg p-6 text-center border border-yellow-100 hover:shadow-md transition-shadow">
      <div className="flex justify-center mb-4">
        <div className="bg-yellow-100 p-3 rounded-full">
          {icon === 'party' ? (
            <IconComponent />
          ) : (
            <IconComponent className="w-6 h-6 text-yellow-600" />
          )}
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-2xl font-bold text-yellow-600 mb-1">
        {value}
      </p>
      
      {description && (
        <p className="text-sm text-gray-600">
          {description}
        </p>
      )}
    </div>
  );
});

UrodzinyStatsCardSimplified.displayName = 'UrodzinyStatsCardSimplified';