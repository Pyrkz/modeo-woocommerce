'use client';

import { useShop } from './useShop';
import { ShopFilters } from '../types';

interface UseCategoryShopOptions {
  categorySlug: string;
  perPage?: number;
  autoFetch?: boolean;
  enableInfiniteScroll?: boolean;
  additionalFilters?: Partial<ShopFilters>;
}

export const useCategoryShop = (options: UseCategoryShopOptions) => {
  const {
    categorySlug,
    perPage = 12,
    autoFetch = true,
    enableInfiniteScroll = true,
    additionalFilters = {}
  } = options;

  const initialFilters: ShopFilters = {
    category: categorySlug,
    sortBy: 'date',
    sortOrder: 'desc',
    ...additionalFilters
  };

  return useShop({
    perPage,
    autoFetch,
    enableInfiniteScroll,
    initialFilters
  });
};