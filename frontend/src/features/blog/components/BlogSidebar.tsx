'use client';

import { memo } from 'react';
import { BlogCategory, BlogTag } from '../types';
import { cn } from '@/lib/utils';

interface BlogSidebarProps {
  categories: BlogCategory[];
  tags: BlogTag[];
  selectedCategories?: number[];
  selectedTags?: number[];
  onCategorySelect?: (categoryId: number) => void;
  onTagSelect?: (tagId: number) => void;
  className?: string;
}

export const BlogSidebar = memo<BlogSidebarProps>(({
  categories,
  tags,
  selectedCategories = [],
  selectedTags = [],
  onCategorySelect,
  onTagSelect,
  className
}) => {
  return (
    <aside className={cn('space-y-6', className)}>
      {/* Categories */}
      {categories.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Kategorie</h3>
          <div className="space-y-2">
            {categories.slice(0, 10).map((category) => (
              <button
                key={category.id}
                onClick={() => onCategorySelect?.(category.id)}
                className={cn(
                  'flex items-center justify-between w-full text-left px-3 py-2 rounded-md transition-colors',
                  selectedCategories.includes(category.id)
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-50'
                )}
              >
                <span className="text-sm">{category.name}</span>
                <span className={cn(
                  'text-xs px-2 py-1 rounded-full',
                  selectedCategories.includes(category.id)
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-100 text-gray-600'
                )}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tagi</h3>
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 15).map((tag) => (
              <button
                key={tag.id}
                onClick={() => onTagSelect?.(tag.id)}
                className={cn(
                  'text-sm px-3 py-1 rounded-full transition-colors',
                  selectedTags.includes(tag.id)
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Newsletter Signup */}
      <div className="bg-primary rounded-lg p-6 text-white">
        <h3 className="text-lg font-semibold mb-2">Newsletter</h3>
        <p className="text-sm text-primary-100 mb-4">
          Bądź na bieżąco z najnowszymi trendami w branży odzieżowej
        </p>
        <div className="space-y-3">
          <input
            type="email"
            placeholder="Twój adres email"
            className="w-full px-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button className="w-full bg-white text-primary px-4 py-2 rounded-md font-medium hover:bg-gray-50 transition-colors">
            Zapisz się
          </button>
        </div>
      </div>
    </aside>
  );
});

BlogSidebar.displayName = 'BlogSidebar';