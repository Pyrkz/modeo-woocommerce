'use client';

import { memo } from 'react';

interface ChristmasLoadMoreButtonProps {
  onClick: () => void;
}

export const ChristmasLoadMoreButton = memo(({ onClick }: ChristmasLoadMoreButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-sm hover:shadow-md"
    >
      <span className="mr-2">🎁</span>
      Pokaż więcej prezentów
    </button>
  );
});

ChristmasLoadMoreButton.displayName = 'ChristmasLoadMoreButton';