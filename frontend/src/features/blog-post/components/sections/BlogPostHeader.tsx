'use client';

import { memo } from 'react';
import { BlogPostHeaderProps } from '../../types';
import { BlogPostMeta } from '../ui/BlogPostMeta';
import { BlogPostImage } from '../ui/BlogPostImage';
import { BlogPostCategories } from '../ui/BlogPostCategories';
import { cn } from '@/lib/utils';

export const BlogPostHeader = memo<BlogPostHeaderProps>(({
  post,
  className
}) => {
  return (
    <header className={cn('mb-8 lg:mb-12', className)}>
      {/* Categories */}
      <BlogPostCategories 
        post={post}
        linkable={true}
        className="mb-4"
      />

      {/* Title */}
      <h1 
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />

      {/* Meta Information */}
      <BlogPostMeta
        post={post}
        showAuthor={true}
        showDate={true}
        showReadTime={true}
        className="mb-8"
      />

      {/* Featured Image */}
      <BlogPostImage
        post={post}
        priority={true}
        sizes="(max-width: 768px) 100vw, 896px"
      />
    </header>
  );
});

BlogPostHeader.displayName = 'BlogPostHeader';