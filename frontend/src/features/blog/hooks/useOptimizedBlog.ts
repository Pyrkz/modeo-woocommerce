'use client';

import { useMemo } from 'react';
import { BlogPost } from '../types';

interface UseOptimizedBlogProps {
  posts: BlogPost[];
  priorityCount?: number;
}

export const useOptimizedBlog = ({ 
  posts, 
  priorityCount = 1 
}: UseOptimizedBlogProps) => {
  const optimizedPosts = useMemo(() => {
    if (!posts.length) return [];
    
    return posts.map((post, index) => ({
      ...post,
      index,
      priority: index < priorityCount,
      // Pre-calculate responsive sizes for better performance
      sizes: getSizesForPosition(index, posts.length)
    }));
  }, [posts, priorityCount]);

  const gridClasses = useMemo(() => {
    return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 auto-rows-[240px] sm:auto-rows-[260px] lg:auto-rows-[280px]';
  }, []);

  return {
    optimizedPosts,
    gridClasses
  };
};

const getSizesForPosition = (index: number, totalPosts: number): string => {
  // First post (featured) gets larger sizes
  if (index === 0 && totalPosts > 3) {
    return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw';
  }
  
  // Last post (full width) gets larger sizes
  if (index === 4 || (index === totalPosts - 1 && totalPosts <= 5)) {
    return '(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw';
  }
  
  // Standard posts
  return '(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw';
};