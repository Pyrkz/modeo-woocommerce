'use client';

import React from 'react';
import { GiftIcon, HomeIcon, HeartIcon } from '@heroicons/react/24/outline';

interface ParapetowkaStatsCardProps {
  title: string;
  value: string;
  icon: 'gift' | 'home' | 'heart';
  description?: string;
}

const iconMap = {
  gift: GiftIcon,
  home: HomeIcon,
  heart: HeartIcon
};

export const ParapetowkaStatsCard = React.memo(({ 
  title, 
  value, 
  icon, 
  description 
}: ParapetowkaStatsCardProps) => {
  const IconComponent = iconMap[icon];

  return (
    <div className="bg-green-50 rounded-lg p-6 text-center border border-green-100 hover:shadow-md transition-shadow">
      <div className="flex justify-center mb-4">
        <div className="bg-green-100 p-3 rounded-full">
          <IconComponent className="w-6 h-6 text-green-600" />
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-2xl font-bold text-green-600 mb-1">
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

ParapetowkaStatsCard.displayName = 'ParapetowkaStatsCard';