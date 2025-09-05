import { memo } from 'react';
import type { Statistic } from '../types';
import StatisticsGrid from './StatisticsGrid';

interface StatisticsSectionProps {
  title: string;
  statistics: Statistic[];
  className?: string;
}

function StatisticsSection({ title, statistics, className = '' }: StatisticsSectionProps) {
  return (
    <div className={`mt-20 ${className}`}>
      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
        {title}
      </h3>
      <StatisticsGrid statistics={statistics} />
    </div>
  );
}

export default memo(StatisticsSection);