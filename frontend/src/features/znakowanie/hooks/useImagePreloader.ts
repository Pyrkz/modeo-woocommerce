// Custom hook for intelligent image preloading with performance optimization
'use client';

import { useEffect } from 'react';
import { GALLERY_CONFIG } from '../config/gallery-data';
import type { GalleryItem } from '../types/gallery';

interface UseImagePreloaderOptions {
  currentIndex: number;
  galleryItems: readonly GalleryItem[];
}

export const useImagePreloader = ({ currentIndex, galleryItems }: UseImagePreloaderOptions) => {
  useEffect(() => {
    const preloadImages = () => {
      const totalItems = galleryItems.length;
      const indicesToPreload: number[] = [];
      
      // Calculate indices to preload (next and previous based on config)
      for (let i = 1; i <= GALLERY_CONFIG.PRELOAD_COUNT; i++) {
        const nextIndex = (currentIndex + i) % totalItems;
        const prevIndex = (currentIndex - i + totalItems) % totalItems;
        
        indicesToPreload.push(nextIndex, prevIndex);
      }
      
      // Remove duplicates and current index
      const uniqueIndices = [...new Set(indicesToPreload)]
        .filter(index => index !== currentIndex);
      
      // Use requestIdleCallback for background preloading to avoid blocking UI
      const preloadCallback = () => {
        uniqueIndices.forEach(index => {
          const img = new window.Image();
          img.src = galleryItems[index].image;
        });
      };

      if ('requestIdleCallback' in window) {
        requestIdleCallback(preloadCallback, { timeout: 2000 });
      } else {
        // Fallback for browsers without requestIdleCallback
        setTimeout(preloadCallback, 100);
      }
    };

    preloadImages();
  }, [currentIndex, galleryItems]);
};