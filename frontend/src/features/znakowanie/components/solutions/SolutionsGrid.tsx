'use client';

import { memo } from 'react';
import SolutionCard from './SolutionCard';
import { SolutionsGridProps } from '../../types/solutions';

const SolutionsGrid = memo(({
  solutions,
  className = ''
}: SolutionsGridProps) => (
  <div className={`
    grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12
    ${className}
  `}>
    {solutions.map((solution) => (
      <SolutionCard
        key={solution.id}
        solution={solution}
      />
    ))}
  </div>
));

SolutionsGrid.displayName = 'SolutionsGrid';

export default SolutionsGrid;