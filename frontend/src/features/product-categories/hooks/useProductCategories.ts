'use client';

import { useMemo } from 'react';
import { productCategoriesData } from '../data/categoriesData';
import { useCategoriesPreload } from './useCategoriesPreload';

export function useProductCategories() {
  const data = useMemo(() => productCategoriesData, []);
  
  // Preload priority images
  useCategoriesPreload(data.categories);
  
  return {
    data,
    categories: data.categories,
    priorityCategories: data.categories.filter(category => category.priority),
    regularCategories: data.categories.filter(category => !category.priority)
  };
}