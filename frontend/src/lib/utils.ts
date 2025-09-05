import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Tailwind CSS class merger
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format user display name
export function formatUserDisplayName(user: {
  firstName?: string;
  lastName?: string;
  name?: string;
  displayName?: string;
}): string {
  if (user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`;
  }
  
  if (user.displayName) {
    return user.displayName;
  }
  
  if (user.name) {
    return user.name;
  }
  
  return 'Użytkownik';
}

// Get user friendly name (for greetings)
export function getUserFriendlyName(user: {
  firstName?: string;
  lastName?: string;
  name?: string;
  displayName?: string;
  email?: string;
}): string {
  // First try first name only
  if (user.firstName) {
    return user.firstName;
  }
  
  // Then try full name
  if (user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`;
  }
  
  // Then display name
  if (user.displayName && user.displayName !== user.name) {
    return user.displayName;
  }
  
  // Then just name
  if (user.name) {
    return user.name;
  }
  
  // Fallback to email (just the part before @)
  if (user.email) {
    return user.email.split('@')[0];
  }
  
  return 'Użytkownik';
}

// Get user initials for avatar
export function getUserInitials(user: {
  firstName?: string;
  lastName?: string;
  name?: string;
}): string {
  if (user.firstName && user.lastName) {
    return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
  }
  
  if (user.name) {
    const parts = user.name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return user.name[0].toUpperCase();
  }
  
  return 'U';
}

// URL utilities
export function buildRedirectUrl(returnPath?: string): string {
  if (!returnPath) return window.location.href;
  
  const origin = window.location.origin;
  const cleanPath = returnPath.startsWith('/') ? returnPath : `/${returnPath}`;
  
  return `${origin}${cleanPath}`;
}

// Local storage with error handling
export const storage = {
  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch {
      return defaultValue || null;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error);
    }
  },
};

// Debounce function
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Format price
export function formatPrice(
  price: number | string,
  currency = 'PLN'
): string {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(numPrice);
}