// Environment configuration for dual-domain setup
export const config = {
  // Environment detection
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT || 'development',
  
  // API URLs based on environment
  api: {
    // Production API URL (modeo.pl)
    production: 'https://modeo.pl',
    
    // Staging API URL (nextmodeo.sitefy.pl) 
    staging: 'https://nextmodeo.sitefy.pl',
    
    // Development API URL (local)
    development: 'http://localhost:8080'
  },

  // Get current API base URL
  getApiUrl(): string {
    // Check if we're in browser and get domain from window location
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      
      if (hostname === 'modeo.pl' || hostname === 'www.modeo.pl') {
        return this.api.production;
      } else if (hostname === 'nextmodeo.sitefy.pl') {
        return this.api.staging;
      }
    }
    
    // Server-side: use environment variables
    const publicApiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (publicApiUrl) {
      return publicApiUrl;
    }
    
    // Fallback based on NODE_ENV and environment
    if (process.env.NODE_ENV === 'production') {
      if (this.environment === 'staging') {
        return this.api.staging;
      }
      return this.api.production;
    }
    
    return this.api.development;
  },

  // Domain information
  domains: {
    production: 'modeo.pl',
    staging: 'nextmodeo.sitefy.pl',
    development: 'localhost:3000'
  },

  // Get current domain
  getCurrentDomain(): string {
    if (typeof window !== 'undefined') {
      return window.location.hostname;
    }
    
    // Server-side fallback
    if (this.environment === 'staging') {
      return this.domains.staging;
    } else if (this.environment === 'production') {
      return this.domains.production;
    }
    
    return this.domains.development;
  },

  // Check if current environment is production
  isProduction(): boolean {
    return this.getCurrentDomain() === this.domains.production;
  },

  // Check if current environment is staging
  isStaging(): boolean {
    return this.getCurrentDomain() === this.domains.staging;
  },

  // Check if current environment is development
  isDevelopment(): boolean {
    return this.getCurrentDomain() === this.domains.development || 
           this.getCurrentDomain().includes('localhost');
  },

  // WordPress checkout URL
  getCheckoutUrl(): string {
    return `${this.getApiUrl()}/zamowienie/`;
  },

  // WordPress cart page URL (for fallback)
  getCartUrl(): string {
    return `${this.getApiUrl()}/koszyk/`;
  },

  // WordPress account URL
  getAccountUrl(): string {
    return `${this.getApiUrl()}/moje-konto/`;
  },

  // WordPress admin URL
  getAdminUrl(): string {
    return `${this.getApiUrl()}/wp-admin/`;
  },

  // reCAPTCHA configuration
  recaptcha: {
    siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6Lcu5borAAAAAAfzwT6yPkKdYAWrh77Il_Th8MIy',
    secretKey: process.env.RECAPTCHA_SECRET_KEY || '6Lcu5borAAAAAHpybNiMCarp1LMOQwmJ6yLmg-ID', // Server-side only
    threshold: 0.5, // Minimum score (0.0 - 1.0)
    actions: {
      review: 'submit_review',
      reply: 'submit_reply',
      contact: 'submit_contact'
    }
  },

  // Get reCAPTCHA site key
  getRecaptchaSiteKey(): string {
    return this.recaptcha.siteKey;
  },

  // Check if reCAPTCHA is configured
  isRecaptchaEnabled(): boolean {
    return Boolean(this.recaptcha.siteKey);
  },

  // Debug information
  getDebugInfo() {
    return {
      environment: this.environment,
      currentDomain: this.getCurrentDomain(),
      apiUrl: this.getApiUrl(),
      isProduction: this.isProduction(),
      isStaging: this.isStaging(),
      isDevelopment: this.isDevelopment(),
      nodeEnv: process.env.NODE_ENV,
      publicApiUrl: process.env.NEXT_PUBLIC_API_URL,
      publicEnv: process.env.NEXT_PUBLIC_ENVIRONMENT
    };
  }
};

// Export for use in other files
export default config;