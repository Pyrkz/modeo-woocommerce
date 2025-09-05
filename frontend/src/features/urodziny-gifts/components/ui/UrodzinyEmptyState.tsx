'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { GiftIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface UrodzinyEmptyStateProps {
  searchTerm?: string;
  onReset?: () => void;
}

export const UrodzinyEmptyState = React.memo(({ searchTerm, onReset }: UrodzinyEmptyStateProps) => {
  const isSearch = Boolean(searchTerm);

  return (
    <div className="py-20 text-center">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          {isSearch ? (
            <MagnifyingGlassIcon className="mx-auto h-16 w-16 text-gray-400" />
          ) : (
            <GiftIcon className="mx-auto h-16 w-16 text-gray-400" />
          )}
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {isSearch 
            ? `Brak wyników dla "${searchTerm}"`
            : 'Brak prezentów urodzinowych'
          }
        </h3>
        
        <p className="text-gray-600 mb-8">
          {isSearch 
            ? 'Spróbuj zmienić kryteria wyszukiwania lub przeglądaj wszystkie produkty.'
            : 'Po prostu ich nie ma tymczasowo.'
          }
        </p>

        <div className="space-y-3">
          {isSearch && onReset && (
            <Button 
              onClick={onReset}
              variant="outline"
              className="w-full border-yellow-200 text-yellow-700 hover:bg-yellow-50"
            >
              Wyczyść filtry
            </Button>
          )}
          
          <Button asChild className="w-full bg-yellow-600 hover:bg-yellow-700">
            <Link href="/sklep">
              Przeglądaj wszystkie produkty
            </Link>
          </Button>
        </div>

      </div>
    </div>
  );
});

UrodzinyEmptyState.displayName = 'UrodzinyEmptyState';