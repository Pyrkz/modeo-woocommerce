'use client';

import { Suspense } from 'react';
import { useCategoryShop, CategoryLayout } from '@/features/shop';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function OkularyPage() {
  const shopData = useCategoryShop({
    categorySlug: 'okulary',
    perPage: 12,
    autoFetch: true,
    enableInfiniteScroll: true
  });

  return (
    <Suspense fallback={<LoadingSpinner size="lg" text="Ładowanie okularów..." className="py-16" />}>
      <CategoryLayout
        {...shopData}
        categoryName="Okulary"
        categorySlug="okulary"
        showFilters={true}
      />
    </Suspense>
  );
}