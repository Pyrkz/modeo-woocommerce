export interface StatItem {
  value: string;
  label: string;
}

export interface FeatureItem {
  icon: string;
  title: string;
}

export interface CorporateWearHeroProps {
  badge?: string;
  title: string;
  subtitle: string;
  description: string;
  features: FeatureItem[];
  stats: StatItem[];
  heroImage: string;
  heroImageAlt: string;
}