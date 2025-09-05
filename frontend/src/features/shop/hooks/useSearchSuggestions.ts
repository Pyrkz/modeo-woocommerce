import { useState, useEffect, useCallback, useMemo } from 'react';
import { ShopApi } from '../api/shop.api';
import { Product } from '../types';
import { useDebounce } from './useDebounce';

interface UseSearchSuggestionsOptions {
  query: string;
  enabled?: boolean;
  minLength?: number;
  maxSuggestions?: number;
  debounceMs?: number;
}

interface UseSearchSuggestionsReturn {
  suggestions: Product[];
  isLoading: boolean;
  error: string | null;
  hasResults: boolean;
  refetch: () => void;
}

// Simple cache for search results
const cache = new Map<string, { data: Product[]; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export function useSearchSuggestions({
  query,
  enabled = true,
  minLength = 2,
  maxSuggestions = 5,
  debounceMs = 200
}: UseSearchSuggestionsOptions): UseSearchSuggestionsReturn {
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const debouncedQuery = useDebounce(query, debounceMs);
  
  // Memoize cache key
  const cacheKey = useMemo(() => {
    if (!debouncedQuery || debouncedQuery.length < minLength) return null;
    return `search:${debouncedQuery.toLowerCase()}:${maxSuggestions}`;
  }, [debouncedQuery, minLength, maxSuggestions]);
  
  const fetchSuggestions = useCallback(async (searchQuery: string) => {
    if (!cacheKey) return;
    
    // Check cache first
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      setSuggestions(cached.data);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await ShopApi.fetchProducts(
        { search: searchQuery },
        1,
        maxSuggestions
      );
      
      const results = response.products || [];
      
      // Cache results
      cache.set(cacheKey, {
        data: results,
        timestamp: Date.now()
      });
      
      setSuggestions(results);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch suggestions';
      setError(errorMessage);
      console.error('Error fetching search suggestions:', err);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, [cacheKey, maxSuggestions]);
  
  const refetch = useCallback(() => {
    if (cacheKey && debouncedQuery.length >= minLength) {
      // Clear cache for this query
      cache.delete(cacheKey);
      fetchSuggestions(debouncedQuery);
    }
  }, [cacheKey, debouncedQuery, minLength, fetchSuggestions]);
  
  // Fetch suggestions when query changes
  useEffect(() => {
    if (!enabled) {
      setSuggestions([]);
      return;
    }
    
    if (!debouncedQuery || debouncedQuery.length < minLength) {
      setSuggestions([]);
      setError(null);
      return;
    }
    
    fetchSuggestions(debouncedQuery);
  }, [enabled, debouncedQuery, minLength, fetchSuggestions]);
  
  // Clean up old cache entries periodically
  useEffect(() => {
    const cleanup = setInterval(() => {
      const now = Date.now();
      for (const [key, value] of cache.entries()) {
        if (now - value.timestamp > CACHE_TTL) {
          cache.delete(key);
        }
      }
    }, CACHE_TTL);
    
    return () => clearInterval(cleanup);
  }, []);
  
  return {
    suggestions,
    isLoading,
    error,
    hasResults: suggestions.length > 0,
    refetch
  };
}