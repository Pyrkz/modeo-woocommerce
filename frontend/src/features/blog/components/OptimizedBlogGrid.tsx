'use client';

import { memo, useMemo } from 'react';
import { BlogGridProps } from '../types';
import BlogGrid from './BlogGrid';

const OptimizedBlogGrid = memo<BlogGridProps>(({ 
  posts, 
  loading, 
  loadingMore, 
  onLoadMore, 
  onPostClick, 
  className,
  cardSize = 'md',
  showExcerpt = true,
  showCategory = true,
  showAuthor = false,
  showDate = true
}) => {
  // Memoize posts processing to avoid re-renders
  const processedPosts = useMemo(() => {
    return posts.map(post => ({
      ...post,
      // Pre-process excerpt for performance
      cleanExcerpt: post.excerpt.rendered
        .replace(/<[^>]*>/g, '')
        .replace(/\[&hellip;\]/g, '...')
        .trim()
    }));
  }, [posts]);

  // Only render when there are posts or loading
  if (!loading && posts.length === 0) {
    return null;
  }

  return (
    <BlogGrid
      posts={processedPosts}
      loading={loading}
      loadingMore={loadingMore}
      onLoadMore={onLoadMore}
      onPostClick={onPostClick}
      className={className}
      cardSize={cardSize}
      showExcerpt={showExcerpt}
      showCategory={showCategory}
      showAuthor={showAuthor}
      showDate={showDate}
    />
  );
});

OptimizedBlogGrid.displayName = 'OptimizedBlogGrid';

export default OptimizedBlogGrid;