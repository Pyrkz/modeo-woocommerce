import { Product } from '@/types/product';
import { DzienDzieckaFilters } from '../types';

/**
 * Performance utilities for Dzień Dziecka gifts feature
 * Optimizations for Children's Day themed products
 */

/**
 * Preload critical Dzień Dziecka images for better LCP
 */
export const preloadDzienDzieckaImages = (products: Product[]) => {
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
 * Optimize Dzień Dziecka product data for faster rendering
 */
export const optimizeDzienDzieckaProducts = (products: Product[]) => {
  return products.map((product) => ({
    ...product,
    // Pre-calculate display values
    displayPrice: product.prices.sale_price || product.prices.regular_price,
    hasDiscount: !!(product.prices.sale_price && product.prices.regular_price && product.prices.sale_price !== product.prices.regular_price),
    mainImage: product.images?.[0]?.src || '/placeholder-image.jpg',
    // Optimize for Children's Day theming
    isChildrensDayThemed: product.name?.toLowerCase().includes('dziecka') || 
                          product.name?.toLowerCase().includes('dziecko') ||
                          product.name?.toLowerCase().includes('dzieci') ||
                          product.name?.toLowerCase().includes('children') ||
                          product.name?.toLowerCase().includes('kids') ||
                          product.name?.toLowerCase().includes('dzień dziecka') ||
                          product.categories?.some((cat) => 
                            cat.name?.toLowerCase().includes('dziecka') || 
                            cat.name?.toLowerCase().includes('dziecko') ||
                            cat.name?.toLowerCase().includes('dzieci') ||
                            cat.name?.toLowerCase().includes('children') ||
                            cat.name?.toLowerCase().includes('kids') ||
                            cat.name?.toLowerCase().includes('dzień dziecka')
                          )
  }));
};

/**
 * Lazy load intersection observer for Dzień Dziecka products
 */
export const createDzienDzieckaIntersectionObserver = (callback: (entries: IntersectionObserverEntry[]) => void) => {
  if (typeof window === 'undefined') return null;

  return new IntersectionObserver(callback, {
    rootMargin: '50px 0px', // Load 50px before entering viewport
    threshold: 0.1
  });
};

/**
 * Debounce search function for Dzień Dziecka products
 */
export const debounceDzienDzieckaSearch = <T extends (...args: unknown[]) => unknown>(
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
 * Cache key generator for Dzień Dziecka products
 */
export const generateDzienDzieckaCacheKey = (filters: DzienDzieckaFilters, page: number, perPage: number) => {
  const filterString = Object.entries(filters)
    .sort(([a], [b]) => a.localeCompare(b))
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${key}:${value}`)
    .join('|');
    
  return `dzien-dziecka:${filterString}:${page}:${perPage}`;
};

/**
 * Memory cleanup for Dzień Dziecka feature
 */
export const cleanupDzienDzieckaResources = () => {
  // Clear any cached images
  if (typeof window !== 'undefined') {
    const preloadLinks = document.querySelectorAll('link[rel="preload"][as="image"]');
    preloadLinks.forEach(link => {
      if ((link as HTMLLinkElement).href.includes('dziecka') || 
          (link as HTMLLinkElement).href.includes('dziecko') ||
          (link as HTMLLinkElement).href.includes('dzieci') ||
          (link as HTMLLinkElement).href.includes('children') ||
          (link as HTMLLinkElement).href.includes('kids') ||
          (link as HTMLLinkElement).href.includes('dzien-dziecka')) {
        link.remove();
      }
    });
  }
};

/**
 * Performance monitoring for Dzień Dziecka page
 */
export const trackDzienDzieckaPerformance = (eventName: string, data?: unknown) => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // Mark performance event
    performance.mark(`dzien-dziecka-${eventName}`);
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`🎁 Dzień Dziecka Performance: ${eventName}`, data);
    }
  }
};