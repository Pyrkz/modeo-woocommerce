'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { DzienDzieckaGiftsApi } from '../api/dzien-dziecka.api';
import { Product } from '../types';
import type { 
  UseDzienDzieckaGiftsConfig, 
  UseDzienDzieckaGiftsReturn,
  DzienDzieckaFilters 
} from '../types';

// Stable empty filters object to prevent unnecessary re-renders
const EMPTY_FILTERS = {} as DzienDzieckaFilters;

export default function useDzienDzieckaGiftsOptimized({
  filters = EMPTY_FILTERS,
  initialPage = 1,
  initialPerPage = 12,
  enabled = true
}: UseDzienDzieckaGiftsConfig = {}): UseDzienDzieckaGiftsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(enabled);
  const [error, setError] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  // Use ref to prevent unnecessary re-renders from filters changes
  const filtersRef = useRef(filters);
  const perPageRef = useRef(initialPerPage);
  const enabledRef = useRef(enabled);

  // Update refs when props change (but don't trigger re-renders)
  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  useEffect(() => {
    perPageRef.current = initialPerPage;
  }, [initialPerPage]);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  // Create stable memoized filters - only recreate if actual values change
  const memoizedFilters = useMemo(() => {
    return {
      category: filters.category,
      featured: filters.featured,
      search: filters.search,
      priceRange: filters.priceRange ? {
        min: filters.priceRange.min,
        max: filters.priceRange.max
      } : undefined,
      ageRange: filters.ageRange,
      gender: filters.gender
    };
  }, [
    filters
  ]);

  // Memoized computed values
  const isEmpty = useMemo(() => products.length === 0 && !loading, [products.length, loading]);
  const totalPages = useMemo(() => Math.ceil(total / perPageRef.current), [total]);

  // Memoize loadProducts to prevent recreation on every render
  const loadProducts = useCallback(async (
    page: number = 1,
    append: boolean = false
  ) => {
    if (!enabledRef.current) return;

    try {
      setError(null);
      if (!append) {
        setLoading(true);
      } else {
        setIsValidating(true);
      }

      const response = await DzienDzieckaGiftsApi.getDzienDzieckaProducts(
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
      console.error('Failed to load Dzień Dziecka gifts:', err);
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Nie udało się pobrać produktów na Dzień Dziecka';
      setError(errorMessage);
      
      // If it's the first load and we have no products, set empty array
      if (!append) {
        setProducts([]);
        setTotal(0);
        setHasMore(false);
      }
    } finally {
      setLoading(false);
      setIsValidating(false);
    }
  }, []); // Empty dependency array - function is stable

  // Create a stable filters key to detect when filters actually change
  const filtersKey = useMemo(() => {
    return JSON.stringify(memoizedFilters);
  }, [memoizedFilters]);

  // Only reload when filters actually change (not on every render)
  useEffect(() => {
    if (enabled) {
      setCurrentPage(1);
      loadProducts(1, false);
    }
  }, [filtersKey, enabled, loadProducts]); // Use filtersKey instead of memoizedFilters

  const loadMore = useCallback(async () => {
    if (!hasMore || loading || isValidating) return;
    
    const nextPage = currentPage + 1;
    await loadProducts(nextPage, true);
  }, [hasMore, loading, isValidating, currentPage, loadProducts]);

  const retry = useCallback(() => {
    setError(null);
    setCurrentPage(1);
    loadProducts(1, false);
  }, [loadProducts]);

  const refresh = useCallback(async () => {
    setProducts([]);
    setCurrentPage(1);
    await loadProducts(1, false);
  }, [loadProducts]);

  return {
    // Data
    products,
    total,
    hasMore,
    isEmpty,
    
    // State
    loading,
    error,
    isValidating,
    
    // Actions
    loadMore,
    retry,
    refresh,
    
    // Pagination
    currentPage,
    perPage: perPageRef.current,
    totalPages
  };
}