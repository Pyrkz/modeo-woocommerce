import { ShopApi } from '@/features/shop/api/shop.api';
import { CategoriesApi } from '@/features/shop/api/categories.api';

import { DzienKobietGiftsResponse, DzienKobietFilters } from '../types';

export class DzienKobietApi {
  // Advanced cache for the category ID to avoid repeated API calls
  private static categoryCache: { id: number; timestamp: number } | null = null;
  private static readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  /**
   * Fetch products from Dzień Kobiet category with optimizations
   */
  static async fetchDzienKobietGifts(
    filters: DzienKobietFilters = {},
    page: number = 1,
    perPage: number = 16
  ): Promise<DzienKobietGiftsResponse> {
    try {
      // Get cached category ID or fetch it with timestamp validation
      const dzienKobietCategoryId = await this.getDzienKobietCategoryId();
      
      if (!dzienKobietCategoryId) {
        console.warn('Dzień Kobiet category not found');
        return this.getEmptyResponse();
      }

      // Build optimized filters
      const shopFilters = this.buildShopFilters(filters, dzienKobietCategoryId);
      
      const response = await ShopApi.fetchProducts(shopFilters, page, perPage);

      return {
        products: response.products,
        total: response.total,
        hasMore: response.hasMore,
        isEmpty: response.products.length === 0
      };

    } catch (error) {
      console.error('Failed to fetch Dzień Kobiet gifts:', error);
      return this.getEmptyResponse();
    }
  }

  /**
   * Get Dzień Kobiet category ID with timestamp validation caching
   */
  private static async getDzienKobietCategoryId(): Promise<number | null> {
    // Check if we have a valid cached category ID
    if (this.categoryCache && (Date.now() - this.categoryCache.timestamp) < this.CACHE_DURATION) {
      return this.categoryCache.id;
    }

    return await this.findDzienKobietCategory();
  }

  /**
   * Find and cache Dzień Kobiet category
   */
  private static async findDzienKobietCategory(): Promise<number | null> {

    try {
      const { categories } = await CategoriesApi.fetchCategories({
        hideEmpty: true,
        perPage: 100
      });

      const category = categories.find(cat => 
        cat.slug.toLowerCase() === 'dzien-kobiet'
      );

      if (category) {
        // Cache the category ID with timestamp for future requests
        this.categoryCache = {
          id: category.id,
          timestamp: Date.now()
        };
        return category.id;
      }

      return null;
    } catch (error) {
      console.warn('Failed to fetch categories:', error);
      return null;
    }
  }

  /**
   * Build shop filters efficiently
   */
  private static buildShopFilters(filters: DzienKobietFilters, categoryId: number) {
    const shopFilters: Record<string, unknown> = {
      category: categoryId.toString()
    };

    if (filters.featured) shopFilters.featured = filters.featured;
    if (filters.search?.trim()) shopFilters.search = filters.search.trim();
    if (filters.priceRange?.min) shopFilters.minPrice = filters.priceRange.min;
    if (filters.priceRange?.max) shopFilters.maxPrice = filters.priceRange.max;

    return shopFilters;
  }

  /**
   * Return empty response
   */
  private static getEmptyResponse(): DzienKobietGiftsResponse {
    return {
      products: [],
      total: 0,
      hasMore: false,
      isEmpty: true
    };
  }

  /**
   * Clear cached category (useful for testing or manual refresh)
   */
  static clearCache() {
    this.categoryCache = null;
  }
}