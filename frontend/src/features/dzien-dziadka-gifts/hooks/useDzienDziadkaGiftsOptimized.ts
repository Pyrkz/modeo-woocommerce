'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { DzienDziadkaGiftsApi } from '../api/dzien-dziadka.api';
import { Product } from '@/features/shop/types';
import type { 
  UseDzienDziadkaGiftsReturn, 
  UseDzienDziadkaGiftsConfig
} from '../types';

export default function useDzienDziadkaGiftsOptimized({
  filters = {},
  initialPage = 1,
  initialPerPage = 12,
  enabled = true
}: UseDzienDziadkaGiftsConfig = {}): UseDzienDziadkaGiftsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(enabled);
  const [error, setError] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  
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
  // Always include the dzien-dziadka category filter
  const memoizedFilters = useMemo(() => {
    return {
      category: 'dzien-dziadka', // Always filter by dzien-dziadka category
      featured: filters.featured,
      search: filters.search,
      priceRange: filters.priceRange ? {
        min: filters.priceRange.min,
        max: filters.priceRange.max
      } : undefined,
      style: filters.style,
      occasion: filters.occasion
    };
  }, [
    filters
  ]);

  // Memoized computed values
  const isEmpty = useMemo(() => !loading && products.length === 0, [loading, products.length]);
  const totalPages = useMemo(() => Math.ceil(total / perPageRef.current), [total]);
  const hasMoreComputed = useMemo(() => products.length < total && products.length > 0, [products.length, total]);

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

      const response = await DzienDziadkaGiftsApi.getDzienDziadkaProducts(
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
      
      setCurrentPage(page);
      
    } catch (err) {
      console.error('Failed to load Dzień Dziadka gifts:', err);
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Nie udało się pobrać produktów na Dzień Dziadka';
      setError(errorMessage);
      
      // If it's the first load and we have no products, set empty array
      if (!append) {
        setProducts([]);
        setTotal(0);
        
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
    if (!hasMoreComputed || loading || isValidating) return;
    
    const nextPage = currentPage + 1;
    await loadProducts(nextPage, true);
  }, [hasMoreComputed, loading, isValidating, currentPage, loadProducts]);

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
    hasMore: hasMoreComputed,
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