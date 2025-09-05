'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Review, ReviewsResponse, ReviewStats, ReviewFormData } from '../types';
import { OptimizedReviewService } from '../services/optimized-review-service';

interface UseOptimizedReviewsResult {
  reviews: Review[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  total: number;
  loadMoreReviews: () => Promise<void>;
  refreshReviews: () => Promise<void>;
}

interface UseReviewStatsResult {
  stats: ReviewStats;
  loading: boolean;
}

interface UseCreateReviewResult {
  createReview: (data: ReviewFormData) => Promise<{ success: boolean; data?: unknown; error?: string }>;
  submitting: boolean;
  error: string | null;
}

/**
 * Optimized reviews hook with lazy loading and caching
 */
export function useOptimizedReviews(productId: number, initialPerPage: number = 5): UseOptimizedReviewsResult {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  
  const currentPage = useRef(1);
  const isLoadingMore = useRef(false);
  const perPage = initialPerPage;

  const loadReviews = useCallback(async (page: number, append: boolean = false) => {
    if (isLoadingMore.current) return;
    
    isLoadingMore.current = true;
    if (!append) setLoading(true);
    setError(null);

    try {
      const response: ReviewsResponse = await OptimizedReviewService.getProductReviews(
        productId, 
        page, 
        perPage
      );

      if (append) {
        setReviews(prev => [...prev, ...(response.reviews || [])]);
      } else {
        setReviews(response.reviews || []);
      }
      
      setTotal(response.total || 0);
      setHasMore((response.reviews?.length || 0) === perPage && page < (response.total_pages || 1));
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load reviews');
      if (!append) {
        setReviews([]);
        setTotal(0);
      }
    } finally {
      setLoading(false);
      isLoadingMore.current = false;
    }
  }, [productId, perPage]);

  const loadMoreReviews = useCallback(async () => {
    if (!hasMore || isLoadingMore.current) return;
    
    currentPage.current += 1;
    await loadReviews(currentPage.current, true);
  }, [hasMore, loadReviews]);

  const refreshReviews = useCallback(async () => {
    currentPage.current = 1;
    await loadReviews(1, false);
  }, [loadReviews]);

  // Initial load
  useEffect(() => {
    if (productId) {
      currentPage.current = 1;
      loadReviews(1, false);
    }
  }, [productId, loadReviews]);

  return {
    reviews,
    loading,
    error,
    hasMore,
    total,
    loadMoreReviews,
    refreshReviews
  };
}

/**
 * Optimized review stats hook
 */
export function useOptimizedReviewStats(productId: number): UseReviewStatsResult {
  const [stats, setStats] = useState<ReviewStats>({
    average_rating: 0,
    total_reviews: 0,
    rating_counts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    let cancelled = false;

    const loadStats = async () => {
      try {
        const result = await OptimizedReviewService.getReviewStats(productId);
        if (!cancelled) {
          setStats(result);
        }
      } catch {
        if (!cancelled) {
          setStats({
            average_rating: 0,
            total_reviews: 0,
            rating_counts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
          });
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadStats();

    return () => {
      cancelled = true;
    };
  }, [productId]);

  return { stats, loading };
}

/**
 * Optimized create review hook
 */
export function useOptimizedCreateReview(): UseCreateReviewResult {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createReview = useCallback(async (data: ReviewFormData) => {
    setSubmitting(true);
    setError(null);

    try {
      const result = await OptimizedReviewService.createReview(data);
      return { success: true, data: result };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create review';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setSubmitting(false);
    }
  }, []);

  return { createReview, submitting, error };
}