/**
 * Dzień Babci API
 * Category-only filtering for Grandmother's Day products
 */

import { ShopApi } from '@/features/shop/api/shop.api';
import { CategoriesApi } from '@/features/shop/api/categories.api';
import { Product } from '@/types/product';
import type { Category } from '@/types/category';
import type { ShopFilters } from '@/features/shop/types';
import type { DzienBabciGiftsResponse, DzienBabciFilters } from '../types';

export class DzienBabciGiftsApi {
  // Cache for the category ID to avoid repeated API calls
  private static categoryCache: { id: number; timestamp: number } | null = null;
  private static readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  /**
   * Get Dzień Babci category ID with caching to avoid repeated API calls
   */
  private static async getDzienBabciCategoryId(): Promise<number | null> {
    // Check if we have a valid cached category ID
    if (this.categoryCache && (Date.now() - this.categoryCache.timestamp) < this.CACHE_DURATION) {
      return this.categoryCache.id;
    }

    return await this.findDzienBabciCategoryId();
  }

  /**
   * Find Dzień Babci category ID by slug
   * Searches for "dzien-babci" category
   */
  private static async findDzienBabciCategoryId(): Promise<number | null> {
    try {
      const categoriesResponse = await CategoriesApi.fetchCategories({ hideEmpty: true });
      const categories = categoriesResponse.categories;
      
      // Look for exact match with "dzien-babci" slug
      const dzienBabciCategory = categories.find((category: Category) => 
        category.slug.toLowerCase() === 'dzien-babci'
      );

      if (dzienBabciCategory) {
        // Cache the category ID for future requests
        this.categoryCache = {
          id: dzienBabciCategory.id,
          timestamp: Date.now()
        };
        return dzienBabciCategory.id;
      }

      // Fallback: search for partial matches
      const fallbackCategory = categories.find((category: Category) => 
        category.slug.toLowerCase().includes('babci') ||
        category.slug.toLowerCase().includes('babcia') ||
        category.slug.toLowerCase().includes('grandmother') ||
        category.slug.toLowerCase().includes('grandma') ||
        category.name.toLowerCase().includes('dzień babci') ||
        category.name.toLowerCase().includes('babcia') ||
        category.name.toLowerCase().includes('babci')
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
      console.error('Error finding Dzień Babci category:', error);
      return null;
    }
  }

  /**
   * Get Grandmother's Day products from specific category
   */
  static async getDzienBabciProducts(
    filters: DzienBabciFilters = {},
    page: number = 1,
    perPage: number = 12
  ): Promise<DzienBabciGiftsResponse> {
    try {
      // Find Dzień Babci category
      const categoryId = await this.getDzienBabciCategoryId();
      
      if (!categoryId) {
        return {
          products: [],
          total: 0,
          hasMore: false,
          isEmpty: true
        };
      }

      // Get products from Dzień Babci category only
      const shopFilters: ShopFilters = {
        category: categoryId.toString(),
        featured: filters.featured,
        inStock: true,
        ...(filters.orderby && { sortBy: filters.orderby as 'date' | 'title' | 'price' | 'popularity' | 'rating' }),
        ...(filters.order && { sortOrder: filters.order })
      };

      const response = await ShopApi.fetchProducts(shopFilters, page, perPage);
      
      return {
        products: response.products || [],
        total: response.total || 0,
        hasMore: (response.products?.length || 0) === perPage && page * perPage < (response.total || 0),
        isEmpty: (response.products?.length || 0) === 0
      };

    } catch (error) {
      console.error('Error fetching Dzień Babci products:', error);
      
      if (error instanceof Error) {
        throw error;
      }
      
      throw new Error('Nie udało się pobrać produktów na Dzień Babci'
      );
    }
  }

  /**
   * Get single Grandmother's Day product by ID
   */
  static async getDzienBabciProduct(id: number): Promise<Product | null> {
    try {
      // Use a different approach since include is not in ShopFilters
      // We'll fetch all products and filter by ID on the client side
      const response = await ShopApi.fetchProducts({}, 1, 100); // Get first 100 products
      const product = response.products.find(p => p.id === id);
      return product || null;
    } catch (error) {
      console.error(`Error fetching Dzień Babci product ${id}:`, error);
      return null;
    }
  }

  /**
   * Search Grandmother's Day products
   * Uses category filtering + search term
   */
  static async searchDzienBabciProducts(
    searchTerm: string,
    filters: DzienBabciFilters = {},
    page: number = 1,
    perPage: number = 12
  ): Promise<DzienBabciGiftsResponse> {
    try {
      const categoryId = await this.getDzienBabciCategoryId();
      
      const shopFilters: ShopFilters = {
        search: searchTerm,
        ...(categoryId && { category: categoryId.toString() }),
        featured: filters.featured,
        inStock: true,
        ...(filters.orderby && { sortBy: filters.orderby as 'date' | 'title' | 'price' | 'popularity' | 'rating' }),
        ...(filters.order && { sortOrder: filters.order })
      };

      const response = await ShopApi.fetchProducts(shopFilters, page, perPage);
      
      return {
        products: response.products || [],
        total: response.total || 0,
        hasMore: (response.products?.length || 0) === perPage && page * perPage < (response.total || 0),
        isEmpty: (response.products?.length || 0) === 0
      };

    } catch (error) {
      console.error('Error searching Dzień Babci products:', error);
      throw new Error('Nie udało się wyszukać produktów na Dzień Babci');
    }
  }

  /**
   * Get related Grandmother's Day products
   */
  static async getRelatedDzienBabciProducts(
    productId: number,
    limit: number = 4
  ): Promise<Product[]> {
    try {
      const categoryId = await this.getDzienBabciCategoryId();
      
      if (!categoryId) return [];

      const shopFilters: ShopFilters = {
        category: categoryId.toString(),
        inStock: true
      };

      const response = await ShopApi.fetchProducts(shopFilters, 1, limit + 5); // Get more to filter out current product
      // Filter out the current product and limit results
      const filteredProducts = response.products.filter(p => p.id !== productId);
      return filteredProducts.slice(0, limit);

    } catch (error) {
      console.error('Error fetching related Dzień Babci products:', error);
      return [];
    }
  }

  /**
   * Get featured Grandmother's Day products
   */
  static async getFeaturedDzienBabciProducts(limit: number = 8): Promise<Product[]> {
    try {
      const response = await this.getDzienBabciProducts(
        { featured: true, orderby: 'date', order: 'desc' },
        1,
        limit
      );
      return response.products;
    } catch (error) {
      console.error('Error fetching featured Dzień Babci products:', error);
      return [];
    }
  }

  /**
   * Get Dzień Babci products on sale
   */
  static async getOnSaleDzienBabciProducts(limit: number = 8): Promise<Product[]> {
    try {
      const response = await this.getDzienBabciProducts(
        { on_sale: true, orderby: 'date', order: 'desc' },
        1,
        limit
      );
      return response.products;
    } catch (error) {
      console.error('Error fetching on sale Dzień Babci products:', error);
      return [];
    }
  }
}