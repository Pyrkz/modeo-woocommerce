// Custom hook for optimized viewport detection with Intersection Observer
'use client';

import { useRef, useState, useEffect } from 'react';
import { GALLERY_CONFIG } from '../config/gallery-data';

// Custom implementation of useInView without framer-motion dependency
const useInView = (ref: React.RefObject<HTMLElement | null>, options?: {
  once?: boolean;
  amount?: number;
  margin?: string;
}) => {
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (options?.once) {
            observer.unobserve(element);
          }
        } else if (!options?.once) {
          setIsInView(false);
        }
      },
      {
        threshold: options?.amount || 0,
        rootMargin: options?.margin || '0px'
      }
    );
    
    observer.observe(element);
    
    return () => {
      observer.unobserve(element);
    };
  }, [ref, options?.once, options?.amount, options?.margin]);
  
  return isInView;
};

export const useViewportAnimation = (threshold = GALLERY_CONFIG.INTERSECTION_THRESHOLD) => {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { 
    once: true, 
    amount: threshold,
    margin: GALLERY_CONFIG.INTERSECTION_MARGIN
  });

  return { ref, isInView };
};