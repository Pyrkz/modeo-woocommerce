'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { OptimizedBlogApi } from '../api/optimizedBlog.api';
import { BlogPost } from '../types';

interface UseHomepageBlogProps {
  maxPosts?: number;
  enableCache?: boolean;
  cacheTime?: number; // in milliseconds
}

interface HomepageBlogState {
  posts: BlogPost[];
  loading: boolean;
  error: string | null;
}

// Simple cache implementation
const cache = new Map<string, { data: BlogPost[]; timestamp: number; ttl: number }>();

export const useHomepageBlog = ({ 
  maxPosts = 4,
  enableCache = true,
  cacheTime = 5 * 60 * 1000 // 5 minutes default cache
}: UseHomepageBlogProps = {}) => {
  const [state, setState] = useState<HomepageBlogState>({
    posts: [],
    loading: true,
    error: null
  });

  const cacheKey = `homepage-blog-${maxPosts}`;

  // Check cache
  const getCachedPosts = useCallback((): BlogPost[] | null => {
    if (!enableCache) return null;
    
    const cached = cache.get(cacheKey);
    if (!cached) return null;
    
    const isExpired = Date.now() - cached.timestamp > cached.ttl;
    if (isExpired) {
      cache.delete(cacheKey);
      return null;
    }
    
    return cached.data;
  }, [cacheKey, enableCache]);

  // Set cache
  const setCachedPosts = useCallback((posts: BlogPost[]) => {
    if (!enableCache) return;
    
    cache.set(cacheKey, {
      data: posts,
      timestamp: Date.now(),
      ttl: cacheTime
    });
  }, [cacheKey, enableCache, cacheTime]);

  // Fetch posts from WordPress
  const fetchPosts = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      // Check cache first
      const cachedPosts = getCachedPosts();
      if (cachedPosts) {
        setState({
          posts: cachedPosts,
          loading: false,
          error: null
        });
        return;
      }

      // Fetch from WordPress API using optimized endpoint
      const posts = await OptimizedBlogApi.getHomepagePosts(maxPosts);
      
      // Cache the results
      setCachedPosts(posts);

      setState({
        posts,
        loading: false,
        error: null
      });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Błąd połączenia z WordPress';
      console.error('Błąd pobierania postów:', err);
      
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage
      }));
    }
  }, [maxPosts, getCachedPosts, setCachedPosts]);

  // Auto-fetch on mount
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Memoized return values for performance
  const returnValue = useMemo(() => ({
    ...state,
    refetch: fetchPosts,
    clearCache: () => cache.delete(cacheKey)
  }), [state, fetchPosts, cacheKey]);

  return returnValue;
};