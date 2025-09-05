/**
 * Optimized image loading utilities for business page
 */

// Generate blur placeholder for better UX
export const generateBlurDataURL = (width: number = 8, height: number = 6): string => {
  const canvas = typeof window !== 'undefined' ? document.createElement('canvas') : null;
  if (!canvas) {
    // Fallback blur data URL for SSR
    return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAGAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==';
  }
  
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return '';
  
  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#f3f4f6');
  gradient.addColorStop(1, '#e5e7eb');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  return canvas.toDataURL('image/jpeg', 0.1);
};

// Image preloading for critical assets
export const preloadCriticalImages = () => {
  if (typeof window === 'undefined') return;
  
  const criticalImages = [
    '/resources/modeo dla firm-min.jpg'
  ];
  
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

// Image sizes for responsive optimization
export const getImageSizes = (breakpoint: 'hero' | 'card' | 'thumbnail') => {
  switch (breakpoint) {
    case 'hero':
      return '(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw';
    case 'card':
      return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
    case 'thumbnail':
      return '(max-width: 768px) 100px, 150px';
    default:
      return '100vw';
  }
};

// Lazy loading with Intersection Observer
export class ImageLazyLoader {
  private observer: IntersectionObserver | null = null;
  private images: Set<HTMLImageElement> = new Set();

  constructor() {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              this.loadImage(img);
            }
          });
        },
        { rootMargin: '50px' }
      );
    }
  }

  observe(img: HTMLImageElement) {
    if (this.observer) {
      this.observer.observe(img);
      this.images.add(img);
    }
  }

  private loadImage(img: HTMLImageElement) {
    const src = img.dataset.src;
    if (src) {
      img.src = src;
      img.classList.add('loaded');
      if (this.observer) {
        this.observer.unobserve(img);
      }
      this.images.delete(img);
    }
  }

  disconnect() {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.images.clear();
  }
}