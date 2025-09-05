'use client';

import { memo } from 'react';
import Link from 'next/link';

export const ChristmasBackToOccasions = memo(() => {
  return (
    <section className="py-8 border-t border-gray-200 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Link
          href="/na-prezent"
          className="inline-flex items-center text-red-600 hover:text-red-700 font-medium transition-colors"
        >
          <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Wróć do wszystkich okazji
        </Link>
      </div>
    </section>
  );
});

ChristmasBackToOccasions.displayName = 'ChristmasBackToOccasions';