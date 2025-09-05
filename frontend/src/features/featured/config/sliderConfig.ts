'use client';

export interface SliderBreakpoint {
  itemWidth: number;
  gap: number;
  visibleItems: number;
  padding: number;
  containerPadding: number;
}

export const SLIDER_BREAKPOINTS = {
  mobile: {
    itemWidth: 280,  // Increased for better mobile experience
    gap: 12,
    visibleItems: 2, // Exactly 2 products on mobile
    padding: 16,
    containerPadding: 20
  },
  tablet: {
    itemWidth: 240,
    gap: 16,
    visibleItems: 3,
    padding: 20,
    containerPadding: 24
  },
  desktop: {
    itemWidth: 280,  // Optimized for 4 products
    gap: 20,
    visibleItems: 4, // Exactly 4 products on desktop
    padding: 24,
    containerPadding: 32
  }
} as const;

export const SLIDER_SETTINGS = {
  smoothDuration: 500, // Dłuższy czas dla płynniejszej animacji
  touchSensitivity: 0.3,
  autoplayDelay: 5000,
  preloadImages: true
} as const;

export type SliderBreakpointKey = keyof typeof SLIDER_BREAKPOINTS;