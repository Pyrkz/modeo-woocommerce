export interface SzkolyService {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  features: string[];
  href: string;
}

export interface SzkolyStats {
  completedProjects: string;
  satisfiedClients: string;
  averageDelivery: string;
  experienceYears: string;
}

export interface SzkolyFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface SzkolyBenefit {
  id: string;
  title: string;
  description: string;
  icon: string;
  highlight?: boolean;
}