'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { GiftIcon } from '@heroicons/react/24/outline';

export const SylwesterEmptyState = React.memo(() => {
  return (
    <div className="py-20 text-center">
      <div className="max-w-md mx-auto">
        <GiftIcon className="mx-auto h-16 w-16 text-gray-400 mb-6" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Brak prezentów na Sylwestra
        </h3>
        <p className="text-gray-600 mb-8">
          Aktualnie nie mamy dostępnych prezentów na Sylwestra. Sprawdź ponownie później.
        </p>
        <Button asChild className="bg-purple-600 hover:bg-purple-700">
          <Link href="/sklep">
            Przeglądaj wszystkie produkty
          </Link>
        </Button>
      </div>
    </div>
  );
});

SylwesterEmptyState.displayName = 'SylwesterEmptyState';