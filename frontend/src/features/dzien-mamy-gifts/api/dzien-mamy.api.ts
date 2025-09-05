import { ShopApi } from '@/features/shop/api/shop.api';
import { CategoriesApi } from '@/features/shop/api/categories.api';

import { DzienMamyGiftsResponse, DzienMamyFilters } from '../types';

// Add an export for the types to ensure proper module integration
export * from '../types';

export class DzienMamyApi {
  // Cache for the category ID to avoid repeated API calls
  private static categoryCache: { id: number; timestamp: number } | null = null;
  private static readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  /**
   * Fetch products from Dzień Mamy category
   */
  static async fetchDzienMamyGifts(
    filters: DzienMamyFilters = {},
    page: number = 1,
    perPage: number = 16
  ): Promise<DzienMamyGiftsResponse> {
    try {
      // Get cached category ID or fetch it
      const dzienMamyCategory = await this.getDzienMamyCategory();
      
      if (!dzienMamyCategory) {
        console.warn('Dzień Mamy category not found');
        return {
          products: [],
          total: 0,
          hasMore: false,
          isEmpty: true
        };
      }

      // Build filters for shop API - only use the Dzień Mamy category
      const shopFilters = {
        category: dzienMamyCategory.toString(),
        featured: filters.featured,
        on_sale: filters.on_sale,
        price_min: filters.price_min,
        price_max: filters.price_max,
        orderby: filters.orderby || 'date',
        order: filters.order || 'desc'
      };

      // Remove empty filters
      Object.keys(shopFilters).forEach(key => {
        if (!shopFilters[key as keyof typeof shopFilters]) {
          delete shopFilters[key as keyof typeof shopFilters];
        }
      });

      const response = await ShopApi.fetchProducts(shopFilters, page, perPage);

      return {
        products: response.products,
        total: response.total,
        hasMore: response.hasMore,
        isEmpty: response.products.length === 0
      };

    } catch (error) {
      console.error('Failed to fetch Dzień Mamy gifts:', error);
      
      return {
        products: [],
        total: 0,
        hasMore: false,
        isEmpty: true
      };
    }
  }

  /**
   * Get Dzień Mamy category ID with caching to avoid repeated API calls
   */
  private static async getDzienMamyCategory(): Promise<number | null> {
    // Check if we have a valid cached category ID
    if (this.categoryCache && (Date.now() - this.categoryCache.timestamp) < this.CACHE_DURATION) {
      return this.categoryCache.id;
    }

    try {
      const { categories } = await CategoriesApi.fetchCategories({
        hideEmpty: true,
        perPage: 100
      });

      // Look for exact match with dzień mamy related slugs
      const possibleSlugs = ['dzien-mamy', 'mamy', 'mama', 'mother', 'mothers-day'];
      
      const category = categories.find(category => 
        possibleSlugs.some(slug => category.slug.toLowerCase() === slug)
      );

      if (category) {
        // Cache the category ID for future requests
        this.categoryCache = {
          id: category.id,
          timestamp: Date.now()
        };
        return category.id;
      }

      return null;
    } catch (error) {
      console.warn('Failed to fetch categories for Dzień Mamy search:', error);
      return null;
    }
  }

  /**
   * Get category by slug helper
   */
  static async getCategoryBySlug(slug: string) {
    return await CategoriesApi.fetchCategoryBySlug(slug);
  }
}