export interface BrandingIndustry {
  id: string;
  title: string;
  description: string;
  detailedDescription?: string;
  iconPath: string;
  href: string;
  category: 'business' | 'education' | 'sports' | 'food' | 'events';
  keywords: string[];
  products?: string[];
  services?: string[];
}

export interface BrandingIndustriesSectionData {
  title: string;
  description: string;
  industries: BrandingIndustry[];
}

export interface BrandingIndustryCardProps {
  industry: BrandingIndustry;
  className?: string;
}

export interface BrandingIndustryProductsProps {
  industryId: string;
  industryTitle: string;
  filters?: Record<string, unknown>;
  className?: string;
}