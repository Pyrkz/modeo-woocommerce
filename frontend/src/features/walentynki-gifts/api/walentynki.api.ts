import { ShopApi } from '@/features/shop/api/shop.api';
import { CategoriesApi } from '@/features/shop/api/categories.api';
import { WalentynkiGiftsResponse, WalentynkiFilters } from '../types';

// Add an export for the types to ensure proper module integration
export * from '../types';

export class WalentynkiApi {
  // Cache for the category ID to avoid repeated API calls
  private static categoryCache: { id: number; timestamp: number } | null = null;
  private static readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  /**
   * Fetch products from Walentynki category
   */
  static async fetchWalentynkiGifts(
    filters: WalentynkiFilters = {},
    page: number = 1,
    perPage: number = 16
  ): Promise<WalentynkiGiftsResponse> {
    try {
      // Get cached category ID or fetch it
      const walentynkiCategory = await this.getWalentynkiCategory();
      
      if (!walentynkiCategory) {
        console.warn('Walentynki category not found');
        return {
          products: [],
          total: 0,
          hasMore: false,
          isEmpty: true
        };
      }

      // Build filters for shop API - only use the Walentynki category
      const shopFilters = {
        category: walentynkiCategory.toString(),
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
      console.error('Failed to fetch Walentynki gifts:', error);
      
      return {
        products: [],
        total: 0,
        hasMore: false,
        isEmpty: true
      };
    }
  }

  /**
   * Get Walentynki category ID with caching to avoid repeated API calls
   */
  private static async getWalentynkiCategory(): Promise<number | null> {
    // Check if we have a valid cached category ID
    if (this.categoryCache && (Date.now() - this.categoryCache.timestamp) < this.CACHE_DURATION) {
      return this.categoryCache.id;
    }

    try {
      const { categories } = await CategoriesApi.fetchCategories({
        hideEmpty: true,
        perPage: 100
      });

      // Look for exact match with "walentynki" slug
      const category = categories.find(category => 
        category.slug.toLowerCase() === 'walentynki'
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
      console.warn('Failed to fetch categories for Walentynki search:', error);
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