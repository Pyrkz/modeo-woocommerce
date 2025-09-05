'use client';

import { useEffect } from 'react';
import { preloadRoute } from '../utils/performance';

/**
 * Hook for preloading critical routes and resources for eventy branding
 * Improves page speed and user experience by prefetching likely navigation targets
 */
export const useEventyPreload = () => {
  useEffect(() => {
    // Only preload in browser environment
    if (typeof window === 'undefined') return;

    // Preload likely navigation targets for event organizers
    const criticalRoutes = [
      '/kontakt',
      '/portfolio', 
      '/znakowanie/haft',
      '/znakowanie/sitodruk',
      '/znakowanie/dtf',
      '/znakowanie/sublimacja',
      '/sklep'
    ];

    // Delay preloading slightly to not interfere with initial page load
    const timeoutId = setTimeout(() => {
      criticalRoutes.forEach(route => {
        preloadRoute(route);
      });
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);
};