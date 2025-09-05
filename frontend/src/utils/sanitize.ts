/**
 * Simple HTML sanitization utility
 * Removes all HTML tags and dangerous characters to prevent XSS
 */

/**
 * Strip all HTML tags from a string and decode HTML entities
 */
export function stripHtml(html: string): string {
  if (typeof html !== 'string') {
    return '';
  }

  return html
    // Remove all HTML tags
    .replace(/<[^>]*>/g, '')
    // Decode common HTML entities
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    // Remove any remaining HTML entities
    .replace(/&[a-zA-Z0-9#]+;/g, '')
    .trim();
}

/**
 * Sanitize text for safe display - removes HTML and limits length
 */
export function sanitizeText(text: string, maxLength?: number): string {
  if (typeof text !== 'string') {
    return '';
  }

  let cleaned = stripHtml(text);
  
  if (maxLength && cleaned.length > maxLength) {
    cleaned = cleaned.substring(0, maxLength) + '...';
  }
  
  return cleaned;
}

/**
 * Sanitize user input for reviews
 */
export function sanitizeReview(content: string): string {
  return sanitizeText(content, 2000); // Limit reviews to 2000 chars
}

/**
 * Sanitize user name
 */
export function sanitizeName(name: string): string {
  return sanitizeText(name, 50); // Limit names to 50 chars
}

/**
 * Check if text contains potentially dangerous content
 */
export function containsDangerousContent(text: string): boolean {
  if (typeof text !== 'string') {
    return false;
  }

  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+=/i, // onclick, onload, etc.
    /<iframe/i,
    /<object/i,
    /<embed/i,
    /<form/i,
    /data:/i,
    /vbscript:/i
  ];

  return dangerousPatterns.some(pattern => pattern.test(text));
}