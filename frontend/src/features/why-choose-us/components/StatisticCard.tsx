import { memo } from 'react';
import type { StatisticCardProps } from '../types';

function StatisticCard({ statistic, className = '' }: StatisticCardProps) {
  const { value, label, color = 'text-red-600' } = statistic;

  return (
    <div className={`text-center ${className}`}>
      <div className={`text-4xl md:text-5xl lg:text-6xl font-bold ${color} mb-2`}>
        {value}
      </div>
      <div className="text-gray-600 text-sm md:text-base font-medium">
        {label}
      </div>
    </div>
  );
}

export default memo(StatisticCard);