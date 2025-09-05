import type { LenisOptions } from '../types';

/**
 * Default Lenis configuration optimized for performance
 */
export const defaultLenisConfig: LenisOptions = {
  duration: 1.2, // Smooth but not too slow
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false, // Better performance on mobile
  touchMultiplier: 2,
  infinite: false,
  autoResize: true,
  normalizeWheel: true,
  wheelMultiplier: 1,
  syncTouch: false, // Better performance
};

/**
 * Mobile-optimized configuration
 */
export const mobileLenisConfig: LenisOptions = {
  ...defaultLenisConfig,
  smoothTouch: false, // Disable for better performance
  duration: 0.8, // Faster on mobile
  mouseMultiplier: 0.8,
  touchMultiplier: 1.5,
};

/**
 * Performance-optimized configuration for slower devices
 */
export const performanceLenisConfig: LenisOptions = {
  ...defaultLenisConfig,
  duration: 0.6,
  smoothTouch: false,
  normalizeWheel: false, // Better performance
  syncTouch: false,
};

/**
 * Get optimal configuration based on device capabilities
 */
export const getOptimalLenisConfig = (): LenisOptions => {
  if (typeof window === 'undefined') return defaultLenisConfig;
  
  // Detect mobile devices
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  
  // Detect slower devices (simple heuristic)
  const isSlowDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
  
  if (isSlowDevice) return performanceLenisConfig;
  if (isMobile) return mobileLenisConfig;
  
  return defaultLenisConfig;
};