export interface ContactInfo {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  href?: string;
  type: 'email' | 'phone' | 'address';
}

export interface ContactFeature {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export interface ContactCardProps {
  info: ContactInfo;
  className?: string;
}

export interface FeatureCardProps {
  feature: ContactFeature;
  className?: string;
}

// Form types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  company?: string;
  consent: boolean;
}

export interface ContactFormDataWithRecaptcha extends ContactFormData {
  recaptchaToken: string;
  pageSource: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  company?: string;
  consent?: string;
}

export interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<void>;
  isLoading?: boolean;
  className?: string;
  pageSource?: string;
}