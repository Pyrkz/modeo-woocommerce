export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  iconBgColor?: string;
}

export interface Statistic {
  id: string;
  value: string;
  label: string;
  color?: string;
}

export interface WhyChooseUsSection {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  features: Feature[];
  statisticsTitle: string;
  statistics: Statistic[];
}

export interface FeatureCardProps {
  feature: Feature;
  className?: string;
}

export interface StatisticCardProps {
  statistic: Statistic;
  index: number;
  className?: string;
}

export interface WhyChooseUsSectionProps {
  data?: WhyChooseUsSection;
  className?: string;
}