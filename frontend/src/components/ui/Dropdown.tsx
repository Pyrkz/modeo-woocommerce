'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'left' | 'right';
  className?: string;
}

interface DropdownItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  danger?: boolean;
}

export function Dropdown({ trigger, children, align = 'right', className }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer"
      >
        {trigger}
      </div>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div
            className={cn(
              'absolute z-20 mt-2 w-48 rounded-lg bg-white shadow-lg ring-1 ring-gray-200',
              'animate-in fade-in-0 zoom-in-95 duration-200',
              align === 'right' ? 'right-0' : 'left-0',
              className
            )}
          >
            <div className="py-1">
              {children}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function DropdownItem({ children, onClick, href, className, danger }: DropdownItemProps) {
  const baseClasses = cn(
    'block px-4 py-2 text-sm transition-colors duration-200',
    'hover:bg-gray-50 focus:bg-gray-50 focus:outline-none',
    danger ? 'text-red-700 hover:bg-red-50 hover:text-red-800' : 'text-gray-700',
    className
  );

  if (href) {
    return (
      <a
        href={href}
        className={baseClasses}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={cn(baseClasses, 'w-full text-left')}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function DropdownSeparator() {
  return <div className="my-1 h-px bg-gray-200" />;
}