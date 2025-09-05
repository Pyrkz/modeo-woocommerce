import { ContactFormData, ContactFormErrors } from '../types';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  // Polish phone number validation (9 digits, optionally with +48 prefix)
  const phoneRegex = /^(\+48)?[0-9]{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validateContactForm = (data: ContactFormData): ContactFormErrors => {
  const errors: ContactFormErrors = {};

  // Name validation
  if (!data.name.trim()) {
    errors.name = 'Imię i nazwisko są wymagane';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Imię i nazwisko musi zawierać co najmniej 2 znaki';
  }

  // Email validation
  if (!data.email.trim()) {
    errors.email = 'Email jest wymagany';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Wprowadź prawidłowy adres email';
  }

  // Phone validation (optional)
  if (data.phone && data.phone.trim() && !validatePhone(data.phone)) {
    errors.phone = 'Wprowadź prawidłowy numer telefonu (9 cyfr)';
  }

  // Subject validation
  if (!data.subject.trim()) {
    errors.subject = 'Temat jest wymagany';
  } else if (data.subject.trim().length < 5) {
    errors.subject = 'Temat musi zawierać co najmniej 5 znaków';
  }

  // Message validation
  if (!data.message.trim()) {
    errors.message = 'Wiadomość jest wymagana';
  } else if (data.message.trim().length < 10) {
    errors.message = 'Wiadomość musi zawierać co najmniej 10 znaków';
  }

  // Consent validation
  if (!data.consent) {
    errors.consent = 'Zgoda na przetwarzanie danych jest wymagana';
  }

  return errors;
};

export const hasFormErrors = (errors: ContactFormErrors): boolean => {
  return Object.values(errors).some(error => error !== undefined);
};