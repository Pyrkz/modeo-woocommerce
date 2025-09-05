'use client';

import { useEffect } from 'react';
import { addResourceHints } from '../utils/performance';


// Critical sports club-related routes to preload
const SPORTS_CRITICAL_ROUTES = [
  '/kontakt',
  '/znakowanie',
  '/sklep',
  '/o-nas'
];

export const useKlubyPreload = () => {
  useEffect(() => {
    // Only preload on client side
    if (typeof window === 'undefined') return;

    const preloadRoute = (href: string) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      link.onload = () => link.remove(); // Clean up after load
      document.head.appendChild(link);
    };

    // Add critical resource hints for fonts and external resources
    addResourceHints();

    // Preload critical sports club routes when browser is idle
    const handlePreload = () => {
      SPORTS_CRITICAL_ROUTES.forEach(preloadRoute);
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(handlePreload, { timeout: 3000 });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(handlePreload, 1500);
    }
  }, []);

  return null; // This hook doesn't return anything
};