export * from './components';
export * from './hooks';
export { termsOfServiceData } from './data/termsOfServiceData';

// Export types explicitly to avoid naming conflicts with components
export type {
  TermsSection as TermsSectionType,
  TermsSubsection as TermsSubsectionType,
  TermsListItem,
  CompanyInfo,
  ContactInfo,
  DeliveryMethod,
  PaymentMethod,
  ProductionTime,
  TermsOfServiceData
} from './types';