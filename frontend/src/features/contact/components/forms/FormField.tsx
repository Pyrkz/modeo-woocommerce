'use client';

import { memo } from 'react';

interface FormFieldProps {
  children: React.ReactNode;
  className?: string;
}

export const FormField = memo(({ children, className = '' }: FormFieldProps) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {children}
    </div>
  );
});

FormField.displayName = 'FormField';