'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { formatUserDisplayName, getUserInitials, getUserFriendlyName } from '../../../lib/utils';
import { ROUTES } from '../../header';

interface UserMenuProps {
  className?: string;
  showAvatar?: boolean;
  size?: 'sm' | 'md' | 'lg';
  isMobile?: boolean;
}

export function UserMenu({ 
  className = '',
  showAvatar = true,
  size = 'md',
  isMobile = false
}: UserMenuProps) {
  const { user, isLoggedIn, login, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!isLoggedIn || !user) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <button
          onClick={() => login()}
          className="text-gray-700 hover:text-primary transition-colors font-medium"
        >
          Zaloguj się
        </button>
      </div>
    );
  }

  const displayName = formatUserDisplayName(user);
  const friendlyName = getUserFriendlyName(user);
  const userInitials = getUserInitials(user);
  
  const avatarSizes = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base'
  };

  return (
    <div className={`relative ${className}`}>
      {/* Clickable User Button */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className={`flex items-center gap-2 text-gray-700 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg px-2 py-1 ${isMobile ? 'w-full justify-start' : ''}`}
      >
        {showAvatar && (
          <>
            {user.avatar ? (
              <Image 
                src={user.avatar} 
                alt={displayName}
                width={40}
                height={40}
                className={`rounded-full object-cover ${avatarSizes[size]}`}
              />
            ) : (
              <div className={`rounded-full bg-primary text-white flex items-center justify-center font-semibold ${avatarSizes[size]}`}>
                {userInitials}
              </div>
            )}
          </>
        )}
        <span className="font-medium">{friendlyName}</span>
        <svg 
          className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div 
          ref={dropdownRef}
          className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-48"
        >
          <div className="p-3 border-b border-gray-100">
            <p className="font-medium text-gray-900">{displayName}</p>
            {user.email && (
              <p className="text-sm text-gray-600">{user.email}</p>
            )}
          </div>
          
          <div className="py-2">
            <a
              href={ROUTES.WP_LOGIN}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setShowDropdown(false)}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Moje konto
            </a>
            
            <a
              href={`${ROUTES.WP_LOGIN}#orders`}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setShowDropdown(false)}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Moje zamówienia
            </a>
            
            <a
              href={`${ROUTES.WP_LOGIN}#edit-address`}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setShowDropdown(false)}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Adresy
            </a>
          </div>
          
          <div className="border-t border-gray-100 py-2">
            <button
              onClick={() => {
                logout();
                setShowDropdown(false);
              }}
              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Wyloguj się
            </button>
          </div>
        </div>
      )}
    </div>
  );
}