'use client';

import { memo } from 'react';
import { config } from '@/lib/config';

interface ReplyFormActionsProps {
  isSubmitting: boolean;
  recaptchaLoading?: boolean;
  recaptchaReady?: boolean;
  onCancel: () => void;
}

export const ReplyFormActions = memo(function ReplyFormActions({
  isSubmitting,
  recaptchaLoading = false,
  recaptchaReady = true,
  onCancel
}: ReplyFormActionsProps) {
  const isDisabled = isSubmitting || recaptchaLoading || (config.isRecaptchaEnabled() && !recaptchaReady);
  return (
    <div className="flex items-center gap-3 pt-2">
      <button
        type="submit"
        disabled={isDisabled}
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium flex items-center gap-2"
      >
        {(isSubmitting || recaptchaLoading) && (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
        )}
        {recaptchaLoading ? 'Weryfikacja...' : isSubmitting ? 'Dodawanie...' : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Wyślij odpowiedź
          </>
        )}
      </button>
      
      <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
      >
        Anuluj
      </button>
    </div>
  );
});

ReplyFormActions.displayName = 'ReplyFormActions';