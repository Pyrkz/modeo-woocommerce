'use client';

import { memo } from 'react';
import { BlogPost } from '../../types';
import { HomepageBlogCard } from './HomepageBlogCard';
import { useOptimizedBlog } from '../../hooks/useOptimizedBlog';

interface HomepageBlogGridProps {
  posts: BlogPost[];
  maxPosts?: number;
}

const HomepageBlogGrid = memo(({ posts, maxPosts = 5 }: HomepageBlogGridProps) => {
  const { optimizedPosts, gridClasses } = useOptimizedBlog({ 
    posts: posts.slice(0, maxPosts) 
  });

  if (!optimizedPosts.length) return null;

  return (
    <div className={gridClasses}>
      {optimizedPosts.map((post, index) => (
        <HomepageBlogCard
          key={post.id}
          post={post}
          variant={getCardVariant(index, optimizedPosts.length)}
          priority={index === 0}
          className={getCardSpan(index)}
        />
      ))}
    </div>
  );
});

// Helper function to determine card variant based on position
const getCardVariant = (index: number, totalPosts: number): 'featured' | 'standard' | 'compact' => {
  if (index === 0 && totalPosts > 3) {
    return 'featured';
  }
  if (totalPosts > 4 && index > 3) {
    return 'compact';
  }
  return 'standard';
};

// Helper function to determine grid span based on layout
const getCardSpan = (index: number): string => {
  const layouts = [
    // Layout for 5+ posts: featured + 4 standard
    'col-span-1 sm:col-span-2 lg:col-span-3 row-span-2', // 0: Featured
    'col-span-1 lg:col-span-1 row-span-1',               // 1: Standard
    'col-span-1 lg:col-span-1 row-span-1',               // 2: Standard  
    'col-span-1 lg:col-span-1 row-span-2',               // 3: Tall standard
    'col-span-1 sm:col-span-2 lg:col-span-6 row-span-1', // 4: Full width
  ];

  return layouts[index] || 'col-span-1 row-span-1';
};

HomepageBlogGrid.displayName = 'HomepageBlogGrid';

export { HomepageBlogGrid };