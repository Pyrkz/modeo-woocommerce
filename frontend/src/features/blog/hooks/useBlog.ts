'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { BlogApi } from '../api/blog.api';
import { BlogFilters, UseBlogReturn, BlogPost, BlogCategory, BlogTag, BlogAuthor } from '../types';

interface UseBlogOptions {
  perPage?: number;
  autoFetch?: boolean;
  enableInfiniteScroll?: boolean;
  initialFilters?: BlogFilters;
}

const DEFAULT_FILTERS: BlogFilters = {
  sortBy: 'date',
  sortOrder: 'desc',
};

export const useBlog = (options: UseBlogOptions = {}): UseBlogReturn => {
  const {
    perPage = 6,
    autoFetch = true,
    enableInfiniteScroll = true,
    initialFilters = {}
  } = options;

  // State
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [tags, setTags] = useState<BlogTag[]>([]);
  const [authors] = useState<BlogAuthor[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<BlogFilters>({
    ...DEFAULT_FILTERS,
    ...initialFilters
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalPosts: 0,
    hasMore: false,
    perPage,
  });

  // Refs for performance
  const isScrolling = useRef(false);
  const loadingRef = useRef(false);

  // Load posts
  const loadPosts = useCallback(async (
    newFilters?: BlogFilters, 
    page: number = 1, 
    append: boolean = false
  ) => {
    // Prevent multiple simultaneous requests
    if (loadingRef.current) return;
    loadingRef.current = true;

    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
        setError(null);
      }

      const activeFilters = newFilters || filters;
      const response = await BlogApi.fetchPosts(activeFilters, page, perPage);

      if (append) {
        setPosts(prev => [...prev, ...response.posts]);
      } else {
        setPosts(response.posts);
      }

      setPagination({
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        totalPosts: response.total,
        hasMore: response.hasMore,
        perPage,
      });

      // Update filters if provided
      if (newFilters) {
        setFilters(activeFilters);
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Błąd połączenia z serwerem';
      setError(errorMessage);
      console.error('Błąd pobierania artykułów:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
      loadingRef.current = false;
    }
  }, [filters, perPage]);

  // Load more posts
  const loadMore = useCallback(async () => {
    if (!loadingMore && pagination.hasMore && !loadingRef.current) {
      await loadPosts(filters, pagination.currentPage + 1, true);
    }
  }, [loadPosts, filters, pagination.currentPage, pagination.hasMore, loadingMore]);

  // Update filters
  const updateFilters = useCallback((newFilters: Partial<BlogFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    loadPosts(updatedFilters, 1, false);
  }, [filters, loadPosts]);

  // Reset filters
  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    loadPosts(DEFAULT_FILTERS, 1, false);
  }, [loadPosts]);

  // Load categories
  const loadCategories = useCallback(async () => {
    try {
      const categoriesData = await BlogApi.fetchCategories();
      setCategories(categoriesData.filter(cat => cat.count > 0)); // Only categories with posts
    } catch (err) {
      console.error('Błąd pobierania kategorii:', err);
    }
  }, []);

  // Load tags
  const loadTags = useCallback(async () => {
    try {
      const tagsData = await BlogApi.fetchTags();
      setTags(tagsData.filter(tag => tag.count > 0)); // Only tags with posts
    } catch (err) {
      console.error('Błąd pobierania tagów:', err);
    }
  }, []);

  // Infinite scroll effect
  useEffect(() => {
    if (!enableInfiniteScroll) return;

    const handleScroll = () => {
      // Throttle scroll events
      if (isScrolling.current) return;
      isScrolling.current = true;

      requestAnimationFrame(() => {
        const scrolledToBottom = 
          window.innerHeight + document.documentElement.scrollTop >= 
          document.documentElement.offsetHeight - 1000; // Load 1000px before bottom

        if (scrolledToBottom && !loadingMore && pagination.hasMore && !loadingRef.current) {
          loadMore();
        }
        isScrolling.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore, loadingMore, pagination.hasMore, enableInfiniteScroll]);

  // Auto-fetch initial data
  useEffect(() => {
    if (autoFetch && posts.length === 0 && !loading) {
      loadPosts(filters, 1, false);
      loadCategories();
      loadTags();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFetch]); // Only run on mount - intentionally ignoring other deps

  return {
    // State
    posts,
    categories,
    tags,
    authors,
    loading,
    loadingMore,
    error,
    filters,
    pagination,
    
    // Actions
    loadPosts,
    loadMore,
    updateFilters,
    resetFilters,
    loadCategories,
    loadTags,
  };
};