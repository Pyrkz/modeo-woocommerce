'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { DzienKobietApi } from '../api/dzien-kobiet.api';
import { DzienKobietFilters, Product } from '../types';

interface UseDzienKobietGiftsResult {
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

interface UseDzienKobietGiftsOptions {
  filters?: DzienKobietFilters;
  initialPerPage?: number;
  autoLoad?: boolean;
}

// Stable empty filters object to prevent unnecessary re-renders
const EMPTY_FILTERS = {} as DzienKobietFilters;

export default function useDzienKobietGiftsOptimized({
  filters = EMPTY_FILTERS,
  initialPerPage = 16,
  autoLoad = true
}: UseDzienKobietGiftsOptions = {}): UseDzienKobietGiftsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(autoLoad);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Prevent unnecessary re-renders with refs
  const loadingRef = useRef(false);
  // Removed perPageRef and filtersRef

  // Create stable filters key
  const memoizedFilters = useMemo(() => {
    const baseFilters = { ...filters }; // Start with all filters from props
    
    // Apply specific overrides
    baseFilters.search = 'teacher nauczyciel education school edukacja szkoła prezent';
    baseFilters.featured = true;

    return baseFilters;
  }, [filters]);

  const loadProducts = useCallback(async (
    page: number = 1,
    append: boolean = false
  ) => {
    if (loadingRef.current && append) return; // Prevent double loading
    
    try {
      loadingRef.current = true;
      setError(null);
      
      if (!append) {
        setLoading(true);
      }

      const response = await DzienKobietApi.fetchDzienKobietGifts(
        memoizedFilters, // Use memoizedFilters directly
        page,
        initialPerPage // Use initialPerPage directly
      );

      if (append) {
        setProducts(prev => {
          // Prevent duplicates efficiently
          const existingIds = new Set(prev.map(p => p.id));
          const newProducts = response.products.filter(p => !existingIds.has(p.id));
          return prev.length > 0 ? [...prev, ...newProducts] : response.products;
        });
      } else {
        setProducts(response.products);
      }

      setTotal(response.total);
      setHasMore(response.hasMore);
      setCurrentPage(page);
      
    } catch (err) {
      console.error('Failed to load products:', err);
      setError('Nie udało się załadować prezentów');
      
      if (!append) {
        setProducts([]);
        setTotal(0);
        setHasMore(false);
      }
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [memoizedFilters, initialPerPage]); // Add memoizedFilters and initialPerPage to dependencies

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
  }, [filtersKey, autoLoad, loadProducts]); // Use filtersKey instead of filters

  const retry = useCallback(() => {
    setCurrentPage(1);
    loadProducts(1, false);
  }, [loadProducts]);

  const loadMore = useCallback(async () => {
    if (hasMore && !loading && !loadingRef.current) {
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