import { memo } from 'react';
import type { CategoryGridProps } from '../types';
import ProductCategoryCard from './ProductCategoryCard';

function ProductCategoriesGrid({ categories, className = '' }: CategoryGridProps) {
  return (
    <div 
      className={`grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 grid-rows-[repeat(5,minmax(250px,auto))] md:grid-rows-[repeat(3,minmax(300px,auto))] ${className}`}
      style={{ contentVisibility: 'auto' }}
    >
      {categories.map((category, index) => (
        <ProductCategoryCard
          key={category.id}
          category={category}
          priority={index === 0} // Only first image gets priority loading
          sizes={
            category.className?.includes('md:col-span-3')
              ? '(max-width: 768px) 100vw, 100vw'
              : category.className?.includes('md:col-span-2') 
              ? '(max-width: 768px) 100vw, 66vw'
              : '(max-width: 768px) 100vw, 33vw'
          }
        />
      ))}
    </div>
  );
}

export default memo(ProductCategoriesGrid);