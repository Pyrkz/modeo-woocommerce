/**
 * Dzień Dziadka API
 * Category-only filtering for Grandfather's Day products
 */

import { ShopApi } from '@/features/shop/api/shop.api';
import { Product } from '@/features/shop/types';
import { Category } from '@/types/category';
import { config } from '@/lib/config';
import type { DzienDziadkaGiftsResponse, DzienDziadkaFilters } from '../types';

// Custom ApiError class for this module
class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code: string = 'API_ERROR'
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class DzienDziadkaGiftsApi {
  /**
   * Find Dzień Dziadka category ID by slug
   * Searches for "dzien-dziadka" category
   */
  private static async findDzienDziatkaCategoryId(): Promise<number | null> {
    try {
      // Note: ShopApi doesn't have getCategories method, implement direct fetch
      const response = await fetch(`${config.getApiUrl()}/wp-json/wc/store/products/categories`);
      const categories = await response.json();
      
      // Look for exact match with "dzien-dziadka" slug
      const dzienDziadkaCategory = categories.find((category: Category) => 
        category.slug.toLowerCase() === 'dzien-dziadka'
      );

      if (dzienDziadkaCategory) {
        return dzienDziadkaCategory.id;
      }

      // Fallback: search for partial matches
      const fallbackCategory = categories.find((category: Category) => 
        category.slug.toLowerCase().includes('dziadka') ||
        category.slug.toLowerCase().includes('dziadek') ||
        category.slug.toLowerCase().includes('grandfather') ||
        category.slug.toLowerCase().includes('grandpa') ||
        category.name.toLowerCase().includes('dzień dziadka') ||
        category.name.toLowerCase().includes('dziadek') ||
        category.name.toLowerCase().includes('dziadka')
      );

      return fallbackCategory?.id || null;
    } catch (error) {
      console.error('Error finding Dzień Dziadka category:', error);
      return null;
    }
  }

  /**
   * Get Grandfather's Day products from specific category
   */
  static async getDzienDziadkaProducts(
    filters: DzienDziadkaFilters = {},
    page: number = 1,
    perPage: number = 12
  ): Promise<DzienDziadkaGiftsResponse> {
    try {
      // Find Dzień Dziadka category
      const categoryId = await this.findDzienDziatkaCategoryId();
      
      if (!categoryId) {
        return {
          products: [],
          total: 0,
          hasMore: false,
          isEmpty: true
        };
      }

      // Get products from Dzień Dziadka category only
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
      console.error('Error fetching Dzień Dziadka products:', error);
      
      if (error instanceof ApiError) {
        throw error;
      }
      
      throw new ApiError(
        'Nie udało się pobrać produktów na Dzień Dziadka',
        500,
        'DZIEN_DZIADKA_FETCH_ERROR'
      );
    }
  }

  /**
   * Get single Grandfather's Day product by ID
   */
  static async getDzienDziadkaProduct(id: number): Promise<Product | null> {
    try {
      // ShopApi doesn't have getProduct method, implement direct fetch
      const response = await fetch(`${config.getApiUrl()}/wp-json/wc/store/products/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching Dzień Dziadka product ${id}:`, error);
      return null;
    }
  }

  /**
   * Search Grandfather's Day products
   * Uses category filtering + search term
   */
  static async searchDzienDziadkaProducts(
    searchTerm: string,
    filters: DzienDziadkaFilters = {},
    page: number = 1,
    perPage: number = 12
  ): Promise<DzienDziadkaGiftsResponse> {
    try {
      const categoryId = await this.findDzienDziatkaCategoryId();
      
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
      console.error('Error searching Dzień Dziadka products:', error);
      throw new ApiError(
        'Nie udało się wyszukać produktów na Dzień Dziadka',
        500,
        'DZIEN_DZIADKA_SEARCH_ERROR'
      );
    }
  }

  /**
   * Get related Grandfather's Day products
   */
  static async getRelatedDzienDziadkaProducts(
    productId: number,
    limit: number = 4
  ): Promise<Product[]> {
    try {
      const categoryId = await this.findDzienDziatkaCategoryId();
      
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
      console.error('Error fetching related Dzień Dziadka products:', error);
      return [];
    }
  }

  /**
   * Get featured Grandfather's Day products
   */
  static async getFeaturedDzienDziadkaProducts(limit: number = 8): Promise<Product[]> {
    try {
      const response = await this.getDzienDziadkaProducts(
        { featured: true, orderby: 'date', order: 'desc' },
        1,
        limit
      );
      return response.products;
    } catch (error) {
      console.error('Error fetching featured Dzień Dziadka products:', error);
      return [];
    }
  }

  /**
   * Get Dzień Dziadka products on sale
   */
  static async getOnSaleDzienDziadkaProducts(limit: number = 8): Promise<Product[]> {
    try {
      const response = await this.getDzienDziadkaProducts(
        { on_sale: true, orderby: 'date', order: 'desc' },
        1,
        limit
      );
      return response.products;
    } catch (error) {
      console.error('Error fetching on sale Dzień Dziadka products:', error);
      return [];
    }
  }
}