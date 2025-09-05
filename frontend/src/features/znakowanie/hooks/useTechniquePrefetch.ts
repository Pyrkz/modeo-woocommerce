'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

/**
 * Hook for prefetching technique pages on hover for improved performance
 * Prefetches pages only when user shows intent (hover) to reduce unnecessary requests
 */
export const useTechniquePrefetch = () => {
  const router = useRouter();

  const prefetchTechnique = useCallback((href: string) => {
    // Use Next.js router prefetch for immediate loading
    router.prefetch(href);
  }, [router]);

  const handleMouseEnter = useCallback((href: string) => {
    // Prefetch on mouse enter with slight delay to avoid excessive requests
    const timeoutId = setTimeout(() => {
      prefetchTechnique(href);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [prefetchTechnique]);

  return { prefetchTechnique, handleMouseEnter };
};