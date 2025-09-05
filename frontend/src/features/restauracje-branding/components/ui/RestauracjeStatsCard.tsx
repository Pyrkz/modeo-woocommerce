'use client';

import React from 'react';

interface RestauracjeStatsCardProps {
  title: string;
  value: string;
  icon?: string;
  description?: string;
  className?: string;
}

export const RestauracjeStatsCard = React.memo(({ 
  title, 
  value, 
  icon,
  description,
  className = '' 
}: RestauracjeStatsCardProps) => {
  return (
    <div className={`text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 ${className}`}>
      {icon && (
        <div className="text-3xl mb-2">
          {icon}
        </div>
      )}
      
      <div className="text-3xl md:text-4xl font-bold text-white mb-2">
        {value}
      </div>
      
      <div className="text-white/90 font-medium text-sm md:text-base">
        {title}
      </div>
      
      {description && (
        <div className="text-white/70 text-xs md:text-sm mt-1">
          {description}
        </div>
      )}
    </div>
  );
});

RestauracjeStatsCard.displayName = 'RestauracjeStatsCard';