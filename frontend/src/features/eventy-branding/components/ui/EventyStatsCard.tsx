'use client';

import React from 'react';

interface EventyStatsCardProps {
  stat: {
    label: string;
    value: string;
    icon: string;
  };
}

export const EventyStatsCard = React.memo(({ stat }: EventyStatsCardProps) => {
  return (
    <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="text-3xl mb-3">{stat.icon}</div>
      <div className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</div>
      <div className="text-gray-600 font-medium">{stat.label}</div>
    </div>
  );
});

EventyStatsCard.displayName = 'EventyStatsCard';