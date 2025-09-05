/**
 * Smooth Scroll Types
 */

export interface LenisOptions {
  duration?: number;
  easing?: (t: number) => number;
  direction?: 'vertical' | 'horizontal' | 'both';
  gestureDirection?: 'vertical' | 'horizontal' | 'both';
  smooth?: boolean;
  mouseMultiplier?: number;
  smoothTouch?: boolean;
  touchMultiplier?: number;
  infinite?: boolean;
  autoResize?: boolean;
  normalizeWheel?: boolean;
  wheelMultiplier?: number;
  syncTouch?: boolean;
}

export interface ScrollToOptions {
  offset?: number;
  duration?: number;
  easing?: (t: number) => number;
  immediate?: boolean;
  lock?: boolean;
}

export interface SmoothScrollContextType {
  scrollTo: (target: string | Element | number, options?: ScrollToOptions) => void;
  scrollToTop: (options?: ScrollToOptions) => void;
  isScrolling: boolean;
  scrollProgress: number;
  velocity: number;
}