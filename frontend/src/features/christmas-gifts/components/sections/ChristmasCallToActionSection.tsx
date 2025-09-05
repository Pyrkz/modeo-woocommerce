'use client';

import { memo } from 'react';
import Link from 'next/link';

export const ChristmasCallToActionSection = memo(() => {
  return (
    <section className="py-12 bg-red-600 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Potrzebujesz pomocy w wyborze prezentów?
        </h2>
        <p className="text-lg md:text-xl mb-8 opacity-90">
          Skontaktuj się z nami - pomożemy Ci stworzyć idealny prezent świąteczny
        </p>
        <Link
          href="/kontakt"
          className="inline-flex items-center px-8 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          Skontaktuj się z nami
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-2.697-.413l-4.194 1.398A1 1 0 015 20l1.398-4.194A8.955 8.955 0 013 13c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
          </svg>
        </Link>
      </div>
    </section>
  );
});

ChristmasCallToActionSection.displayName = 'ChristmasCallToActionSection';