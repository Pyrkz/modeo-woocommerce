// Components
export { 
  ContactHero, 
  ContactFeatures, 
  ContactCard, 
  FeatureCard,
  ContactInfo,
  // Legacy form components
  ContactForm,
  FormInput,
  FormTextarea,
  FormCheckbox,
  // Modern optimized form components
  ResponsiveContactForm,
  OptimizedContactForm,
  ContactSection,
  CompleteContactSection
} from './components';

// Types
export type { 
  ContactInfo as ContactInfoType, 
  ContactFeature, 
  ContactCardProps, 
  FeatureCardProps,
  ContactFormData,
  ContactFormErrors,
  ContactFormProps
} from './types';

// Data
export { contactInfoData, contactFeaturesData } from './data/contactData';

// Utils
export { validateContactForm, validateEmail, validatePhone, hasFormErrors } from './utils/validation';

// Hooks
export { useOptimizedForm } from './hooks';