/**
 * Performance configuration for Techniques Section
 * Optimized for PageSpeed and Core Web Vitals
 */

export const PERFORMANCE_CONFIG = {
  // Image optimization
  IMAGE_QUALITY: 90,
  PRIORITY_IMAGES_COUNT: 6, // First 6 images get priority loading
  
  // Animation settings
  STAGGER_DELAY: 100, // ms between card animations
  INTERSECTION_THRESHOLD: 0.1,
  INTERSECTION_ROOT_MARGIN: '50px',
  
  // Responsive breakpoints
  BREAKPOINTS: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  
  // Grid settings
  GRID_COLS: {
    mobile: 2,
    tablet: 2,
    desktop: 3,
  },
  
  // Core Web Vitals targets
  PERFORMANCE_TARGETS: {
    LCP: 2500, // ms - Largest Contentful Paint
    FID: 100,  // ms - First Input Delay
    CLS: 0.1,  // Cumulative Layout Shift
  }
} as const;

export type PerformanceConfig = typeof PERFORMANCE_CONFIG;