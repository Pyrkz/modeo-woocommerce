'use client';

import React from 'react';
import Link from 'next/link';

interface FirmyCtaSectionProps {
  id?: string;
}

export const FirmyCtaSection = React.memo(({ 
  id = "cta" 
}: FirmyCtaSectionProps) => (
  <section id={id} className="py-16 bg-gradient-to-br from-blue-600 to-purple-700">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      
      {/* Main Content */}
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Gotowy na profesjonalne znakowanie?
        </h2>
        <p className="text-xl text-white/90 mb-8 leading-relaxed">
          Skontaktuj się z nami i otrzymaj bezpłatną wycenę dostosowaną 
          do potrzeb Twojej firmy
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <Link
          href="#kontakt"
          className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Zamów wycenę
        </Link>
        <Link
          href="tel:+48663188204"
          className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200 inline-flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          663 188 204
        </Link>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white/80 text-sm">
        <div className="flex items-center justify-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Odpowiedź w 24h
        </div>
        <div className="flex items-center justify-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Bezpłatny projekt
        </div>
        <div className="flex items-center justify-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Ekspresowa realizacja
        </div>
      </div>
      
    </div>
  </section>
));

FirmyCtaSection.displayName = 'FirmyCtaSection';