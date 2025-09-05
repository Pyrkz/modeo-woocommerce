'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

export const useMegaMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const openMenu = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    // On mobile, close immediately on tap outside
    // On desktop, add delay to allow moving to mega menu
    const delay = isMobile ? 0 : 300;
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, delay);
  }, [isMobile]);

  const closeMenuImmediately = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    if (isOpen) {
      closeMenuImmediately();
    } else {
      openMenu();
    }
  }, [isOpen, openMenu, closeMenuImmediately]);

  return {
    isOpen,
    isMobile,
    menuRef,
    openMenu,
    closeMenu,
    closeMenuImmediately,
    toggleMenu
  };
};