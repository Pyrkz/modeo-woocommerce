import { memo } from 'react';
import type { Statistic } from '../types';
import StatisticCard from './StatisticCard';

interface StatisticsGridProps {
  statistics: Statistic[];
  className?: string;
}

function StatisticsGrid({ statistics, className = '' }: StatisticsGridProps) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 ${className}`}>
      {statistics.map((statistic, index) => (
        <StatisticCard 
          key={statistic.id}
          statistic={statistic}
          index={index}
        />
      ))}
    </div>
  );
}

export default memo(StatisticsGrid);