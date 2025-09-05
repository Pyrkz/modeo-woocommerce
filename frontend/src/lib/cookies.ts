// Cookie utilities for auth token management

/**
 * Get cookie value by name (client-side only)
 */
export function getCookie(name: string): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(';').shift();
    return cookieValue || null;
  }
  
  return null;
}

/**
 * Set cookie (client-side only)
 */
export function setCookie(name: string, value: string, days: number = 7): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

/**
 * Remove cookie (client-side only)  
 */
export function removeCookie(name: string): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

/**
 * Get auth token from cookie
 */
export function getAuthToken(): string | null {
  return getCookie('modeo_nextjs_auth');
}

/**
 * Check if user is logged in (simple cookie check)
 */
export function isLoggedInCookie(): boolean {
  return getCookie('modeo_logged_in') === '1';
}

/**
 * Clear all auth cookies
 */
export function clearAuthCookies(): void {
  removeCookie('modeo_nextjs_auth');
  removeCookie('modeo_logged_in');
}