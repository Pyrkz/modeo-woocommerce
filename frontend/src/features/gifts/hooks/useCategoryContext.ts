'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { getCategoryById } from '../types/categories';

/**
 * Hook to automatically detect category context from URL or props
 * Useful for automatically applying filters based on current page
 */
export const useCategoryContext = (explicitCategoryId?: string) => {
  const router = useRouter();

  const detectedCategoryId = useMemo(() => {
    // Use explicit category if provided
    if (explicitCategoryId) return explicitCategoryId;

    // Try to detect from URL pathname
    const pathname = router?.asPath || window.location.pathname;
    
    // Common URL patterns for categories
    const categoryPatterns = [
      { pattern: /\/dzien-matki/i, categoryId: 'dzien-matki' },
      { pattern: /\/dzien-taty/i, categoryId: 'dzien-taty' },
      { pattern: /\/dzien-dziecka/i, categoryId: 'dzien-dziecka' },
      { pattern: /\/walentynki/i, categoryId: 'walentynki' },
      { pattern: /\/zwierzaki/i, categoryId: 'zwierzaki' },
      { pattern: /\/polo-shirt/i, categoryId: 'polo-shirt' },
      { pattern: /\/odziez-firmowa/i, categoryId: 'odziez-firmowa' },
    ];

    for (const { pattern, categoryId } of categoryPatterns) {
      if (pattern.test(pathname)) {
        return categoryId;
      }
    }

    return undefined;
  }, [explicitCategoryId, router?.asPath]);

  const currentCategory = useMemo(() => {
    return detectedCategoryId ? getCategoryById(detectedCategoryId) : undefined;
  }, [detectedCategoryId]);

  const getPageTitle = (defaultTitle: string) => {
    if (currentCategory) {
      return `${defaultTitle} - ${currentCategory.name}`;
    }
    return defaultTitle;
  };

  const getContextualSubtitle = (defaultSubtitle: string) => {
    if (currentCategory) {
      // Return category-specific subtitle based on category
      const categorySubtitles: Record<string, string> = {
        'dzien-matki': 'Wyjątkowe prezenty dla najważniejszej kobiety w Twoim życiu',
        'dzien-taty': 'Praktyczne i stylowe prezenty dla taty',
        'dzien-dziecka': 'Kolorowe i radosne prezenty dla najmłodszych',
        'walentynki': 'Romantyczne prezenty dla ukochanej osoby',
        'zwierzaki': 'Urocze prezenty z motywami zwierząt',
        'polo-shirt': 'Klasyczne i eleganckie polo shirt',
        'odziez-firmowa': 'Profesjonalna odzież z Twoim logo',
      };
      
      return categorySubtitles[currentCategory.id] || defaultSubtitle;
    }
    return defaultSubtitle;
  };

  return {
    categoryId: detectedCategoryId,
    category: currentCategory,
    getPageTitle,
    getContextualSubtitle,
    isSpecificCategory: Boolean(detectedCategoryId),
  };
};