'use client';

import React from 'react';
import { GiftIcon, HeartIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface DzienBabciStatsCardProps {
  title: string;
  value: string;
  icon: 'gift' | 'heart' | 'sparkles';
  description?: string;
}

const iconMap = {
  gift: GiftIcon,
  heart: HeartIcon,
  sparkles: SparklesIcon
};

export const DzienBabciStatsCard = React.memo(({ 
  title, 
  value, 
  icon, 
  description 
}: DzienBabciStatsCardProps) => {
  const IconComponent = iconMap[icon];

  return (
    <div className="bg-purple-50 rounded-lg p-6 text-center border border-purple-100 hover:shadow-md transition-shadow">
      <div className="flex justify-center mb-4">
        <div className="bg-purple-100 p-3 rounded-full">
          <IconComponent className="w-6 h-6 text-purple-600" />
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-2xl font-bold text-purple-600 mb-1">
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

DzienBabciStatsCard.displayName = 'DzienBabciStatsCard';