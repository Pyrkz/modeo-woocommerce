'use client';

import React from 'react';
import { GiftIcon, AcademicCapIcon, BookOpenIcon } from '@heroicons/react/24/outline';

interface DzienNauczycielaStatsCardProps {
  title: string;
  value: string;
  icon: 'gift' | 'academic' | 'book';
  description?: string;
}

const iconMap = {
  gift: GiftIcon,
  academic: AcademicCapIcon,
  book: BookOpenIcon
};

export const DzienNauczycielaStatsCard = React.memo(({ 
  title, 
  value, 
  icon, 
  description 
}: DzienNauczycielaStatsCardProps) => {
  const IconComponent = iconMap[icon];

  return (
    <div className="bg-blue-50 rounded-lg p-6 text-center border border-blue-100 hover:shadow-md transition-shadow">
      <div className="flex justify-center mb-4">
        <div className="bg-blue-100 p-3 rounded-full">
          <IconComponent className="w-6 h-6 text-blue-600" />
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-2xl font-bold text-blue-600 mb-1">
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

DzienNauczycielaStatsCard.displayName = 'DzienNauczycielaStatsCard';