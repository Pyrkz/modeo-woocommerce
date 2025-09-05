'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 flex items-center justify-center overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-20 h-20 bg-red-200 rounded-full blur-xl" />
        <div className="absolute top-32 right-20 w-16 h-16 bg-pink-200 rounded-full blur-lg" />
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-orange-200 rounded-full blur-lg" />
        <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-yellow-200 rounded-full blur-xl" />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-red-100 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* 404 Big Number */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-bold bg-gradient-to-br from-red-500 via-pink-500 to-orange-500 bg-clip-text text-transparent leading-none">
            404
          </h1>
        </div>

        {/* Main Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          <span className="text-red-600">Ups!</span> Nie znaleźliśmy{' '}
          <span className="text-pink-600">tej strony</span>
        </h2>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed">
          Strona, której szukasz mogła zostać przeniesiona, usunięta lub być tymczasowo niedostępna.
          Ale nie martw się - mamy mnóstwo innych wspaniałych rzeczy do odkrycia!
        </p>
        

        {/* Popular Links */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Popularne strony:</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/sklep"
              className="inline-flex items-center px-4 py-2 bg-white/80 hover:bg-white border border-red-200 rounded-lg text-sm font-medium text-red-700 hover:text-red-800 transition-colors duration-200"
            >
              Sklep
            </Link>
            <Link
              href="/na-prezent"
              className="inline-flex items-center px-4 py-2 bg-white/80 hover:bg-white border border-pink-200 rounded-lg text-sm font-medium text-pink-700 hover:text-pink-800 transition-colors duration-200"
            >
              Na prezent
            </Link>
            <Link
              href="/znakowanie"
              className="inline-flex items-center px-4 py-2 bg-white/80 hover:bg-white border border-orange-200 rounded-lg text-sm font-medium text-orange-700 hover:text-orange-800 transition-colors duration-200"
            >
              Znakowanie
            </Link>
            <Link
              href="/kontakt"
              className="inline-flex items-center px-4 py-2 bg-white/80 hover:bg-white border border-green-200 rounded-lg text-sm font-medium text-green-700 hover:text-green-800 transition-colors duration-200"
            >
              Kontakt
            </Link>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={handleGoBack}
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Wróć do poprzedniej strony
            <svg className="ml-2 w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-2 border-gray-300 hover:border-red-400 hover:bg-red-50 font-semibold px-8 py-4 text-lg"
          >
            <Link href="/">
              Przejdź na stronę główną
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </Link>
          </Button>
        </div>

        {/* Additional Help */}
        <div className="mt-12 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 max-w-2xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <div className="text-3xl">🎁</div>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Potrzebujesz pomocy?
          </h3>
          <p className="text-gray-600 mb-4">
            Nasz zespół jest tutaj, aby Ci pomóc. Skontaktuj się z nami, a znajdziemy rozwiązanie!
          </p>
          <Button
            variant="outline"
            asChild
            className="border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400"
          >
            <Link href="/kontakt">
              Skontaktuj się z nami
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}