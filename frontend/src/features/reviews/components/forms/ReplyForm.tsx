'use client';

import { useState, useCallback, useMemo, memo } from 'react';
import { ReplyFormData } from '../../types';
import { ReviewService } from '../../services/review-service';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { useRecaptcha } from '../../hooks/useRecaptcha';
import { ReplyFormFields } from './ReplyFormFields';
import { ReplyFormActions } from './ReplyFormActions';
import { config } from '@/lib/config';

interface ReplyFormProps {
  parentId: number;
  productId: number;
  onSuccess: () => void;
  onCancel: () => void;
  placeholder?: string;
}

export const ReplyForm = memo(function ReplyForm({ 
  parentId, 
  productId, 
  onSuccess, 
  onCancel, 
  placeholder = "Napisz swoją odpowiedź..." 
}: ReplyFormProps) {
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
    action: config.recaptcha.actions.reply,
    threshold: config.recaptcha.threshold
  });
  
  // Memoize initial form data to prevent unnecessary re-initializations
  const initialFormData = useMemo(() => ({
    reviewer: user?.isLoggedIn ? user.name : '',
    reviewer_email: user?.isLoggedIn ? user.email : '',
    reply: '',
    parent_id: parentId,
    product_id: productId,
  }), [user?.isLoggedIn, user?.name, user?.email, parentId, productId]);

  const [formData, setFormData] = useState<ReplyFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    clearRecaptchaError();

    if (!formData.reviewer.trim() || !formData.reviewer_email.trim() || !formData.reply.trim()) {
      setError('Wszystkie pola są wymagane');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.reviewer_email)) {
      setError('Podaj prawidłowy adres email');
      return;
    }

    // Execute reCAPTCHA if enabled
    let recaptchaToken: string | undefined;
    
    if (config.isRecaptchaEnabled()) {
      if (!recaptchaReady) {
        setError('Weryfikacja anty-bot nie jest jeszcze gotowa. Spróbuj ponownie za chwilę.');
        return;
      }

      try {
        const recaptchaResult = await executeRecaptcha();
        recaptchaToken = recaptchaResult.token;
      } catch {
        setError('Weryfikacja anty-bot nie powiodła się. Spróbuj ponownie.');
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const dataWithRecaptcha = {
        ...formData,
        recaptcha_token: recaptchaToken
      };
      
      await ReviewService.createReplyToReview(dataWithRecaptcha);
      
      // Reset form
      setFormData(initialFormData);
      onSuccess();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Wystąpił błąd podczas dodawania odpowiedzi');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, initialFormData, onSuccess, clearRecaptchaError, executeRecaptcha, recaptchaReady]);

  const handleInputChange = useCallback((field: keyof ReplyFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  if (userLoading) {
    return (
      <div className="flex items-center gap-2 p-4">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
        <span className="text-sm text-gray-600">Ładowanie...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
      
      {recaptchaError && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <div className="flex items-center">
            <svg className="w-4 h-4 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p className="text-xs text-yellow-800">
              Weryfikacja anty-bot: {recaptchaError.message}
            </p>
          </div>
        </div>
      )}

      <ReplyFormFields
        formData={formData}
        user={user}
        parentId={parentId}
        placeholder={placeholder}
        onInputChange={handleInputChange}
      />

      <ReplyFormActions
        isSubmitting={isSubmitting}
        recaptchaLoading={recaptchaLoading}
        recaptchaReady={recaptchaReady}
        onCancel={onCancel}
      />
    </form>
  );
});

ReplyForm.displayName = 'ReplyForm';