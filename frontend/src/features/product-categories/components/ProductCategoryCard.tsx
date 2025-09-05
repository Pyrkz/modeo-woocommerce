'use client';

import { memo } from 'react';
import type { CategoryCardProps } from '../types';
import { OptimizedCategoryImage, CategoryOverlay, CategoryContent } from './ui';

function ProductCategoryCard({ 
  category, 
  className = '', 
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
}: CategoryCardProps) {
  const { image, imageAlt, className: categoryClassName, id } = category;
  
  // Set different min heights for specific categories
  const getMinHeight = (categoryId: string) => {
    if (categoryId === 'odziez-robocza' || categoryId === 'zestawy-prezentowe') {
      return 'min-h-[350px] md:min-h-[400px]';
    }
    return 'min-h-[250px] md:min-h-[300px]';
  };
  
  const cardClasses = `
    relative overflow-hidden rounded-2xl bg-gray-100 
    cursor-pointer h-full ${getMinHeight(id)}
    ${categoryClassName || ''} 
    ${className}
  `.trim();

  return (
    <div className={cardClasses}>
      <OptimizedCategoryImage
        src={image}
        alt={imageAlt}
        priority={priority}
        sizes={sizes}
      />
      <CategoryOverlay />
      <CategoryContent category={category} />
    </div>
  );
}

export default memo(ProductCategoryCard);