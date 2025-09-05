import { useMemo } from 'react';
import { categoriesData, categoriesSectionContent } from '../data/categoriesData';
import { CategoryCard } from '../types';

export const useCategories = () => {
  const categories = useMemo(() => categoriesData, []);
  const content = useMemo(() => categoriesSectionContent, []);
  
  const getCategoryById = useMemo(
    () => (id: string): CategoryCard | undefined => 
      categories.find(category => category.id === id),
    [categories]
  );
  
  return {
    categories,
    content,
    getCategoryById
  };
};