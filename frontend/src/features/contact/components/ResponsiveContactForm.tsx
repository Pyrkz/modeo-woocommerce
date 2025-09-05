'use client';

import { useState, useCallback, memo } from 'react';
import { ContactFormData, ContactFormErrors, ContactFormProps } from '../types';
import { validateContactForm, hasFormErrors } from '../utils/validation';
import { 
  ResponsiveFormInput, 
  ResponsiveFormTextarea, 
  ResponsiveFormCheckbox, 
  SubmitButton 
} from './forms';
import { ContactFormHeader } from './forms/ContactFormHeader';
import { FormStatusMessage } from './forms/FormStatusMessage';
import { useRecaptcha } from '@/features/reviews/hooks/useRecaptcha';
import { config } from '@/lib/config';

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  company: '',
  consent: false,
};

export const ResponsiveContactForm = memo(({ 
  onSubmit, 
  isLoading = false, 
  className = '',
  pageSource = 'Nieznana strona'
}: ContactFormProps) => {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const { executeRecaptcha, isReady: isRecaptchaReady } = useRecaptcha({
    siteKey: config.recaptcha.siteKey,
    action: 'contact_form'
  });

  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof ContactFormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');
    
    // Validate form
    const newErrors = validateContactForm(formData);
    setErrors(newErrors);

    if (hasFormErrors(newErrors)) {
      return;
    }

    if (!isRecaptchaReady) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);

    try {
      // Execute reCAPTCHA
      const recaptchaResult = await executeRecaptcha();
      
      // Submit form with reCAPTCHA token
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken: recaptchaResult.token,
          pageSource: pageSource
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitStatus('success');
      setFormData(initialFormData);
      setErrors({});
      
      // Call custom onSubmit if provided
      if (onSubmit) {
        await onSubmit(formData);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, onSubmit, isRecaptchaReady, executeRecaptcha, pageSource]);

  const loading = isLoading || isSubmitting;

  return (
    <div className={`bg-transparent ${className}`}>
      <ContactFormHeader />
      
      <FormStatusMessage 
        status={submitStatus} 
        errorMessage={!isRecaptchaReady && submitStatus === 'error'
          ? 'Weryfikacja bezpieczeństwa nie jest jeszcze gotowa. Spróbuj ponownie za chwilę.' 
          : 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.'}
      />

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* First Row - Name and Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <ResponsiveFormInput
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            error={errors.name}
            required
            disabled={loading}
            placeholder="Twoje Imię *"
            variant="outlined"
          />

          <ResponsiveFormInput
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            required
            disabled={loading}
            placeholder="Twój adres email *"
            variant="outlined"
          />
        </div>

        {/* Second Row - Phone and Company */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <ResponsiveFormInput
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            error={errors.phone}
            disabled={loading}
            placeholder="Twój numer telefonu"
            variant="outlined"
          />

          <ResponsiveFormInput
            id="company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            error={errors.company}
            disabled={loading}
            placeholder="Nazwa firmy (opcjonalnie)"
            variant="outlined"
          />
        </div>

        {/* Subject Field */}
        <ResponsiveFormInput
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          error={errors.subject}
          disabled={loading}
          placeholder="Temat wiadomości"
          variant="outlined"
        />

        {/* Message Field */}
        <ResponsiveFormTextarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          error={errors.message}
          required
          disabled={loading}
          placeholder="Twoja wiadomość... *"
          variant="outlined"
          rows={5}
          resize="vertical"
        />

        {/* Consent Checkbox */}
        <ResponsiveFormCheckbox
          id="consent"
          name="consent"
          checked={formData.consent}
          onChange={handleInputChange}
          error={errors.consent}
          disabled={loading}
          variant="card"
          label={
            <span className="text-sm sm:text-base text-gray-700">
              Wyrażam zgodę na przetwarzanie moich danych osobowych w celu odpowiedzi na zapytanie 
              zgodnie z{' '}
              <a 
                href="/polityka-prywatnosci" 
                className="text-red-600 hover:text-red-700 underline font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                polityką prywatności
              </a>
              {' '}*
            </span>
          }
        />

        {/* Submit Button */}
        <div className="pt-2 sm:pt-4">
          <SubmitButton
            isLoading={loading}
            disabled={loading}
            variant="primary"
            size="lg"
          >
            Wyślij wiadomość
          </SubmitButton>
        </div>
      </form>
    </div>
  );
});

ResponsiveContactForm.displayName = 'ResponsiveContactForm';