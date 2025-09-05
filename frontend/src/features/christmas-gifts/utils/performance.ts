/**
 * Performance utilities for Christmas gifts feature
 */

// Preload critical resources
export const preloadCriticalResources = () => {
  // Preload critical CSS if needed
  const criticalCSS = document.createElement('style');
  criticalCSS.textContent = `
    .christmas-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
    
    @media (min-width: 768px) {
      .christmas-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
      }
    }
    
    @media (min-width: 1024px) {
      .christmas-grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  `;
  document.head.appendChild(criticalCSS);
};

// Image optimization for Christmas cards
export const optimizeImageLoading = (images: HTMLImageElement[]) => {
  images.forEach((img, index) => {
    // Prioritize first 4 images (above fold)
    if (index < 4) {
      img.loading = 'eager';
      img.fetchPriority = 'high';
    } else {
      img.loading = 'lazy';
      img.fetchPriority = 'low';
    }
    
    // Add proper sizes attribute for responsive images
    img.sizes = '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw';
  });
};

// Debounce function for search/filtering
export const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Intersection Observer for lazy loading
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) => {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px 0px',
    threshold: 0.1,
    ...options,
  };
  
  return new IntersectionObserver(callback, defaultOptions);
};

// Performance metrics tracking
export const trackPerformanceMetrics = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // Track Largest Contentful Paint
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      console.log('LCP:', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });
    
    // Track First Input Delay
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const eventEntry = entry as PerformanceEventTiming;
        if (eventEntry.processingStart) {
          console.log('FID:', eventEntry.processingStart - eventEntry.startTime);
        }
      }
    }).observe({ entryTypes: ['first-input'] });
    
    // Track Cumulative Layout Shift
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const layoutShiftEntry = entry as PerformanceEntry & {
          hadRecentInput?: boolean;
          value?: number;
        };
        if (!layoutShiftEntry.hadRecentInput) {
          console.log('CLS:', layoutShiftEntry.value);
        }
      }
    }).observe({ entryTypes: ['layout-shift'] });
  }
};