'use client';

import { Suspense } from 'react';
import { useCategoryShop, CategoryLayout } from '@/features/shop';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function AkcesoriaPage() {
  const shopData = useCategoryShop({
    categorySlug: 'akcesoria',
    perPage: 12,
    autoFetch: true,
    enableInfiniteScroll: true
  });

  return (
    <Suspense fallback={<LoadingSpinner size="lg" text="Ładowanie akcesoriów..." className="py-16" />}>
      <CategoryLayout
        {...shopData}
        categoryName="Akcesoria"
        categorySlug="akcesoria"
        showFilters={true}
      />
    </Suspense>
  );
}