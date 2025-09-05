import { Product } from '@/types/product';
import { DzienTatyFilters } from '../types';

/**
 * Performance utilities for Dzień Taty gifts feature
 * Optimizations for Father's Day themed products
 */

/**
 * Preload critical Dzień Taty images for better LCP
 */
export const preloadDzienTatyImages = (products: Product[]) => {
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
 * Optimize Dzień Taty product data for faster rendering
 */
export const optimizeDzienTatyProducts = (products: Product[]) => {
  return products.map((product) => ({
    ...product,
    // Pre-calculate display values
    displayPrice: product.prices.sale_price || product.prices.regular_price,
    hasDiscount: !!(product.prices.sale_price && product.prices.regular_price && product.prices.sale_price !== product.prices.regular_price),
    mainImage: product.images?.[0]?.src || '/placeholder-image.jpg',
    // Optimize for Father's Day theming
    isFathersDayThemed: product.name?.toLowerCase().includes('tata') || 
                        product.name?.toLowerCase().includes('father') ||
                        product.name?.toLowerCase().includes('ojciec') ||
                        product.name?.toLowerCase().includes('dzień taty') ||
                        product.categories?.some((cat) => 
                          cat.name?.toLowerCase().includes('tata') || 
                          cat.name?.toLowerCase().includes('father') ||
                          cat.name?.toLowerCase().includes('ojciec') ||
                          cat.name?.toLowerCase().includes('dzień taty')
                        )
  }));
};

/**
 * Lazy load intersection observer for Dzień Taty products
 */
export const createDzienTatyIntersectionObserver = (callback: (entries: IntersectionObserverEntry[]) => void) => {
  if (typeof window === 'undefined') return null;

  return new IntersectionObserver(callback, {
    rootMargin: '50px 0px', // Load 50px before entering viewport
    threshold: 0.1
  });
};

/**
 * Debounce search function for Dzień Taty products
 */
export const debounceDzienTatySearch = <T extends (...args: unknown[]) => unknown>(
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
 * Cache key generator for Dzień Taty products
 */
export const generateDzienTatyCacheKey = (filters: DzienTatyFilters, page: number, perPage: number) => {
  const filterString = Object.entries(filters)
    .sort(([a], [b]) => a.localeCompare(b))
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${key}:${value}`)
    .join('|');
    
  return `dzien-taty:${filterString}:${page}:${perPage}`;
};

/**
 * Memory cleanup for Dzień Taty feature
 */
export const cleanupDzienTatyResources = () => {
  // Clear any cached images
  if (typeof window !== 'undefined') {
    const preloadLinks = document.querySelectorAll('link[rel="preload"][as="image"]');
    preloadLinks.forEach(link => {
      if ((link as HTMLLinkElement).href.includes('tata') || 
          (link as HTMLLinkElement).href.includes('father') ||
          (link as HTMLLinkElement).href.includes('ojciec') ||
          (link as HTMLLinkElement).href.includes('dzien-taty')) {
        link.remove();
      }
    });
  }
};

/**
 * Performance monitoring for Dzień Taty page
 */
export const trackDzienTatyPerformance = (eventName: string, data?: unknown) => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // Mark performance event
    performance.mark(`dzien-taty-${eventName}`);
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`🎁 Dzień Taty Performance: ${eventName}`, data);
    }
  }
};