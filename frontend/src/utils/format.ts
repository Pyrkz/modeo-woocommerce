// Price formatting utilities
export const formatPrice = (price: string | number, currencySymbol: string = 'zł'): string => {
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  if (isNaN(numericPrice)) {
    return `0,00 ${currencySymbol}`;
  }

  // WooCommerce Store API returns prices in cents/grosze
  const priceInZloty = numericPrice / 100;

  // Format with Polish locale (comma as decimal separator)
  return new Intl.NumberFormat('pl-PL', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(priceInZloty) + ` ${currencySymbol}`;
};

export const formatPriceOnly = (price: string | number): string => {
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  if (isNaN(numericPrice)) {
    return '0,00';
  }

  // WooCommerce Store API returns prices in cents/grosze
  const priceInZloty = numericPrice / 100;

  // Format with Polish locale (comma as decimal separator)
  return new Intl.NumberFormat('pl-PL', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(priceInZloty);
};

// Text utilities
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
    .replace(/-+/g, '-')       // Replace multiple hyphens with single hyphen
    .trim();
};

// Number utilities
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('pl-PL').format(num);
};

// Date utilities
export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
};

export const formatDateTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('pl-PL', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj);
};

// URL utilities
export const getImageUrl = (url: string, fallback?: string): string => {
  if (!url) return fallback || '/images/placeholder.jpg';
  return url;
};

export const buildUrl = (base: string, params: Record<string, string | number>): string => {
  const url = new URL(base);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });
  return url.toString();
};

// Validation utilities
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[+]?[\d\s-()]{9,}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Polish-specific utilities
export const formatPolishPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 9) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
  }
  return phone;
};

export const formatPolishPostalCode = (code: string): string => {
  const cleaned = code.replace(/\D/g, '');
  if (cleaned.length === 5) {
    return cleaned.replace(/(\d{2})(\d{3})/, '$1-$2');
  }
  return code;
};