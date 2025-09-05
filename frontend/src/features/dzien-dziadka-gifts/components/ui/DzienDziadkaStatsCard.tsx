'use client';

import React from 'react';
import { GiftIcon, ShieldCheckIcon, HeartIcon } from '@heroicons/react/24/outline';

interface DzienDziadkaStatsCardProps {
  title: string;
  value: string;
  icon: 'gift' | 'shield' | 'heart';
  description?: string;
}

const iconMap = {
  gift: GiftIcon,
  shield: ShieldCheckIcon,
  heart: HeartIcon
};

export const DzienDziadkaStatsCard = React.memo(({ 
  title, 
  value, 
  icon, 
  description 
}: DzienDziadkaStatsCardProps) => {
  const IconComponent = iconMap[icon];

  return (
    <div className="bg-slate-50 rounded-lg p-6 text-center border border-slate-100 hover:shadow-md transition-shadow">
      <div className="flex justify-center mb-4">
        <div className="bg-slate-100 p-3 rounded-full">
          <IconComponent className="w-6 h-6 text-slate-600" />
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-2xl font-bold text-slate-600 mb-1">
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

DzienDziadkaStatsCard.displayName = 'DzienDziadkaStatsCard';