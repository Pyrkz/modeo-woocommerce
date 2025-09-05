import type { ProductImage } from '../types';

export const preloadCriticalImages = (images: ProductImage[]) => {
  if (typeof window === 'undefined') return;
  
  images.forEach(image => {
    if (image.priority) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = image.src;
      document.head.appendChild(link);
    }
  });
};

export const generateImageSizes = (breakpoints: Record<string, string>) => {
  return Object.entries(breakpoints)
    .map(([breakpoint, size]) => `(max-width: ${breakpoint}) ${size}`)
    .join(', ');
};

export const optimizeImageLoading = {
  priority: {
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    quality: 90,
    loading: 'eager' as const
  },
  lazy: {
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw", 
    quality: 85,
    loading: 'lazy' as const
  }
};