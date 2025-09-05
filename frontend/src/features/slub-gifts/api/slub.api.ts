import { ShopApi } from '@/features/shop/api/shop.api';
import { CategoriesApi } from '@/features/shop/api/categories.api';
import { SlubGiftsResponse, SlubFilters } from '../types';

// Add an export for the types to ensure proper module integration
export * from '../types';

export class SlubApi {
  // Cache for the category ID to avoid repeated API calls
  private static categoryCache: { id: number; timestamp: number } | null = null;
  private static readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  /**
   * Fetch products from Ślub category
   */
  static async fetchSlubGifts(
    filters: SlubFilters = {},
    page: number = 1,
    perPage: number = 16
  ): Promise<SlubGiftsResponse> {
    try {
      // Get cached category ID or fetch it
      const slubCategory = await this.getSlubCategory();
      
      if (!slubCategory) {
        console.warn('Ślub category not found');
        return {
          products: [],
          total: 0,
          hasMore: false,
          isEmpty: true
        };
      }

      // Build filters for shop API - only use the Ślub category
      const shopFilters = {
        category: slubCategory.toString(),
        featured: filters.featured,
        search: filters.search,
        minPrice: filters.priceRange?.min,
        maxPrice: filters.priceRange?.max
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
      console.error('Failed to fetch Ślub gifts:', error);
      
      return {
        products: [],
        total: 0,
        hasMore: false,
        isEmpty: true
      };
    }
  }

  /**
   * Get Ślub category ID with caching to avoid repeated API calls
   */
  private static async getSlubCategory(): Promise<number | null> {
    // Check if we have a valid cached category ID
    if (this.categoryCache && (Date.now() - this.categoryCache.timestamp) < this.CACHE_DURATION) {
      return this.categoryCache.id;
    }

    try {
      const { categories } = await CategoriesApi.fetchCategories({
        hideEmpty: true,
        perPage: 100
      });

      // Look for exact match with "slub" slug
      const category = categories.find(category => 
        category.slug.toLowerCase() === 'slub'
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
      console.warn('Failed to fetch categories for Ślub search:', error);
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