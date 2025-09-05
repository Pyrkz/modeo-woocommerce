'use client';

import { memo } from 'react';
import CategoryCard from './CategoryCard';
import { CategoryCard as CategoryType } from '../types';
import { useCategoriesPreload } from '../hooks/useCategoriesPreload';

interface CategoriesGridProps {
  categories: CategoryType[];
  showArrow?: boolean;
  className?: string;
}

const CategoriesGrid = memo(({
  categories,
  showArrow = true,
  className = ''
}: CategoriesGridProps) => {
  // Preload category links for better performance
  useCategoriesPreload(categories);

  return (
    <div className={`
      grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 
      gap-4 sm:gap-6 lg:gap-8
      ${className}
    `}>
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          showArrow={showArrow}
        />
      ))}
    </div>
  );
});

CategoriesGrid.displayName = 'CategoriesGrid';

export default CategoriesGrid;