'use client';

import { Suspense } from 'react';
import { useCategoryShop, CategoryLayout } from '@/features/shop';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function PlecakiTorbyPage() {
  const shopData = useCategoryShop({
    categorySlug: 'plecaki-torby',
    perPage: 12,
    autoFetch: true,
    enableInfiniteScroll: true
  });

  return (
    <Suspense fallback={<LoadingSpinner size="lg" text="Ładowanie plecaków i toreb..." className="py-16" />}>
      <CategoryLayout
        {...shopData}
        categoryName="Plecaki i torby"
        categorySlug="plecaki-torby"
        showFilters={true}
      />
    </Suspense>
  );
}