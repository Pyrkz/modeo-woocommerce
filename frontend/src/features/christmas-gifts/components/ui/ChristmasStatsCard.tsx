'use client';

import { memo } from 'react';

interface ChristmasStatsCardProps {
  total: number;
}

export const ChristmasStatsCard = memo(({ total }: ChristmasStatsCardProps) => {
  const getProductText = (count: number): string => {
    if (count === 1) return 'produkt świąteczny';
    if (count < 5) return 'produkty świąteczne';
    return 'produktów świątecznych';
  };

  return (
    <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm border border-red-200">
      <span className="text-red-600 font-semibold">
        🎄 {total} {getProductText(total)}
      </span>
    </div>
  );
});

ChristmasStatsCard.displayName = 'ChristmasStatsCard';