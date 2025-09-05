'use client';

/**
 * High-performance cache system for reviews
 * - Memory cache with TTL
 * - Background refresh
 * - Smart invalidation
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
  accessCount: number;
  lastAccess: number;
}

interface CacheStats {
  hits: number;
  misses: number;
  size: number;
  hitRate: number;
}

class PerformanceCache {
  private cache = new Map<string, CacheEntry<unknown>>();
  private stats = { hits: 0, misses: 0 };
  private maxSize = 100;
  private defaultTTL = 5 * 60 * 1000; // 5 minutes
  
  set<T>(key: string, data: T, ttl: number = this.defaultTTL): void {
    // Cleanup if cache is full
    if (this.cache.size >= this.maxSize) {
      this.cleanup();
    }
    
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
      accessCount: 0,
      lastAccess: Date.now()
    });
  }
  
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      this.stats.misses++;
      return null;
    }
    
    // Check if expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      this.stats.misses++;
      return null;
    }
    
    // Update access stats
    entry.accessCount++;
    entry.lastAccess = Date.now();
    this.stats.hits++;
    
    return entry.data as T;
  }
  
  delete(key: string): void {
    this.cache.delete(key);
  }
  
  invalidatePattern(pattern: string): void {
    const regex = new RegExp(pattern);
    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        this.cache.delete(key);
      }
    }
  }
  
  private cleanup(): void {
    // Remove expired entries first
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key);
      }
    }
    
    // If still too large, remove least used
    if (this.cache.size >= this.maxSize) {
      const entries = Array.from(this.cache.entries())
        .sort(([,a], [,b]) => a.accessCount - b.accessCount);
      
      const toRemove = entries.slice(0, Math.floor(this.maxSize * 0.2));
      toRemove.forEach(([key]) => this.cache.delete(key));
    }
  }
  
  getStats(): CacheStats {
    const total = this.stats.hits + this.stats.misses;
    return {
      ...this.stats,
      size: this.cache.size,
      hitRate: total > 0 ? this.stats.hits / total : 0
    };
  }
  
  clear(): void {
    this.cache.clear();
    this.stats = { hits: 0, misses: 0 };
  }
}

// Cache instances
export const reviewsCache = new PerformanceCache();
export const repliesCache = new PerformanceCache();

// Cache key generators
export const CacheKeys = {
  reviews: (productId: number, page: number) => `reviews:${productId}:${page}`,
  replies: (reviewId: number) => `replies:${reviewId}`,
  stats: (productId: number) => `stats:${productId}`,
  user: () => 'user:current'
};

// Background refresh utility
export const backgroundRefresh = async <T>(
  key: string, 
  fetchFn: () => Promise<T>,
  cache: PerformanceCache
): Promise<void> => {
  try {
    const data = await fetchFn();
    cache.set(key, data, 10 * 60 * 1000); // 10min for background refresh
  } catch {
    // Silent fail for background refresh
  }
};