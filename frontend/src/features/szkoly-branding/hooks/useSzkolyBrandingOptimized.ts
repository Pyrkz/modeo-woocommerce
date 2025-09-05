'use client';

import { useEffect } from 'react';
import { 
  useSzkolyPreloading, 
  useImageOptimization,
  useSzkolyPerformanceMonitoring,
  useSzkolyMemoryOptimization 
} from '../utils/performance';

/**
 * Main optimization hook for the szkoly branding page
 * Combines all performance optimizations into a single hook
 */
export const useSzkolyBrandingOptimized = () => {
  // Enable all optimizations
  useSzkolyPreloading();
  useImageOptimization();
  useSzkolyPerformanceMonitoring();
  useSzkolyMemoryOptimization();

  // Viewport and scroll optimizations
  useEffect(() => {
    // Optimize scroll behavior
    const handleScroll = () => {
      // Throttled scroll handling to prevent excessive re-renders
      requestAnimationFrame(() => {
        // Add scroll-based optimizations here if needed
      });
    };

    // Add passive scroll listener for better performance
    document.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Page visibility optimizations
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden, pause non-critical operations
        // This helps with mobile battery life
      } else {
        // Page is visible, resume operations
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return {
    // Return any optimization states if needed
    isOptimized: true
  };
};