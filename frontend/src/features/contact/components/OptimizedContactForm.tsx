'use client';

import { memo } from 'react';
import { ContactFormProps } from '../types';
import { useOptimizedForm } from '../hooks/useOptimizedForm';
import { 
  ResponsiveFormInput, 
  ResponsiveFormTextarea, 
  ResponsiveFormCheckbox, 
  SubmitButton 
} from './forms';
import { ContactFormHeader } from './forms/ContactFormHeader';
import { FormStatusMessage } from './forms/FormStatusMessage';

export const OptimizedContactForm = memo(({ 
  onSubmit, 
  isLoading = false, 
  className = '' 
}: ContactFormProps) => {
  const {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    handleInputChange,
    handleSubmit
  } = useOptimizedForm({
    onSubmit,
    resetOnSuccess: true,
    validateOnChange: false // Validate only on submit for better performance
  });

  const loading = isLoading || isSubmitting;

  return (
    <div className={`bg-transparent ${className}`}>
      <ContactFormHeader />
      
      <FormStatusMessage status={submitStatus} />

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

OptimizedContactForm.displayName = 'OptimizedContactForm';