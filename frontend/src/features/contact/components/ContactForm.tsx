'use client';

import { useState } from 'react';
import { ContactFormData, ContactFormErrors, ContactFormProps } from '../types';
import { validateContactForm, hasFormErrors } from '../utils/validation';
import { FormInput } from './FormInput';
import { FormTextarea } from './FormTextarea';
import { FormCheckbox } from './FormCheckbox';
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

export function ContactForm({ onSubmit, isLoading = false, className = '', pageSource = 'Nieznana strona' }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const { executeRecaptcha, isReady: isRecaptchaReady } = useRecaptcha({
    siteKey: config.recaptcha.siteKey,
    action: 'contact_form'
  });

  const handleInputChange = (
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
  };

  const loading = isLoading || isSubmitting;

  return (
    <div className={`bg-transparent ${className}`}>
      <div className="mb-10">
        <div className="text-sm text-red-600 font-semibold mb-3 tracking-wider uppercase">
          Zadaj pytanie
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
          Wypełnij formularz
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          Wypełnij poniższy formularz, aby wysłać nam wiadomość. Odpowiemy na Twoje pytania 
          jak najszybciej jak to możliwe :)
        </p>
      </div>

      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 flex items-center gap-2">
            <span>✅</span>
            Dziękujemy za wiadomość! Skontaktujemy się z Tobą w najbliższym czasie.
          </p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 flex items-center gap-2">
            <span>❌</span>
            {!isRecaptchaReady 
              ? 'Weryfikacja bezpieczeństwa nie jest jeszcze gotowa. Spróbuj ponownie za chwilę.' 
              : 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.'}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <FormInput
          id="name"
          name="name"
          label=""
          value={formData.name}
          onChange={handleInputChange}
          error={errors.name}
          required
          disabled={loading}
          placeholder="Twoje Imię *"
        />

        <FormInput
          id="email"
          name="email"
          type="email"
          label=""
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          required
          disabled={loading}
          placeholder="Twój adres email *"
        />

        <FormInput
          id="phone"
          name="phone"
          type="tel"
          label=""
          value={formData.phone}
          onChange={handleInputChange}
          error={errors.phone}
          disabled={loading}
          placeholder="Twój numer telefonu"
        />

        <FormTextarea
          id="message"
          name="message"
          label=""
          value={formData.message}
          onChange={handleInputChange}
          error={errors.message}
          required
          disabled={loading}
          placeholder="Twoja wiadomość... *"
        />

        <FormCheckbox
          id="consent"
          name="consent"
          checked={formData.consent}
          onChange={handleInputChange}
          error={errors.consent}
          disabled={loading}
          label={
            <span className="text-sm text-gray-600">
              Wyrażam zgodę na przetwarzanie moich danych osobowych w celu odpowiedzi na zapytanie 
              zgodnie z{' '}
              <a 
                href="/polityka-prywatnosci" 
                className="text-red-600 hover:text-red-700 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                polityką prywatności
              </a>
              {' '}*
            </span>
          }
        />

        <button
          type="submit"
          disabled={loading}
          className="
            w-full bg-gray-900 hover:bg-gray-800 active:bg-black text-white font-semibold 
            py-5 px-8 rounded-full transition-all duration-300 flex items-center justify-center gap-2
            disabled:bg-gray-400 disabled:cursor-not-allowed mt-10 text-lg
            focus:outline-none focus:ring-4 focus:ring-gray-500 focus:ring-opacity-30
            transform hover:scale-[1.02] active:scale-[0.98]
            shadow-lg hover:shadow-xl
          "
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              Wysyłanie...
            </>
          ) : (
            'Wyślij'
          )}
        </button>
      </form>
    </div>
  );
}