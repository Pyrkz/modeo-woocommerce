/**
 * Performance utilities for Walentynki gifts feature
 * Optimizations for Valentine's Day themed products
 */

import { Product } from '@/types/product';
import { ShopFilters } from '@/features/shop/types';

interface OptimizedProduct extends Product {
  displayPrice: string;
  hasDiscount: boolean;
  mainImage: string;
  isValentineThemed: boolean;
}

interface CategoryItem {
  name?: string;
  slug?: string;
}

/**
 * Preload critical Walentynki images for better LCP
 */
export const preloadWalentynkiImages = (products: Product[]) => {
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
 * Optimize Walentynki product data for faster rendering
 */
export const optimizeWalentynkiProducts = (products: Product[]): OptimizedProduct[] => {
  return products.map((product) => ({
    ...product,
    // Pre-calculate display values
    displayPrice: product.prices.sale_price || product.prices.regular_price,
    hasDiscount: !!(product.prices.sale_price && product.prices.regular_price && product.prices.sale_price !== product.prices.regular_price),
    mainImage: product.images?.[0]?.src || '/placeholder-image.jpg',
    // Optimize for Valentine's theming
    isValentineThemed: !!(product.name?.toLowerCase().includes('walentynki') || 
                          product.name?.toLowerCase().includes('valentine') ||
                          product.name?.toLowerCase().includes('miłość') ||
                          product.categories?.some((cat: CategoryItem) => 
                            cat.name?.toLowerCase().includes('walentynki') || 
                            cat.name?.toLowerCase().includes('valentine') ||
                            cat.name?.toLowerCase().includes('miłość')
                          ))
  }));
};

/**
 * Lazy load intersection observer for Walentynki products
 */
export const createWalentynkiIntersectionObserver = (callback: (entries: IntersectionObserverEntry[]) => void) => {
  if (typeof window === 'undefined') return null;

  return new IntersectionObserver(callback, {
    rootMargin: '50px 0px', // Load 50px before entering viewport
    threshold: 0.1
  });
};

/**
 * Debounce search function for Walentynki products
 */
export const debounceWalentynkiSearch = <T extends (...args: unknown[]) => unknown>(
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
 * Cache key generator for Walentynki products
 */
export const generateWalentynkiCacheKey = (filters: ShopFilters, page: number, perPage: number) => {
  const filterString = Object.entries(filters)
    .sort(([a], [b]) => a.localeCompare(b))
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${key}:${value}`)
    .join('|');
    
  return `walentynki:${filterString}:${page}:${perPage}`;
};

/**
 * Memory cleanup for Walentynki feature
 */
export const cleanupWalentynkiResources = () => {
  // Clear any cached images
  if (typeof window !== 'undefined') {
    const preloadLinks = document.querySelectorAll('link[rel="preload"][as="image"]');
    preloadLinks.forEach(link => {
      if ((link as HTMLLinkElement).href.includes('walentynki') || 
          (link as HTMLLinkElement).href.includes('valentine') ||
          (link as HTMLLinkElement).href.includes('love')) {
        link.remove();
      }
    });
  }
};

/**
 * Performance monitoring for Walentynki page
 */
export const trackWalentynkiPerformance = (eventName: string, data?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // Mark performance event
    performance.mark(`walentynki-${eventName}`);
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`💖 Walentynki Performance: ${eventName}`, data);
    }
  }
};