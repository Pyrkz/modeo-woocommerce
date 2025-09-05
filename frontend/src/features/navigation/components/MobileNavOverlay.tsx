'use client';

import { useEffect } from 'react';

interface MobileNavOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNavOverlay = ({ isOpen, onClose }: MobileNavOverlayProps) => {
  useEffect(() => {
    if (isOpen) {
      const handleTouchMove = (e: TouchEvent) => {
        e.preventDefault();
      };
      
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      return () => document.removeEventListener('touchmove', handleTouchMove);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 mobile-nav-backdrop z-40 md:hidden"
      onClick={onClose}
      aria-hidden="true"
    />
  );
};