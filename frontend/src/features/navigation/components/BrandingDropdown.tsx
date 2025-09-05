'use client';

import { forwardRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  PaintBrushIcon,
  BuildingOfficeIcon,
  SparklesIcon,
  WrenchScrewdriverIcon,
  ScissorsIcon,
  UserIcon,
  ShoppingBagIcon,
  AcademicCapIcon,
  BuildingStorefrontIcon,
  CalendarDaysIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

interface BrandingMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const brandingContent = {
  techniques: {
    title: 'Techniki znakowania',
    items: [
      { name: 'Haft', href: '/znakowanie/haft', icon: <ScissorsIcon className="w-4 h-4" /> },
      { name: 'Sitodruk', href: '/znakowanie/sitodruk', icon: <PaintBrushIcon className="w-4 h-4" /> },
      { name: 'DTF', href: '/znakowanie/dtf', icon: <SparklesIcon className="w-4 h-4" /> },
      { name: 'Sublimacja', href: '/znakowanie/sublimacja', icon: <PaintBrushIcon className="w-4 h-4" /> },
      { name: 'Flex', href: '/znakowanie/flex', icon: <ScissorsIcon className="w-4 h-4" /> },
      { name: 'Flock', href: '/znakowanie/flock', icon: <ScissorsIcon className="w-4 h-4" /> }
    ]
  },
  products: {
    title: 'Rodzaje produktów',
    items: [
      { name: 'Koszulki', href: '/znakowanie/koszulki', icon: <UserIcon className="w-4 h-4" /> },
      { name: 'Kurtki', href: '/znakowanie/kurtki', icon: <UserIcon className="w-4 h-4" /> },
      { name: 'Softshelle', href: '/znakowanie/softshelle', icon: <UserIcon className="w-4 h-4" /> },
      { name: 'Plecaki i torby', href: '/znakowanie/plecaki-torby', icon: <ShoppingBagIcon className="w-4 h-4" /> },
      { name: 'Ubrania sportowe', href: '/znakowanie/ubrania-sportowe', icon: <UserIcon className="w-4 h-4" /> }
    ]
  },
  forBrands: {
    title: 'Dla branż',
    column1: [
      { name: 'Bluzy', href: '/znakowanie/bluzy', icon: <UserIcon className="w-4 h-4" /> },
      { name: 'Czapki', href: '/znakowanie/czapki', icon: <UserIcon className="w-4 h-4" /> },
      { name: 'Polary', href: '/znakowanie/polary', icon: <UserIcon className="w-4 h-4" /> },
      { name: 'Akcesoria', href: '/znakowanie/akcesoria', icon: <SparklesIcon className="w-4 h-4" /> },
      { name: 'Ubrania robocze', href: '/znakowanie/ubrania-robocze', icon: <WrenchScrewdriverIcon className="w-4 h-4" /> }
    ],
    column2: [
      { name: 'Firmy', href: '/znakowanie/dla-branz/firmy', icon: <BuildingOfficeIcon className="w-4 h-4" /> },
      { name: 'Szkoły', href: '/znakowanie/dla-branz/szkoly', icon: <AcademicCapIcon className="w-4 h-4" /> },
      { name: 'Kluby sportowe', href: '/znakowanie/dla-branz/kluby-sportowe', icon: <SparklesIcon className="w-4 h-4" /> },
      { name: 'Restauracje', href: '/znakowanie/dla-branz/restauracje', icon: <BuildingStorefrontIcon className="w-4 h-4" /> },
      { name: 'Eventy', href: '/znakowanie/dla-branz/eventy', icon: <CalendarDaysIcon className="w-4 h-4" /> }
    ]
  }
};

const BrandingMegaMenu = forwardRef<HTMLDivElement, BrandingMegaMenuProps>(
  ({ isOpen, onClose, className }, ref) => {
    if (!isOpen) return null;

    return (
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
        onMouseLeave={onClose}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <div className="w-full px-4 py-6 md:px-8 md:py-8">
          <div className="max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              
              {/* Techniki znakowania */}
              <div className="space-y-4 md:pr-8 md:border-r border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {brandingContent.techniques.title}
                </h3>
                <div className="space-y-3">
                  {brandingContent.techniques.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50"
                      onClick={onClose}
                    >
                      <span className="text-primary group-hover:scale-110 transition-transform">
                        {item.icon}
                      </span>
                      <span className="text-sm">{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Rodzaje produktów */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {brandingContent.products.title}
                </h3>
                <div className="space-y-3">
                  {brandingContent.products.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50"
                      onClick={onClose}
                    >
                      <span className="text-primary group-hover:scale-110 transition-transform">
                        {item.icon}
                      </span>
                      <span className="text-sm">{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Dla branż - Column 1 */}
              <div className="space-y-4 md:pr-8 md:border-r border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  &nbsp;
                </h3>
                <div className="space-y-3">
                  {brandingContent.forBrands.column1.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50"
                      onClick={onClose}
                    >
                      <span className="text-primary group-hover:scale-110 transition-transform">
                        {item.icon}
                      </span>
                      <span className="text-sm">{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Dla branż - Column 2 */}
              <div className="space-y-4 md:pr-8 md:border-r border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {brandingContent.forBrands.title}
                </h3>
                <div className="space-y-3">
                  {brandingContent.forBrands.column2.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50"
                      onClick={onClose}
                    >
                      <span className="text-primary group-hover:scale-110 transition-transform">
                        {item.icon}
                      </span>
                      <span className="text-sm">{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA Section */}
              <div className="md:pl-0">
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-2xl border border-pink-200 h-full flex flex-col justify-center items-center text-center min-h-[280px]">
                  <div className="mb-4">
                    <SparklesIcon className="w-12 h-12 text-pink-500 mx-auto" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Projektuj teraz!
                  </h3>
                  <p className="text-sm text-gray-600 mb-6 max-w-xs">
                    Stwórz unikalny projekt ze swoim logo lub grafiką
                  </p>
                  <Link
                    href="/projektuj"
                    className="inline-flex items-center justify-center px-6 py-3 bg-pink-500 text-white font-medium rounded-lg hover:bg-pink-600 transition-colors group"
                    onClick={onClose}
                  >
                    Rozpocznij projekt
                    <ArrowRightIcon className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
);

BrandingMegaMenu.displayName = 'BrandingMegaMenu';

export function BrandingDropdown({ isOpen, onClose, className }: BrandingMegaMenuProps) {
  return <BrandingMegaMenu isOpen={isOpen} onClose={onClose} className={className} />;
}