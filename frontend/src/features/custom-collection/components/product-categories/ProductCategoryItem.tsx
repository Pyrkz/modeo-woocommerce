'use client';

import { memo } from 'react';
import type { ProductCategory } from '../../types';

interface ProductCategoryItemProps {
  category: ProductCategory;
  className?: string;
}

export const ProductCategoryItem = memo<ProductCategoryItemProps>(({ 
  category, 
  className = '' 
}) => {
  return (
    <div className={`flex items-start space-x-4 group py-2 ${className}`}>
      {/* Number Badge */}
      <div className="flex-shrink-0">
        <div 
          className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 text-base font-bold transition-colors duration-200"
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(204, 22, 22, 0.1)';
            e.currentTarget.style.color = 'var(--primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '';
            e.currentTarget.style.color = '';
          }}
        >
          {category.id.toString().padStart(2, '0')}
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 
          className="text-base md:text-lg font-bold text-gray-900 transition-colors duration-200 leading-tight"
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
          onMouseLeave={(e) => e.currentTarget.style.color = ''}
        >
          {category.title}
        </h3>
        <p className="text-sm text-gray-600 mt-1 leading-relaxed">
          {category.description}
        </p>
      </div>
    </div>
  );
});

ProductCategoryItem.displayName = 'ProductCategoryItem';