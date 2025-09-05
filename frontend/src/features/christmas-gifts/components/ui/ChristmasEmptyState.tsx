'use client';

import React from 'react';

import { Button } from '@/components/ui/Button';

interface ChristmasEmptyStateProps {
  className?: string;
}

export const ChristmasEmptyState = React.memo(({ className = '' }: ChristmasEmptyStateProps) => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <section className={`py-16 bg-white ${className}`}>
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-md mx-auto">
          <div className="bg-red-50 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <span className="text-4xl">🎁</span>
          </div>
          
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Brak prezentów świątecznych
          </h3>
          
          <p className="text-gray-600 mb-6">
            Obecnie nie mamy dostępnych prezentów na Boże Narodzenie. 
            Sprawdź inne kategorie lub wróć później.
          </p>
          
          <Button 
            onClick={handleRefresh}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Odśwież stronę
          </Button>
        </div>
      </div>
    </section>
  );
});

ChristmasEmptyState.displayName = 'ChristmasEmptyState';