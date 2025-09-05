'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { HeartIcon, GiftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface DzienMamyEmptyStateProps {
  onBrowseAllClick?: () => void;
}

export const DzienMamyEmptyState = React.memo(({ onBrowseAllClick }: DzienMamyEmptyStateProps) => {
  const handleBrowseAll = () => {
    if (onBrowseAllClick) {
      onBrowseAllClick();
    } else {
      window.location.href = '/sklep';
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-md mx-auto">
          {/* Icon */}
          <div className="flex justify-center items-center gap-2 mb-6">
            <div className="bg-green-100 p-4 rounded-full">
              <HeartIcon className="w-8 h-8 text-green-500" />
            </div>
            <div className="bg-emerald-100 p-4 rounded-full">
              <GiftIcon className="w-8 h-8 text-emerald-500" />
            </div>
          </div>

          {/* Main Message */}
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Po prostu ich nie ma tymczasowo
          </h3>

          {/* Description */}
          <p className="text-lg text-gray-600 mb-8">
            Prezenty na Dzień Matki są obecnie niedostępne, ale wkrótce wrócimy z nowymi pomysłami na prezenty dla mamy.
          </p>

          {/* CTA Button */}
          <Button
            onClick={handleBrowseAll}
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3"
          >
            Przeglądaj wszystkie produkty
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Button>

          {/* Additional Info */}
          <div className="mt-8 p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">
              💚 Sprawdź nasze inne kategorie prezentów lub wróć później, 
              aby zobaczyć nowe produkty dla najlepszych mam!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

DzienMamyEmptyState.displayName = 'DzienMamyEmptyState';