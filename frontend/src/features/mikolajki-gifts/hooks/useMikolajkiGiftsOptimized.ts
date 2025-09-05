'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Product } from '@/types/product';
import { MikolajkiApi } from '../api/mikolajki.api';
import { MikolajkiFilters } from '../types';

interface UseMikolajkiGiftsResult {
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

interface UseMikolajkiGiftsOptions {
  filters?: MikolajkiFilters;
  initialPerPage?: number;
  autoLoad?: boolean;
}

export default function useMikolajkiGiftsOptimized({
  filters = {},
  initialPerPage = 16,
  autoLoad = true
}: UseMikolajkiGiftsOptions = {}): UseMikolajkiGiftsResult {
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
  const memoizedFilters = useMemo(() => {
    return {
      category: filters.category,
      featured: filters.featured,
      search: filters.search,
      priceRange: filters.priceRange ? {
        min: filters.priceRange.min,
        max: filters.priceRange.max
      } : undefined
    };
  }, [
    filters.category,
    filters.featured,
    filters.search,
    filters.priceRange
  ]);

  // Memoize loadGifts to prevent recreation on every render
  const loadGifts = useCallback(async (
    page: number = 1,
    append: boolean = false
  ) => {
    try {
      setError(null);
      if (!append) {
        setLoading(true);
      }

      const response = await MikolajkiApi.fetchMikolajkiGifts(
        filtersRef.current,
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

      setTotal(response.total);
      setHasMore(response.hasMore);
      setCurrentPage(page);
      
    } catch (err) {
      console.error('Failed to load Mikołajki gifts:', err);
      setError('Nie udało się załadować prezentów mikołajkowych');
      
      // If it's the first load and we have no products, set empty array
      if (!append) {
        setProducts([]);
        setTotal(0);
        setHasMore(false);
      }
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array - function is stable

  // Create a stable filters key to detect when filters actually change
  const filtersKey = useMemo(() => {
    return JSON.stringify(memoizedFilters);
  }, [memoizedFilters]);

  // Only reload when filters actually change (not on every render)
  useEffect(() => {
    if (autoLoad) {
      setCurrentPage(1);
      loadGifts(1, false);
    }
  }, [filtersKey, autoLoad, loadGifts]); // Use filtersKey instead of memoizedFilters

  const retry = useCallback(() => {
    setCurrentPage(1);
    loadGifts(1, false);
  }, [loadGifts]);

  const loadMore = useCallback(async () => {
    if (hasMore && !loading) {
      const nextPage = currentPage + 1;
      await loadGifts(nextPage, true);
    }
  }, [hasMore, loading, currentPage, loadGifts]);

  const refresh = useCallback(async () => {
    setCurrentPage(1);
    await loadGifts(1, false);
  }, [loadGifts]);

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