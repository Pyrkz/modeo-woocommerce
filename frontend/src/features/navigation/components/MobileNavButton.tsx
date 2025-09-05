'use client';

import { memo } from 'react';

interface MobileNavButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const MobileNavButton = memo(({ isOpen, onClick }: MobileNavButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="md:hidden relative bg-white hover:bg-gray-50 text-gray-700 hover:text-primary p-3 rounded-lg transition-all duration-200 inline-flex items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
      aria-label={isOpen ? 'Zamknij menu' : 'Otwórz menu'}
      aria-expanded={isOpen}
    >
      <div className="w-5 h-5 relative flex items-center justify-center">
        <div className="w-5 h-3 relative">
          <span
            className={`absolute h-0.5 w-5 bg-current transform transition-all duration-300 ease-in-out top-0 ${
              isOpen ? 'rotate-45 translate-y-1' : ''
            }`}
          />
          <span
            className={`absolute h-0.5 w-5 bg-current transform transition-all duration-300 ease-in-out top-1 ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`absolute h-0.5 w-5 bg-current transform transition-all duration-300 ease-in-out top-2 ${
              isOpen ? '-rotate-45 -translate-y-1' : ''
            }`}
          />
        </div>
      </div>
    </button>
  );
});

MobileNavButton.displayName = 'MobileNavButton';