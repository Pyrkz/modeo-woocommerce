'use client';

import React from 'react';
import { GiftIcon, HeartIcon } from '@heroicons/react/24/outline';

interface ZwierzakiStatsCardProps {
  title: string;
  value: string;
  icon: 'gift' | 'paw' | 'heart';
  description?: string;
}

const iconMap = {
  gift: GiftIcon,
  paw: () => <span className="text-2xl">🐾</span>,
  heart: HeartIcon
};

export const ZwierzakiStatsCard = React.memo(({ 
  title, 
  value, 
  icon, 
  description 
}: ZwierzakiStatsCardProps) => {
  const IconComponent = iconMap[icon];

  return (
    <div className="bg-orange-50 rounded-lg p-6 text-center border border-orange-100 hover:shadow-md transition-shadow">
      <div className="flex justify-center mb-4">
        <div className="bg-orange-100 p-3 rounded-full">
          {icon === 'paw' ? (
            <IconComponent />
          ) : (
            <IconComponent className="w-6 h-6 text-orange-600" />
          )}
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-2xl font-bold text-orange-600 mb-1">
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

ZwierzakiStatsCard.displayName = 'ZwierzakiStatsCard';