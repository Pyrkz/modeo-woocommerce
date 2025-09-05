'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Optimized preloading hook for szkoly branding page
 * Preloads critical routes and resources for better UX
 */
export const useSzkolyPreload = () => {
  const router = useRouter();

  useEffect(() => {
    // Preload critical routes likely to be visited from szkoly page
    const criticalRoutes = [
      '/znakowanie/haft',
      '/znakowanie/sitodruk', 
      '/znakowanie/dtf',
      '/znakowanie/sublimacja',
      '/znakowanie/flex',
      '/znakowanie/flock',
      '/portfolio',
      '/sklep'
    ];

    const preloadRoute = (href: string) => {
      router.prefetch(href);
    };

    // Preload routes with slight delay to avoid blocking initial render
    const preloadTimeout = setTimeout(() => {
      criticalRoutes.forEach((route, index) => {
        // Stagger preloads to avoid overwhelming the network
        setTimeout(() => preloadRoute(route), index * 100);
      });
    }, 1000);

    // Preload critical resources
    const preloadResources = () => {
      // Preload fonts
      const fontPreloads = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
      ];

      fontPreloads.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
      });

      // Preload WooCommerce API endpoints  
      const apiEndpoints = [
        '/wp-json/wc/store/products?category=do-nadruku',
        '/wp-json/wc/store/products/categories'
      ];

      apiEndpoints.forEach(endpoint => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}${endpoint}`;
        document.head.appendChild(link);
      });
    };

    // Preload after initial load
    if (requestIdleCallback) {
      requestIdleCallback(preloadResources);
    } else {
      setTimeout(preloadResources, 2000);
    }

    return () => {
      clearTimeout(preloadTimeout);
    };
  }, [router]);
};