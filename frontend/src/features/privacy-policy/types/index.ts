export interface PrivacyPolicySection {
  id: string;
  title: string;
  content: string | string[];
  subsections?: PrivacyPolicySubsection[];
}

export interface PrivacyPolicySubsection {
  id: string;
  title: string;
  content: string | string[];
  list?: PrivacyPolicyListItem[];
}

export interface PrivacyPolicyListItem {
  id: string;
  text: string;
}

export interface CompanyInfo {
  name: string;
  address: string;
  city: string;
  region: string;
  nip: string;
  regon: string;
  email: string;
  phone: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
}

export interface PrivacyPolicyData {
  lastUpdated: string;
  companyInfo: CompanyInfo;
  contactInfo: ContactInfo;
  sections: PrivacyPolicySection[];
}