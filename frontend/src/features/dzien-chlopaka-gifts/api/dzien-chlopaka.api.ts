import { ShopApi } from '@/features/shop/api/shop.api';
import { CategoriesApi } from '@/features/shop/api/categories.api';

import { DzienChlopakaGiftsResponse, DzienChlopakaFilters } from '../types';

// Add an export for the types to ensure proper module integration
export * from '../types';

export class DzienChlopakaApi {
  /**
   * Fetch products from Dzień Chłopaka category
   */
  static async fetchDzienChlopakaGifts(
    filters: DzienChlopakaFilters = {},
    page: number = 1,
    perPage: number = 16
  ): Promise<DzienChlopakaGiftsResponse> {
    try {
      // Find the exact "dzien-chlopaka" category
      const dzienChlopakaCategory = await this.findDzienChlopakaCategory();
      
      if (!dzienChlopakaCategory) {
        console.warn('Dzień Chłopaka category not found');
        return {
          products: [],
          total: 0,
          hasMore: false,
          isEmpty: true
        };
      }

      // Build filters for shop API - only use the Dzień Chłopaka category
      const shopFilters = {
        category: dzienChlopakaCategory.id.toString(),
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
      console.error('Failed to fetch Dzień Chłopaka gifts:', error);
      
      return {
        products: [],
        total: 0,
        hasMore: false,
        isEmpty: true
      };
    }
  }

  /**
   * Find the exact Dzień Chłopaka category by slug
   */
  private static async findDzienChlopakaCategory() {
    try {
      const { categories } = await CategoriesApi.fetchCategories({
        hideEmpty: true,
        perPage: 100
      });

      // Look for exact match with dzień chłopaka related slugs
      const possibleSlugs = ['dzien-chlopaka', 'chlopaka', 'chlopak', 'men-day', 'mens-day', 'boys-day'];
      
      return categories.find(category => 
        possibleSlugs.some(slug => category.slug.toLowerCase() === slug)
      );
    } catch (error) {
      console.warn('Failed to fetch categories for Dzień Chłopaka search:', error);
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