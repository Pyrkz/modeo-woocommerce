'use client';

import React from 'react';
import { 
  GiftIcon, 
  HeartIcon, 
  TruckIcon, 
  StarIcon, 
  UsersIcon, 
  ShieldCheckIcon,
  SparklesIcon 
} from '@heroicons/react/24/outline';

interface DzienMamyStatsCardProps {
  title: string;
  value: string;
  icon: 'gift' | 'heart' | 'truck' | 'star' | 'users' | 'shield' | 'sparkles';
  description?: string;
}

const iconMap = {
  gift: GiftIcon,
  heart: HeartIcon,
  truck: TruckIcon,
  star: StarIcon,
  users: UsersIcon,
  shield: ShieldCheckIcon,
  sparkles: SparklesIcon,
};

const iconColorMap = {
  gift: 'text-green-500',
  heart: 'text-emerald-500',
  truck: 'text-blue-500',
  star: 'text-yellow-500',
  users: 'text-green-500',
  shield: 'text-emerald-500',
  sparkles: 'text-green-500',
};

const backgroundColorMap = {
  gift: 'bg-green-50',
  heart: 'bg-emerald-50',
  truck: 'bg-blue-50',
  star: 'bg-yellow-50',
  users: 'bg-green-50',
  shield: 'bg-emerald-50',
  sparkles: 'bg-green-50',
};

export const DzienMamyStatsCard = React.memo(({ 
  title, 
  value, 
  icon, 
  description 
}: DzienMamyStatsCardProps) => {
  const IconComponent = iconMap[icon];
  const iconColor = iconColorMap[icon];
  const backgroundColor = backgroundColorMap[icon];

  return (
    <div className={`${backgroundColor} rounded-lg p-6 text-center transition-all duration-300 hover:shadow-md`}>
      <div className={`inline-flex items-center justify-center w-12 h-12 ${backgroundColor} rounded-full mb-4`}>
        <IconComponent className={`w-6 h-6 ${iconColor}`} />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-1">
        {value}
      </h3>
      
      <p className="text-gray-600 font-medium">
        {title}
      </p>
      
      {description && (
        <p className="text-sm text-gray-500 mt-2">
          {description}
        </p>
      )}
    </div>
  );
});

DzienMamyStatsCard.displayName = 'DzienMamyStatsCard';