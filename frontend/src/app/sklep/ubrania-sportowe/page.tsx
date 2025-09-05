'use client';

import { Suspense } from 'react';
import { useCategoryShop, CategoryLayout } from '@/features/shop';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function UbraniaSportowePage() {
  const shopData = useCategoryShop({
    categorySlug: 'ubrania-sportowe',
    perPage: 12,
    autoFetch: true,
    enableInfiniteScroll: true
  });

  return (
    <Suspense fallback={<LoadingSpinner size="lg" text="Ładowanie ubrań sportowych..." className="py-16" />}>
      <CategoryLayout
        {...shopData}
        categoryName="Ubrania sportowe"
        categorySlug="ubrania-sportowe"
        showFilters={true}
      />
    </Suspense>
  );
}