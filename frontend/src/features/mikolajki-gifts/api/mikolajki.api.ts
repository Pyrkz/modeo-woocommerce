import { ShopApi } from '@/features/shop/api/shop.api';
import { CategoriesApi } from '@/features/shop/api/categories.api';

import { MikolajkiGiftsResponse, MikolajkiFilters } from '../types';

// Add an export for the types to ensure proper module integration
export * from '../types';

export class MikolajkiApi {
  /**
   * Fetch products from Mikołajki category
   */
  static async fetchMikolajkiGifts(
    filters: MikolajkiFilters = {},
    page: number = 1,
    perPage: number = 16
  ): Promise<MikolajkiGiftsResponse> {
    try {
      // Find the exact "mikolajki" category
      const mikolajkiCategory = await this.findMikolajkiCategory();
      
      if (!mikolajkiCategory) {
        console.warn('Mikołajki category not found');
        return {
          products: [],
          total: 0,
          hasMore: false,
          isEmpty: true
        };
      }

      // Build filters for shop API - only use the Mikołajki category
      const shopFilters = {
        category: mikolajkiCategory.id.toString(),
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
      console.error('Failed to fetch Mikołajki gifts:', error);
      
      return {
        products: [],
        total: 0,
        hasMore: false,
        isEmpty: true
      };
    }
  }

  /**
   * Find the exact Mikołajki category by slug "mikolajki"
   */
  private static async findMikolajkiCategory() {
    try {
      const { categories } = await CategoriesApi.fetchCategories({
        hideEmpty: true,
        perPage: 100
      });

      // Look for exact match with "mikolajki" slug
      return categories.find(category => 
        category.slug.toLowerCase() === 'mikolajki'
      );
    } catch (error) {
      console.warn('Failed to fetch categories for Mikołajki search:', error);
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