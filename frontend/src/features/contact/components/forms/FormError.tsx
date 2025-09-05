'use client';

import { memo } from 'react';

interface FormErrorProps {
  error?: string;
  className?: string;
}

export const FormError = memo(({ error, className = '' }: FormErrorProps) => {
  if (!error) return null;

  return (
    <div className={`flex items-center gap-2 text-sm text-red-600 mt-2 ${className}`}>
      <svg 
        className="w-4 h-4 flex-shrink-0" 
        fill="currentColor" 
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path 
          fillRule="evenodd" 
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
          clipRule="evenodd" 
        />
      </svg>
      <span>{error}</span>
    </div>
  );
});

FormError.displayName = 'FormError';