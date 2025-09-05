/**
 * Performance utilities for Firmy Branding page
 * Focused on PageSpeed optimization and business UX
 */

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
 * Debounced function to prevent excessive calls
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number = 300
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Preload critical business pages when user shows interest
 */
export const preloadBusinessPage = (href: string): void => {
  if (typeof window === 'undefined') return;

  // Check if already preloaded
  if (document.querySelector(`link[rel="prefetch"][href="${href}"]`)) return;

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  link.onload = () => {
    console.log(`✅ Business page preloaded: ${href}`);
  };
  document.head.appendChild(link);
};

/**
 * Track business-specific performance metrics
 */
export const trackFirmyPerformance = (eventName: string, data?: unknown): void => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    performance.mark(`firmy-branding-${eventName}`);
    console.log(`🏢 Firmy Branding Performance: ${eventName}`, data);
  }
};

/**
 * Intersection Observer for progressive enhancement
 */
export const createScrollObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver | null => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }

  return new IntersectionObserver(callback, {
    rootMargin: '100px 0px',
    threshold: 0.1,
    ...options
  });
};

/**
 * Critical resource hints for business content
 */
export const addResourceHints = (): void => {
  if (typeof window === 'undefined') return;

  const hints = [
    { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' }
  ];

  hints.forEach(hint => {
    const existing = document.querySelector(`link[rel="${hint.rel}"][href="${hint.href}"]`);
    if (!existing) {
      const link = document.createElement('link');
      link.rel = hint.rel;
      link.href = hint.href;
      if ('crossorigin' in hint) {
        link.crossOrigin = hint.crossorigin || null;
      }
      document.head.appendChild(link);
    }
  });
};