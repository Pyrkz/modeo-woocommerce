'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HeaderProps } from '../types';
import { createNavigationItems } from '../constants/routes';
import { UserMenu } from '../../auth/components/UserMenu';
import { useCart } from '@/hooks/useCart';
import { CartIcon } from '../../cart/components/CartIcon';
import { useCartContext } from '../../cart/context/CartProvider';
import { OptimizedMegaMenu, useMegaMenu, usePreloadCategories, SHOP_CATEGORIES, GiftDropdown, BrandingDropdown, BusinessDropdown, useMobileNav, MobileNavigation, StickyMobileHeader, MobileNavButton } from '../../navigation';

const Header = ({ className = '' }: HeaderProps) => {
  const pathname = usePathname();
  const navigationItems = createNavigationItems(pathname);
  const { isOpen, isMobile, openMenu, closeMenu, toggleMenu } = useMegaMenu();
  const { isOpen: isGiftOpen, isMobile: isGiftMobile, openMenu: openGiftMenu, closeMenu: closeGiftMenu, toggleMenu: toggleGiftMenu } = useMegaMenu();
  const { isOpen: isBrandingOpen, isMobile: isBrandingMobile, openMenu: openBrandingMenu, closeMenu: closeBrandingMenu, toggleMenu: toggleBrandingMenu } = useMegaMenu();
  const { isOpen: isBusinessOpen, isMobile: isBusinessMobile, openMenu: openBusinessMenu, closeMenu: closeBusinessMenu, toggleMenu: toggleBusinessMenu } = useMegaMenu();
  const { itemCount } = useCart();
  const { openCart } = useCartContext();
  const mobileNav = useMobileNav();
  usePreloadCategories();

  return (
    <header className={`bg-white shadow-sm border-b sticky top-0 z-40 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Button - Left */}
          <div className="md:hidden">
            <MobileNavButton
              isOpen={mobileNav.isOpen}
              onClick={mobileNav.toggleNav}
            />
          </div>

          {/* Brand - Center on mobile, left on desktop */}
          <div className="flex items-center justify-center flex-1 md:flex-initial md:justify-start">
            <Link href="/">
              <h1 className="text-2xl font-bold text-primary cursor-pointer hover:text-primary transition-colors">
                modeo.
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 flex-1 justify-center">
            {/* Sklep with Mega Menu */}
            <div 
              className="relative"
              onMouseEnter={isMobile ? undefined : openMenu} 
              onMouseLeave={isMobile ? undefined : closeMenu}
              onClick={isMobile ? toggleMenu : undefined}
            >
              <Link
                href="/sklep"
                className={`font-medium transition-colors flex items-center space-x-1 ${
                  pathname.startsWith('/sklep')
                    ? 'text-primary font-semibold'
                    : 'text-gray-800 hover:text-primary'
                }`}
                onClick={isMobile ? (e) => e.preventDefault() : undefined}
              >
                <span>Sklep</span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              
              {/* Mega Menu */}
              <OptimizedMegaMenu
                categories={SHOP_CATEGORIES}
                isOpen={isOpen}
                onClose={closeMenu}
                onOpen={openMenu}
              />
            </div>

            {/* Na prezent Mega Menu */}
            <div 
              className="relative"
              onMouseEnter={isGiftMobile ? undefined : openGiftMenu} 
              onMouseLeave={isGiftMobile ? undefined : closeGiftMenu}
              onClick={isGiftMobile ? toggleGiftMenu : undefined}
            >
              <Link
                href="/na-prezent"
                className={`font-medium transition-colors flex items-center space-x-1 ${
                  pathname.startsWith('/na-prezent')
                    ? 'text-primary font-semibold'
                    : 'text-gray-800 hover:text-primary'
                }`}
                onClick={isGiftMobile ? (e) => e.preventDefault() : undefined}
              >
                <span>Na prezent</span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${isGiftOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              
              <GiftDropdown isOpen={isGiftOpen} onClose={closeGiftMenu} />
            </div>

            {/* Znakowanie Mega Menu */}
            <div 
              className="relative"
              onMouseEnter={isBrandingMobile ? undefined : openBrandingMenu} 
              onMouseLeave={isBrandingMobile ? undefined : closeBrandingMenu}
              onClick={isBrandingMobile ? toggleBrandingMenu : undefined}
            >
              <Link
                href="/znakowanie"
                className={`font-medium transition-colors flex items-center space-x-1 ${
                  pathname.startsWith('/znakowanie')
                    ? 'text-primary font-semibold'
                    : 'text-gray-800 hover:text-primary'
                }`}
                onClick={isBrandingMobile ? (e) => e.preventDefault() : undefined}
              >
                <span>Znakowanie</span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${isBrandingOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              
              <BrandingDropdown isOpen={isBrandingOpen} onClose={closeBrandingMenu} />
            </div>

            {/* Dla firm Mega Menu */}
            <div 
              className="relative"
              onMouseEnter={isBusinessMobile ? undefined : openBusinessMenu} 
              onMouseLeave={isBusinessMobile ? undefined : closeBusinessMenu}
              onClick={isBusinessMobile ? toggleBusinessMenu : undefined}
            >
              <Link
                href="/dla-firm"
                className={`font-medium transition-colors flex items-center space-x-1 ${
                  pathname.startsWith('/dla-firm')
                    ? 'text-primary font-semibold'
                    : 'text-gray-800 hover:text-primary'
                }`}
                onClick={isBusinessMobile ? (e) => e.preventDefault() : undefined}
              >
                <span>Dla firm</span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${isBusinessOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              
              <BusinessDropdown isOpen={isBusinessOpen} onClose={closeBusinessMenu} />
            </div>

            {/* Other navigation items */}
            {navigationItems.filter(item => item.href !== '/sklep').map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-medium transition-colors ${
                  item.active
                    ? 'text-primary font-semibold'
                    : 'text-gray-800 hover:text-primary'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User Menu & Cart - Right */}
          <div className="flex items-center gap-4">
            {/* User Menu */}
            <div className="hidden md:block">
              <UserMenu size="md" />
            </div>
            
            {/* Cart Button */}
            <CartIcon 
              itemCount={itemCount}
              onClick={openCart}
            />
          </div>
        </div>
      </div>


      {/* Mobile Navigation */}
      <MobileNavigation
        isOpen={mobileNav.isOpen}
        activeSubmenu={mobileNav.activeSubmenu}
        onClose={mobileNav.closeNav}
        onSubmenuToggle={mobileNav.toggleSubmenu}
      />

      {/* Sticky Mobile Header */}
      <StickyMobileHeader
        isNavOpen={mobileNav.isOpen}
        onNavToggle={mobileNav.toggleNav}
      />
    </header>
  );
};

export default Header;