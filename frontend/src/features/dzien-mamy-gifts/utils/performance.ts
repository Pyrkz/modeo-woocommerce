import { Product } from '@/types/product';
import { DzienMamyFilters } from '../types';

/**
 * Performance utilities for Dzień Mamy gifts feature
 * Optimizations for Mother's Day themed products
 */



/**
 * Preload critical Dzień Mamy images for better LCP
 */
export const preloadDzienMamyImages = (products: Product[]) => {
  if (typeof window === 'undefined') return;

  // Preload first 4 product images for above-the-fold content
  products.slice(0, 4).forEach((product) => {
    if (product.images?.[0]?.src) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = product.images[0].src;
      document.head.appendChild(link);
    }
  });
};

/**
 * Optimize Dzień Mamy product data for faster rendering
 */
export const optimizeDzienMamyProducts = (products: Product[]) => {
  return products.map((product) => ({
    ...product,
    // Pre-calculate display values
    displayPrice: product.prices.sale_price || product.prices.regular_price,
    hasDiscount: !!(product.prices.sale_price && product.prices.regular_price && product.prices.sale_price !== product.prices.regular_price),
    mainImage: product.images?.[0]?.src || '/placeholder-image.jpg',
    // Optimize for Mother's Day theming
    isMothersDayThemed: product.name?.toLowerCase().includes('mama') || 
                        product.name?.toLowerCase().includes('mother') ||
                        product.name?.toLowerCase().includes('dzień mamy') ||
                        product.categories?.some((cat) => 
                          cat.name?.toLowerCase().includes('mama') || 
                          cat.name?.toLowerCase().includes('mother') ||
                          cat.name?.toLowerCase().includes('dzień mamy')
                        )
  }));
};

/**
 * Lazy load intersection observer for Dzień Mamy products
 */
export const createDzienMamyIntersectionObserver = (callback: (entries: IntersectionObserverEntry[]) => void) => {
  if (typeof window === 'undefined') return null;

  return new IntersectionObserver(callback, {
    rootMargin: '50px 0px', // Load 50px before entering viewport
    threshold: 0.1, // Added trailing comma
  });
};

/**
 * Debounce search function for Dzień Mamy products
 */
export const debounceDzienMamySearch = <T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number = 300
): (...args: Parameters<T>) => void => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Cache key generator for Dzień Mamy products
 */
export const generateDzienMamyCacheKey = (filters: DzienMamyFilters, page: number, perPage: number) => {
  const filterString = Object.entries(filters)
    .sort(([a], [b]) => a.localeCompare(b))
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${key}:${value}`)
    .join('|');
    
  return `dzien-mamy:${filterString}:${page}:${perPage}`;
};

/**
 * Memory cleanup for Dzień Mamy feature
 */
export const cleanupDzienMamyResources = () => {
  // Clear any cached images
  if (typeof window !== 'undefined') {
    const preloadLinks = document.querySelectorAll('link[rel="preload"][as="image"]');
    preloadLinks.forEach(link => {
      if ((link as HTMLLinkElement).href.includes('mama') || 
          (link as HTMLLinkElement).href.includes('mother') ||
          (link as HTMLLinkElement).href.includes('dzien-mamy')) {
        link.remove();
      }
    });
  }
};

/**
 * Performance monitoring for Dzień Mamy page
 */
export const trackDzienMamyPerformance = (eventName: string, data?: unknown) => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // Mark performance event
    performance.mark(`dzien-mamy-${eventName}`);
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`💝 Dzień Mamy Performance: ${eventName}`, data);
    }
  }
};