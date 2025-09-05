'use client';

import { useEffect } from 'react';

/**
 * Preloads critical resources for the szkoly branding page
 */
export const useSzkolyPreloading = () => {
  useEffect(() => {
    // Preload WooCommerce API endpoints
    const preloadLinks = [
      '/wp-json/wc/store/v1/products',
      '/wp-json/wc/store/v1/products/categories'
    ];

    preloadLinks.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}${href}`;
      document.head.appendChild(link);
    });

    return () => {
      // Cleanup preload links
      preloadLinks.forEach(href => {
        const link = document.querySelector(`link[href="${process.env.NEXT_PUBLIC_WORDPRESS_URL}${href}"]`);
        if (link) {
          document.head.removeChild(link);
        }
      });
    };
  }, []);
};

/**
 * Optimized image loading for szkoly branding assets
 */
export const useImageOptimization = () => {
  useEffect(() => {
    // Preload hero background gradients (CSS optimization)
    const style = document.createElement('style');
    style.textContent = `
      .szkoly-hero-bg {
        background: linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #faf5ff 100%);
        will-change: transform;
      }
      .szkoly-card-hover {
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .szkoly-card-hover:hover {
        transform: translateY(-2px);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);
};

/**
 * Performance monitoring for szkoly branding page
 */
export const useSzkolyPerformanceMonitoring = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          // Log performance metrics in development
          if (process.env.NODE_ENV === 'development') {
            console.log(`[Szkoly Performance] ${entry.name}: ${(entry as PerformanceEntry & { value?: number }).value || 'N/A'}`);
          }
        });
      });

      // Observe layout shifts and loading performance
      observer.observe({ entryTypes: ['layout-shift', 'largest-contentful-paint'] });

      return () => {
        observer.disconnect();
      };
    }
  }, []);
};

/**
 * Memory optimization for long-running szkoly page sessions
 */
export const useSzkolyMemoryOptimization = () => {
  useEffect(() => {
    let memoryCheckInterval: NodeJS.Timeout;

    // Check memory usage periodically in development
    if (process.env.NODE_ENV === 'development' && 'memory' in performance) {
      memoryCheckInterval = setInterval(() => {
        const memInfo = (performance as unknown as { memory?: { usedJSHeapSize: number; totalJSHeapSize: number } }).memory;
        if (memInfo && memInfo.usedJSHeapSize > 50 * 1024 * 1024) { // 50MB threshold
          console.warn('[Szkoly Memory] High memory usage detected:', {
            used: `${Math.round(memInfo.usedJSHeapSize / 1024 / 1024)}MB`,
            total: `${Math.round(memInfo.totalJSHeapSize / 1024 / 1024)}MB`
          });
        }
      }, 30000); // Check every 30 seconds
    }

    return () => {
      if (memoryCheckInterval) {
        clearInterval(memoryCheckInterval);
      }
    };
  }, []);
};

/**
 * Smooth scroll utility function
 */
export const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};