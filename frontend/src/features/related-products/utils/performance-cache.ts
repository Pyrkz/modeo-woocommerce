'use client';

/**
 * Performance-optimized cache for related products
 * Uses both in-memory and sessionStorage with intelligent invalidation
 */

interface CacheItem<T> {
  data: T;
  timestamp: number;
  hits: number;
  categoryIds?: number[];
  tagIds?: number[];
  ttl?: number;
}

interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  maxItems?: number; // Maximum items in cache
  enableStorage?: boolean; // Use sessionStorage
}

export class RelatedProductsCache {
  private static instance: RelatedProductsCache;
  private memoryCache = new Map<string, CacheItem<unknown>>();
  private readonly defaultTtl = 5 * 60 * 1000; // 5 minutes
  private readonly maxItems = 50;
  private readonly storagePrefix = 'rp_cache_';

  private constructor() {}

  static getInstance(): RelatedProductsCache {
    if (!RelatedProductsCache.instance) {
      RelatedProductsCache.instance = new RelatedProductsCache();
    }
    return RelatedProductsCache.instance;
  }

  /**
   * Generate cache key from product and options
   */
  generateKey(productId: number, options: { limit?: number; type?: string } = {}): string {
    const { limit = 8, type = 'related' } = options;
    return `${type}_${productId}_${limit}`;
  }

  /**
   * Set cache item with automatic cleanup
   */
  set<T>(key: string, data: T, options: CacheOptions = {}): void {
    const { ttl = this.defaultTtl, enableStorage = true } = options;
    const now = Date.now();

    // Clean old items if at capacity
    if (this.memoryCache.size >= this.maxItems) {
      this.cleanupExpired();
    }

    const cacheItem: CacheItem<T> = {
      data,
      timestamp: now,
      hits: 0,
      ttl,
    };

    // Store in memory
    this.memoryCache.set(key, cacheItem);

    // Store in sessionStorage
    if (enableStorage && typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(this.storagePrefix + key, JSON.stringify(cacheItem));
      } catch (error) {
        // Storage quota exceeded or not available
        console.warn('Failed to cache to sessionStorage:', error);
      }
    }
  }

  /**
   * Get cache item with hit counting
   */
  get<T>(key: string, options: CacheOptions = {}): T | null {
    const { ttl = this.defaultTtl } = options;
    const now = Date.now();

    // Try memory cache first
    let cacheItem = this.memoryCache.get(key) as CacheItem<T> | undefined;

    // Fallback to sessionStorage
    if (!cacheItem && typeof window !== 'undefined') {
      try {
        const stored = sessionStorage.getItem(this.storagePrefix + key);
        if (stored) {
          cacheItem = JSON.parse(stored) as CacheItem<T>;
          // Restore to memory cache
          if (cacheItem) {
            this.memoryCache.set(key, cacheItem);
          }
        }
      } catch {
        // Invalid JSON or storage error
      }
    }

    if (!cacheItem) {
      return null;
    }

    // Check if expired
    if (now - cacheItem.timestamp > ttl) {
      this.delete(key);
      return null;
    }

    // Update hit count
    cacheItem.hits++;

    return cacheItem.data;
  }

  /**
   * Delete cache item
   */
  delete(key: string): void {
    this.memoryCache.delete(key);
    
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(this.storagePrefix + key);
    }
  }

  /**
   * Clean up expired items
   */
  cleanupExpired(): void {
    const now = Date.now();
    
    for (const [key, item] of this.memoryCache.entries()) {
      if (now - item.timestamp > (item.ttl ?? this.defaultTtl)) {
        this.delete(key);
      }
    }
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.memoryCache.clear();
    
    if (typeof window !== 'undefined') {
      try {
        const keys = Object.keys(sessionStorage);
        keys.forEach(key => {
          if (key.startsWith(this.storagePrefix)) {
            sessionStorage.removeItem(key);
          }
        });
      } catch {
        // Storage not available
      }
    }
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return {
      memoryItems: this.memoryCache.size,
      totalHits: Array.from(this.memoryCache.values()).reduce((sum, item) => sum + item.hits, 0)
    };
  }

  /**
   * Prefetch related products for a product
   */
  async prefetch(productId: number, limit = 8): Promise<void> {
    const key = this.generateKey(productId, { limit });
    
    // Skip if already cached and fresh
    if (this.get(key)) {
      return;
    }

    // This would be implemented in the component/hook that uses the cache
    // For now, just mark the intention to prefetch
    console.debug(`Prefetch requested for product ${productId}`);
  }

  /**
   * Batch invalidate cache for products in categories
   */
  invalidateByCategory(): void {
    const keysToDelete: string[] = [];
    
    for (const key of this.memoryCache.keys()) {
      // This would need product-category mapping to work fully
      // For now, we could implement a simple pattern match
      if (key.includes('related_')) {
        keysToDelete.push(key);
      }
    }

    keysToDelete.forEach(key => this.delete(key));
  }
}

/**
 * Global cache instance
 */
export const relatedProductsCache = RelatedProductsCache.getInstance();

/**
 * Cache decorator for functions
 */
export function withCache<T extends unknown[], R>(
  fn: (...args: T) => Promise<R>,
  keyGenerator: (...args: T) => string,
  ttl = 5 * 60 * 1000
) {
  const cache = RelatedProductsCache.getInstance();
  
  return async (...args: T): Promise<R> => {
    const key = keyGenerator(...args);
    
    // Try cache first
    const cached = cache.get<R>(key, { ttl });
    if (cached) {
      return cached;
    }

    // Execute function and cache result
    const result = await fn(...args);
    cache.set(key, result, { ttl });
    
    return result;
  };
}