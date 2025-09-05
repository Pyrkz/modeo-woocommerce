'use client';

import React from 'react';

interface SzkolyStatsCardProps {
  title: string;
  value: string;
  description?: string;
  icon?: string;
  className?: string;
}

export const SzkolyStatsCard = React.memo(({ 
  title, 
  value, 
  description, 
  icon,
  className = '' 
}: SzkolyStatsCardProps) => (
  <div className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-md transition-all duration-200 group ${className}`}>
    {icon && (
      <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200">
        {icon}
      </div>
    )}
    <div className="text-3xl font-bold text-gray-900 mb-2">
      {value}
    </div>
    <div className="text-lg font-semibold text-gray-800 mb-1">
      {title}
    </div>
    {description && (
      <div className="text-sm text-gray-600">
        {description}
      </div>
    )}
  </div>
));

SzkolyStatsCard.displayName = 'SzkolyStatsCard';