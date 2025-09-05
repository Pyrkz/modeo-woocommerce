'use client';

import { memo } from 'react';

interface LoadMoreButtonProps {
  onLoadMore: () => Promise<void>;
  loading: boolean;
}

export const LoadMoreButton = memo(function LoadMoreButton({
  onLoadMore,
  loading
}: LoadMoreButtonProps) {
  return (
    <div className="text-center py-6">
      <button
        onClick={onLoadMore}
        disabled={loading}
        className="inline-flex items-center px-6 py-3 border border-primary-300 rounded-lg text-sm font-medium text-primary-700 bg-white hover:bg-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
            Ładowanie...
          </>
        ) : (
          <>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            Pokaż więcej opinii
          </>
        )}
      </button>
    </div>
  );
});

LoadMoreButton.displayName = 'LoadMoreButton';