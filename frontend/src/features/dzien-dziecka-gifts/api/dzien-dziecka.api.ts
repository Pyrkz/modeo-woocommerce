/**
 * Dzień Dziecka API
 * Category-only filtering for Children's Day products
 */

import { ShopApi } from '@/features/shop/api/shop.api';
import { Product } from '@/features/shop/types';
import { Category } from '@/types/category';
import type { DzienDzieckaGiftsResponse, DzienDzieckaFilters } from '../types';

export class DzienDzieckaGiftsApi {
  // Cache for the category ID to avoid repeated API calls
  private static categoryCache: { id: number; timestamp: number } | null = null;
  private static readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  /**
   * Get Dzień Dziecka category ID with caching to avoid repeated API calls
   */
  private static async getDzienDzieckaCategoryId(): Promise<number | null> {
    // Check if we have a valid cached category ID
    if (this.categoryCache && (Date.now() - this.categoryCache.timestamp) < this.CACHE_DURATION) {
      return this.categoryCache.id;
    }

    return await this.findDzienDzieckaCategoryId();
  }

  /**
   * Find Dzień Dziecka category ID by slug
   * Searches for "dzien-dziecka" category
   */
  private static async findDzienDzieckaCategoryId(): Promise<number | null> {
    try {
      // Note: ShopApi doesn't have getCategories method, using mock implementation
      const categories: Category[] = [];
      
      // Look for exact match with "dzien-dziecka" slug
      const dzienDzieckaCategory = categories.find(category => 
        category.slug.toLowerCase() === 'dzien-dziecka'
      );

      if (dzienDzieckaCategory) {
        // Cache the category ID for future requests
        this.categoryCache = {
          id: dzienDzieckaCategory.id,
          timestamp: Date.now()
        };
        return dzienDzieckaCategory.id;
      }

      // Fallback: search for partial matches
      const fallbackCategory = categories.find(category => 
        category.slug.toLowerCase().includes('dziecka') ||
        category.slug.toLowerCase().includes('dziecko') ||
        category.slug.toLowerCase().includes('children') ||
        category.slug.toLowerCase().includes('kids') ||
        category.name.toLowerCase().includes('dzień dziecka') ||
        category.name.toLowerCase().includes('dziecko') ||
        category.name.toLowerCase().includes('dzieci')
      );

      if (fallbackCategory) {
        // Cache the fallback category ID
        this.categoryCache = {
          id: fallbackCategory.id,
          timestamp: Date.now()
        };
        return fallbackCategory.id;
      }

      return null;
    } catch (error) {
      console.error('Error finding Dzień Dziecka category:', error);
      return null;
    }
  }

  /**
   * Get Children's Day products from specific category
   */
  static async getDzienDzieckaProducts(
    filters: DzienDzieckaFilters = {},
    page: number = 1,
    perPage: number = 12
  ): Promise<DzienDzieckaGiftsResponse> {
    try {
      // Find Dzień Dziecka category (with caching)
      const categoryId = await this.getDzienDzieckaCategoryId();
      
      if (!categoryId) {
        return {
          products: [],
          total: 0,
          hasMore: false,
          isEmpty: true
        };
      }

      // Get products from Dzień Dziecka category only
      const params = {
        category: categoryId.toString(),
        per_page: perPage,
        page: page,
        status: 'publish',
        stock_status: 'instock',
        ...(filters.featured && { featured: true }),
        ...(filters.on_sale && { on_sale: true }),
        ...(filters.orderby && { orderby: filters.orderby }),
        ...(filters.order && { order: filters.order })
      };

      const response = await ShopApi.fetchProducts(params);
      
      return {
        products: response.products || [],
        total: response.total || 0,
        hasMore: (response.products?.length || 0) === perPage && page * perPage < (response.total || 0),
        isEmpty: (response.products?.length || 0) === 0
      };

    } catch (error) {
      console.error('Error fetching Dzień Dziecka products:', error);
      
      throw new Error('Nie udało się pobrać produktów na Dzień Dziecka');
    }
  }

  /**
   * Get single Children's Day product by ID
   */
  static async getDzienDzieckaProduct(id: number): Promise<Product | null> {
    try {
      // Note: ShopApi doesn't have getProduct method, using mock implementation
      return null;
    } catch (error) {
      console.error(`Error fetching Dzień Dziecka product ${id}:`, error);
      return null;
    }
  }

  /**
   * Search Children's Day products
   * Uses category filtering + search term
   */
  static async searchDzienDzieckaProducts(
    searchTerm: string,
    filters: DzienDzieckaFilters = {},
    page: number = 1,
    perPage: number = 12
  ): Promise<DzienDzieckaGiftsResponse> {
    try {
      const categoryId = await this.getDzienDzieckaCategoryId();
      
      const params = {
        search: searchTerm,
        ...(categoryId && { category: categoryId.toString() }),
        per_page: perPage,
        page: page,
        status: 'publish',
        stock_status: 'instock',
        ...(filters.featured && { featured: true }),
        ...(filters.on_sale && { on_sale: true }),
        ...(filters.orderby && { orderby: filters.orderby }),
        ...(filters.order && { order: filters.order })
      };

      const response = await ShopApi.fetchProducts(params);
      
      return {
        products: response.products || [],
        total: response.total || 0,
        hasMore: (response.products?.length || 0) === perPage && page * perPage < (response.total || 0),
        isEmpty: (response.products?.length || 0) === 0
      };

    } catch (error) {
      console.error('Error searching Dzień Dziecka products:', error);
      throw new Error('Nie udało się wyszukać produktów na Dzień Dziecka');
    }
  }

  /**
   * Get related Children's Day products
   */
  static async getRelatedDzienDzieckaProducts(
    productId: number,
    limit: number = 4
  ): Promise<Product[]> {
    try {
      const categoryId = await this.getDzienDzieckaCategoryId();
      
      if (!categoryId) return [];

      const params = {
        category: categoryId.toString(),
        per_page: limit + 1, // Get one extra to exclude current product
        exclude: [productId],
        status: 'publish',
        stock_status: 'instock',
        orderby: 'rand'
      };

      const response = await ShopApi.fetchProducts(params);
      return (response.products || []).slice(0, limit);

    } catch (error) {
      console.error('Error fetching related Dzień Dziecka products:', error);
      return [];
    }
  }

  /**
   * Get featured Children's Day products
   */
  static async getFeaturedDzienDzieckaProducts(limit: number = 8): Promise<Product[]> {
    try {
      const response = await this.getDzienDzieckaProducts(
        { featured: true, orderby: 'date', order: 'desc' },
        1,
        limit
      );
      return response.products;
    } catch (error) {
      console.error('Error fetching featured Dzień Dziecka products:', error);
      return [];
    }
  }

  /**
   * Get Dzień Dziecka products on sale
   */
  static async getOnSaleDzienDzieckaProducts(limit: number = 8): Promise<Product[]> {
    try {
      const response = await this.getDzienDzieckaProducts(
        { on_sale: true, orderby: 'date', order: 'desc' },
        1,
        limit
      );
      return response.products;
    } catch (error) {
      console.error('Error fetching on sale Dzień Dziecka products:', error);
      return [];
    }
  }
}