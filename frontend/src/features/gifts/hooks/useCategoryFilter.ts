'use client';

import { useMemo } from 'react';
import { GiftCard } from '../types';
import { CategoryFilter, filterCategories, getCategoryById } from '../types/categories';

interface UseCategoryFilterProps {
  gifts: GiftCard[];
  categoryFilter?: CategoryFilter;
  currentCategory?: string;
}

export const useCategoryFilter = ({ 
  gifts, 
  categoryFilter,
  currentCategory 
}: UseCategoryFilterProps) => {
  const filteredGifts = useMemo(() => {
    if (!gifts.length) return [];

    let filtered = [...gifts];

    // If we have a current category, check for exclusions
    if (currentCategory) {
      const category = getCategoryById(currentCategory);
      if (category?.excludeFrom) {
        // Filter out gifts that belong to excluded categories
        filtered = filtered.filter(gift => {
          // Check if gift has any tags that match excluded categories
          const giftTags = gift.tags || [];
          const excludedTags = category.excludeFrom?.map(excludedCat => {
            const excludedCategory = getCategoryById(excludedCat);
            return excludedCategory?.tags || [];
          }).flat() || [];
          
          // If gift has any excluded tags, remove it
          return !giftTags.some(tag => excludedTags.includes(tag));
        });
      }
    }

    // Apply additional filters
    if (categoryFilter) {
      const allowedCategories = filterCategories(categoryFilter);
      
      filtered = filtered.filter(gift => {
        const giftTags = gift.tags || [];
        // Check if gift belongs to any allowed category
        return allowedCategories.some(category => 
          category.tags.some(tag => giftTags.includes(tag))
        );
      });
    }

    return filtered;
  }, [gifts, categoryFilter, currentCategory]);

  const availableCategories = useMemo(() => {
    if (categoryFilter) {
      return filterCategories(categoryFilter);
    }
    return filterCategories({});
  }, [categoryFilter]);

  return {
    filteredGifts,
    availableCategories,
    totalCount: gifts.length,
    filteredCount: filteredGifts.length
  };
};