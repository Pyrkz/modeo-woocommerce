export interface TermsSection {
  id: string;
  title: string;
  content: string | string[];
  subsections?: TermsSubsection[];
  list?: TermsListItem[];
}

export interface TermsSubsection {
  id: string;
  title: string;
  content: string | string[];
  list?: TermsListItem[];
  highlight?: boolean;
}

export interface TermsListItem {
  id: string;
  text: string;
  description?: string;
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
  foundedDate: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

export interface DeliveryMethod {
  id: string;
  name: string;
  time: string;
  cost: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
}

export interface ProductionTime {
  id: string;
  category: string;
  time: string;
}

export interface TermsOfServiceData {
  effectiveDate: string;
  companyInfo: CompanyInfo;
  contactInfo: ContactInfo;
  deliveryMethods: DeliveryMethod[];
  paymentMethods: PaymentMethod[];
  productionTimes: ProductionTime[];
  sections: TermsSection[];
}