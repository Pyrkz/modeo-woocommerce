import { config } from '@/lib/config';
import type { UrodzinyProduct, UrodzinyFilters } from '../types';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

interface CategoryItem {
  id: number;
  name: string;
  slug: string;
  count: number;
}

const API_BASE_URL = config.getApiUrl();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Simple in-memory cache
const cache = new Map<string, CacheEntry<unknown>>();

const getCachedData = (key: string) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

const setCachedData = <T>(key: string, data: T) => {
  cache.set(key, { data, timestamp: Date.now() });
};

export class UrodzinyApi {
  /**
   * Fetch birthday gift products with filtering and pagination
   */
  static async getProducts(
    page: number = 1,
    perPage: number = 12,
    filters: UrodzinyFilters = {}
  ): Promise<{ products: UrodzinyProduct[]; total: number; hasMore: boolean }> {
    const cacheKey = `urodziny-products-${JSON.stringify({ page, perPage, filters })}`;
    const cached = getCachedData(cacheKey);
    if (cached) return cached as { products: UrodzinyProduct[]; total: number; hasMore: boolean };

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        per_page: perPage.toString(),
        status: 'publish',
        stock_status: 'instock',
      });

      // Add category filter for birthday-related products
      if (filters.category) {
        params.append('category', filters.category);
      } else {
        // Default birthday categories/tags
        params.append('tag', 'urodziny,birthday,celebration,party');
      }

      // Add other filters
      if (filters.featured) {
        params.append('featured', 'true');
      }

      if (filters.onSale) {
        params.append('on_sale', 'true');
      }

      if (filters.search) {
        params.append('search', filters.search);
      }

      if (filters.sortBy) {
        switch (filters.sortBy) {
          case 'price_low':
            params.append('orderby', 'price');
            params.append('order', 'asc');
            break;
          case 'price_high':
            params.append('orderby', 'price');
            params.append('order', 'desc');
            break;
          case 'date':
            params.append('orderby', 'date');
            params.append('order', 'desc');
            break;
          case 'title':
            params.append('orderby', 'title');
            params.append('order', 'asc');
            break;
          case 'popularity':
          default:
            params.append('orderby', 'popularity');
            params.append('order', 'desc');
            break;
        }
      }

      const response = await fetch(
        `${API_BASE_URL}/wp-json/wc/store/products?${params.toString()}`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const products: UrodzinyProduct[] = Array.isArray(data) ? data : [];
      const totalHeader = response.headers.get('X-WP-Total');
      const total = totalHeader ? parseInt(totalHeader, 10) : products.length;
      const hasMore = page * perPage < total;

      const result = { products, total, hasMore };
      setCachedData(cacheKey, result);
      
      return result;
    } catch (error) {
      console.error('Error fetching birthday products:', error);
      throw new Error('Nie udało się załadować produktów urodzinowych');
    }
  }

  /**
   * Get featured birthday products
   */
  static async getFeaturedProducts(limit: number = 8): Promise<UrodzinyProduct[]> {
    const cacheKey = `urodziny-featured-${limit}`;
    const cached = getCachedData(cacheKey);
    if (cached) return cached as UrodzinyProduct[];

    try {
      const { products } = await this.getProducts(1, limit, { 
        featured: true,
        sortBy: 'popularity'
      });
      
      setCachedData(cacheKey, products);
      return products;
    } catch (error) {
      console.error('Error fetching featured birthday products:', error);
      return [];
    }
  }

  /**
   * Search birthday products
   */
  static async searchProducts(
    query: string,
    limit: number = 12
  ): Promise<UrodzinyProduct[]> {
    if (!query.trim()) return [];

    const cacheKey = `urodziny-search-${query}-${limit}`;
    const cached = getCachedData(cacheKey);
    if (cached) return cached as UrodzinyProduct[];

    try {
      const searchQuery = `${query} urodziny birthday celebration`;
      const { products } = await this.getProducts(1, limit, {
        search: searchQuery,
        sortBy: 'popularity'
      });

      setCachedData(cacheKey, products);
      return products;
    } catch (error) {
      console.error('Error searching birthday products:', error);
      return [];
    }
  }

  /**
   * Get birthday product categories
   */
  static async getCategories(): Promise<Array<{ id: number; name: string; slug: string; count: number }>> {
    const cacheKey = 'urodziny-categories';
    const cached = getCachedData(cacheKey);
    if (cached) return cached as Array<{ id: number; name: string; slug: string; count: number }>;

    try {
      const response = await fetch(
        `${API_BASE_URL}/wp-json/wc/store/products/categories?hide_empty=true`,
        {
          headers: {
            'Accept': 'application/json',
          },
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const categories = await response.json();
      
      // Filter categories relevant to birthdays
      const birthdayCategories = categories.filter((cat: CategoryItem) => 
        cat.name.toLowerCase().includes('urodziny') ||
        cat.name.toLowerCase().includes('birthday') ||
        cat.name.toLowerCase().includes('prezent') ||
        cat.slug.includes('gift') ||
        cat.slug.includes('birthday')
      );

      setCachedData(cacheKey, birthdayCategories);
      return birthdayCategories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  /**
   * Fetch birthday gifts (alias for getProducts with consistent interface)
   */
  static async fetchUrodzinyGifts(
    filters: UrodzinyFilters = {},
    page: number = 1,
    perPage: number = 16
  ): Promise<{ products: UrodzinyProduct[]; total: number; hasMore: boolean }> {
    return this.getProducts(page, perPage, filters);
  }

  /**
   * Clear cache (useful for refreshing data)
   */
  static clearCache(): void {
    cache.clear();
  }
}