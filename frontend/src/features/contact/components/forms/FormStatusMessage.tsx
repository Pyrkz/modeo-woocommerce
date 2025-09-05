'use client';

import { memo } from 'react';

interface FormStatusMessageProps {
  status: 'idle' | 'success' | 'error';
  successMessage?: string;
  errorMessage?: string;
  className?: string;
}

const StatusIcon = memo(({ type }: { type: 'success' | 'error' }) => {
  if (type === 'success') {
    return (
      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path 
          fillRule="evenodd" 
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
          clipRule="evenodd" 
        />
      </svg>
    );
  }

  return (
    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path 
        fillRule="evenodd" 
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
        clipRule="evenodd" 
      />
    </svg>
  );
});

StatusIcon.displayName = 'StatusIcon';

export const FormStatusMessage = memo(({ 
  status,
  successMessage = "Dziękujemy za wiadomość! Skontaktujemy się z Tobą w najbliższym czasie.",
  errorMessage = "Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.",
  className = '' 
}: FormStatusMessageProps) => {
  if (status === 'idle') return null;

  const isSuccess = status === 'success';
  
  return (
    <div className={`
      mb-6 p-4 sm:p-5 rounded-xl border-2 animate-in fade-in slide-in-from-top-2 duration-300
      ${isSuccess 
        ? 'bg-green-50 border-green-200 text-green-800' 
        : 'bg-red-50 border-red-200 text-red-800'
      }
      ${className}
    `}>
      <div className="flex items-start gap-3">
        <StatusIcon type={isSuccess ? 'success' : 'error'} />
        <p className="text-sm sm:text-base font-medium leading-relaxed">
          {isSuccess ? successMessage : errorMessage}
        </p>
      </div>
    </div>
  );
});

FormStatusMessage.displayName = 'FormStatusMessage';