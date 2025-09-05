'use client';

import { useEffect } from 'react';

export const useSitodrukPreload = (): void => {
  useEffect(() => {
    // Preload critical routes for sitodruk page
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

    // Preload critical images for sitodruk
    if (typeof window !== 'undefined') {
      const imagesToPreload = [
        '/znakowanie/sitodruk-min.png',
        '/resources/Odpicuj-swoja-koszulke-min.webp'
      ];

      imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    }
  }, []);
};