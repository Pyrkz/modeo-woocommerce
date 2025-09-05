'use client';

import { useState, useCallback, useMemo } from 'react';
import { ContactFormData, ContactFormErrors } from '../types';
import { validateContactForm, hasFormErrors } from '../utils/validation';

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  company: '',
  consent: false,
};

interface UseOptimizedFormOptions {
  onSubmit?: (data: ContactFormData) => Promise<void>;
  resetOnSuccess?: boolean;
  validateOnChange?: boolean;
}

export function useOptimizedForm({
  onSubmit,
  resetOnSuccess = true,
  validateOnChange = true
}: UseOptimizedFormOptions = {}) {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Memoized validation to prevent unnecessary re-calculations
  const validationErrors = useMemo(() => {
    if (!validateOnChange) return {};
    return validateContactForm(formData);
  }, [formData, validateOnChange]);

  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear specific field error when user starts typing
    if (errors[name as keyof ContactFormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }

    // Reset status when user starts typing after success/error
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
    }
  }, [errors, submitStatus]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');
    
    // Validate form
    const newErrors = validateContactForm(formData);
    setErrors(newErrors);

    if (hasFormErrors(newErrors)) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Default behavior - simulate submission
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Contact form submitted:', formData);
      }
      
      setSubmitStatus('success');
      
      if (resetOnSuccess) {
        setFormData(initialFormData);
        setErrors({});
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, onSubmit, resetOnSuccess]);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setErrors({});
    setSubmitStatus('idle');
    setIsSubmitting(false);
  }, []);

  const setFieldValue = useCallback((name: keyof ContactFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const setFieldError = useCallback((name: keyof ContactFormErrors, error: string | undefined) => {
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  }, []);

  // Memoized form state to prevent unnecessary re-renders
  const formState = useMemo(() => ({
    formData,
    errors: validateOnChange ? validationErrors : errors,
    isSubmitting,
    submitStatus,
    isValid: !hasFormErrors(validateOnChange ? validationErrors : errors),
    isDirty: JSON.stringify(formData) !== JSON.stringify(initialFormData)
  }), [formData, errors, validationErrors, isSubmitting, submitStatus, validateOnChange]);

  return {
    // Form state
    ...formState,
    
    // Form actions
    handleInputChange,
    handleSubmit,
    resetForm,
    setFieldValue,
    setFieldError,
    
    // Status setters
    setSubmitStatus: useCallback((status: 'idle' | 'success' | 'error') => {
      setSubmitStatus(status);
    }, []),
  };
}