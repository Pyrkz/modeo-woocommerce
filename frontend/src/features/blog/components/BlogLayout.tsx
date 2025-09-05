'use client';

import { memo } from 'react';
import { BlogLayoutProps, BlogPost } from '../types';
import { BlogHeader } from './BlogHeader';
import BlogGrid from './BlogGrid';
import { BlogSidebar } from './BlogSidebar';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export const BlogLayout = memo<BlogLayoutProps>(({
  posts,
  categories,
  tags,
  loading,
  loadingMore,
  error,
  filters,
  pagination,
  loadPosts,
  loadMore,
  updateFilters,
  showHeader = true,
  showSidebar = true
}) => {
  const router = useRouter();

  const handlePostClick = (post: BlogPost) => {
    router.push(`/blog/${post.slug}`);
  };

  const handleCategorySelect = (categoryId: number) => {
    const currentCategories = filters.categories || [];
    const newCategories = currentCategories.includes(categoryId)
      ? currentCategories.filter(id => id !== categoryId)
      : [...currentCategories, categoryId];
    
    updateFilters({ categories: newCategories, page: 1 });
  };

  const handleTagSelect = (tagId: number) => {
    const currentTags = filters.tags || [];
    const newTags = currentTags.includes(tagId)
      ? currentTags.filter(id => id !== tagId)
      : [...currentTags, tagId];
    
    updateFilters({ tags: newTags, page: 1 });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Wystąpił błąd</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => loadPosts(filters, 1, false)}
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
          >
            Spróbuj ponownie
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {showHeader && (
        <BlogHeader 
          totalPosts={pagination.totalPosts}
          currentPostsCount={posts.length}
        />
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={cn(
          'grid gap-8',
          showSidebar ? 'lg:grid-cols-4' : 'lg:grid-cols-1'
        )}>
          {/* Main Content */}
          <div className={cn(showSidebar ? 'lg:col-span-3' : 'lg:col-span-1')}>
            <BlogGrid
              posts={posts}
              loading={loading}
              loadingMore={loadingMore}
              onLoadMore={pagination.hasMore ? loadMore : undefined}
              onPostClick={handlePostClick}
              cardSize="md"
              showExcerpt={true}
              showCategory={true}
              showAuthor={false}
              showDate={true}
            />
          </div>

          {/* Sidebar */}
          {showSidebar && (
            <div className="lg:col-span-1">
              <BlogSidebar
                categories={categories}
                tags={tags}
                selectedCategories={filters.categories}
                selectedTags={filters.tags}
                onCategorySelect={handleCategorySelect}
                onTagSelect={handleTagSelect}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

BlogLayout.displayName = 'BlogLayout';