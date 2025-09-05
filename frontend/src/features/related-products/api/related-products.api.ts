'use client';

import { Product } from '@/types/product';
import { config } from '@/lib/config';

export interface RelatedProductsFilters {
  categories?: number[];
  tags?: number[];
  excludeIds?: number[];
  limit?: number;
}

export class RelatedProductsApi {
  /**
   * Fetch products by category IDs
   */
  static async getProductsByCategories(
    categoryIds: number[],
    options: { exclude?: number[]; limit?: number } = {}
  ): Promise<Product[]> {
    try {
      const { exclude = [], limit = 8 } = options;
      const excludeQuery = exclude.length > 0 ? `&exclude=${exclude.join(',')}` : '';
      const categoryQuery = categoryIds.join(',');
      
      const response = await fetch(
        `${config.getApiUrl()}/wp-json/wc/store/products?category=${categoryQuery}${excludeQuery}&per_page=${limit}&orderby=popularity&order=desc`,
        { credentials: 'include' }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching products by categories:', error);
      return [];
    }
  }

  /**
   * Fetch products by tag IDs
   */
  static async getProductsByTags(
    tagIds: number[],
    options: { exclude?: number[]; limit?: number } = {}
  ): Promise<Product[]> {
    try {
      const { exclude = [], limit = 8 } = options;
      const excludeQuery = exclude.length > 0 ? `&exclude=${exclude.join(',')}` : '';
      const tagQuery = tagIds.join(',');
      
      const response = await fetch(
        `${config.getApiUrl()}/wp-json/wc/store/products?tag=${tagQuery}${excludeQuery}&per_page=${limit}&orderby=popularity&order=desc`,
        { credentials: 'include' }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching products by tags:', error);
      return [];
    }
  }

  /**
   * Get related products based on current product's categories and tags
   */
  static async getRelatedProducts(
    currentProduct: Product,
    options: { limit?: number } = {}
  ): Promise<Product[]> {
    const { limit = 8 } = options;
    let relatedProducts: Product[] = [];

    try {
      // Extract category and tag IDs
      const categoryIds = currentProduct.categories?.map(cat => cat.id) || [];
      const tagIds = currentProduct.tags?.map(tag => tag.id) || [];

      // First try to get products from the same categories
      if (categoryIds.length > 0) {
        const categoryProducts = await this.getProductsByCategories(categoryIds, {
          exclude: [currentProduct.id],
          limit
        });
        relatedProducts = [...categoryProducts];
      }

      // If we need more products, add from tags
      if (relatedProducts.length < limit && tagIds.length > 0) {
        const remainingLimit = limit - relatedProducts.length;
        const existingIds = relatedProducts.map(p => p.id);
        
        const tagProducts = await this.getProductsByTags(tagIds, {
          exclude: [currentProduct.id, ...existingIds],
          limit: remainingLimit
        });
        
        relatedProducts = [...relatedProducts, ...tagProducts];
      }

      // If still not enough, get popular products from the same categories
      if (relatedProducts.length < limit && categoryIds.length > 0) {
        const remainingLimit = limit - relatedProducts.length;
        const existingIds = relatedProducts.map(p => p.id);
        
        const moreProducts = await this.getProductsByCategories(categoryIds, {
          exclude: [currentProduct.id, ...existingIds],
          limit: remainingLimit
        });
        
        relatedProducts = [...relatedProducts, ...moreProducts];
      }

      // Remove duplicates and limit results
      const uniqueProducts = relatedProducts
        .filter((product, index, self) => 
          index === self.findIndex(p => p.id === product.id)
        )
        .slice(0, limit);

      return uniqueProducts;
    } catch (error) {
      console.error('Error fetching related products:', error);
      return [];
    }
  }

  /**
   * Get popular products from the same category as fallback
   */
  static async getPopularFromCategory(
    categoryIds: number[],
    options: { exclude?: number[]; limit?: number } = {}
  ): Promise<Product[]> {
    if (categoryIds.length === 0) return [];

    try {
      const { exclude = [], limit = 8 } = options;
      const excludeQuery = exclude.length > 0 ? `&exclude=${exclude.join(',')}` : '';
      
      const response = await fetch(
        `${config.getApiUrl()}/wp-json/wc/store/products?category=${categoryIds[0]}${excludeQuery}&per_page=${limit}&orderby=popularity&order=desc&status=publish`,
        { credentials: 'include' }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching popular products from category:', error);
      return [];
    }
  }

  /**
   * Smart related products with fallback strategy
   */
  static async getSmartRelatedProducts(
    currentProduct: Product,
    options: { limit?: number } = {}
  ): Promise<Product[]> {
    const { limit = 8 } = options;
    
    // Try multiple strategies in order of preference
    let products = await this.getRelatedProducts(currentProduct, { limit });
    
    // Fallback 1: If not enough products, try popular from first category
    if (products.length < limit && currentProduct.categories?.length && currentProduct.categories.length > 0) {
      const categoryIds = [currentProduct.categories[0].id];
      const existingIds = products.map(p => p.id);
      const remainingLimit = limit - products.length;
      
      const fallbackProducts = await this.getPopularFromCategory(categoryIds, {
        exclude: [currentProduct.id, ...existingIds],
        limit: remainingLimit
      });
      
      products = [...products, ...fallbackProducts];
    }
    
    return products.slice(0, limit);
  }
}