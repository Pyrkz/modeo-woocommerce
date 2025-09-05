export interface EventyService {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  features: string[];
  href: string;
}

export interface EventyStats {
  completedProjects: string;
  satisfiedClients: string;
  averageDelivery: string;
  experienceYears: string;
}

export interface EventyFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface EventyBenefit {
  id: string;
  title: string;
  description: string;
  icon: string;
  highlight?: boolean;
}