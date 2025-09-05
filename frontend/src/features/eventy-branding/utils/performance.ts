/**
 * Performance utilities for Eventy Branding feature
 * Optimized for fast loading and smooth user experience
 */

// Smooth scroll utility for anchor links
export const smoothScrollTo = (elementId: string): void => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};

// Preload critical routes
export const preloadRoute = (href: string): void => {
  if (typeof window !== 'undefined') {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
  }
};

// Image preloading utility
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

// Throttle utility for scroll events
export const throttle = <T extends (...args: unknown[]) => unknown>(func: T, wait: number) => {
  let timeout: NodeJS.Timeout | null = null;
  let previous = 0;

  return function executedFunction(...args: Parameters<T>): ReturnType<T> | void {
    const now = Date.now();
    const remaining = wait - (now - previous);

    let result: ReturnType<T> | void;

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func(...args) as ReturnType<T>; // Changed from apply(this, args)
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now();
        timeout = null;
        func(...args); // Changed from apply(this, args)
      }, remaining);
    }
    return result!;
  } as T;
};

// Debounce utility for form inputs and search
export const debounce = <T extends (...args: unknown[]) => unknown>(func: T, wait: number) => {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>): ReturnType<T> | void {
    let result: ReturnType<T> | void;
    const later = () => {
      clearTimeout(timeout);
      result = func(...args) as ReturnType<T>; // Changed from apply(this, args)
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    return result!;
  } as T;
};