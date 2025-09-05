'use client';

import { useEffect } from 'react';
import { CategoryCard } from '../types';

export const useCategoriesPreload = (categories: CategoryCard[]) => {
  useEffect(() => {
    // Preload category links when component mounts
    const links = categories.map(category => category.href);
    
    // Use modern prefetch approach with resource hints
    if (typeof window !== 'undefined' && links.length > 0) {
      // Create prefetch links for immediate navigation
      const prefetchPromises = links.map(href => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = href;
        link.setAttribute('fetchpriority', 'low');
        document.head.appendChild(link);
        
        return new Promise<void>((resolve) => {
          link.onload = () => resolve();
          link.onerror = () => resolve(); // Continue even if prefetch fails
          setTimeout(() => resolve(), 100); // Fallback timeout
        });
      });
      
      // Optional: Use Next.js App Router prefetch as backup
      Promise.allSettled(prefetchPromises).then(() => {
        // Additional prefetch logic can be added here
      });
    }
  }, [categories]);
};