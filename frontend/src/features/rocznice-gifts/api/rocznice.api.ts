import { ShopApi } from '@/features/shop/api/shop.api';
import { CategoriesApi } from '@/features/shop/api/categories.api';
import { RoczniceGiftsResponse, RoczniceFilters } from '../types';

// Add an export for the types to ensure proper module integration
export * from '../types';

export class RoczniceApi {
  // Cache for the category ID to avoid repeated API calls
  private static categoryCache: { id: number; timestamp: number } | null = null;
  private static readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  /**
   * Fetch products from Rocznice category
   */
  static async fetchRoczniceGifts(
    filters: RoczniceFilters = {},
    page: number = 1,
    perPage: number = 16
  ): Promise<RoczniceGiftsResponse> {
    try {
      // Get cached category ID or fetch it with timestamp validation
      const roczniceCategory = await this.getRoczniceCategoryId();
      
      if (!roczniceCategory) {
        console.warn('Rocznice category not found');
        return this.getEmptyResponse();
      }

      // Build optimized filters
      const shopFilters = this.buildShopFilters(filters, roczniceCategory);

      const response = await ShopApi.fetchProducts(shopFilters, page, perPage);

      return {
        products: response.products,
        total: response.total,
        hasMore: response.hasMore,
        isEmpty: response.products.length === 0
      };

    } catch (error) {
      console.error('Failed to fetch Rocznice gifts:', error);
      return this.getEmptyResponse();
    }
  }

  /**
   * Get Rocznice category ID with timestamp validation caching
   */
  private static async getRoczniceCategoryId(): Promise<number | null> {
    // Check if we have a valid cached category ID
    if (this.categoryCache && (Date.now() - this.categoryCache.timestamp) < this.CACHE_DURATION) {
      return this.categoryCache.id;
    }

    return await this.findRoczniceCategory();
  }

  /**
   * Find and cache Rocznice category
   */
  private static async findRoczniceCategory(): Promise<number | null> {
    try {
      const { categories } = await CategoriesApi.fetchCategories({
        hideEmpty: true,
        perPage: 100
      });

      const category = categories.find(cat => 
        cat.slug.toLowerCase() === 'rocznice'
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
  private static buildShopFilters(filters: RoczniceFilters, categoryId: number) {
    const shopFilters: Record<string, string | number | boolean> = {
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
  private static getEmptyResponse(): RoczniceGiftsResponse {
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

  /**
   * Get category by slug helper
   */
  static async getCategoryBySlug(slug: string) {
    return await CategoriesApi.fetchCategoryBySlug(slug);
  }
}