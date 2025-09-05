/**
 * Performance utilities for Ślub gifts feature
 * Optimizations for Wedding themed products
 */

import { Product } from '@/types/product';
import { ShopFilters } from '@/features/shop/types';

interface OptimizedProduct extends Product {
  displayPrice: string;
  hasDiscount: boolean;
  mainImage: string;
  isWeddingThemed: boolean;
}

interface CategoryItem {
  name?: string;
  slug?: string;
}

/**
 * Preload critical Ślub images for better LCP
 */
export const preloadSlubImages = (products: Product[]) => {
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
 * Optimize Ślub product data for faster rendering
 */
export const optimizeSlubProducts = (products: Product[]): OptimizedProduct[] => {
  return products.map((product) => ({
    ...product,
    // Pre-calculate display values
    displayPrice: product.prices.sale_price || product.prices.regular_price,
    hasDiscount: !!(product.prices.sale_price && product.prices.regular_price && product.prices.sale_price !== product.prices.regular_price),
    mainImage: product.images?.[0]?.src || '/placeholder-image.jpg',
    // Optimize for Wedding theming
    isWeddingThemed: !!(product.name?.toLowerCase().includes('ślub') || 
                        product.name?.toLowerCase().includes('wedding') ||
                        product.name?.toLowerCase().includes('wesele') ||
                        product.categories?.some((cat: CategoryItem) => 
                          cat.name?.toLowerCase().includes('ślub') || 
                          cat.name?.toLowerCase().includes('wedding') ||
                          cat.name?.toLowerCase().includes('wesele')
                        ))
  }));
};

/**
 * Lazy load intersection observer for Ślub products
 */
export const createSlubIntersectionObserver = (callback: (entries: IntersectionObserverEntry[]) => void) => {
  if (typeof window === 'undefined') return null;

  return new IntersectionObserver(callback, {
    rootMargin: '50px 0px', // Load 50px before entering viewport
    threshold: 0.1
  });
};

/**
 * Debounce search function for Ślub products
 */
export const debounceSlubSearch = <T extends (...args: unknown[]) => unknown>(
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
 * Cache key generator for Ślub products
 */
export const generateSlubCacheKey = (filters: ShopFilters, page: number, perPage: number) => {
  const filterString = Object.entries(filters)
    .sort(([a], [b]) => a.localeCompare(b))
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${key}:${value}`)
    .join('|');
    
  return `slub:${filterString}:${page}:${perPage}`;
};

/**
 * Memory cleanup for Ślub feature
 */
export const cleanupSlubResources = () => {
  // Clear any cached images
  if (typeof window !== 'undefined') {
    const preloadLinks = document.querySelectorAll('link[rel="preload"][as="image"]');
    preloadLinks.forEach(link => {
      if ((link as HTMLLinkElement).href.includes('slub') || 
          (link as HTMLLinkElement).href.includes('wedding') ||
          (link as HTMLLinkElement).href.includes('wesele')) {
        link.remove();
      }
    });
  }
};

/**
 * Performance monitoring for Ślub page
 */
export const trackSlubPerformance = (eventName: string, data?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // Mark performance event
    performance.mark(`slub-${eventName}`);
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`💒 Ślub Performance: ${eventName}`, data);
    }
  }
};