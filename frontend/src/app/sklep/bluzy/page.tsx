'use client';

import { Suspense } from 'react';
import { useCategoryShop, CategoryLayout } from '@/features/shop';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function BluzyPage() {
  const shopData = useCategoryShop({
    categorySlug: 'bluzy',
    perPage: 12,
    autoFetch: true,
    enableInfiniteScroll: true
  });

  return (
    <Suspense fallback={<LoadingSpinner size="lg" text="Ładowanie bluz..." className="py-16" />}>
      <CategoryLayout
        {...shopData}
        categoryName="Bluzy"
        categorySlug="bluzy"
        showFilters={true}
      />
    </Suspense>
  );
}