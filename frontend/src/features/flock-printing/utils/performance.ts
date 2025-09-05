'use client';

/**
 * Performance utilities for flock printing page
 * Optimized animations and scroll handling
 */

export const ANIMATION_CONSTANTS = {
  HERO_TRANSITION: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  CARD_TRANSITION: 'all 0.3s ease-out',
  BUTTON_TRANSITION: 'all 0.2s ease-out',
  SCALE_HOVER: 'transform 0.2s ease-out'
} as const;

export const smoothScrollTo = (elementId: string, offset = 80): void => {
  if (typeof window === 'undefined') return;
  
  const element = document.getElementById(elementId);
  if (element) {
    const yPosition = element.offsetTop - offset;
    window.scrollTo({
      top: yPosition,
      behavior: 'smooth'
    });
  }
};

export const preloadImage = (src: string): Promise<void> => {
  if (typeof window === 'undefined') return Promise.resolve();
  
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((this: ThisParameterType<T>, ...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return function(this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};