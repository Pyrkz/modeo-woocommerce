'use client';

import { useEffect } from 'react';
import { SHOP_CATEGORIES } from '../constants/categories';

/**
 * Hook to preload category pages for better performance
 * Uses Next.js router prefetching for faster navigation
 */
export const usePreloadCategories = () => {
  useEffect(() => {
    // Preload main category pages on mount
    const preloadMainCategories = () => {
      SHOP_CATEGORIES.forEach((category) => {
        // Preload main category page
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = category.href;
        document.head.appendChild(link);
      });
    };

    // Add a small delay to avoid blocking initial page load
    const timeoutId = setTimeout(preloadMainCategories, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const preloadSubcategories = (categoryId: number) => {
    const category = SHOP_CATEGORIES.find(cat => cat.id === categoryId);
    
    if (category?.subcategories) {
      category.subcategories.forEach((subcategory) => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = subcategory.href;
        document.head.appendChild(link);
      });
    }
  };

  return {
    preloadSubcategories
  };
};