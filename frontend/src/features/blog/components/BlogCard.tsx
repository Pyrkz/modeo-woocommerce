'use client';

import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BlogCardProps } from '../types';
import { BlogApi } from '../api/blog.api';
import { cn } from '@/lib/utils';

const BlogCard = memo<BlogCardProps>(({
  post,
  size = 'md',
  showExcerpt = true,
  showCategory = true,
  showAuthor = false,
  showDate = true,
  className,
  onClick
}) => {
  const featuredImage = BlogApi.getFeaturedImageUrl(post, 'medium_large');
  const categories = BlogApi.getPostCategories(post);
  const author = BlogApi.getPostAuthor(post);
  const formattedDate = BlogApi.formatDate(post.date);
  const cleanExcerpt = BlogApi.cleanExcerpt(post.excerpt.rendered);

  const cardSizes = {
    sm: 'h-64',
    md: 'h-80', 
    lg: 'h-96'
  };

  const imageSizes = {
    sm: 'h-32',
    md: 'h-40',
    lg: 'h-48'
  };

  const handleClick = () => {
    if (onClick) {
      onClick(post);
    }
  };

  return (
    <article 
      className={cn(
        'bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200',
        cardSizes[size],
        'flex flex-col',
        className
      )}
      onClick={handleClick}
    >
      {/* Featured Image */}
      <div className={cn('relative overflow-hidden', imageSizes[size])}>
        {featuredImage ? (
          <Image
            src={featuredImage}
            alt={post.title.rendered}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        
        {/* Date Badge */}
        {showDate && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium text-gray-700">
            {formattedDate}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Categories */}
        {showCategory && categories.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {categories.slice(0, 2).map((category) => (
              <span
                key={category.id}
                className="inline-block bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full"
              >
                {category.name}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary transition-colors">
          <Link href={`/blog/${post.slug}`}>
            <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          </Link>
        </h3>

        {/* Excerpt */}
        {showExcerpt && cleanExcerpt && (
          <p className="text-gray-600 text-sm line-clamp-3 mb-3 flex-1">
            {cleanExcerpt}
          </p>
        )}

        {/* Author */}
        {showAuthor && author && (
          <div className="flex items-center space-x-2 text-xs text-gray-500 mt-auto">
            {author.avatar_urls['24'] && (
              <Image
                src={author.avatar_urls['24']}
                alt={author.name}
                width={20}
                height={20}
                className="rounded-full"
              />
            )}
            <span>przez {author.name}</span>
          </div>
        )}

        {/* Read More Link */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <Link 
            href={`/blog/${post.slug}`}
            className="text-primary font-medium text-sm hover:text-primary-dark transition-colors inline-flex items-center"
          >
            Czytaj więcej
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
});

BlogCard.displayName = 'BlogCard';

export default BlogCard;