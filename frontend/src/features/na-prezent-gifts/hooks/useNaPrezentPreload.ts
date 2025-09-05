'use client';

import { useEffect } from 'react';

// Critical routes to preload for gift categories
const CRITICAL_ROUTES = [
  '/na-prezent/boze-narodzenie',
  '/na-prezent/urodziny',
  '/na-prezent/walentynki',
  '/na-prezent/dzien-kobiet'
];

// Type for window with requestIdleCallback
interface WindowWithIdleCallback extends Window {
  requestIdleCallback: (
    callback: (deadline: { didTimeout: boolean; timeRemaining: () => number }) => void,
    opts?: { timeout: number }
  ) => number;
  cancelIdleCallback: (handle: number) => void;
}

export const useNaPrezentPreload = () => {
  useEffect(() => {
    // Only preload on client side and when browser is idle
    if (typeof window === 'undefined') return;

    const preloadRoute = (href: string) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      link.onload = () => link.remove(); // Clean up after load
      document.head.appendChild(link);
    };

    // Use requestIdleCallback for better performance
    const handlePreload = () => {
      CRITICAL_ROUTES.forEach(preloadRoute);
    };

    if ('requestIdleCallback' in window) {
      (window as WindowWithIdleCallback).requestIdleCallback(handlePreload, { timeout: 2000 });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(handlePreload, 1000);
    }
  }, []);

  return null; // This hook doesn't return anything
};