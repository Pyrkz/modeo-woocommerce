'use client';

import { memo } from 'react';
import Link from 'next/link';
import { HomepageBlogCardProps } from '../../types';
import { OptimizedBlogImage } from '../ui/OptimizedBlogImage';
import { BlogMeta } from '../ui/BlogMeta';
import { BlogCategory } from '../ui/BlogCategory';

const HomepageBlogCard = memo(({ 
  post, 
  variant = 'standard', 
  className = '',
  priority = false 
}: HomepageBlogCardProps) => {
  const variantClasses = {
    featured: 'col-span-1 sm:col-span-2 lg:col-span-2 row-span-2',
    standard: 'col-span-1 row-span-1',
    compact: 'col-span-1 row-span-1'
  };

  const imageHeights = {
    featured: 'h-64 sm:h-80',
    standard: 'h-48 sm:h-56',
    compact: 'h-40 sm:h-48'
  };

  const category = post._embedded?.['wp:term']?.[0]?.[0];
  const author = post._embedded?.author?.[0];
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0];

  return (
    <article className={`group ${variantClasses[variant]} ${className}`}>
      <Link 
        href={`/blog/${post.slug}`}
        className="block h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
      >
        {/* Image Section - Only render if image exists */}
        {featuredImage && (
          <div className={`relative ${imageHeights[variant]} overflow-hidden`}>
            <OptimizedBlogImage
              src={featuredImage.source_url}
              alt={featuredImage.alt_text || post.title.rendered}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              priority={priority}
              sizes={variant === 'featured' ? 
                '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw' : 
                '(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw'
              }
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
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}

        {/* Category Badge for posts without image */}
        {!featuredImage && category && (
          <div className="p-4 pt-6">
            <BlogCategory 
              name={category.name}
              variant="accent"
            />
          </div>
        )}

        {/* Content Section */}
        <div className={`flex-1 flex flex-col ${featuredImage ? 'p-4 sm:p-6' : 'px-4 pb-4 sm:px-6 sm:pb-6'}`}>
          {/* Meta Info */}
          <BlogMeta
            date={post.date}
            author={author?.name}
            readTime={calculateReadTime(post.content.rendered)}
            variant="compact"
            className="mb-3"
          />

          {/* Title */}
          <h3 className={`font-bold text-gray-900 group-hover:text-primary transition-colors duration-200 leading-tight mb-3 line-clamp-2 ${
            variant === 'featured' ? 'text-lg sm:text-xl lg:text-2xl' : 'text-base sm:text-lg'
          }`}>
            <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          </h3>

          {/* Excerpt */}
          {variant !== 'compact' && (
            <div className={`text-gray-600 leading-relaxed flex-1 line-clamp-3 ${
              variant === 'featured' ? 'text-base' : 'text-sm'
            }`}>
              <span dangerouslySetInnerHTML={{ __html: post.excerpt.rendered.replace(/<[^>]*>/g, '') }} />
            </div>
          )}

          {/* Read More */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <span className="text-primary font-medium text-sm group-hover:underline">
              Czytaj więcej →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
});

// Helper function to calculate read time
const calculateReadTime = (content: string): number => {
  const wordsPerMinute = 200;
  const textContent = content.replace(/<[^>]*>/g, '');
  const wordCount = textContent.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
};

HomepageBlogCard.displayName = 'HomepageBlogCard';

export { HomepageBlogCard };