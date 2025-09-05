'use client';

import { memo } from 'react';
import { BlogGridProps } from '../types';
import BlogCard from './BlogCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { cn } from '@/lib/utils';

const BlogGrid = memo<BlogGridProps>(({
  posts,
  loading = false,
  loadingMore = false,
  onLoadMore,
  onPostClick,
  className,
  cardSize = 'md',
  showExcerpt = true,
  showCategory = true,
  showAuthor = false,
  showDate = true
}) => {
  if (loading && posts.length === 0) {
    return (
      <div className="flex justify-center py-16">
        <LoadingSpinner size="lg" text="Ładowanie artykułów..." />
      </div>
    );
  }

  if (!loading && posts.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Brak artykułów</h3>
        <p className="text-gray-600">Nie znaleziono artykułów spełniających kryteria wyszukiwania.</p>
      </div>
    );
  }

  return (
    <div className={cn('space-y-8', className)}>
      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard
            key={post.id}
            post={post}
            size={cardSize}
            showExcerpt={showExcerpt}
            showCategory={showCategory}
            showAuthor={showAuthor}
            showDate={showDate}
            onClick={onPostClick}
          />
        ))}
      </div>

      {/* Load More Button */}
      {onLoadMore && (
        <div className="text-center pt-8">
          {loadingMore ? (
            <LoadingSpinner size="md" text="Ładowanie więcej artykułów..." />
          ) : (
            <button
              onClick={onLoadMore}
              className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || loadingMore}
            >
              Załaduj więcej artykułów
            </button>
          )}
        </div>
      )}
    </div>
  );
});

BlogGrid.displayName = 'BlogGrid';

export default BlogGrid;