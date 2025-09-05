'use client';

import React from 'react';

export const MikolajkiLoadingState = React.memo(() => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        <div className="inline-flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mr-3"></div>
          <span className="text-lg text-gray-600">Ładowanie prezentów na Mikołajki...</span>
        </div>
      </div>
    </div>
  );
});

MikolajkiLoadingState.displayName = 'MikolajkiLoadingState';