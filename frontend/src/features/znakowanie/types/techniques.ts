export interface Technique {
  id: string;
  name: string;
  slug: string;
  image: string;
  description?: string;
  href: string;
}

export interface TechniqueCardProps {
  technique: Technique;
  className?: string;
  priority?: boolean;
  style?: React.CSSProperties;
}

export interface TechniquesGridProps {
  techniques: Technique[];
  className?: string;
}

export interface TechniquesSectionProps {
  title?: string;
  subtitle?: string;
  badgeText?: string;
  techniques?: Technique[];
  className?: string;
}