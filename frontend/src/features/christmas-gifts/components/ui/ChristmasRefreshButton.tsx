'use client';

import { memo } from 'react';

interface ChristmasRefreshButtonProps {
  onClick: () => void;
}

export const ChristmasRefreshButton = memo(({ onClick }: ChristmasRefreshButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center px-6 py-2 text-gray-600 hover:text-red-600 font-medium transition-colors text-sm"
    >
      <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      Odśwież produkty
    </button>
  );
});

ChristmasRefreshButton.displayName = 'ChristmasRefreshButton';