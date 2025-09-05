'use client';

import { memo } from 'react';

interface FormLabelProps {
  htmlFor?: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}

export const FormLabel = memo(({ 
  htmlFor, 
  children, 
  required = false, 
  className = '' 
}: FormLabelProps) => {
  return (
    <label 
      htmlFor={htmlFor} 
      className={`
        block text-sm font-semibold text-gray-800 mb-2
        ${className}
      `}
    >
      {children}
      {required && (
        <span className="text-red-600 ml-1 font-normal">*</span>
      )}
    </label>
  );
});

FormLabel.displayName = 'FormLabel';