export * from './components';
export * from './hooks';
export { privacyPolicyData } from './data/privacyPolicyData';

// Export types explicitly to avoid naming conflicts with components
export type {
  PrivacyPolicySection as PrivacyPolicySectionType,
  PrivacyPolicySubsection as PrivacyPolicySubsectionType,
  PrivacyPolicyListItem,
  CompanyInfo,
  ContactInfo,
  PrivacyPolicyData
} from './types';