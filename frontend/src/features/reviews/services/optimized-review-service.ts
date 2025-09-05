'use client';

import { config } from '@/lib/config';
import { Review, ReviewFormData, ReviewsResponse, ReviewStats, ReviewReply, ReplyFormData } from '../types';
import { reviewsCache, repliesCache, CacheKeys, backgroundRefresh } from '../utils/performance-cache';
import { stripHtml } from '@/utils/sanitize';

/**
 * Optimized review service with caching and performance features
 */
export class OptimizedReviewService {
  private static apiUrl = config.getApiUrl();
  private static reviewsQueue = new Map<string, Promise<ReviewsResponse>>();
  private static repliesQueue = new Map<string, Promise<ReviewReply[]>>();
  
  /**
   * Get reviews with intelligent caching
   */
  static async getProductReviews(
    productId: number,
    page: number = 1,
    perPage: number = 10
  ): Promise<ReviewsResponse> {
    const cacheKey = CacheKeys.reviews(productId, page);
    
    // Check cache first
    const cached = reviewsCache.get<ReviewsResponse>(cacheKey);
    if (cached) {
      // Background refresh for fresh data
      this.backgroundFetchReviews(productId, page, perPage);
      return cached;
    }
    
    // Prevent duplicate requests
    if (this.reviewsQueue.has(cacheKey)) {
      return this.reviewsQueue.get(cacheKey)!;
    }
    
    const fetchPromise = this.fetchReviews(productId, page, perPage);
    this.reviewsQueue.set(cacheKey, fetchPromise);
    
    try {
      const result = await fetchPromise;
      reviewsCache.set(cacheKey, result);
      return result;
    } finally {
      this.reviewsQueue.delete(cacheKey);
    }
  }
  
  /**
   * Get review replies with caching
   */
  static async getReviewReplies(reviewId: number): Promise<ReviewReply[]> {
    const cacheKey = CacheKeys.replies(reviewId);
    
    // Check cache first
    const cached = repliesCache.get<ReviewReply[]>(cacheKey);
    if (cached) {
      return cached;
    }
    
    // Prevent duplicate requests
    if (this.repliesQueue.has(cacheKey)) {
      return this.repliesQueue.get(cacheKey)!;
    }
    
    const fetchPromise = this.fetchReplies(reviewId);
    this.repliesQueue.set(cacheKey, fetchPromise);
    
    try {
      const result = await fetchPromise;
      repliesCache.set(cacheKey, result, 2 * 60 * 1000); // 2min for replies
      return result;
    } finally {
      this.repliesQueue.delete(cacheKey);
    }
  }
  
  /**
   * Get review stats with long cache
   */
  static async getReviewStats(productId: number): Promise<ReviewStats> {
    const cacheKey = CacheKeys.stats(productId);
    
    const cached = reviewsCache.get<ReviewStats>(cacheKey);
    if (cached) {
      return cached;
    }
    
    try {
      const allReviewsResponse = await this.getProductReviews(productId, 1, 100);
      const reviews = allReviewsResponse.reviews || [];
      
      if (reviews.length === 0) {
        return {
          average_rating: 0,
          total_reviews: 0,
          rating_counts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
        };
      }
      
      const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      let totalRating = 0;
      
      reviews.forEach((review: Review) => {
        if (review && typeof review.rating === 'number') {
          const rating = Math.max(1, Math.min(5, review.rating)) as 1 | 2 | 3 | 4 | 5;
          ratingCounts[rating]++;
          totalRating += rating;
        }
      });
      
      const result = {
        average_rating: reviews.length > 0 ? totalRating / reviews.length : 0,
        total_reviews: reviews.length,
        rating_counts: ratingCounts
      };
      
      // Cache stats for longer (10 minutes)
      reviewsCache.set(cacheKey, result, 10 * 60 * 1000);
      return result;
    } catch {
      return {
        average_rating: 0,
        total_reviews: 0,
        rating_counts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      };
    }
  }
  
