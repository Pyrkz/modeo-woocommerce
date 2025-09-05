'use client';

import { forwardRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  SparklesIcon,
  BuildingOfficeIcon,
  PaintBrushIcon,
  ArrowRightIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

interface BusinessMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const businessServices = [
  {
    title: 'Własna kolekcja',
    description: 'Stwórz własną kolekcję odzieżową',
    href: '/dla-firm/wlasna-kolekcja',
    icon: <SparklesIcon className="w-5 h-5" />
  },
  {
    title: 'Odzież firmowa',
    description: 'Profesjonalna odzież z logo Twojej firmy',
    href: '/dla-firm/odziez-firmowa',
    icon: <BuildingOfficeIcon className="w-5 h-5" />
  },
  {
    title: 'Własna marka',
    description: 'Dropshipping bez inwestycji',
    href: '/dla-firm/wlasna-marka',
    icon: <SparklesIcon className="w-5 h-5" />
  },
  {
    title: 'B2B',
    description: 'Program partnerski i współpraca',
    href: '/dla-firm/b2b',
    icon: <BuildingOfficeIcon className="w-5 h-5" />
  },
  {
    title: 'Nadruki',
    description: 'Profesjonalne znakowanie odzieży',
    href: '/dla-firm/nadruki',
    icon: <PaintBrushIcon className="w-5 h-5" />
  }
];

const BusinessMegaMenu = forwardRef<HTMLDivElement, BusinessMegaMenuProps>(
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Nasze usługi */}
              <div className="lg:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Nasze usługi
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {businessServices.map((service) => (
                    <Link
                      key={service.title}
                      href={service.href}
                      className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                      onClick={onClose}
                    >
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                          {service.icon}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base font-semibold text-gray-900 group-hover:text-primary transition-colors">
                          {service.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {service.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA Section */}
              <div className="lg:pl-8 lg:border-l border-gray-200">
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-2xl border border-pink-200 h-full flex flex-col justify-center min-h-[280px]">
                  <div className="mb-4">
                    <ChatBubbleLeftRightIcon className="w-12 h-12 text-pink-500 mx-auto" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                    Potrzebujesz pomocy?
                  </h3>
                  <p className="text-sm text-gray-600 mb-6 text-center max-w-xs mx-auto">
                    Skontaktuj się z nami – pomożemy wybrać najlepsze rozwiązanie dla Twojej firmy
                  </p>
                  <Link
                    href="/kontakt"
                    className="inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors group mx-auto"
                    onClick={onClose}
                  >
                    Skontaktuj się z nami
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

BusinessMegaMenu.displayName = 'BusinessMegaMenu';

export function BusinessDropdown({ isOpen, onClose, className }: BusinessMegaMenuProps) {
  return <BusinessMegaMenu isOpen={isOpen} onClose={onClose} className={className} />;
}