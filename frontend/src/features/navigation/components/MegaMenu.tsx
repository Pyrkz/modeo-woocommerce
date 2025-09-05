'use client';

import { forwardRef } from 'react';
import Link from 'next/link';
import { MegaMenuProps } from '../types';
import { cn } from '@/lib/utils';
import {
  ShoppingBagIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const MegaMenu = forwardRef<HTMLDivElement, MegaMenuProps>(
  ({ categories, isOpen, onClose, onOpen, className }, ref) => {
    if (!isOpen) return null;

    const handleMouseEnter = () => {
      // Cancel any pending close timeout when hovering over menu
      if (onOpen) {
        onOpen();
      }
    };

    const handleMouseLeave = () => {
      // Trigger delayed close when leaving menu
      onClose();
    };

    // Organize categories into logical groups
    const clothingCategories = categories.filter(cat => 
      ['koszulki', 'bluzy', 'kurtki', 'softshelle', 'polary'].includes(cat.slug)
    );

    const sportAndWorkCategories = categories.filter(cat => 
      ['ubrania-sportowe', 'ubrania-robocze'].includes(cat.slug)
    );

    const accessoriesCategories = categories.filter(cat => 
      ['czapki', 'plecaki-torby', 'akcesoria', 'okulary'].includes(cat.slug)
    );

    const specialCategories = categories.filter(cat => 
      ['dom-ogrod'].includes(cat.slug)
    );

    return (
      <>
        {/* Invisible bridge to prevent menu from closing when moving cursor */}
        <div
          className="fixed top-16 left-0 w-full h-2 z-50 invisible"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        
        <div
          ref={ref}
          className={cn(
            'fixed top-16 left-0 w-full bg-white border-t border-gray-200 shadow-xl z-50',
            'transition-all duration-200 ease-out',
            'md:top-16',
            'top-14',
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none',
            className
          )}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          <div className="w-full px-4 py-6 md:px-8 md:py-8">
            <div className="max-w-screen-2xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                
                {/* Odzież podstawowa */}
                <div className="space-y-4 md:pr-8 md:border-r border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Odzież podstawowa
                  </h3>
                  <div className="space-y-3">
                    {clothingCategories.map((category) => (
                      <Link
                        key={category.id}
                        href={category.href}
                        className="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50"
                        onClick={onClose}
                      >
                        <span className="text-primary group-hover:scale-110 transition-transform">
                          {category.icon}
                        </span>
                        <span className="text-sm">{category.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Odzież specjalistyczna */}
                <div className="space-y-4 md:pr-8 md:border-r border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Odzież specjalistyczna
                  </h3>
                  <div className="space-y-3">
                    {sportAndWorkCategories.map((category) => (
                      <Link
                        key={category.id}
                        href={category.href}
                        className="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50"
                        onClick={onClose}
                      >
                        <span className="text-primary group-hover:scale-110 transition-transform">
                          {category.icon}
                        </span>
                        <span className="text-sm">{category.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Akcesoria */}
                <div className="space-y-4 md:pr-8 md:border-r border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Akcesoria
                  </h3>
                  <div className="space-y-3">
                    {accessoriesCategories.map((category) => (
                      <Link
                        key={category.id}
                        href={category.href}
                        className="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50"
                        onClick={onClose}
                      >
                        <span className="text-primary group-hover:scale-110 transition-transform">
                          {category.icon}
                        </span>
                        <span className="text-sm">{category.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Inne kategorie */}
                <div className="space-y-4 md:pr-8 md:border-r border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Inne kategorie
                  </h3>
                  <div className="space-y-3">
                    {specialCategories.map((category) => (
                      <Link
                        key={category.id}
                        href={category.href}
                        className="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50"
                        onClick={onClose}
                      >
                        <span className="text-primary group-hover:scale-110 transition-transform">
                          {category.icon}
                        </span>
                        <span className="text-sm">{category.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* CTA Section */}
                <div className="md:pl-0">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200 h-full flex flex-col justify-center items-center text-center min-h-[280px]">
                    <div className="mb-4">
                      <ShoppingBagIcon className="w-12 h-12 text-blue-500 mx-auto" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Wszystkie produkty
                    </h3>
                    <p className="text-sm text-gray-600 mb-6 max-w-xs">
                      Odkryj pełną ofertę naszych produktów w sklepie
                    </p>
                    <Link
                      href="/sklep"
                      className="inline-flex items-center justify-center px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors group"
                      onClick={onClose}
                    >
                      Zobacz sklep
                      <ArrowRightIcon className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
);

MegaMenu.displayName = 'MegaMenu';

export default MegaMenu;