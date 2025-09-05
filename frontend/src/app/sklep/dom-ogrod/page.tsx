'use client';

import { Suspense } from 'react';
import { useCategoryShop, CategoryLayout } from '@/features/shop';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function DomOgrodPage() {
  const shopData = useCategoryShop({
    categorySlug: 'dom-i-ogrod',
    perPage: 12,
    autoFetch: true,
    enableInfiniteScroll: true
  });

  return (
    <Suspense fallback={<LoadingSpinner size="lg" text="Ładowanie produktów dom i ogród..." className="py-16" />}>
      <CategoryLayout
        {...shopData}
        categoryName="Dom i ogród"
        categorySlug="dom-i-ogrod"
        showFilters={true}
      />
    </Suspense>
  );
}