'use client';

import { useCallback, useRef, useEffect, useState } from 'react';

interface RecaptchaConfig {
  siteKey: string;
  action: string;
  threshold?: number;
}

interface RecaptchaResult {
  token: string;
  score?: number;
}

interface RecaptchaError {
  type: 'network' | 'invalid_key' | 'low_score' | 'timeout';
  message: string;
}

interface UseOptimizedRecaptchaResult {
  executeRecaptcha: () => Promise<RecaptchaResult>;
  isLoading: boolean;
  error: RecaptchaError | null;
  isReady: boolean;
  clearError: () => void;
}

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const RECAPTCHA_SCRIPT_ID = 'recaptcha-v3-script';
const SCRIPT_LOAD_TIMEOUT = 8000;
const EXECUTION_TIMEOUT = 4000;

// Global script loading state
let scriptLoading = false;
let scriptLoaded = false;

/**
 * Optimized reCAPTCHA hook with performance optimizations
 */
export function useOptimizedRecaptcha({ 
  siteKey, 
  action
}: RecaptchaConfig): UseOptimizedRecaptchaResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<RecaptchaError | null>(null);
  const [isReady, setIsReady] = useState(false);
  
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const mountedRef = useRef(true);

  const clearRecaptchaTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
  }, []);

  // Load reCAPTCHA script (only once globally)
  useEffect(() => {
    if (!siteKey) {
      setError({
        type: 'invalid_key',
        message: 'reCAPTCHA nie został skonfigurowany'
      });
      return;
    }

    // If already loaded
    if (scriptLoaded && window.grecaptcha) {
      window.grecaptcha.ready(() => {
        if (mountedRef.current) {
          setIsReady(true);
        }
      });
      return;
    }

    // If currently loading
    if (scriptLoading) {
      const checkInterval = setInterval(() => {
        if (scriptLoaded && window.grecaptcha) {
          clearInterval(checkInterval);
          window.grecaptcha.ready(() => {
            if (mountedRef.current) {
              setIsReady(true);
            }
          });
        }
      }, 100);
      
      return () => clearInterval(checkInterval);
    }

    // Load script
    const existingScript = document.getElementById(RECAPTCHA_SCRIPT_ID);
    if (existingScript || window.grecaptcha) {
      if (window.grecaptcha) {
        scriptLoaded = true;
        window.grecaptcha.ready(() => {
          if (mountedRef.current) {
            setIsReady(true);
          }
        });
      }
      return;
    }

    scriptLoading = true;

    const script = document.createElement('script');
    script.id = RECAPTCHA_SCRIPT_ID;
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;

    // Timeout for script loading
    timeoutRef.current = setTimeout(() => {
      if (mountedRef.current) {
        setError({
          type: 'timeout',
          message: 'Timeout podczas ładowania weryfikacji'
        });
        scriptLoading = false;
      }
    }, SCRIPT_LOAD_TIMEOUT);

    script.onload = () => {
      clearRecaptchaTimeout();
      scriptLoading = false;
      scriptLoaded = true;
      
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          if (mountedRef.current) {
            setIsReady(true);
          }
        });
      }
    };

    script.onerror = () => {
      clearRecaptchaTimeout();
      scriptLoading = false;
      
      if (mountedRef.current) {
        setError({
          type: 'network',
          message: 'Błąd podczas ładowania weryfikacji'
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      clearRecaptchaTimeout();
    };
  }, [siteKey, clearRecaptchaTimeout]);

  const executeRecaptcha = useCallback(async (): Promise<RecaptchaResult> => {
    setError(null);
    
    if (!siteKey) {
      throw new Error('reCAPTCHA nie został skonfigurowany');
    }

    if (!isReady || !window.grecaptcha) {
      throw new Error('reCAPTCHA nie jest jeszcze gotowe');
    }

    setIsLoading(true);

    try {
      // Execute with timeout
      const executePromise = window.grecaptcha.execute(siteKey, { action });
      
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(new Error('Timeout podczas weryfikacji'));
        }, EXECUTION_TIMEOUT);
      });

      const token = await Promise.race([executePromise, timeoutPromise]);
      
      const result: RecaptchaResult = { token };
      return result;

    } catch (err) {
      const error: RecaptchaError = {
        type: 'network',
        message: err instanceof Error ? err.message : 'Błąd weryfikacji'
      };
      
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [siteKey, action, isReady]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
      clearRecaptchaTimeout();
    };
  }, [clearRecaptchaTimeout]);

  return {
    executeRecaptcha,
    isLoading,
    error,
    isReady,
    clearError
  };
}