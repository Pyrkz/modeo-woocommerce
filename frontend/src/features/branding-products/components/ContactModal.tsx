'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { ContactForm } from '@/features/contact/components/ContactForm';
import { ContactFormData } from '@/features/contact/types';
import { Product } from '@/types/product';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
  onSubmit?: (data: ContactFormData) => Promise<void>;
}

export const ContactModal = ({ isOpen, onClose, product, onSubmit }: ContactModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Prevent body scrolling
      document.body.style.overflow = 'hidden';
      
      // Focus management
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements?.[0] as HTMLElement;
      firstElement?.focus();
    } else {
      // Restore body scrolling
      document.body.style.overflow = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleFormSubmit = async (formData: ContactFormData) => {
    const enhancedData = {
      ...formData,
      subject: product ? `Zapytanie o produkt: ${product.name}` : formData.subject,
      message: product 
        ? `Dzień dobry,\n\nChciałbym/chciałabym otrzymać wycenę dla produktu:\n\nNazwa: ${product.name}\nLink: ${window.location.origin}/sklep/${product.slug}\n\nDodatkowe informacje:\n${formData.message}`
        : formData.message,
    };

    if (onSubmit) {
      await onSubmit(enhancedData);
    } else {
      // Default handling - could integrate with your contact API
      console.log('Contact form submitted:', enhancedData);
      setTimeout(onClose, 2000); // Close modal after success
    }
  };

  if (!mounted || !isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="min-w-0 flex-1 pr-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
              {product ? `Zapytanie o: ${product.name}` : 'Skontaktuj się z nami'}
            </h2>
            {product && (
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Wypełnij formularz, a nasz ekspert skontaktuje się z Tobą
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
            aria-label="Zamknij modal"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Product Info */}
        {product && product.images?.[0]?.src && (
          <div className="border-b border-gray-200 bg-gray-50 px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <Image
                src={product.images[0].src}
                alt={product.name}
                width={64}
                height={64}
                className="object-cover rounded-lg border border-gray-200 flex-shrink-0"
              />
              <div className="min-w-0">
                <h3 className="font-medium text-gray-900 text-sm sm:text-base truncate">{product.name}</h3>
                <p className="text-xs sm:text-sm text-gray-600">Produkt do znakowania firmowego</p>
              </div>
            </div>
          </div>
        )}

        {/* Contact Form */}
        <div className="overflow-y-auto max-h-[calc(95vh-200px)] sm:max-h-[calc(90vh-200px)] px-4 sm:px-6 py-4 sm:py-6">
          <ContactForm 
            onSubmit={handleFormSubmit} 
            pageSource={product ? `Zapytanie o produkt: ${product.name}` : 'Modal kontaktowy'} 
          />
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};