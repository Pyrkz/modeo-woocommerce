'use client';

import { forwardRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  GiftIcon,
  HeartIcon,
  CalendarDaysIcon,
  CakeIcon,
  SparklesIcon,
  TrophyIcon,
  AcademicCapIcon,
  FaceSmileIcon,
  HomeIcon,
  FireIcon
} from '@heroicons/react/24/outline';

interface GiftMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const giftContent = {
  seasonal: {
    title: 'Święta i okazje',
    items: [
      { name: 'Boże Narodzenie', href: '/na-prezent/boze-narodzenie', icon: <GiftIcon className="w-4 h-4" /> },
      { name: 'Mikołajki', href: '/na-prezent/mikolajki', icon: <GiftIcon className="w-4 h-4" /> },
      { name: 'Nowy Rok / Sylwester', href: '/na-prezent/nowy-rok-sylwester', icon: <FireIcon className="w-4 h-4" /> },
      { name: 'Walentynki', href: '/na-prezent/walentynki', icon: <HeartIcon className="w-4 h-4" /> },
      { name: 'Dzień Kobiet', href: '/na-prezent/dzien-kobiet', icon: <SparklesIcon className="w-4 h-4" /> },
      { name: 'Ślub', href: '/na-prezent/slub', icon: <HeartIcon className="w-4 h-4" /> }
    ]
  },
  family: {
    title: 'Dla rodziny',
    items: [
      { name: 'Dzień mamy', href: '/na-prezent/dzien-mamy', icon: <HeartIcon className="w-4 h-4" /> },
      { name: 'Dzień taty', href: '/na-prezent/dzien-taty', icon: <TrophyIcon className="w-4 h-4" /> },
      { name: 'Dzień dziecka', href: '/na-prezent/dzien-dziecka', icon: <FaceSmileIcon className="w-4 h-4" /> },
      { name: 'Dzień babci', href: '/na-prezent/dzien-babci', icon: <HeartIcon className="w-4 h-4" /> },
      { name: 'Dzień dziadka', href: '/na-prezent/dzien-dziadka', icon: <TrophyIcon className="w-4 h-4" /> },
      { name: 'Dzień Chłopaka', href: '/na-prezent/dzien-chlopaka', icon: <TrophyIcon className="w-4 h-4" /> }
    ]
  },
  personal: {
    title: 'Okazje osobiste',
    items: [
      { name: 'Urodziny', href: '/na-prezent/urodziny', icon: <CakeIcon className="w-4 h-4" /> },
      { name: 'Imieniny', href: '/na-prezent/imieniny', icon: <CakeIcon className="w-4 h-4" /> },
      { name: 'Rocznice', href: '/na-prezent/rocznice', icon: <CalendarDaysIcon className="w-4 h-4" /> },
      { name: 'Parapetówka', href: '/na-prezent/parapetowka', icon: <HomeIcon className="w-4 h-4" /> },
      { name: 'Dzień Nauczyciela', href: '/na-prezent/dzien-nauczyciela', icon: <AcademicCapIcon className="w-4 h-4" /> },
      { name: 'Zwierzaki', href: '/na-prezent/zwierzaki', icon: <HeartIcon className="w-4 h-4" /> }
    ]
  }
};

const GiftMegaMenu = forwardRef<HTMLDivElement, GiftMegaMenuProps>(
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              
              {/* Święta i okazje */}
              <div className="space-y-4 md:pr-8 md:border-r border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {giftContent.seasonal.title}
                </h3>
                <div className="space-y-3">
                  {giftContent.seasonal.items.map((item) => (
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

              {/* Dla rodziny */}
              <div className="space-y-4 md:pr-8 md:border-r border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {giftContent.family.title}
                </h3>
                <div className="space-y-3">
                  {giftContent.family.items.map((item) => (
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

              {/* Okazje osobiste */}
              <div className="space-y-4 md:pr-8 md:border-r border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {giftContent.personal.title}
                </h3>
                <div className="space-y-3">
                  {giftContent.personal.items.map((item) => (
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
                <div className="bg-gradient-to-br from-red-50 to-pink-100 p-6 rounded-2xl border border-red-200 h-full flex flex-col justify-center items-center text-center min-h-[280px]">
                  <div className="mb-4">
                    <GiftIcon className="w-12 h-12 text-red-500 mx-auto" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Wszystkie prezenty
                  </h3>
                  <p className="text-sm text-gray-600 mb-6 max-w-xs">
                    Odkryj pełną kolekcję prezentów na każdą okazję
                  </p>
                  <Link
                    href="/na-prezent"
                    className="inline-flex items-center justify-center px-6 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors group"
                    onClick={onClose}
                  >
                    Zobacz wszystkie
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
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

GiftMegaMenu.displayName = 'GiftMegaMenu';

export function GiftDropdown({ isOpen, onClose, className }: GiftMegaMenuProps) {
  return <GiftMegaMenu isOpen={isOpen} onClose={onClose} className={className} />;
}