'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ShopApi } from '@/features/shop/api/shop.api';
import { Product } from '@/types/product';
import { ShopFilters } from '@/features/shop/types';

interface UseParapetowkaGiftsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  total: number;
  hasMore: boolean;
  isEmpty: boolean;
  retry: () => void;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
}

interface UseParapetowkaGiftsOptions {
  filters?: ShopFilters;
  initialPerPage?: number;
  autoLoad?: boolean;
}

// Stable empty filters object to prevent unnecessary re-renders
const EMPTY_FILTERS = {} as ShopFilters;

export default function useParapetowkaGiftsOptimized({
  filters = EMPTY_FILTERS,
  initialPerPage = 16,
  autoLoad = true
}: UseParapetowkaGiftsOptions = {}): UseParapetowkaGiftsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(autoLoad);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Use ref to prevent unnecessary re-renders from filters changes
  const filtersRef = useRef(filters);
  const perPageRef = useRef(initialPerPage);

  // Update refs when props change (but don't trigger re-renders)
  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  useEffect(() => {
    perPageRef.current = initialPerPage;
  }, [initialPerPage]);

  // Create stable memoized filters - only recreate if actual values change
  // Always include parapetowka-specific search terms
  const memoizedFilters = useMemo(() => {
    return {
      search: 'housewarming new home apartment parapetowka', // Always search for housewarming terms
      featured: true, // Prioritize featured products
      category: filters.category,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      ...filters // Allow override of default values
    };
  }, [filters]);

  // Memoize loadProducts to prevent recreation on every render
  const loadProducts = useCallback(async (
    page: number = 1,
    append: boolean = false
  ) => {
    try {
      setError(null);
      if (!append) {
        setLoading(true);
      }

      const response = await ShopApi.fetchProducts(
        filtersRef.current.search ? filtersRef.current : memoizedFilters,
        page,
        perPageRef.current
      );

      if (append) {
        setProducts(prev => {
          // Prevent duplicates
          const existingIds = new Set(prev.map(product => product.id));
          const newProducts = response.products.filter(product => !existingIds.has(product.id));
          return [...prev, ...newProducts];
        });
      } else {
        setProducts(response.products);
      }

      setTotal(response.total || response.products.length);
      setHasMore(response.hasMore || (response.products.length === perPageRef.current && response.total > page * perPageRef.current));
      setCurrentPage(page);
      
    } catch (err) {
      console.error('Failed to load parapetowka gifts:', err);
      setError('Nie udało się załadować prezentów na parapetówkę');
      
      // If it's the first load and we have no products, set empty array
      if (!append) {
        setProducts([]);
        setTotal(0);
        setHasMore(false);
      }
    } finally {
      setLoading(false);
    }
  }, [memoizedFilters]);

  // Create a stable filters key to detect when filters actually change
  const filtersKey = useMemo(() => {
    return JSON.stringify(memoizedFilters);
  }, [memoizedFilters]);

  // Only reload when filters actually change (not on every render)
  useEffect(() => {
    if (autoLoad) {
      setCurrentPage(1);
      loadProducts(1, false);
    }
  }, [filtersKey, autoLoad, loadProducts]); // Use filtersKey instead of memoizedFilters

  const retry = useCallback(() => {
    setCurrentPage(1);
    loadProducts(1, false);
  }, [loadProducts]);

  const loadMore = useCallback(async () => {
    if (hasMore && !loading) {
      const nextPage = currentPage + 1;
      await loadProducts(nextPage, true);
    }
  }, [hasMore, loading, currentPage, loadProducts]);

  const refresh = useCallback(async () => {
    setCurrentPage(1);
    await loadProducts(1, false);
  }, [loadProducts]);

  return {
    products,
    loading,
    error,
    total,
    hasMore,
    isEmpty: !loading && products.length === 0,
    retry,
    loadMore,
    refresh
  };
}