'use client';

import { useEffect } from 'react';
import { PromoCard } from '../types';

export const usePromosPreload = (promos: PromoCard[]) => {
  useEffect(() => {
    // Preload promo links and images when component mounts
    const links = promos.map(promo => promo.ctaHref);
    const images = promos.map(promo => promo.imagePath);
    
    // Use modern prefetch approach with resource hints
    if (typeof window !== 'undefined' && links.length > 0) {
      // Prefetch page links for instant navigation
      const prefetchPromises = links.map(href => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = href;
        link.setAttribute('fetchpriority', 'low');
        document.head.appendChild(link);
        
        return new Promise<void>((resolve) => {
          link.onload = () => resolve();
          link.onerror = () => resolve(); // Continue even if prefetch fails
          setTimeout(() => resolve(), 150); // Fallback timeout
        });
      });
      
      // Preload images for faster display
      const imagePromises = images.map(imagePath => {
        const img = new window.Image();
        img.loading = 'lazy';
        img.fetchPriority = 'low';
        img.src = imagePath;
        
        return new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.onerror = () => resolve();
          setTimeout(() => resolve(), 200); // Fallback timeout
        });
      });
      
      // Execute all preloading in parallel
      Promise.allSettled([...prefetchPromises, ...imagePromises]).then(() => {
        // All resources preloaded or timed out
      });
    }
  }, [promos]);
};