'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Product } from '@/types/product';
import { RelatedProductsApi } from '../api/related-products.api';
import { relatedProductsCache } from '../utils/performance-cache';

interface UseRelatedProductsProps {
  currentProduct: Product | null;
  limit?: number;
  enabled?: boolean;
}

interface UseRelatedProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Hook for fetching related products with caching and performance optimizations
 */
export function useRelatedProducts({
  currentProduct,
  limit = 8,
  enabled = true
}: UseRelatedProductsProps): UseRelatedProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Memoize the cache key using performance cache
  const cacheKey = useMemo(() => {
    if (!currentProduct) return null;
    return relatedProductsCache.generateKey(currentProduct.id, { limit, type: 'related' });
  }, [currentProduct, limit]);

  const fetchRelatedProducts = useCallback(async () => {
    if (!currentProduct || !enabled) {
      setProducts([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Check cache first using performance cache
      if (cacheKey) {
        const cached = relatedProductsCache.get<Product[]>(cacheKey);
        if (cached) {
          setProducts(cached);
          setLoading(false);
          return;
        }
      }

      const relatedProducts = await RelatedProductsApi.getSmartRelatedProducts(
        currentProduct,
        { limit }
      );

      setProducts(relatedProducts);

      // Cache the results using performance cache
      if (cacheKey) {
        relatedProductsCache.set(cacheKey, relatedProducts, {
          ttl: 5 * 60 * 1000, // 5 minutes
          enableStorage: true
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load related products';
      setError(errorMessage);
      console.error('Error fetching related products:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [currentProduct, limit, enabled, cacheKey]);

  const refetch = useCallback(() => {
    // Clear cache and refetch
    if (cacheKey) {
      relatedProductsCache.delete(cacheKey);
    }
    fetchRelatedProducts();
  }, [fetchRelatedProducts, cacheKey]);

  useEffect(() => {
    fetchRelatedProducts();
  }, [fetchRelatedProducts]);

  return {
    products,
    loading,
    error,
    refetch
  };
}

/**
 * Lightweight hook for getting related products count without fetching
 */
export function useRelatedProductsCount(currentProduct: Product | null): number {
  return useMemo(() => {
    if (!currentProduct) return 0;
    
    // Estimate based on categories and tags
    const categoriesCount = currentProduct.categories?.length || 0;
    const tagsCount = currentProduct.tags?.length || 0;
    
    // Rough estimation - more categories/tags likely mean more related products
    return Math.min(8, (categoriesCount * 3) + (tagsCount * 2));
  }, [currentProduct]);
}

/**
 * Hook for prefetching related products in the background
 */
export function usePrefetchRelatedProducts() {
  const prefetchedProducts = useMemo(() => new Map<string, Product[]>(), []);

  const prefetch = useCallback(async (product: Product, limit = 8) => {
    const cacheKey = `related-${product.id}-${limit}`;
    
    if (prefetchedProducts.has(cacheKey)) {
      return; // Already prefetched
    }

    try {
      const relatedProducts = await RelatedProductsApi.getSmartRelatedProducts(
        product,
        { limit }
      );
      
      prefetchedProducts.set(cacheKey, relatedProducts);
      
      // Store in sessionStorage as well
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(cacheKey, JSON.stringify({
          products: relatedProducts,
          timestamp: Date.now()
        }));
      }
    } catch (error) {
      console.warn('Failed to prefetch related products:', error);
    }
  }, [prefetchedProducts]);

  return { prefetch };
}