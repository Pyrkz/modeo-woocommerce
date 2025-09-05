'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export const useMobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const openNav = useCallback(() => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
  }, []);

  const closeNav = useCallback(() => {
    setIsOpen(false);
    setActiveSubmenu(null);
    document.body.style.overflow = 'unset';
    document.body.style.position = 'unset';
    document.body.style.width = 'unset';
  }, []);

  const toggleNav = useCallback(() => {
    if (isOpen) {
      closeNav();
    } else {
      openNav();
    }
  }, [isOpen, openNav, closeNav]);

  const toggleSubmenu = useCallback((menuId: string) => {
    setActiveSubmenu(prev => prev === menuId ? null : menuId);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeNav();
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        closeNav();
      }
    };

    // Capture the current timeout value
    const currentScrollTimeout = scrollTimeoutRef.current;

    document.addEventListener('keydown', handleEscape);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
      if (currentScrollTimeout) {
        clearTimeout(currentScrollTimeout);
      }
    };
  }, [isOpen, closeNav]);

  return {
    isOpen,
    activeSubmenu,
    openNav,
    closeNav,
    toggleNav,
    toggleSubmenu,
  };
};