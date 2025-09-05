export interface FirmyService {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  features?: string[];
  href?: string;
}

export interface FirmyStats {
  completedProjects: string;
  satisfiedClients: string;
  averageDelivery: string;
  experienceYears: string;
}

export interface FirmyFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface FirmyBenefit {
  id: string;
  title: string;
  description: string;
  icon: string;
  highlight?: boolean;
}