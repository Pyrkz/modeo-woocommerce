'use client';

import { Suspense } from 'react';
import { useBlog, BlogLayout } from '@/features/blog';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function BlogPage() {
  const blogData = useBlog({
    perPage: 6,
    autoFetch: true,
    enableInfiniteScroll: true,
    initialFilters: {
      sortBy: 'date',
      sortOrder: 'desc',
    }
  });

  return (
    <Suspense fallback={<LoadingSpinner size="lg" text="Ładowanie bloga..." className="py-16" />}>
      <BlogLayout
        {...blogData}
        showHeader={true}
        showSidebar={true}
      />
    </Suspense>
  );
}