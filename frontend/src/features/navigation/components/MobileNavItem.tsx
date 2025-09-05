'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface MobileNavItemProps {
  href: string;
  label: string;
  isActive?: boolean;
  hasSubmenu?: boolean;
  isSubmenuOpen?: boolean;
  onSubmenuToggle?: () => void;
  children?: ReactNode;
  onClick?: () => void;
}

export const MobileNavItem = ({
  href,
  label,
  isActive = false,
  hasSubmenu = false,
  isSubmenuOpen = false,
  onSubmenuToggle,
  children,
  onClick,
}: MobileNavItemProps) => {
  const handleLinkClick = () => {
    // Always close menu when clicking the main link
    if (onClick) {
      onClick();
    }
  };

  const handleSubmenuToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onSubmenuToggle) {
      onSubmenuToggle();
    }
  };

  return (
    <div className="border-b border-gray-100">
      <div className="flex items-center">
        <Link
          href={href}
          className={`flex-1 px-6 py-4 text-left transition-colors ${
            isActive
              ? 'text-primary font-semibold bg-primary/5'
              : 'text-gray-800 hover:text-primary hover:bg-gray-50'
          }`}
          onClick={handleLinkClick}
        >
          {label}
        </Link>
        
        {hasSubmenu && (
          <button
            type="button"
            onClick={handleSubmenuToggle}
            className="px-4 py-4 text-gray-500 hover:text-primary transition-colors"
            aria-label={`${isSubmenuOpen ? 'Zwiń' : 'Rozwiń'} ${label}`}
            aria-expanded={isSubmenuOpen}
          >
            <svg
              className={`w-5 h-5 transform transition-transform duration-200 ${
                isSubmenuOpen ? 'rotate-180' : ''
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
      
      {hasSubmenu && isSubmenuOpen && (
        <div className="bg-gray-50 border-t border-gray-100">
          {children}
        </div>
      )}
    </div>
  );
};