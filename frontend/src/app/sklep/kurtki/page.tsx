'use client';

import { Suspense } from 'react';
import { useCategoryShop, CategoryLayout } from '@/features/shop';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function KurtkiPage() {
  const shopData = useCategoryShop({
    categorySlug: 'kurtki',
    perPage: 12,
    autoFetch: true,
    enableInfiniteScroll: true
  });

  return (
    <Suspense fallback={<LoadingSpinner size="lg" text="Ładowanie kurtek..." className="py-16" />}>
      <CategoryLayout
        {...shopData}
        categoryName="Kurtki"
        categorySlug="kurtki"
        showFilters={true}
      />
    </Suspense>
  );
}