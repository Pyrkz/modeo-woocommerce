'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Category } from '../types';
import { cn } from '@/lib/utils';

interface MegaMenuMobileProps {
  categories: Category[];
  onClose: () => void;
  className?: string;
}

const MegaMenuMobile = ({ categories, onClose, className }: MegaMenuMobileProps) => {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);

  const toggleCategory = (categoryId: number) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <div className={cn('md:hidden bg-white border-t border-gray-200', className)}>
      <div className="px-4 py-3">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Kategorie</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="space-y-2">
              {/* Main Category */}
              <div className="flex items-center justify-between">
                <Link
                  href={category.href}
                  className="flex items-center space-x-2 text-gray-800 hover:text-primary transition-colors flex-1"
                  onClick={onClose}
                >
                  <span className="text-primary">{category.icon}</span>
                  <span className="text-sm font-medium">{category.name}</span>
                </Link>
                {category.subcategories && category.subcategories.length > 0 && (
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={`Toggle ${category.name} subcategories`}
                  >
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        expandedCategory === category.id ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Subcategories */}
              {category.subcategories && 
               category.subcategories.length > 0 && 
               expandedCategory === category.id && (
                <div className="pl-6 space-y-1.5">
                  {category.subcategories.map((subcategory) => (
                    <Link
                      key={subcategory.id}
                      href={subcategory.href}
                      className="block text-sm text-gray-600 hover:text-primary transition-colors py-1"
                      onClick={onClose}
                    >
                      {subcategory.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="border-t border-gray-100 mt-4 pt-3">
          <Link
            href="/sklep"
            className="text-sm font-medium text-primary hover:text-primary-dark transition-colors inline-flex items-center"
            onClick={onClose}
          >
            Zobacz wszystkie kategorie
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MegaMenuMobile;