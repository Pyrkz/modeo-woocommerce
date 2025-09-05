'use client';

import { useState, useEffect } from 'react';
import { ReviewFormData } from '../types';
import { useCreateReview } from '../hooks/useReviews';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { useRecaptcha } from '../hooks/useRecaptcha';
import { StarRating } from './StarRating';
import { toast } from '@/components/ui/Toast';
import { sanitizeReview, sanitizeName, containsDangerousContent } from '@/utils/sanitize';
import { config } from '@/lib/config';

interface ReviewFormProps {
  productId: number;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function ReviewForm({ productId, onSuccess, onCancel }: ReviewFormProps) {
  const { createReview, submitting, error } = useCreateReview();
  const { user, loading: userLoading } = useCurrentUser();
  
  // reCAPTCHA integration
  const { 
    executeRecaptcha, 
    isLoading: recaptchaLoading, 
    error: recaptchaError,
    isReady: recaptchaReady,
    clearError: clearRecaptchaError
  } = useRecaptcha({
    siteKey: config.getRecaptchaSiteKey(),
    action: config.recaptcha.actions.review,
    threshold: config.recaptcha.threshold
  });
  
  const [formData, setFormData] = useState<ReviewFormData>({
    product_id: productId,
    reviewer: '',
    reviewer_email: '',
    review: '',
    rating: 5
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Auto-fill user data when logged in
  useEffect(() => {
    if (user.isLoggedIn && !userLoading) {
      setFormData(prev => ({
        ...prev,
        reviewer: user.name || prev.reviewer,
        reviewer_email: user.email || prev.reviewer_email,
      }));
    }
  }, [user, userLoading]);

  const validateForm = () => {
    const errors: Record<string, string> = {};

    // Validate and sanitize name
    const cleanName = sanitizeName(formData.reviewer.trim());
    if (!cleanName) {
      errors.reviewer = 'Imię jest wymagane';
    } else if (containsDangerousContent(formData.reviewer)) {
      errors.reviewer = 'Imię zawiera niedozwolone znaki';
    }

    if (!formData.reviewer_email.trim()) {
      errors.reviewer_email = 'Email jest wymagany';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.reviewer_email)) {
      errors.reviewer_email = 'Nieprawidłowy adres email';
    }

    // Validate and sanitize review content
    const cleanReview = sanitizeReview(formData.review.trim());
    if (!cleanReview) {
      errors.review = 'Treść recenzji jest wymagana';
    } else if (cleanReview.length < 3) {
      errors.review = 'Recenzja musi mieć co najmniej 3 znaki';
    } else if (containsDangerousContent(formData.review)) {
      errors.review = 'Recenzja zawiera niedozwolone elementy';
    }

    if (formData.rating < 1 || formData.rating > 5) {
      errors.rating = 'Ocena musi być między 1 a 5';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Clear any previous reCAPTCHA errors
    clearRecaptchaError();

    // Execute reCAPTCHA if enabled
    let recaptchaToken: string | undefined;
    
    if (config.isRecaptchaEnabled()) {
      if (!recaptchaReady) {
        toast.error('Weryfikacja anty-bot nie jest jeszcze gotowa. Spróbuj ponownie za chwilę.');
        return;
      }

      try {
        const recaptchaResult = await executeRecaptcha();
        recaptchaToken = recaptchaResult.token;
        
      } catch {
        toast.error('Weryfikacja anty-bot nie powiodła się. Spróbuj ponownie.');
        return;
      }
    }

    // Sanitize data before sending
    const sanitizedData = {
      ...formData,
      reviewer: sanitizeName(formData.reviewer.trim()),
      review: sanitizeReview(formData.review.trim()),
      recaptcha_token: recaptchaToken // Add reCAPTCHA token
    };

    const result = await createReview(sanitizedData);

    if (result.success) {
      // Reset form
      setFormData({
        product_id: productId,
        reviewer: '',
        reviewer_email: '',
        review: '',
        rating: 5
      });
      
      // Show success toast
      toast.success('🎉 Dziękujemy za opinię! Została pomyślnie dodana.');
      
      if (onSuccess) {
        onSuccess();
      }
    }
  };

  const handleChange = (field: keyof ReviewFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {user.isLoggedIn && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
          <div className="flex items-center">
            <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-green-800">
              Jesteś zalogowany jako <strong>{user.name}</strong> - dane zostały automatycznie wypełnione
            </span>
          </div>
        </div>
      )}
      
      <div>
        <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
          Twoja ocena
        </label>
        <StarRating
          rating={formData.rating}
          onRatingChange={(rating) => handleChange('rating', rating)}
          size="lg"
        />
        {validationErrors.rating && (
          <p className="mt-1 text-sm text-red-600">{validationErrors.rating}</p>
        )}
      </div>

      <div>
        <label htmlFor="reviewer" className="block text-sm font-medium text-gray-700 mb-1">
          Imię <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="reviewer"
          value={formData.reviewer}
          onChange={(e) => handleChange('reviewer', e.target.value)}
          readOnly={user.isLoggedIn}
          className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            validationErrors.reviewer ? 'border-red-300' : 'border-gray-300'
          } ${user.isLoggedIn ? 'bg-gray-50 text-gray-600' : ''}`}
          placeholder="Twoje imię"
        />
        {validationErrors.reviewer && (
          <p className="mt-1 text-sm text-red-600">{validationErrors.reviewer}</p>
        )}
      </div>

      <div>
        <label htmlFor="reviewer_email" className="block text-sm font-medium text-gray-700 mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="reviewer_email"
          value={formData.reviewer_email}
          onChange={(e) => handleChange('reviewer_email', e.target.value)}
          readOnly={user.isLoggedIn}
          className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            validationErrors.reviewer_email ? 'border-red-300' : 'border-gray-300'
          } ${user.isLoggedIn ? 'bg-gray-50 text-gray-600' : ''}`}
          placeholder="twoj@email.pl"
        />
        {validationErrors.reviewer_email && (
          <p className="mt-1 text-sm text-red-600">{validationErrors.reviewer_email}</p>
        )}
      </div>

      <div>
        <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">
          Twoja recenzja <span className="text-red-500">*</span>
        </label>
        <textarea
          id="review"
          value={formData.review}
          onChange={(e) => handleChange('review', e.target.value)}
          rows={4}
          className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            validationErrors.review ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="Podziel się swoją opinią o produkcie..."
        />
        {validationErrors.review && (
          <p className="mt-1 text-sm text-red-600">{validationErrors.review}</p>
        )}
      </div>

      {/* Error Messages */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}
      
      {recaptchaError && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p className="text-sm text-yellow-800">
              Weryfikacja anty-bot: {recaptchaError.message}
            </p>
          </div>
        </div>
      )}

      {/* reCAPTCHA Status Info */}
      {config.isRecaptchaEnabled() && !recaptchaReady && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
            <p className="text-sm text-blue-800">
              Ładowanie weryfikacji anty-bot...
            </p>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={submitting || recaptchaLoading || (config.isRecaptchaEnabled() && !recaptchaReady)}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover 
                   disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors
                   flex items-center gap-2"
        >
          {(submitting || recaptchaLoading) && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          )}
          {recaptchaLoading ? 'Weryfikacja...' : submitting ? 'Wysyłanie...' : 'Wyślij recenzję'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md 
                     hover:bg-gray-50 transition-colors"
          >
            Anuluj
          </button>
        )}
      </div>
    </form>
  );
}