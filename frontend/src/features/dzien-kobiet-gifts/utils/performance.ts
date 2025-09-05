import { Product } from '@/types/product';
import { DzienKobietFilters } from '../types';

/**
 * Optimized performance utilities for Dzień Kobiet gifts feature
 * Focused on essential optimizations only
 */

/**
 * Preload critical first 4 product images for LCP optimization
 */
export const preloadCriticalImages = (products: Product[]): void => {
  if (typeof window === 'undefined' || !Array.isArray(products)) return;

  // Only preload first 4 images that will be above the fold
  products.slice(0, 4).forEach((product) => {
    if (product.images?.[0]?.src) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = product.images[0].src;
      link.onload = () => link.remove(); // Clean up after load
      document.head.appendChild(link);
    }
  });
};

/**
 * Debounced search function - prevents excessive API calls
 */
export const debounceSearch = <T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number = 300
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Generate stable cache key for API requests
 */
export const generateCacheKey = (filters: DzienKobietFilters, page: number, perPage: number): string => {
  const cleanFilters = Object.entries(filters || {})
    .filter(([, value]) => value != null && value !== '')
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}:${value}`)
    .join('|');
    
  return `dzien-kobiet:${cleanFilters}:${page}:${perPage}`;
};

/**
 * Performance tracking for development
 */
export const trackPerformance = (eventName: string, data?: unknown): void => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    performance.mark(`dzien-kobiet-${eventName}`);
    console.log(`🌸 Dzień Kobiet Performance: ${eventName}`, data);
  }
};