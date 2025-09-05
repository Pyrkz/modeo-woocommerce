// Cache management for branding products
const CACHE_KEY_PREFIX = 'branding_products_';
const DEFAULT_CACHE_TTL = 10 * 60 * 1000; // 10 minutes

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

export class BrandingProductsCache {
  private static instance: BrandingProductsCache;
  private memoryCache: Map<string, CacheEntry<unknown>>;

  private constructor() {
    this.memoryCache = new Map();
  }

  static getInstance(): BrandingProductsCache {
    if (!BrandingProductsCache.instance) {
      BrandingProductsCache.instance = new BrandingProductsCache();
    }
    return BrandingProductsCache.instance;
  }

  set<T>(key: string, data: T, ttl = DEFAULT_CACHE_TTL): void {
    const cacheKey = `${CACHE_KEY_PREFIX}${key}`;
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl,
    };

    // Memory cache
    this.memoryCache.set(cacheKey, entry);

    // LocalStorage cache (with error handling)
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(cacheKey, JSON.stringify(entry));
      }
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  }

  get<T>(key: string): T | null {
    const cacheKey = `${CACHE_KEY_PREFIX}${key}`;

    // Try memory cache first
    const memoryEntry = this.memoryCache.get(cacheKey);
    if (memoryEntry && this.isValid(memoryEntry)) {
      return memoryEntry.data as T;
    }

    // Try localStorage
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem(cacheKey);
        if (stored) {
          const entry: CacheEntry<T> = JSON.parse(stored);
          if (this.isValid(entry)) {
            // Restore to memory cache
            this.memoryCache.set(cacheKey, entry);
            return entry.data;
          } else {
            // Clean up expired entry
            localStorage.removeItem(cacheKey);
          }
        }
      }
    } catch (error) {
      console.warn('Failed to read from localStorage:', error);
    }

    return null;
  }

  private isValid(entry: CacheEntry<unknown>): boolean {
    return Date.now() - entry.timestamp < entry.ttl;
  }

  clear(pattern?: string): void {
    // Clear memory cache
    if (pattern) {
      const keys = Array.from(this.memoryCache.keys());
      keys.forEach(key => {
        if (key.includes(pattern)) {
          this.memoryCache.delete(key);
        }
      });
    } else {
      this.memoryCache.clear();
    }

    // Clear localStorage
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
          if (key.startsWith(CACHE_KEY_PREFIX)) {
            if (!pattern || key.includes(pattern)) {
              localStorage.removeItem(key);
            }
          }
        });
      }
    } catch (error) {
      console.warn('Failed to clear localStorage:', error);
    }
  }
}

// Performance monitoring utility
export const measurePerformance = (name: string) => {
  const start = performance.now();
  
  return {
    end: () => {
      const end = performance.now();
      const duration = end - start;
      
      // Performance logging enabled
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`);
      }
      
      return duration;
    }
  };
};

// Debounce utility for search and filters
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Image optimization helper - improved for higher quality
export const getOptimizedImageSrc = (src: string, width: number): string => {
  if (!src) return '';
  
  // For higher quality, prefer larger sizes and original images
  
  // If it's already a large WooCommerce resized image, return as is
  if (src.includes('-768x768') || src.includes('-600x600') || src.includes('-1024x1024')) {
    return src;
  }
  
  // Remove any existing size suffixes to get the base URL
  const baseUrl = src.replace(/-\d+x\d+/g, '').replace(/\.(jpg|jpeg|png|webp)$/i, '');
  const extension = src.match(/\.(jpg|jpeg|png|webp)$/i)?.[0] || '.jpg';
  
  // For branding products, use higher quality images
  if (width <= 300) {
    // Try 600x600 first (higher quality), fallback to original
    return `${baseUrl}-600x600${extension}`;
  } else if (width <= 500) {
    // For larger displays, use even higher quality
    return `${baseUrl}-768x768${extension}`;
  } else {
    // For very large displays, use original or highest available
    return `${baseUrl}-1024x1024${extension}`;
  }
};

// Intersection Observer for lazy loading
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver | null => {
  if (typeof window === 'undefined' || !window.IntersectionObserver) {
    return null;
  }
  
  return new IntersectionObserver(callback, {
    rootMargin: '50px',
    threshold: 0.01,
    ...options,
  });
};