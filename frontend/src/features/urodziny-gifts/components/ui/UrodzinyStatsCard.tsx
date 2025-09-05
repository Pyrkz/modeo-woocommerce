'use client';

import React from 'react';

interface UrodzinyStatsCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export const UrodzinyStatsCard = React.memo(({ 
  icon, 
  title, 
  description, 
  className = '' 
}: UrodzinyStatsCardProps) => {
  return (
    <div className={`flex flex-col items-center text-center p-4 ${className}`}>
      <div className="bg-yellow-100 p-3 rounded-full mb-3 transition-transform hover:scale-110">
        {icon}
      </div>
      <h3 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">{title}</h3>
      <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
});

UrodzinyStatsCard.displayName = 'UrodzinyStatsCard';