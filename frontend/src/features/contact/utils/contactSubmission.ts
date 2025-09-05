import { ContactFormData, ContactFormDataWithRecaptcha } from '../types';

/**
 * @deprecated Use the ContactForm component's built-in submission with reCAPTCHA
 * This function is kept for backward compatibility
 */
export async function submitContactForm(formData: ContactFormData): Promise<void> {
  console.warn('submitContactForm is deprecated. Use ContactForm component with reCAPTCHA integration.');
  
  // For backward compatibility, simulate the old behavior
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Contact form submitted (deprecated method):', formData);
    return Promise.resolve();
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
}

/**
 * Submit contact form with reCAPTCHA protection
 * @param formData - Form data including reCAPTCHA token
 * @returns Promise that resolves when submission is complete
 */
export async function submitContactFormWithRecaptcha(
  formData: ContactFormDataWithRecaptcha
): Promise<void> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to submit form');
  }

  return;
}