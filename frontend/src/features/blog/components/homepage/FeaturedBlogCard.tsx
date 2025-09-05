'use client';

import { memo } from 'react';
import Link from 'next/link';
import { HomepageBlogCardProps } from '../../types';
import { OptimizedBlogImage } from '../ui/OptimizedBlogImage';
import { BlogCategory } from '../ui/BlogCategory';
import { formatDate } from '../../utils';

const FeaturedBlogCard = memo(({ 
  post, 
  className = '',
  priority = true 
}: HomepageBlogCardProps) => {
  const category = post._embedded?.['wp:term']?.[0]?.[0];
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0];

  return (
    <article className={`group ${className}`}>
      <Link 
        href={`/blog/${post.slug}`}
        className="block h-full"
      >
        {/* Image Section */}
        {featuredImage && (
          <div className="relative h-72 sm:h-96 lg:h-[500px] overflow-hidden rounded-2xl mb-6">
            <OptimizedBlogImage
              src={featuredImage.source_url}
              alt={featuredImage.alt_text || post.title.rendered}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority={priority}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 50vw"
            />
            
            {/* Category Badge */}
            {category && (
              <div className="absolute top-4 left-4">
                <BlogCategory 
                  name={category.name}
                  variant="overlay"
                />
              </div>
            )}
          </div>
        )}

        {/* Content Section */}
        <div className="space-y-4">
          {/* Category (if no image) */}
          {!featuredImage && category && (
            <BlogCategory 
              name={category.name}
              variant="accent"
            />
          )}

          {/* Title */}
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors duration-200">
            <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 leading-relaxed text-base">
            <span dangerouslySetInnerHTML={{ __html: post.excerpt.rendered.replace(/<[^>]*>/g, '') }} />
          </p>

          {/* Meta Info */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

FeaturedBlogCard.displayName = 'FeaturedBlogCard';

export { FeaturedBlogCard };