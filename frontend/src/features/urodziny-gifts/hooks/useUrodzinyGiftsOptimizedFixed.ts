'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { UrodzinyApi } from '../api';
import type { UrodzinyGiftsState, UrodzinyFilters, UrodzinyGiftsHookReturn } from '../types';

const INITIAL_STATE: UrodzinyGiftsState = {
  products: [],
  loading: true,
  error: null,
  hasMore: true,
  page: 1,
  total: 0,
};

const INITIAL_FILTERS: UrodzinyFilters = {
  sortBy: 'popularity',
  featured: true, // Always prioritize featured products
  inStock: true,
  search: 'birthday urodziny prezent gift celebration', // Always include birthday terms
};

export default function useUrodzinyGiftsOptimizedFixed(
  initialFilters: Partial<UrodzinyFilters> = {}
): UrodzinyGiftsHookReturn {
  const [state, setState] = useState<UrodzinyGiftsState>(INITIAL_STATE);
  const [currentPage, setCurrentPage] = useState(1);

  // Use ref to prevent unnecessary re-renders from filters changes
  const filtersRef = useRef<UrodzinyFilters>({
    ...INITIAL_FILTERS,
    ...initialFilters,
  });

  // Update refs when props change (but don't trigger re-renders)
  useEffect(() => {
    filtersRef.current = {
      ...INITIAL_FILTERS,
      ...initialFilters,
    };
  }, [initialFilters]);

  // Create stable memoized filters - only recreate if actual values change
  const memoizedFilters = useMemo(() => {
    return {
      sortBy: initialFilters.sortBy || 'popularity',
      featured: initialFilters.featured !== undefined ? initialFilters.featured : true,
      inStock: initialFilters.inStock !== undefined ? initialFilters.inStock : true,
      search: initialFilters.search || 'birthday urodziny prezent gift celebration',
      priceRange: initialFilters.priceRange,
      category: initialFilters.category
    };
  }, [
    initialFilters.sortBy,
    initialFilters.featured,
    initialFilters.inStock,
    initialFilters.search,
    initialFilters.priceRange,
    initialFilters.category
  ]);

  // Memoize loadProducts to prevent recreation on every render
  const loadProducts = useCallback(async (
    page: number = 1,
    append: boolean = false
  ) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const result = await UrodzinyApi.getProducts(page, 12, filtersRef.current);
      
      setState(prev => ({
        ...prev,
        products: append ? [...prev.products, ...result.products] : result.products,
        loading: false,
        hasMore: result.hasMore,
        page,
        total: result.total,
        error: null,
      }));
      
      setCurrentPage(page);
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Wystąpił błąd podczas ładowania produktów',
      }));
    }
  }, []); // Empty dependency array - function is stable

  // Create a stable filters key to detect when filters actually change
  const filtersKey = useMemo(() => {
    return JSON.stringify(memoizedFilters);
  }, [memoizedFilters]);

  // Only reload when filters actually change (not on every render)
  useEffect(() => {
    setCurrentPage(1);
    loadProducts(1, false);
  }, [filtersKey, loadProducts]); // Use filtersKey instead of filters

  const loadMore = useCallback(async () => {
    if (state.loading || !state.hasMore) return;

    const nextPage = currentPage + 1;
    await loadProducts(nextPage, true);
  }, [state.loading, state.hasMore, currentPage, loadProducts]);

  const setFilters = useCallback((newFilters: Partial<UrodzinyFilters>) => {
    const updatedFilters = { ...filtersRef.current, ...newFilters };
    filtersRef.current = updatedFilters;
    
    // Reset pagination when filters change
    setState(prev => ({ ...prev, page: 1, hasMore: true }));
    setCurrentPage(1);
    
    // Load products with new filters
    loadProducts(1, false);
  }, [loadProducts]);

  const refresh = useCallback(async () => {
    UrodzinyApi.clearCache();
    setState(prev => ({ ...prev, page: 1, hasMore: true }));
    setCurrentPage(1);
    await loadProducts(1, false);
  }, [loadProducts]);

  const debouncedSearch = useCallback((searchTerm: string) => {
    const timeoutId = setTimeout(() => {
      setFilters({ search: searchTerm });
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [setFilters]);

  const actions = useMemo(
    () => ({
      loadMore,
      setFilters,
      refresh,
      debouncedSearch,
    }),
    [loadMore, setFilters, refresh, debouncedSearch]
  );

  return {
    state,
    filters: filtersRef.current,
    actions,
  };
}