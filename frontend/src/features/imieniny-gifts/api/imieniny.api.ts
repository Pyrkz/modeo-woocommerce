import { ShopApi } from '@/features/shop/api/shop.api';
import { CategoriesApi } from '@/features/shop/api/categories.api';

import { ImieninyGiftsResponse, ImieninyFilters } from '../types';

// Add an export for the types to ensure proper module integration
export * from '../types';

export class ImieninyApi {
  /**
   * Fetch products from Imieniny category
   */
  static async fetchImieninyGifts(
    filters: ImieninyFilters = {},
    page: number = 1,
    perPage: number = 16
  ): Promise<ImieninyGiftsResponse> {
    try {
      // Find the exact "imieniny" category
      const imieninyCategory = await this.findImieninyCategory();
      
      if (!imieninyCategory) {
        console.warn('Imieniny category not found');
        return {
          products: [],
          total: 0,
          hasMore: false,
          isEmpty: true
        };
      }

      // Build filters for shop API - only use the Imieniny category
      const shopFilters = {
        category: imieninyCategory.id.toString(),
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
      console.error('Failed to fetch Imieniny gifts:', error);
      
      return {
        products: [],
        total: 0,
        hasMore: false,
        isEmpty: true
      };
    }
  }

  /**
   * Find the exact Imieniny category by slug "imieniny"
   */
  private static async findImieninyCategory() {
    try {
      const { categories } = await CategoriesApi.fetchCategories({
        hideEmpty: true,
        perPage: 100
      });

      // Look for exact match with "imieniny" slug
      return categories.find(category => 
        category.slug.toLowerCase() === 'imieniny'
      );
    } catch (error) {
      console.warn('Failed to fetch categories for Imieniny search:', error);
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