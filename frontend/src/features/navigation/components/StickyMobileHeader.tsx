'use client';

import { useEffect, useState, memo } from 'react';
import Link from 'next/link';
import { CartIcon } from '../../cart/components/CartIcon';
import { MobileNavButton } from './MobileNavButton';
import { useCart } from '@/hooks/useCart';
import { useCartContext } from '../../cart/context/CartProvider';

interface StickyMobileHeaderProps {
  isNavOpen: boolean;
  onNavToggle: () => void;
}

export const StickyMobileHeader = memo(({ isNavOpen, onNavToggle }: StickyMobileHeaderProps) => {
  const [isSticky, setIsSticky] = useState(false);
  const { itemCount } = useCart();
  const { openCart } = useCartContext();

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          setIsSticky(scrollTop > 64);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`md:hidden fixed top-0 left-0 right-0 z-30 transition-all duration-300 sticky-mobile-header ${
        isSticky
          ? 'bg-white/95 mobile-nav-backdrop shadow-lg border-b border-gray-200'
          : 'bg-transparent'
      }`}
      style={{ 
        transform: isSticky ? 'translateY(0)' : 'translateY(-100%)',
        visibility: isSticky ? 'visible' : 'hidden'
      }}
    >
      <div className="flex items-center justify-between px-4 h-14">
        {/* Mobile Nav Button */}
        <MobileNavButton isOpen={isNavOpen} onClick={onNavToggle} />

        {/* Brand */}
        <Link href="/" className="flex-1 text-center">
          <h1 className="text-xl font-bold text-primary">modeo.</h1>
        </Link>

        {/* Cart */}
        <CartIcon 
          itemCount={itemCount}
          onClick={openCart}
          className="p-2"
        />
      </div>
    </div>
  );
});

StickyMobileHeader.displayName = 'StickyMobileHeader';