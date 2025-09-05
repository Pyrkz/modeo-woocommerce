'use client';

/**
 * Performance utilities for featured products slider
 */

// Preload critical images
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject();
    img.src = src;
  });
};

// Batch preload images with priority
export const preloadProductImages = async (
  products: Array<{ images?: Array<{ src: string }> }>,
  priority: number = 4
): Promise<void> => {
  const imagesToPreload = products
    .slice(0, priority)
    .map(product => product.images?.[0]?.src)
    .filter(Boolean);

  try {
    await Promise.allSettled(
      imagesToPreload.map(src => preloadImage(src as string))
    );
  } catch (error) {
    console.warn('Some images failed to preload:', error);
  }
};

// Intersection Observer for lazy loading
export const createLazyLoadObserver = (
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {
    rootMargin: '50px',
    threshold: 0.1
  }
): IntersectionObserver | null => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }

  return new IntersectionObserver((entries) => {
    entries.forEach(callback);
  }, options);
};

// Debounce utility for scroll events
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle utility for scroll events
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

// Check if reduced motion is preferred
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Performance measurement utilities
export const measurePerformance = (name: string, fn: () => void): void => {
  if (typeof performance !== 'undefined' && performance.mark && performance.measure) {
    performance.mark(`${name}-start`);
    fn();
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);
  } else {
    fn();
  }
};

// Memory-efficient array slicing for virtual scrolling
export const getVisibleItems = <T>(
  items: T[],
  startIndex: number,
  visibleCount: number,
  buffer: number = 2
): { items: T[], startIndex: number, endIndex: number } => {
  const start = Math.max(0, startIndex - buffer);
  const end = Math.min(items.length, startIndex + visibleCount + buffer);
  
  return {
    items: items.slice(start, end),
    startIndex: start,
    endIndex: end
  };
};

// Touch gesture detection for mobile
export interface TouchGesture {
  deltaX: number;
  deltaY: number;
  direction: 'left' | 'right' | 'up' | 'down' | null;
  velocity: number;
}

export class TouchHandler {
  private startX = 0;
  private startY = 0;
  private startTime = 0;
  private element: HTMLElement;
  
  constructor(element: HTMLElement) {
    this.element = element;
    this.setupListeners();
  }
  
  private setupListeners(): void {
    this.element.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
    this.element.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
  }
  
  private handleTouchStart(e: TouchEvent): void {
    const touch = e.touches[0];
    this.startX = touch.clientX;
    this.startY = touch.clientY;
    this.startTime = Date.now();
  }
  
  private handleTouchEnd(e: TouchEvent): void {
    const touch = e.changedTouches[0];
    const endX = touch.clientX;
    const endY = touch.clientY;
    const endTime = Date.now();
    
    const deltaX = endX - this.startX;
    const deltaY = endY - this.startY;
    const deltaTime = endTime - this.startTime;
    
    const gesture: TouchGesture = {
      deltaX,
      deltaY,
      direction: this.getDirection(deltaX, deltaY),
      velocity: Math.abs(deltaX) / deltaTime
    };
    
    this.onGesture?.(gesture);
  }
  
  private getDirection(deltaX: number, deltaY: number): TouchGesture['direction'] {
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);
    
    if (absDeltaX < 30 && absDeltaY < 30) return null;
    
    if (absDeltaX > absDeltaY) {
      return deltaX > 0 ? 'right' : 'left';
    } else {
      return deltaY > 0 ? 'down' : 'up';
    }
  }
  
  onGesture?: (gesture: TouchGesture) => void;
  
  destroy(): void {
    this.element.removeEventListener('touchstart', this.handleTouchStart.bind(this));
    this.element.removeEventListener('touchend', this.handleTouchEnd.bind(this));
  }
}