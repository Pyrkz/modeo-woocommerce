'use client';

import { memo } from 'react';
import Link from 'next/link';

interface SolutionsCTAProps {
  className?: string;
}

const SolutionsCTA = memo(({
  className = ''
}: SolutionsCTAProps) => (
  <div className={`text-center pt-12 ${className}`}>
    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
      Nie ma Twojej branży?
    </h3>
    
    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
      Skontaktuj się z nami – na pewno coś ogarniem! Mamy doświadczenie w 
      realizacji projektów dla różnorodnych branż.
    </p>
    
    <Link
      href="/kontakt"
      className="
        inline-flex items-center px-6 py-3 
        bg-red-600 hover:bg-red-700 
        text-white font-medium rounded-lg
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
      "
    >
      Skontaktuj się z nami
      <svg
        className="ml-2 w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
      </svg>
    </Link>
  </div>
));

SolutionsCTA.displayName = 'SolutionsCTA';

export default SolutionsCTA;