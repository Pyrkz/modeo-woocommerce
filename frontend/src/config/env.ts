import { Environment } from '@/types/common';
import { config } from '@/lib/config';

const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

export const env: Environment = {
  isDevelopment,
  isProduction,
  
  // API URLs - use config.getApiUrl() for dynamic domain detection
  apiBaseUrl: config.getApiUrl(),
    
  frontendUrl: isDevelopment 
    ? 'http://localhost:3000' 
    : (typeof window !== 'undefined' ? window.location.origin : 'https://nextmodeo.sitefy.pl'),
    
  // WordPress direct URL (for login/logout redirects) - use dynamic domain
  wordPressUrl: config.getApiUrl(),
};

// Dynamic endpoints using config.getApiUrl() for proper domain detection
export const API_ENDPOINTS = {
  // WordPress API
  get WP_API() { return `${config.getApiUrl()}/wp-json/wp/v2`; },
  get WC_API() { return `${config.getApiUrl()}/wp-json/wc/store`; },
  
  // Auth endpoints
  get USER_ME() { return `${config.getApiUrl()}/wp-json/wp/v2/users/me`; },
  get AUTH_CHECK() { return `${config.getApiUrl()}/wp-json/nextjs/v1/auth/check`; },
  get AUTH_STATUS() { return `${config.getApiUrl()}/wp-json/nextjs/v1/auth/status`; },
  get AUTH_ME() { return `${config.getApiUrl()}/wp-json/nextjs/v1/auth/me`; },
  get AUTH_LOGIN() { return `${config.getApiUrl()}/wp-json/nextjs/v1/auth/login`; },
  
  // Login/Logout/Register use WooCommerce My Account for modern UI
  get LOGIN() { return `${config.getApiUrl()}/moje-konto`; },
  get LOGOUT() { return `${config.getApiUrl()}/moje-konto/?customer-logout=true`; },
  get REGISTER() { return `${config.getApiUrl()}/moje-konto#register`; },
  
  // WooCommerce endpoints
  get PRODUCTS() { return `${config.getApiUrl()}/wp-json/wc/store/products`; },
  get CART() { return `${config.getApiUrl()}/wp-json/wc/store/cart`; },
  get CART_ADD() { return `${config.getApiUrl()}/wp-json/wc/store/cart/add-item`; },
  get CART_REMOVE() { return `${config.getApiUrl()}/wp-json/wc/store/cart/remove-item`; },
  get CHECKOUT() { return `${config.getApiUrl()}/zamowienie/`; },
};