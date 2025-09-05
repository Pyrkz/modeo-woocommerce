'use client';

import { useEffect } from 'react';
import { preloadCriticalImages } from '../utils/imageOptimization';

export const usePerformanceOptimizations = () => {
  useEffect(() => {
    // Preload critical images
    preloadCriticalImages();

    // Preload critical CSS (if needed)
    if (typeof window !== 'undefined') {
      const criticalCSS = document.createElement('link');
      criticalCSS.rel = 'preload';
      criticalCSS.as = 'style';
      criticalCSS.href = '/api/critical-css';
      document.head.appendChild(criticalCSS);
    }
  }, []);

  useEffect(() => {
    // Performance monitoring
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // Monitor Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        // Log for debugging in development
        if (process.env.NODE_ENV === 'development') {
          console.log('LCP:', lastEntry.startTime);
        }
      });

      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

      // Monitor Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        let cumulativeScore = 0;
        
        list.getEntries().forEach((entry: PerformanceEntry & { value?: number; hadRecentInput?: boolean }) => {
          if (!entry.hadRecentInput && entry.value) {
            cumulativeScore += entry.value;
          }
        });

        if (process.env.NODE_ENV === 'development') {
          console.log('CLS:', cumulativeScore);
        }
      });

      clsObserver.observe({ type: 'layout-shift', buffered: true });

      return () => {
        lcpObserver.disconnect();
        clsObserver.disconnect();
      };
    }
  }, []);
};