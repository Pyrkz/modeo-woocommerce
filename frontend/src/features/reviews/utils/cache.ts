interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expires: number;
}

export class ReviewCache {
  private cache = new Map<string, CacheEntry<unknown>>();
  private readonly defaultTTL = 5 * 60 * 1000; // 5 minutes

  set<T>(key: string, data: T, ttl?: number): void {
    const now = Date.now();
    this.cache.set(key, {
      data,
      timestamp: now,
      expires: now + (ttl || this.defaultTTL)
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    if (Date.now() > entry.expires) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  // Clean expired entries
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expires) {
        this.cache.delete(key);
      }
    }
  }

  // Generate cache keys
  static keys = {
    reviews: (productId: number, page: number) => `reviews_${productId}_${page}`,
    stats: (productId: number) => `stats_${productId}`,
  };
}

// Export singleton instance
export const reviewCache = new ReviewCache();

// Cleanup expired entries periodically
if (typeof window !== 'undefined') {
  setInterval(() => {
    reviewCache.cleanup();
  }, 2 * 60 * 1000); // Every 2 minutes
}