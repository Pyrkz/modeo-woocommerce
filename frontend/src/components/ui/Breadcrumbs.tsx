'use client';

import Link from 'next/link';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';

export interface BreadcrumbItem {
  label: string;
  href: string;
  isActive?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs = ({ items, className = '' }: BreadcrumbsProps) => {
  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      <Link
        href="/"
        className="text-gray-500 hover:text-gray-700 transition-colors flex items-center"
      >
        <HomeIcon className="w-4 h-4" />
        <span className="sr-only">Strona główna</span>
      </Link>

      {items.map((item) => (
        <div key={item.href} className="flex items-center space-x-2">
          <ChevronRightIcon className="w-4 h-4 text-gray-400" />
          {item.isActive ? (
            <span className="text-gray-900 font-medium">{item.label}</span>
          ) : (
            <Link
              href={item.href}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;