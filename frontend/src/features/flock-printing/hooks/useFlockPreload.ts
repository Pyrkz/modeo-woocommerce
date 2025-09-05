'use client';

import { useEffect } from 'react';

export const useFlockPreload = (): void => {
  useEffect(() => {
    // Preload critical routes for flock page
    const routesToPreload = [
      '/kontakt',
      '/sklep',
      '/portfolio'
    ];

    // Preload only if browser supports it
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        routesToPreload.forEach(route => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = route;
          document.head.appendChild(link);
        });
      });
    }

    // Preload critical images for flock
    if (typeof window !== 'undefined') {
      const imagesToPreload = [
        '/znakowanie/flock-min.png',
        '/resources/Odpicuj-swoja-koszulke-min.webp'
      ];

      imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    }
  }, []);
};