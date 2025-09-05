'use client';

import { forwardRef } from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, required = false, className = '', ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-0 py-4 bg-transparent border-0 border-b-2 border-gray-200 
            transition-all duration-300 text-gray-900 placeholder-gray-500 text-lg
            focus:outline-none focus:border-gray-600 focus:ring-0
            hover:border-gray-300
            ${error ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-gray-600'}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <span>⚠️</span>
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';