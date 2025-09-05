'use client';

import { memo } from 'react';
import { BlogPostMetaProps } from '../../types';
import { BlogApi } from '@/features/blog';
import { calculateReadingTime } from '../../utils/performance';
import { cn } from '@/lib/utils';

export const BlogPostMeta = memo<BlogPostMetaProps>(({
  post,
  showAuthor = true,
  showDate = true,
  showReadTime = true,
  className
}) => {
  const author = BlogApi.getPostAuthor(post);
  const formattedDate = BlogApi.formatDate(post.date);
  const readingTime = calculateReadingTime(post.content.rendered);

  return (
    <div className={cn('flex flex-wrap items-center gap-4 text-sm text-gray-500', className)}>
      {showDate && (
        <time dateTime={post.date} className="flex items-center">
          <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {formattedDate}
        </time>
      )}
      
      {showAuthor && author && (
        <>
          <span className="text-gray-300">•</span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {author.name}
          </span>
        </>
      )}
      
      {showReadTime && readingTime > 0 && (
        <>
          <span className="text-gray-300">•</span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {readingTime} min czytania
          </span>
        </>
      )}
    </div>
  );
});

BlogPostMeta.displayName = 'BlogPostMeta';