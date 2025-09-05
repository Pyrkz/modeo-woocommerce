'use client';

import { memo } from 'react';
import type { ProductCategoriesSectionProps } from '../types';
import { useProductCategories } from '../hooks';
import ProductCategoriesHeader from './ProductCategoriesHeader';
import ProductCategoriesGrid from './ProductCategoriesGrid';

function ProductCategoriesSection({ 
  data, 
  className = '' 
}: ProductCategoriesSectionProps) {
  const { data: defaultData } = useProductCategories();
  const sectionData = data || defaultData;
  const { title, subtitle, description, categories } = sectionData;

  return (
    <section className={`py-12 md:py-20 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4">
        <ProductCategoriesHeader
          title={title}
          subtitle={subtitle}
          description={description}
        />
        
        <ProductCategoriesGrid 
          categories={categories}
          className="max-w-7xl mx-auto"
        />
      </div>
    </section>
  );
}

export default memo(ProductCategoriesSection);