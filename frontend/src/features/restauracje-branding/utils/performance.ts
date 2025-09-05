/**
 * Performance utilities for Restauracje Branding page
 * Optimized for PageSpeed and UX
 */

/**
 * Smooth scroll to element with performance optimization
 */
export const smoothScrollTo = (elementId: string, offset: number = 0): void => {
  if (typeof window === 'undefined') return;
  
  // Use requestAnimationFrame for better performance
  requestAnimationFrame(() => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
};

/**
 * Preload critical images for restaurant branding
 */
export const preloadCriticalImages = (): void => {
  if (typeof window === 'undefined') return;
  
  const criticalImages = [
    '/images/restaurant-hero.webp',
    '/images/chef-uniform.webp',
    '/images/restaurant-branding.webp'
  ];
  
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

/**
 * Optimize intersection observer for better performance
 */
export const createOptimizedObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver => {
  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };
  
  return new IntersectionObserver(callback, defaultOptions);
};

/**
 * Debounce function for performance optimization
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};