import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ShopApi, ProductsResponse } from '../api/shop.api';
import { ShopFilters, Product } from '../types';
import { useDebounce } from './useDebounce';

interface UseOptimizedShopOptions {
  perPage?: number;
  autoFetch?: boolean;
  enableInfiniteScroll?: boolean;
  initialFilters?: Partial<ShopFilters>;
  cacheTimeout?: number;
}

// Optimized cache with TTL
class ProductCache {
  private cache = new Map<string, { data: ProductsResponse; timestamp: number }>();
  private readonly TTL = 30000; // 30 seconds

  get(key: string): ProductsResponse | null {
    const cached = this.cache.get(key);
    if (!cached) return null;
    
    if (Date.now() - cached.timestamp > this.TTL) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.data;
  }

  set(key: string, data: ProductsResponse): void {
    this.cache.set(key, { data, timestamp: Date.now() });
    
    // Clean old entries periodically
    if (this.cache.size > 50) {
      const now = Date.now();
      for (const [k, v] of this.cache.entries()) {
        if (now - v.timestamp > this.TTL) {
          this.cache.delete(k);
        }
      }
    }
  }

  clear(): void {
    this.cache.clear();
  }
}

const productCache = new ProductCache();

export function useOptimizedShop(options: UseOptimizedShopOptions = {}) {
  const {
    perPage = 8,
    autoFetch = true,
    // enableInfiniteScroll = true, // Not used in current implementation
    initialFilters = {},
    cacheTimeout = 300
  } = options;

  // State
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ShopFilters>(initialFilters);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
    hasMore: false
  });

  // Performance optimization refs
  const abortControllerRef = useRef<AbortController | null>(null);
  const lastFetchTimeRef = useRef<number>(0);
  // const pendingFiltersRef = useRef<ShopFilters | null>(null); // Reserved for future batching
  
  // Debounced filters for search
  const debouncedFilters = useDebounce(filters, cacheTimeout);
  
  // Memoized cache key
  const cacheKey = useMemo(() => {
    const filterParams = Object.entries(debouncedFilters)
      .filter(([, value]) => value !== undefined && value !== null && value !== '')
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}:${JSON.stringify(value)}`)
      .join('|');
    return `products_${filterParams}_${perPage}`;
  }, [debouncedFilters, perPage]);

  // Optimized product loading
  const loadProducts = useCallback(async (
    newFilters: ShopFilters, 
    page: number = 1, 
    append: boolean = false,
    force: boolean = false
  ) => {
    // Prevent duplicate requests
    const now = Date.now();
    if (!force && now - lastFetchTimeRef.current < 100) {
      return;
    }
    lastFetchTimeRef.current = now;

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    // Check cache for first page
    if (page === 1 && !append) {
      const cached = productCache.get(cacheKey);
      if (cached && !force) {
        setProducts(cached.products);
        setPagination({
          currentPage: 1,
          totalPages: cached.totalPages,
          totalProducts: cached.total,
          hasMore: cached.hasMore
        });
        setError(null);
        return;
      }
    }

    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
        setError(null);
      }

      const response = await ShopApi.fetchProducts(newFilters, page, perPage);

      // Check if request was cancelled
      if (controller.signal.aborted) return;

      if (append && page > 1) {
        setProducts(prev => [...prev, ...response.products]);
      } else {
        setProducts(response.products);
        // Cache first page results
        if (page === 1) {
          productCache.set(cacheKey, response);
        }
      }

      setPagination({
        currentPage: page,
        totalPages: response.totalPages,
        totalProducts: response.total,
        hasMore: response.hasMore
      });

    } catch (err) {
      if (controller.signal.aborted) return;
      
      const errorMessage = err instanceof Error ? err.message : 'Failed to load products';
      setError(errorMessage);
      console.error('Error loading products:', err);
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
        setLoadingMore(false);
      }
    }
  }, [cacheKey, perPage]);

  // Smart filter updates - batch and debounce
  const updateFilters = useCallback((newFilters: Partial<ShopFilters>) => {
    setFilters(prev => {
      const updated = { ...prev, ...newFilters };
      
      // Clear products immediately for instant feedback
      if (JSON.stringify(prev) !== JSON.stringify(updated)) {
        setProducts([]);
        setPagination(prevPag => ({ ...prevPag, currentPage: 1 }));
      }
      
      return updated;
    });
  }, []);

  // Optimized load more
  const loadMore = useCallback(() => {
    if (loadingMore || !pagination.hasMore) return;
    
    const nextPage = pagination.currentPage + 1;
    loadProducts(debouncedFilters, nextPage, true);
  }, [loadProducts, debouncedFilters, pagination.currentPage, pagination.hasMore, loadingMore]);

  // Reset filters
  const resetFilters = useCallback(() => {
    const emptyFilters: ShopFilters = {};
    setFilters(emptyFilters);
    productCache.clear(); // Clear cache on reset
  }, []);

  // Effect for debounced filter changes
  useEffect(() => {
    if (Object.keys(debouncedFilters).length > 0 || autoFetch) {
      loadProducts(debouncedFilters, 1, false);
    }
  }, [debouncedFilters, loadProducts, autoFetch]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Performance metrics (dev only)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Shop Performance] Products: ${products.length}, Loading: ${loading}, Cache hits: ${productCache['cache'].size}`);
    }
  }, [products.length, loading]);

  return {
    // Data
    products,
    filters,
    pagination,
    
    // Loading states
    loading,
    loadingMore,
    error,
    
    // Actions  
    updateFilters,
    resetFilters,
    loadMore,
    refetch: () => loadProducts(debouncedFilters, 1, false, true),
    
    // Performance info
    cacheInfo: {
      cacheKey,
      cacheSize: productCache['cache'].size,
      hasCache: !!productCache.get(cacheKey)
    }
  };
}