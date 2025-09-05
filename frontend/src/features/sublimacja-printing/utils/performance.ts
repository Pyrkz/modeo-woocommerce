// Performance optimization utilities for sublimacja-printing feature

/**
 * Smooth scroll utility for better UX
 */
export const smoothScrollTo = (elementId: string, offset: number = 0) => {
  if (typeof window === 'undefined') return;
  
  const element = document.getElementById(elementId);
  if (element) {
    const targetPosition = element.offsetTop - offset;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
};

/**
 * Preload critical images for better performance
 */
export const preloadImages = (imageUrls: string[]) => {
  if (typeof window === 'undefined') return;
  
  imageUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
};

/**
 * Lazy load images with intersection observer
 */
export const createLazyImageObserver = (callback: IntersectionObserverCallback) => {
  if (typeof window === 'undefined') return null;
  
  if ('IntersectionObserver' in window) {
    return new IntersectionObserver(callback, {
      rootMargin: '50px',
      threshold: 0.1
    });
  }
  return null;
};

/**
 * Debounce utility for search and filters
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Throttle utility for scroll events
 */
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};