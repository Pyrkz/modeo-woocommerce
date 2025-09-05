import { Product } from '@/types/product';
import { DzienBabciFilters } from '../types';

/**
 * Performance utilities for Dzień Babci gifts feature
 * Optimizations for Grandmother's Day themed products
 */

/**
 * Preload critical Dzień Babci images for better LCP
 */
export const preloadDzienBabciImages = (products: Product[]) => {
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
 * Optimize Dzień Babci product data for faster rendering
 */
export const optimizeDzienBabciProducts = (products: Product[]) => {
  return products.map((product) => ({
    ...product,
    // Pre-calculate display values
    displayPrice: product.prices.sale_price || product.prices.regular_price,
    hasDiscount: !!(product.prices.sale_price && product.prices.regular_price && product.prices.sale_price !== product.prices.regular_price),
    mainImage: product.images?.[0]?.src || '/placeholder-image.jpg',
    // Optimize for Grandmother's Day theming
    isGrandmothersDayThemed: product.name?.toLowerCase().includes('babci') || 
                             product.name?.toLowerCase().includes('babcia') ||
                             product.name?.toLowerCase().includes('grandmother') ||
                             product.name?.toLowerCase().includes('grandma') ||
                             product.name?.toLowerCase().includes('dzień babci') ||
                             product.categories?.some((cat) => 
                               cat.name?.toLowerCase().includes('babci') || 
                               cat.name?.toLowerCase().includes('babcia') ||
                               cat.name?.toLowerCase().includes('grandmother') ||
                               cat.name?.toLowerCase().includes('grandma') ||
                               cat.name?.toLowerCase().includes('dzień babci')
                             )
  }));
};

/**
 * Lazy load intersection observer for Dzień Babci products
 */
export const createDzienBabciIntersectionObserver = (callback: (entries: IntersectionObserverEntry[]) => void) => {
  if (typeof window === 'undefined') return null;

  return new IntersectionObserver(callback, {
    rootMargin: '50px 0px', // Load 50px before entering viewport
    threshold: 0.1
  });
};

/**
 * Debounce search function for Dzień Babci products
 */
export const debounceDzienBabciSearch = <T extends (...args: unknown[]) => unknown>(
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
 * Cache key generator for Dzień Babci products
 */
export const generateDzienBabciCacheKey = (filters: DzienBabciFilters, page: number, perPage: number) => {
  const filterString = Object.entries(filters)
    .sort(([a], [b]) => a.localeCompare(b))
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${key}:${value}`)
    .join('|');
    
  return `dzien-babci:${filterString}:${page}:${perPage}`;
};

/**
 * Memory cleanup for Dzień Babci feature
 */
export const cleanupDzienBabciResources = () => {
  // Clear any cached images
  if (typeof window !== 'undefined') {
    const preloadLinks = document.querySelectorAll('link[rel="preload"][as="image"]');
    preloadLinks.forEach(link => {
      if ((link as HTMLLinkElement).href.includes('babci') || 
          (link as HTMLLinkElement).href.includes('babcia') ||
          (link as HTMLLinkElement).href.includes('grandmother') ||
          (link as HTMLLinkElement).href.includes('grandma') ||
          (link as HTMLLinkElement).href.includes('dzien-babci')) {
        link.remove();
      }
    });
  }
};

/**
 * Performance monitoring for Dzień Babci page
 */
export const trackDzienBabciPerformance = (eventName: string, data?: unknown) => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // Mark performance event
    performance.mark(`dzien-babci-${eventName}`);
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`💐 Dzień Babci Performance: ${eventName}`, data);
    }
  }
};