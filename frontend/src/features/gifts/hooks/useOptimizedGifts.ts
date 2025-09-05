'use client';

import { useMemo } from 'react';
import { GiftCard } from '../types';

interface UseOptimizedGiftsProps {
  gifts: GiftCard[];
  priorityCount?: number;
}

export const useOptimizedGifts = ({ 
  gifts, 
  priorityCount = 2 
}: UseOptimizedGiftsProps) => {
  const optimizedGifts = useMemo(() => {
    if (!gifts.length) return [];
    
    return gifts.map((gift, index) => {
      // Grid layout for 6 columns with proper spacing
      const layoutConfigs = [
        { 
          span: 'col-span-2 sm:col-span-2 lg:col-span-3', 
          size: 'large' as const, 
          priority: true 
        },
        { 
          span: 'col-span-1 sm:col-span-1 lg:col-span-1', 
          size: 'small' as const, 
          priority: true 
        },
        { 
          span: 'col-span-1 sm:col-span-1 lg:col-span-2', 
          size: 'small' as const, 
          priority: false 
        },
        { 
          span: 'col-span-2 sm:col-span-2 lg:col-span-3', 
          size: 'wide' as const, 
          priority: false 
        },
        { 
          span: 'col-span-1 sm:col-span-1 lg:col-span-3', 
          size: 'medium' as const, 
          priority: false 
        },
        { 
          span: 'col-span-1 sm:col-span-1 lg:col-span-3', 
          size: 'medium' as const, 
          priority: false 
        },
      ];
      
      const config = layoutConfigs[index] || { 
        span: 'col-span-1 sm:col-span-1 lg:col-span-1 row-span-1', 
        size: 'small' as const, 
        priority: false 
      };
      
      return {
        ...gift,
        size: config.size,
        span: config.span,
        index,
        priority: index < priorityCount,
        // Pre-calculate responsive sizes for better performance
        sizes: getSizesForType(config.size)
      };
    });
  }, [gifts, priorityCount]);

  const gridClasses = useMemo(() => {
    return 'grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6 auto-rows-min';
  }, []);

  return {
    optimizedGifts,
    gridClasses
  };
};

const getSizesForType = (size: GiftCard['size']): string => {
  switch (size) {
    case 'large':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw';
    case 'wide':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw';
    case 'medium':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw';
    default:
      return '(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw';
  }
};