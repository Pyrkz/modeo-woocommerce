'use client';

import { useEffect, useRef } from 'react';
import { GiftOccasion } from '../types';

/**
 * Hook to preload gift occasion page links for better navigation performance
 * Uses IntersectionObserver and hover-based preloading for optimal performance
 */
export const useGiftOccasionsPreload = (occasions: GiftOccasion[]) => {
  const preloadedLinks = useRef(new Set<string>());

  useEffect(() => {
    // Only preload on client side
    if (typeof window === 'undefined') return;

    const preloadLinks = occasions
      .slice(0, 8) // Preload first 8 occasions for better coverage
      .map(occasion => occasion.href);

    // Preload link with caching to avoid duplicates
    const preloadLink = (href: string) => {
      if (preloadedLinks.current.has(href)) return;
      
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      link.as = 'document';
      document.head.appendChild(link);
      preloadedLinks.current.add(href);
    };

    // Preload critical icons
    const preloadIcons = () => {
      occasions.slice(0, 6).forEach(occasion => {
        const iconLink = document.createElement('link');
        iconLink.rel = 'prefetch';
        iconLink.href = occasion.iconPath;
        iconLink.as = 'image';
        document.head.appendChild(iconLink);
      });
    };

    // Hover-based preloading
    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest('[href]') as HTMLAnchorElement;
      const href = link?.getAttribute('href');
      
      if (href && preloadLinks.includes(href)) {
        preloadLink(href);
      }
    };

    // Intersection Observer for visible links
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const link = entry.target as HTMLAnchorElement;
            const href = link.getAttribute('href');
            
            if (href && preloadLinks.includes(href)) {
              // Delay preload slightly to prioritize critical resources
              setTimeout(() => preloadLink(href), 100);
            }
          }
        });
      },
      { 
        rootMargin: '100px', // Preload when 100px away from viewport
        threshold: 0.1 
      }
    );

    // Observe all gift occasion links
    const observeLinks = () => {
      document.querySelectorAll('a[href^="/na-prezent/"]').forEach(link => {
        observer.observe(link);
      });
    };

    // Initialize
    preloadIcons();
    observeLinks();
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    // Re-observe after DOM changes
    const mutationObserver = new MutationObserver(() => {
      setTimeout(observeLinks, 100); // Debounce
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [occasions]);
};