  /**
   * Create review and invalidate cache
   */
  static async createReview(reviewData: ReviewFormData): Promise<unknown> {
    try {
      const nonce = await this.getNonce();
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (nonce) {
        headers['Nonce'] = nonce;
        headers['X-WP-Nonce'] = nonce;
      }
      
      const response = await fetch(`${this.apiUrl}/wp-json/modeo/v1/reviews`, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify(reviewData)
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }
      
      const result = await response.json();
      
      // Smart cache invalidation
      this.invalidateProductCache(reviewData.product_id);
      
      return result;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Create reply and invalidate cache
   */
  static async createReplyToReview(replyData: ReplyFormData): Promise<unknown> {
    try {
      const nonce = await this.getNonce();
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (nonce) {
        headers['Nonce'] = nonce;
        headers['X-WP-Nonce'] = nonce;
      }
      
      const response = await fetch(`${this.apiUrl}/wp-json/modeo/v1/review-replies`, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify(replyData)
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }
      
      const result = await response.json();
      
      // Smart cache invalidation
      repliesCache.delete(CacheKeys.replies(replyData.parent_id));
      this.invalidateProductCache(replyData.product_id);
      
      return result;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Background fetch for reviews
   */
  private static backgroundFetchReviews(productId: number, page: number, perPage: number): void {
    const cacheKey = CacheKeys.reviews(productId, page);
    backgroundRefresh(
      cacheKey,
      () => this.fetchReviews(productId, page, perPage),
      reviewsCache
    );
  }
  
  /**
   * Actual fetch reviews implementation
   */
  private static async fetchReviews(productId: number, page: number, perPage: number): Promise<ReviewsResponse> {
    const response = await fetch(
      `${this.apiUrl}/wp-json/wc/store/products/reviews?product_id=${productId}&per_page=${perPage}&page=${page}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }
    );
    
    if (!response.ok) {
      const fallbackResponse = await fetch(
        `${this.apiUrl}/wp-json/wc/v3/products/reviews?product=${productId}&page=${page}&per_page=${perPage}&status=approved`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        }
      );
      
      if (!fallbackResponse.ok) {
        throw new Error(`Failed to fetch reviews: ${response.status}`);
      }
      
      const data = await fallbackResponse.json();
      return {
        reviews: await this.processReviews(data),
        total: parseInt(fallbackResponse.headers.get('X-WP-Total') || '0'),
        total_pages: parseInt(fallbackResponse.headers.get('X-WP-TotalPages') || '1')
      };
    }
    
    const data = await response.json();
    return {
      reviews: await this.processReviews(data.reviews || data),
      total: data.total || 0,
      total_pages: data.total_pages || 1
    };
  }
  
  /**
   * Actual fetch replies implementation
   */
  private static async fetchReplies(reviewId: number): Promise<ReviewReply[]> {
    const response = await fetch(`${this.apiUrl}/wp-json/modeo/v1/review-replies/${reviewId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    
    if (!response.ok) {
      return [];
    }
    
    const data = await response.json();
    const replies = data.replies || [];
    
    return replies.map((reply: Record<string, unknown>) => ({
      id: reply.id,
      parent_id: reply.parent_id,
      reviewer: stripHtml(String(reply.reviewer || 'Anonymous')),
      reviewer_email: reply.reviewer_email || '',
      date_created: reply.date_created,
      reply: stripHtml(String(reply.reply || '')),
      verified: reply.verified || false,
      is_admin: reply.is_admin || false,
      status: reply.status || 'approved',
      replies: reply.replies || []
    }));
  }
  
  /**
   * Process reviews with parallel reply fetching
   */
  private static async processReviews(reviews: Record<string, unknown>[]): Promise<Review[]> {
    if (!reviews || reviews.length === 0) return [];
    
    // Parallel processing of reviews
    const processedReviews = await Promise.all(
      reviews.map(async (review: Record<string, unknown>) => {
        const sanitizedReview = {
          ...review,
          reviewer: stripHtml(String(review.reviewer || '')),
          review: stripHtml(String(review.review || '')),
          replies: [] as ReviewReply[]
        };
        
        // Fetch replies in parallel (non-blocking)
        this.getReviewReplies(Number(review.id)).then(replies => {
          sanitizedReview.replies = replies;
        }).catch(() => {
          sanitizedReview.replies = [];
        });
        
        return sanitizedReview;
      })
    );
    
    return processedReviews as Review[];
  }
  
  /**
   * Get nonce for authentication
   */
  private static async getNonce(): Promise<string> {
    try {
      const response = await fetch(`${this.apiUrl}/wp-json/wc/store/cart`, {
        credentials: 'include',
      });
      return response.headers.get('Nonce') || '';
    } catch {
      return '';
    }
  }
  
  /**
   * Smart cache invalidation
   */
  private static invalidateProductCache(productId: number): void {
    // Invalidate all review pages for this product
    reviewsCache.invalidatePattern(`reviews:${productId}:`);
    // Invalidate stats
    reviewsCache.delete(CacheKeys.stats(productId));
  }
}