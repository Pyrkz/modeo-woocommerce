'use client';

import { memo } from 'react';
import Link from 'next/link';
import { HomepageBlogCardProps } from '../../types';
import { OptimizedBlogImage } from '../ui/OptimizedBlogImage';
import { BlogCategory } from '../ui/BlogCategory';
import { formatDate } from '../../utils';

const BlogListCard = memo(({ 
  post, 
  className = '',
  priority = false 
}: HomepageBlogCardProps) => {
  const category = post._embedded?.['wp:term']?.[0]?.[0];
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0];

  return (
    <article className={`group ${className}`}>
      <Link 
        href={`/blog/${post.slug}`}
        className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 h-full items-start"
      >
        {/* Small Image */}
        {featuredImage && (
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 overflow-hidden rounded-lg">
            <OptimizedBlogImage
              src={featuredImage.source_url}
              alt={featuredImage.alt_text || post.title.rendered}
              fill
              className="object-cover"
              priority={priority}
              sizes="(max-width: 640px) 64px, 80px"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Category */}
          {category && (
            <div className="mb-2">
              <BlogCategory 
                name={category.name}
                variant="accent"
              />
            </div>
          )}

          {/* Title */}
          <h4 className="font-semibold text-gray-900 leading-tight mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2">
            <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          </h4>

          {/* Date */}
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <time dateTime={post.date}>
              {formatDate(post.date)}
            </time>
          </div>
        </div>
      </Link>
    </article>
  );
});

BlogListCard.displayName = 'BlogListCard';

export { BlogListCard };