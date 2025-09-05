'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { HeartIcon, GiftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface DzienKobietEmptyStateProps {
  onBrowseAllClick?: () => void;
}

export const DzienKobietEmptyState = React.memo(({ onBrowseAllClick }: DzienKobietEmptyStateProps) => {
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
            <div className="bg-purple-100 p-4 rounded-full">
              <HeartIcon className="w-8 h-8 text-purple-500" />
            </div>
            <div className="bg-pink-100 p-4 rounded-full">
              <GiftIcon className="w-8 h-8 text-pink-500" />
            </div>
          </div>

          {/* Main Message */}
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Po prostu ich nie ma tymczasowo
          </h3>

          {/* Description */}
          <p className="text-lg text-gray-600 mb-8">
            Prezenty na Dzień Kobiet są obecnie niedostępne, ale wkrótce wrócimy z nowymi inspirującymi propozycjami.
          </p>

          {/* CTA Button */}
          <Button
            onClick={handleBrowseAll}
            size="lg"
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3"
          >
            Przeglądaj wszystkie produkty
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Button>

          {/* Additional Info */}
          <div className="mt-8 p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600">
              ✨ Sprawdź nasze inne kategorie prezentów lub wróć później, 
              aby zobaczyć nowe produkty celebrujące siłę kobiet!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

DzienKobietEmptyState.displayName = 'DzienKobietEmptyState';