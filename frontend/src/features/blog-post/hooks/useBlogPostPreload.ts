'use client';

import { useEffect } from 'react';
import { BlogPost } from '@/features/blog/types';
import { BlogPostPreloadOptions } from '../types';
import { preloadRelatedPosts, preloadImage } from '../utils/performance';

/**
 * Hook for preloading blog post related resources
 * @param post - Current blog post
 * @param options - Preload options
 */
export const useBlogPostPreload = (
  post: BlogPost | null,
  options: BlogPostPreloadOptions = {}
) => {
  const {
    preloadRelated = true,
    preloadImages = true,
    preloadNext = false
  } = options;

  useEffect(() => {
    if (!post || typeof window === 'undefined') return;

    // Preload related posts based on categories
    if (preloadRelated && post._embedded?.['wp:term']) {
      const categories = post._embedded['wp:term']?.[0] || [];
      const categoryIds = categories.map(cat => cat.id);
      
      if (categoryIds.length > 0) {
        preloadRelatedPosts(categoryIds);
      }
    }

    // Preload featured image
    if (preloadImages && post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
      const imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
      preloadImage(imageUrl);
    }

    // Preload next/previous posts (can be implemented later)
    if (preloadNext) {
      // Implementation for preloading navigation posts
    }
  }, [post, preloadRelated, preloadImages, preloadNext]);
};