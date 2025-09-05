'use client';

import { memo } from 'react';
import { getCategoryIcon } from '@/utils/categoryIcons';

interface CategoryHeaderProps {
  categoryName: string;
  categorySlug: string;
  totalProducts: number;
  currentProductsCount: number;
  description?: string;
}

export const CategoryHeader = memo<CategoryHeaderProps>(({
  categoryName,
  categorySlug,
  totalProducts,
  currentProductsCount,
  description
}) => {
  const categoryIcon = getCategoryIcon(categorySlug);

  return (
    <div className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center justify-center w-12 h-12 bg-primary text-white rounded-lg">
            {categoryIcon}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{categoryName}</h1>
            <p className="text-gray-600 mt-1">
              {totalProducts > 0 ? (
                <>
                  Wyświetlanie {currentProductsCount} z {totalProducts} produktów
                </>
              ) : (
                'Ładowanie produktów...'
              )}
            </p>
          </div>
        </div>
        
        {description && (
          <p className="text-gray-700 max-w-3xl">{description}</p>
        )}
      </div>
    </div>
  );
});

CategoryHeader.displayName = 'CategoryHeader';