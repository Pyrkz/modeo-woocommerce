'use client';

import { useEffect } from 'react';
import type { ProductCategory } from '../types';

export function useCategoriesPreload(categories: ProductCategory[]) {
  useEffect(() => {
    // Only preload first priority image to reduce initial load
    const firstPriorityCategory = categories.find(category => category.priority);
    
    if (!firstPriorityCategory) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = firstPriorityCategory.image;
    document.head.appendChild(link);

    // Cleanup function
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, [categories]);
}