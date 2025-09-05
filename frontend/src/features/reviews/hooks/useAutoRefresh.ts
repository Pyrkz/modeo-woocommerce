'use client';

import { useCallback, useRef } from 'react';

interface AutoRefreshOptions {
  delay?: number; // Delay before refresh in milliseconds
  debounce?: number; // Debounce multiple calls within this time
}

export function useAutoRefresh(
  refreshFunction: () => void | Promise<void>,
  options: AutoRefreshOptions = {}
) {
  const { delay = 500, debounce = 1000 } = options;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastCallRef = useRef<number>(0);

  const triggerRefresh = useCallback(async () => {
    const now = Date.now();
    
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Debounce: if called too soon, delay it
    if (now - lastCallRef.current < debounce) {
      timeoutRef.current = setTimeout(() => {
        triggerRefresh();
      }, debounce - (now - lastCallRef.current));
      return;
    }

    lastCallRef.current = now;

    // Add a small delay for better UX (allows UI to update)
    timeoutRef.current = setTimeout(async () => {
      try {
        await refreshFunction();
        
        if (process.env.NODE_ENV === 'development') {
        }
      } catch {
      }
    }, delay);
  }, [refreshFunction, delay, debounce]);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  return { triggerRefresh, cleanup };
}