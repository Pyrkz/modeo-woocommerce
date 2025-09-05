'use client';

import { memo } from 'react';
import Link from 'next/link';

const BREADCRUMB_ITEMS = [
  { label: 'Strona główna', href: '/' },
  { label: 'Na prezent', href: '/na-prezent' },
  { label: 'Boże Narodzenie', href: null }
] as const;

export const ChristmasBreadcrumb = memo(() => {
  return (
    <nav className="bg-gray-50 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center space-x-2 text-sm">
          {BREADCRUMB_ITEMS.map((item, index) => (
            <li key={item.label} className="flex items-center">
              {index > 0 && <span className="text-gray-400 mr-2">/</span>}
              {item.href ? (
                <Link 
                  href={item.href} 
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-900 font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
});

ChristmasBreadcrumb.displayName = 'ChristmasBreadcrumb';