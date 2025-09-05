import { NavigationItem } from '../types';
import { config } from '@/lib/config';

// Polish Route Constants
export const ROUTES = {
  // Main pages
  HOME: '/',
  PRODUCTS: '/produkty',
  SHOP: '/sklep', 
  CART: '/koszyk',
  CONTACT: '/kontakt',
  BLOG: '/blog',
  ABOUT: '/o-nas',
  BUSINESS: '/dla-firm',
  
  // Auth pages (redirect to WordPress)
  LOGIN: '/logowanie',
  REGISTER: '/rejestracja', 
  ACCOUNT: '/moje-konto',
  
  // User pages
  ORDERS: '/zamowienia',
  PROFILE: '/profil',
  
  // WordPress pages (external) - use dynamic URLs based on environment
  get WP_LOGIN() { return `${config.getApiUrl()}/moje-konto/`; },
  get WP_CHECKOUT() { return `${config.getApiUrl()}/zamowienie/`; },
  get WP_SHOP() { return `${config.getApiUrl()}/sklep/`; },
  
  // Testing/dev
  TEST_WP: '/test-wp',
} as const;

// Navigation items for header
export const NAVIGATION_ITEMS = [
  {
    label: 'Sklep',
    href: ROUTES.SHOP,
    icon: 'shopping-bag',
  },
  {
    label: 'O nas',
    href: ROUTES.ABOUT,
    icon: 'information-circle',
  },
  {
    label: 'Blog',
    href: ROUTES.BLOG,
    icon: 'document-text',
  },
  {
    label: 'Kontakt',
    href: ROUTES.CONTACT,
    icon: 'phone',
  },
] as const;

// Create navigation items with active state
export function createNavigationItems(pathname: string): NavigationItem[] {
  return NAVIGATION_ITEMS.map(item => ({
    ...item,
    active: pathname === item.href || 
           (item.href === ROUTES.SHOP && pathname?.startsWith('/sklep/')) ||
           (item.href === ROUTES.BLOG && pathname?.startsWith('/blog/')) ||
           (item.href === ROUTES.CONTACT && pathname?.startsWith('/kontakt')) ||
           (item.href === ROUTES.ABOUT && pathname?.startsWith('/o-nas'))
  }));
}

// User menu items
export const USER_MENU_ITEMS = [
  {
    label: 'Moje zamówienia',
    href: ROUTES.ORDERS, // /zamowienia
    icon: 'document-text',
  },
  {
    label: 'Ustawienia konta',
    href: ROUTES.WP_LOGIN, // Redirect to WordPress account page
    icon: 'cog-6-tooth',
  },
] as const;

// Mobile menu items (combines navigation + auth)
export const MOBILE_MENU_ITEMS = [
  ...NAVIGATION_ITEMS,
] as const;