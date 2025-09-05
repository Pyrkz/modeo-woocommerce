'use client';

import { usePathname } from 'next/navigation';
import { memo } from 'react';
import Link from 'next/link';
import { MobileNavOverlay } from './MobileNavOverlay';
import { MobileNavItem } from './MobileNavItem';
import { MobileNavSubmenu } from './MobileNavSubmenu';
import { SHOP_CATEGORIES } from '../constants/categories';
import { createNavigationItems } from '../../header/constants/routes';
import { UserMenu } from '../../auth/components/UserMenu';

interface MobileNavigationProps {
  isOpen: boolean;
  activeSubmenu: string | null;
  onClose: () => void;
  onSubmenuToggle: (menuId: string) => void;
}

export const MobileNavigation = memo(({
  isOpen,
  activeSubmenu,
  onClose,
  onSubmenuToggle,
}: MobileNavigationProps) => {
  const pathname = usePathname();
  const navigationItems = createNavigationItems(pathname);

  const handleItemClick = () => {
    onClose();
  };

  return (
    <>
      <MobileNavOverlay isOpen={isOpen} onClose={onClose} />
      
      <nav
        className={`fixed top-0 left-0 right-0 bottom-0 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden mobile-nav-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <Link href="/" onClick={handleItemClick}>
            <h1 className="text-xl font-bold text-primary">modeo.</h1>
          </Link>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-primary transition-colors"
            aria-label="Zamknij menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="h-full overflow-y-auto mobile-nav-scroll pt-0">
          {/* Shop with Categories */}
          <MobileNavItem
            href="/sklep"
            label="Sklep"
            isActive={pathname.startsWith('/sklep')}
            hasSubmenu
            isSubmenuOpen={activeSubmenu === 'sklep'}
            onSubmenuToggle={() => onSubmenuToggle('sklep')}
            onClick={handleItemClick}
          >
            <MobileNavSubmenu
              categories={SHOP_CATEGORIES}
              onItemClick={handleItemClick}
            />
          </MobileNavItem>

          {/* Na prezent */}
          <MobileNavItem
            href="/sklep/na-prezent"
            label="Na prezent"
            isActive={pathname.startsWith('/sklep/na-prezent')}
            hasSubmenu
            isSubmenuOpen={activeSubmenu === 'prezent'}
            onSubmenuToggle={() => onSubmenuToggle('prezent')}
            onClick={handleItemClick}
          >
            <div className="py-2">
              {/* Święta i okazje */}
              <div className="px-8 py-2">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Święta i okazje</h4>
              </div>
              <Link
                href="/sklep/na-prezent/boze-narodzenie"
                className="block px-8 py-2 text-sm text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                onClick={handleItemClick}
              >
                Boże Narodzenie
              </Link>
              <Link
                href="/sklep/na-prezent/walentynki"
                className="block px-8 py-2 text-sm text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                onClick={handleItemClick}
              >
                Walentynki
              </Link>
              <Link
                href="/sklep/na-prezent/dzien-kobiet"
                className="block px-8 py-2 text-sm text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                onClick={handleItemClick}
              >
                Dzień Kobiet
              </Link>

              {/* Dla rodziny */}
              <div className="px-8 py-2 pt-4">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Dla rodziny</h4>
              </div>
              <Link
                href="/sklep/na-prezent/dzien-mamy"
                className="block px-8 py-2 text-sm text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                onClick={handleItemClick}
              >
                Dzień mamy
              </Link>
              <Link
                href="/sklep/na-prezent/dzien-taty"
                className="block px-8 py-2 text-sm text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                onClick={handleItemClick}
              >
                Dzień taty
              </Link>
              <Link
                href="/sklep/na-prezent/dzien-dziecka"
                className="block px-8 py-2 text-sm text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                onClick={handleItemClick}
              >
                Dzień dziecka
              </Link>

              {/* Okazje osobiste */}
              <div className="px-8 py-2 pt-4">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Okazje osobiste</h4>
              </div>
              <Link
                href="/sklep/na-prezent/urodziny"
                className="block px-8 py-2 text-sm text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                onClick={handleItemClick}
              >
                Urodziny
              </Link>
              <Link
                href="/sklep/na-prezent/imieniny"
                className="block px-8 py-2 text-sm text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                onClick={handleItemClick}
              >
                Imieniny
              </Link>
            </div>
          </MobileNavItem>

          {/* Znakowanie */}
          <MobileNavItem
            href="/znakowanie"
            label="Znakowanie"
            isActive={pathname.startsWith('/znakowanie')}
            hasSubmenu
            isSubmenuOpen={activeSubmenu === 'znakowanie'}
            onSubmenuToggle={() => onSubmenuToggle('znakowanie')}
            onClick={handleItemClick}
          >
            <div className="py-2">
              {/* Techniki znakowania */}
              <div className="px-8 py-2">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Techniki znakowania</h4>
              </div>
              <Link
                href="/znakowanie/haft"
                className="block px-8 py-2 text-sm text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                onClick={handleItemClick}
              >
                Haft
              </Link>
              <Link
                href="/znakowanie/sitodruk"
                className="block px-8 py-2 text-sm text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                onClick={handleItemClick}
              >
                Sitodruk
              </Link>
              <Link
                href="/znakowanie/dtf"
                className="block px-8 py-2 text-sm text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                onClick={handleItemClick}
              >
                DTF
              </Link>
              <Link
                href="/znakowanie/flex"
                className="block px-8 py-2 text-sm text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                onClick={handleItemClick}
              >
                Flex
              </Link>

              {/* Rodzaje produktów */}
              <div className="px-8 py-2 pt-4">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Rodzaje produktów</h4>
              </div>
              <Link
                href="/znakowanie/koszulki"
                className="block px-8 py-2 text-sm text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                onClick={handleItemClick}
              >
                Koszulki
              </Link>
              <Link
                href="/znakowanie/kurtki"
                className="block px-8 py-2 text-sm text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                onClick={handleItemClick}
              >
                Kurtki
              </Link>
              <Link
                href="/znakowanie/plecaki-torby"
                className="block px-8 py-2 text-sm text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                onClick={handleItemClick}
              >
                Plecaki i torby
              </Link>

              {/* Dla branż */}
              <div className="px-8 py-2 pt-4">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Dla branż</h4>
              </div>
              <Link
                href="/znakowanie/dla-branz/firmy"
                className="block px-8 py-2 text-sm text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                onClick={handleItemClick}
              >
                Firmy
              </Link>
              <Link
                href="/znakowanie/dla-branz/szkoly"
                className="block px-8 py-2 text-sm text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                onClick={handleItemClick}
              >
                Szkoły
              </Link>
              <Link
                href="/znakowanie/dla-branz/kluby-sportowe"
                className="block px-8 py-2 text-sm text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                onClick={handleItemClick}
              >
                Kluby sportowe
              </Link>
            </div>
          </MobileNavItem>

          {/* Dla firm */}
          <MobileNavItem
            href="/dla-firm"
            label="Dla firm"
            isActive={pathname.startsWith('/dla-firm')}
            hasSubmenu
            isSubmenuOpen={activeSubmenu === 'firm'}
            onSubmenuToggle={() => onSubmenuToggle('firm')}
            onClick={handleItemClick}
          >
            <div className="py-2">
              <Link
                href="/dla-firm/wlasna-kolekcja"
                className="block px-8 py-3 text-sm text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                onClick={handleItemClick}
              >
                Własna kolekcja
              </Link>
              <Link
                href="/dla-firm/odziez-firmowa"
                className="block px-8 py-3 text-sm text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                onClick={handleItemClick}
              >
                Odzież firmowa
              </Link>
              <Link
                href="/dla-firm/dropshipping"
                className="block px-8 py-3 text-sm text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                onClick={handleItemClick}
              >
                Dropshipping
              </Link>
              <Link
                href="/dla-firm/b2b"
                className="block px-8 py-3 text-sm text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                onClick={handleItemClick}
              >
                Program B2B
              </Link>
            </div>
          </MobileNavItem>

          {/* Other navigation items */}
          {navigationItems.filter(item => item.href !== '/sklep').map((item) => (
            <MobileNavItem
              key={item.href}
              href={item.href}
              label={item.label}
              isActive={item.active}
              onClick={handleItemClick}
            />
          ))}

          {/* User Menu Section */}
          <div className="border-t border-gray-200 mt-4 pt-4">
            <div className="px-6 py-2">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Konto
              </h3>
            </div>
            <div className="px-6">
              <UserMenu isMobile />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
});

MobileNavigation.displayName = 'MobileNavigation';