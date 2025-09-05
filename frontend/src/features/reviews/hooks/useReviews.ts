import { useState, useEffect, useCallback } from 'react';
import { Review, ReviewStats, ReviewFormData } from '../types';
import { ReviewService } from '../services/review-service';

export function useProductReviews(productId: number, initialPage: number = 1) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchReviews = useCallback(async (pageNum?: number) => {
    const currentPage = pageNum || page;
    setLoading(true);
    setError(null);
    
    try {
      const response = await ReviewService.getProductReviews(productId, currentPage, 10);
      
      // Validate response structure
      if (!response || typeof response !== 'object') {
        throw new Error('Invalid response format');
      }
      
      const reviewsArray = response.reviews || [];
      const totalCount = response.total || 0;
      const totalPagesCount = response.total_pages || 1;
      
      if (currentPage === 1) {
        // First page - replace reviews
        setReviews(reviewsArray);
      } else {
        // Subsequent pages - append reviews
        setReviews(prev => [...prev, ...reviewsArray]);
      }
      
      setTotal(totalCount);
      setTotalPages(totalPagesCount);
    } catch {
      setError('Failed to load reviews');
      
      // Set safe defaults
      if (pageNum === 1 || !pageNum) {
        setReviews([]);
        setTotal(0);
        setTotalPages(1);
      }
    } finally {
      setLoading(false);
    }
  }, [productId, page]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const loadMoreReviews = useCallback(() => {
    if (page < totalPages && !loading) {
      setPage(prev => prev + 1);
    }
  }, [page, totalPages, loading]);

  const refreshReviews = useCallback(() => {
    setPage(1);
    fetchReviews(1);
  }, [fetchReviews]);

  return {
    reviews,
    loading,
    error,
    page,
    totalPages,
    total,
    loadMoreReviews,
    refreshReviews,
    hasMore: page < totalPages
  };
}

export function useReviewStats(productId: number) {
  const [stats, setStats] = useState<ReviewStats>({
    average_rating: 0,
    total_reviews: 0,
    rating_counts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const reviewStats = await ReviewService.getReviewStats(productId);
        
        // Validate stats structure
        if (reviewStats && typeof reviewStats === 'object') {
          const safeStats = {
            average_rating: reviewStats.average_rating || 0,
            total_reviews: reviewStats.total_reviews || 0,
            rating_counts: reviewStats.rating_counts || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
          };
          setStats(safeStats);
        } else {
          // Fallback to default stats
          setStats({
            average_rating: 0,
            total_reviews: 0,
            rating_counts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
          });
        }
      } catch {
        // Set safe defaults on error
        setStats({
          average_rating: 0,
          total_reviews: 0,
          rating_counts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
        });
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchStats();
    }
  }, [productId]);

  return { stats, loading };
}

export function useCreateReview() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createReview = async (reviewData: ReviewFormData) => {
    setSubmitting(true);
    setError(null);

    try {
      const result = await ReviewService.createReview(reviewData);
      setSubmitting(false);
      return { success: true, data: result };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit review';
      setError(errorMessage);
      setSubmitting(false);
      return { success: false, error: errorMessage };
    }
  };

  return { createReview, submitting, error };
}