'use client';

import { useCallback, useRef, useEffect, useState } from 'react';

interface RecaptchaConfig {
  siteKey: string;
  action: string;
  threshold?: number; // Minimum score (0.0 - 1.0), default 0.5
}

interface RecaptchaResult {
  token: string;
  score?: number;
}

interface RecaptchaError {
  type: 'network' | 'invalid_key' | 'low_score' | 'timeout';
  message: string;
}

interface UseRecaptchaReturn {
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
const SCRIPT_LOAD_TIMEOUT = 10000; // 10 seconds
const EXECUTION_TIMEOUT = 5000; // 5 seconds

export function useRecaptcha({ 
  siteKey, 
  action 
}: RecaptchaConfig): UseRecaptchaReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<RecaptchaError | null>(null);
  const [isReady, setIsReady] = useState(false);
  const scriptLoadedRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Clear any existing timeout
  const clearRecaptchaTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
  }, []);

  // Load reCAPTCHA script
  useEffect(() => {
    if (!siteKey) {
      setError({
        type: 'invalid_key',
        message: 'reCAPTCHA site key nie został skonfigurowany'
      });
      return;
    }

    // Check if script already exists
    const existingScript = document.getElementById(RECAPTCHA_SCRIPT_ID);
    if (existingScript || window.grecaptcha) {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          setIsReady(true);
          scriptLoadedRef.current = true;
        });
      }
      return;
    }

    // Load script with timeout
    const script = document.createElement('script');
    script.id = RECAPTCHA_SCRIPT_ID;
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;

    // Set loading timeout
    timeoutRef.current = setTimeout(() => {
      setError({
        type: 'timeout',
        message: 'Timeout podczas ładowania reCAPTCHA'
      });
      setIsLoading(false);
    }, SCRIPT_LOAD_TIMEOUT);

    script.onload = () => {
      clearRecaptchaTimeout();
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          setIsReady(true);
          scriptLoadedRef.current = true;
        });
      }
    };

    script.onerror = () => {
      clearRecaptchaTimeout();
      setError({
        type: 'network',
        message: 'Błąd podczas ładowania reCAPTCHA'
      });
      setIsLoading(false);
    };

    document.head.appendChild(script);

    return () => {
      clearRecaptchaTimeout();
      // Don't remove script on unmount - keep it for other components
    };
  }, [siteKey, clearRecaptchaTimeout]);

  const executeRecaptcha = useCallback(async (): Promise<RecaptchaResult> => {
    setError(null);
    
    if (!siteKey) {
      throw new Error('reCAPTCHA site key nie został skonfigurowany');
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
          reject(new Error('Timeout podczas wykonywania reCAPTCHA'));
        }, EXECUTION_TIMEOUT);
      });

      const token = await Promise.race([executePromise, timeoutPromise]);
      

      const result: RecaptchaResult = { token };
      
      setIsLoading(false);
      return result;

    } catch (err) {
      const error: RecaptchaError = {
        type: 'network',
        message: err instanceof Error ? err.message : 'Nieznany błąd reCAPTCHA'
      };
      
      setError(error);
      setIsLoading(false);
      throw error;
    }
  }, [siteKey, action, isReady]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    executeRecaptcha,
    isLoading,
    error,
    isReady,
    clearError
  };
}