export interface Solution {
  id: string;
  title: string;
  description: string;
  icon: string;
  services: string[];
}

export interface SolutionCardProps {
  solution: Solution;
  className?: string;
}

export interface SolutionsGridProps {
  solutions: Solution[];
  className?: string;
}

export interface SolutionsSectionProps {
  title?: string;
  subtitle?: string;
  badgeText?: string;
  solutions?: Solution[];
  className?: string;
}