'use client';

import React from 'react';

interface NaPrezentStatsCardProps {
  title: string;
  value: string;
  description?: string;
  icon?: string;
  className?: string;
}

export const NaPrezentStatsCard = React.memo(({ 
  title, 
  value, 
  description, 
  icon,
  className = '' 
}: NaPrezentStatsCardProps) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-md transition-shadow duration-200 ${className}`}>
    {icon && (
      <div className="text-2xl mb-3">
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

NaPrezentStatsCard.displayName = 'NaPrezentStatsCard';