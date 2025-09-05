'use client';

import { memo } from 'react';
import { cn } from '@/lib/utils';

interface BlogHeaderProps {
  title?: string;
  subtitle?: string;
  totalPosts: number;
  currentPostsCount: number;
  className?: string;
}

export const BlogHeader = memo<BlogHeaderProps>(({
  title = "Poznaj świat odzieży i gadżetów",
  subtitle = "Trendy, porady eksperckie i inspiracje dla Twojego biznesu. Wszystko o znakowaniu odzieży, najnowszych technologiach i trendach w branży.",
  totalPosts,
  currentPostsCount,
  className
}) => {
  return (
    <div className={cn('bg-gray-50 border-b border-gray-200', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            {subtitle}
          </p>
          {totalPosts > 0 && (
            <p className="text-sm text-gray-500">
              {currentPostsCount === totalPosts ? (
                `${totalPosts} ${totalPosts === 1 ? 'artykuł' : totalPosts < 5 ? 'artykuły' : 'artykułów'}`
              ) : (
                `Wyświetlanie ${currentPostsCount} z ${totalPosts} artykułów`
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
});

BlogHeader.displayName = 'BlogHeader';