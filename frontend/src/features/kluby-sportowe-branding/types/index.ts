export interface KlubyService {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  features?: string[];
  href?: string;
}

export interface KlubyStats {
  completedProjects: string;
  satisfiedClients: string;
  averageDelivery: string;
  experienceYears: string;
}

export interface KlubyFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface KlubyBenefit {
  id: string;
  title: string;
  description: string;
  icon: string;
  highlight?: boolean;
}