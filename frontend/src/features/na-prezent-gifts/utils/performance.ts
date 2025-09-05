/**
 * Performance utilities for Na Prezent gifts page
 * Focused on PageSpeed optimization and UX improvements
 */

/**
 * Preload critical category links when user hovers over cards
 */
export const preloadCategoryOnHover = (href: string): void => {
  if (typeof window === 'undefined') return;

  // Check if already preloaded
  if (document.querySelector(`link[rel="prefetch"][href="${href}"]`)) return;

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  link.onload = () => {
    // Keep the prefetch link for better caching
    console.log(`✅ Preloaded: ${href}`);
  };
  document.head.appendChild(link);
};

/**
 * Debounced scroll handler to prevent excessive scroll events
 */
export const debounceScroll = <T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number = 100
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Smooth scroll to element with reduced motion support
 */
export const smoothScrollTo = (elementId: string): void => {
  const element = document.getElementById(elementId);
  if (!element) return;

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  element.scrollIntoView({
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
    block: 'start'
  });
};

/**
 * Performance monitoring for development
 */
export const trackPerformance = (eventName: string, data?: unknown): void => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    performance.mark(`na-prezent-${eventName}`);
    console.log(`🎁 Na Prezent Performance: ${eventName}`, data);
  }
};

/**
 * Intersection Observer for lazy loading animations
 */
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver | null => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }

  return new IntersectionObserver(callback, {
    rootMargin: '50px 0px',
    threshold: 0.1,
    ...options
  });
};