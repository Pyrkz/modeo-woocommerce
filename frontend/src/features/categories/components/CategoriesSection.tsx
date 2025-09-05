'use client';

import { memo } from 'react';
import CategoriesHeader from './CategoriesHeader';
import CategoriesGrid from './CategoriesGrid';
import { categoriesData, categoriesSectionContent } from '../data/categoriesData';
import { CategoryCard } from '../types';

interface CategoriesSectionProps {
  title?: string;
  subtitle?: string;
  categories?: CategoryCard[];
  showArrow?: boolean;
  className?: string;
}

const CategoriesSection = memo(({
  title = categoriesSectionContent.title,
  subtitle = categoriesSectionContent.subtitle,
  categories = categoriesData,
  showArrow = true,
  className = ''
}: CategoriesSectionProps) => (
  <section className={`py-12 sm:py-16 lg:py-20 bg-white ${className}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <CategoriesHeader
        title={title}
        subtitle={subtitle}
      />
      
      <CategoriesGrid
        categories={categories}
        showArrow={showArrow}
      />
    </div>
  </section>
));

CategoriesSection.displayName = 'CategoriesSection';

export default CategoriesSection;