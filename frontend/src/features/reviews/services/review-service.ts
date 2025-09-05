import { config } from '@/lib/config';
import { Review, ReviewFormData, ReviewsResponse, CreateReviewResponse, ReviewStats, ReviewReply, ReplyFormData } from '../types';
import { reviewCache, ReviewCache } from '../utils/cache';
import { stripHtml } from '@/utils/sanitize';

export class ReviewService {
  private static apiUrl = config.getApiUrl();

  // Clear all cache entries for a product
  private static clearProductCache(productId: number) {
    reviewCache.delete(ReviewCache.keys.stats(productId));
    
    // Clear all review pages for this product (up to 20 pages should be enough)
    for (let page = 1; page <= 20; page++) {
      reviewCache.delete(ReviewCache.keys.reviews(productId, page));
    }

    // Clear individual reply caches (we don't have specific keys for this yet)
    if (process.env.NODE_ENV === 'development') {
    }
  }

  static async getProductReviews(
    productId: number,
    page: number = 1,
    perPage: number = 10
  ): Promise<ReviewsResponse> {
    const cacheKey = ReviewCache.keys.reviews(productId, page);
    
    // Check cache first
    const cached = reviewCache.get<ReviewsResponse>(cacheKey);
    if (cached && cached.reviews) {
      return cached;
    }

    try {
      // Try Store API first (wp-json/wc/store/products/reviews)
      let response = await fetch(
        `${this.apiUrl}/wp-json/wc/store/products/reviews?product_id=${productId}&per_page=${perPage}&page=${page}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );

      // If Store API doesn't work, try WC v3 API
      if (!response.ok) {
        response = await fetch(
          `${this.apiUrl}/wp-json/wc/v3/products/reviews?product=${productId}&page=${page}&per_page=${perPage}&status=approved`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }
        );
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch reviews: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Handle different API response formats
      let reviews, total, totalPages;
      
      if (Array.isArray(data)) {
        // WC v3 API format
        reviews = data;
        total = parseInt(response.headers.get('X-WP-Total') || '0');
        totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1');
      } else if (data.reviews) {
        // Store API format
        reviews = data.reviews;
        total = data.total || 0;
        totalPages = data.total_pages || 1;
      } else {
        // Fallback
        reviews = [];
        total = 0;
        totalPages = 0;
      }

      // Sanitize reviews data and fetch replies
      const sanitizedReviews = await Promise.all((reviews || []).map(async (review: Review) => {
        const sanitizedReview = {
          ...review,
          reviewer: review.reviewer ? stripHtml(review.reviewer) : '',
          review: review.review ? stripHtml(review.review) : ''
        };

        // Fetch replies for this review
        try {
          const replies = await this.getReviewReplies(review.id);
          sanitizedReview.replies = replies;
          
          // Debug logging
          if (process.env.NODE_ENV === 'development' && replies.length > 0) {
          }
        } catch {
          sanitizedReview.replies = [];
        }

        return sanitizedReview;
      }));

      const result = {
        reviews: sanitizedReviews,
        total,
        total_pages: totalPages
      };

      // Cache the result only if we got valid data
      if (result.reviews) {
        reviewCache.set(cacheKey, result);
      }

      return result;
    } catch {
      return {
        reviews: [],
        total: 0,
        total_pages: 0
      };
    }
  }

  static async createReview(reviewData: ReviewFormData): Promise<CreateReviewResponse | null> {
    try {
      // First, try to get a nonce for authentication
      let nonce = '';
      try {
        const nonceResponse = await fetch(`${this.apiUrl}/wp-json/wc/store/cart`, {
          credentials: 'include',
        });
        const nonceHeader = nonceResponse.headers.get('Nonce');
        if (nonceHeader) {
          nonce = nonceHeader;
        }
      } catch {
        // Nonce fetch failed, continue without nonce
      }

      // Prepare headers
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      if (nonce) {
        headers['Nonce'] = nonce;
        headers['X-WP-Nonce'] = nonce;
      }

      // Try custom Modeo reviews endpoint first (most permissive)
      let response = await fetch(
        `${this.apiUrl}/wp-json/modeo/v1/reviews`,
        {
          method: 'POST',
          headers,
          credentials: 'include',
          body: JSON.stringify({
            product_id: reviewData.product_id,
            reviewer: reviewData.reviewer,
            reviewer_email: reviewData.reviewer_email,
            review: reviewData.review,
            rating: reviewData.rating
          })
        }
      );

      // If Comments API doesn't work, try Store API
      if (!response.ok) {
        response = await fetch(
          `${this.apiUrl}/wp-json/wc/store/products/reviews`,
          {
            method: 'POST',
            headers,
            credentials: 'include',
            body: JSON.stringify({
              product_id: reviewData.product_id,
              reviewer: reviewData.reviewer,
              reviewer_email: reviewData.reviewer_email,
              review: reviewData.review,
              rating: reviewData.rating
            })
          }
        );
      }

      // If Store API doesn't work, try WC v3 API
      if (!response.ok) {
        response = await fetch(
          `${this.apiUrl}/wp-json/wc/v3/products/reviews`,
          {
            method: 'POST',
            headers,
            credentials: 'include',
            body: JSON.stringify({
              product_id: reviewData.product_id,
              reviewer: reviewData.reviewer,
              reviewer_email: reviewData.reviewer_email,
              review: reviewData.review,
              rating: reviewData.rating
            })
          }
        );
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || `HTTP ${response.status}: ${response.statusText}`;
        
        // Provide helpful error messages in Polish
        if (response.status === 401 || response.status === 403) {
          throw new Error('Musisz być zalogowany, aby dodać opinię. Zaloguj się i spróbuj ponownie.');
        } else if (errorMessage.includes('zweryfikowany')) {
          throw new Error('Opinię może dodać tylko zweryfikowany nabywca tego produktu.');
        } else {
          throw new Error(errorMessage);
        }
      }

      const result = await response.json();

      // Clear cache for this product to ensure fresh data
      const productId = reviewData.product_id;
      this.clearProductCache(productId);

      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getReviewStats(productId: number): Promise<ReviewStats> {
    const cacheKey = ReviewCache.keys.stats(productId);
    
    // Check cache first
    const cached = reviewCache.get<ReviewStats>(cacheKey);
    if (cached && typeof cached.total_reviews !== 'undefined') {
      return cached;
    }

    try {
      // Get all reviews for stats calculation
      const allReviewsResponse = await this.getProductReviews(productId, 1, 100);
      
      if (!allReviewsResponse || !allReviewsResponse.reviews || !Array.isArray(allReviewsResponse.reviews)) {
        return {
          average_rating: 0,
          total_reviews: 0,
          rating_counts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
        };
      }

      const reviews = allReviewsResponse.reviews;

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

      // Cache the stats for longer since they don't change frequently
      reviewCache.set(cacheKey, result, 10 * 60 * 1000); // 10 minutes

      return result;
    } catch {
      return {
        average_rating: 0,
        total_reviews: 0,
        rating_counts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      };
    }
  }

  static async getReviewReplies(reviewId: number): Promise<ReviewReply[]> {
    try {
      // Use the custom Modeo endpoint for getting replies
      const url = `${this.apiUrl}/wp-json/modeo/v1/review-replies/${reviewId}`;
      
      if (process.env.NODE_ENV === 'development') {
      }
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        await response.text().catch(() => 'No error text');
        return [];
      }

      const data = await response.json();
      
      if (process.env.NODE_ENV === 'development') {
      }
      
      // The endpoint returns { replies: [...], total: number }
      const replies = data.replies || [];
      
      // Transform and sanitize replies data
      const transformedReplies = replies.map((reply: ReviewReply) => {
        const transformed = {
          id: reply.id,
          parent_id: reply.parent_id,
          reviewer: stripHtml(reply.reviewer || 'Anonymous'),
          reviewer_email: reply.reviewer_email || '',
          date_created: reply.date_created,
          reply: stripHtml(reply.reply || ''),
          verified: reply.verified || false,
          is_admin: reply.is_admin || false,
          status: reply.status || 'approved',
          replies: reply.replies || [] // Include nested replies
        };
        
        
        return transformed;
      });
      
      
      return transformedReplies;
    } catch {
      return [];
    }
  }

  static async createReplyToReview(replyData: ReplyFormData): Promise<ReviewReply> {
    try {
      // First, try to get a nonce for authentication
      let nonce = '';
      try {
        const nonceResponse = await fetch(`${this.apiUrl}/wp-json/wc/store/cart`, {
          credentials: 'include',
        });
        const nonceHeader = nonceResponse.headers.get('Nonce');
        if (nonceHeader) {
          nonce = nonceHeader;
        }
      } catch {
        // Nonce fetch failed, continue without nonce
      }

      // Prepare headers
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      if (nonce) {
        headers['Nonce'] = nonce;
        headers['X-WP-Nonce'] = nonce;
      }

      // Use the custom Modeo review-replies endpoint
      const response = await fetch(
        `${this.apiUrl}/wp-json/modeo/v1/review-replies`,
        {
          method: 'POST',
          headers,
          credentials: 'include',
          body: JSON.stringify({
            parent_id: replyData.parent_id,
            product_id: replyData.product_id,
            reviewer: replyData.reviewer,
            reviewer_email: replyData.reviewer_email,
            reply: replyData.reply
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || `HTTP ${response.status}: ${response.statusText}`;
        
        // Provide helpful error messages in Polish
        if (response.status === 401 || response.status === 403) {
          throw new Error('Brak uprawnień do dodawania odpowiedzi.');
        } else if (response.status === 404) {
          throw new Error('Nie znaleziono opinii lub produktu.');
        } else {
          throw new Error(errorMessage);
        }
      }

      const result = await response.json();

      // Clear review cache for this product to ensure fresh data
      const productId = replyData.product_id;
      this.clearProductCache(productId);

      return result;
    } catch (error) {
      throw error;
    }
  }
}