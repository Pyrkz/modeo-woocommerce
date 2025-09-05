'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Preload critical routes and resources for restaurant branding page
 * Optimizes PageSpeed and UX by prefetching likely navigation targets
 */
export const useRestauracjePreload = () => {
  const router = useRouter();

  useEffect(() => {
    // Preload critical routes that restaurants might navigate to
    const criticalRoutes = [
      '/znakowanie/haft',
      '/znakowanie/sitodruk', 
      '/znakowanie/dtf',
      '/znakowanie/sublimacja',
      '/portfolio',
      '/kontakt'
    ];

    // Use requestIdleCallback for non-critical preloading
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      requestIdleCallback(() => {
        criticalRoutes.forEach(route => {
          router.prefetch(route);
        });
      });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        criticalRoutes.forEach(route => {
          router.prefetch(route);
        });
      }, 100);
    }

    // Preload critical images for restaurant branding
    const preloadImages = [
      '/images/restaurant-hero.webp',
      '/images/chef-uniform.webp',
      '/images/restaurant-branding.webp',
      '/images/food-service.webp'
    ];

    preloadImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });

  }, [router]);
};