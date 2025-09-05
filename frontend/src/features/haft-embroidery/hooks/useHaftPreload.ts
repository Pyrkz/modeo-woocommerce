'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Preload critical routes and resources for better UX in haft section
 */
export const useHaftPreload = () => {
  const router = useRouter();

  useEffect(() => {
    // Preload critical routes that users might visit from haft page
    const criticalRoutes = [
      '/kontakt',
      '/sklep',
      '/znakowanie',
      '/znakowanie/sitodruk',
      '/znakowanie/dtf'
    ];

    // Preload routes with small delay to not block initial render
    const timeoutId = setTimeout(() => {
      criticalRoutes.forEach(route => {
        router.prefetch(route);
      });
    }, 1000);

    // Preload critical images
    const criticalImages = [
      '/embroidery/hero-embroidery.jpg',
      '/embroidery/logo-embroidery-1.jpg',
      '/embroidery/logo-embroidery-2.jpg'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });

    return () => {
      clearTimeout(timeoutId);
    };
  }, [router]);
};