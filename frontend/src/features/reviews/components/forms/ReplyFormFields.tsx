'use client';

import { memo, useCallback } from 'react';
import { ReplyFormData } from '../../types';

interface CurrentUser {
  id: number;
  name: string;
  email: string;
  isLoggedIn: boolean;
}

interface ReplyFormFieldsProps {
  formData: ReplyFormData;
  user: CurrentUser | null;
  parentId: number;
  placeholder: string;
  onInputChange: (field: keyof ReplyFormData, value: string) => void;
}

export const ReplyFormFields = memo(function ReplyFormFields({
  formData,
  user,
  parentId,
  placeholder,
  onInputChange
}: ReplyFormFieldsProps) {
  const handleInputChange = useCallback((field: keyof ReplyFormData) => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onInputChange(field, e.target.value);
    };
  }, [onInputChange]);

  return (
    <>
      {/* Name and Email - only show if user is not logged in */}
      {!user?.isLoggedIn && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor={`reply-name-${parentId}`} className="block text-sm font-medium text-gray-700 mb-1">
              Imię <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id={`reply-name-${parentId}`}
              value={formData.reviewer}
              onChange={handleInputChange('reviewer')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Twoje imię"
              maxLength={50}
              required
            />
          </div>
          
          <div>
            <label htmlFor={`reply-email-${parentId}`} className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id={`reply-email-${parentId}`}
              value={formData.reviewer_email}
              onChange={handleInputChange('reviewer_email')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="twoj@email.pl"
              maxLength={100}
              required
            />
          </div>
        </div>
      )}

      {/* Show logged in user info */}
      {user?.isLoggedIn && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
          <div className="flex items-center gap-2 text-sm">
            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span className="text-blue-800">
              Odpowiadasz jako: <strong>{user.name}</strong> ({user.email})
            </span>
          </div>
        </div>
      )}

      {/* Reply text */}
      <div>
        <label htmlFor={`reply-text-${parentId}`} className="block text-sm font-medium text-gray-700 mb-1">
          Twoja odpowiedź <span className="text-red-500">*</span>
        </label>
        <textarea
          id={`reply-text-${parentId}`}
          value={formData.reply}
          onChange={handleInputChange('reply')}
          rows={3}
          maxLength={1000}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-y"
          placeholder={placeholder}
          required
        />
        <div className="text-right text-xs text-gray-500 mt-1">
          {formData.reply.length}/1000
        </div>
      </div>
    </>
  );
});

ReplyFormFields.displayName = 'ReplyFormFields';