export interface RestauracjeService {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  features: string[];
  href: string;
}

export interface RestauracjeStats {
  completedProjects: string;
  satisfiedClients: string;
  averageDelivery: string;
  experienceYears: string;
}

export interface RestauracjeFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface RestauracjeBenefit {
  id: string;
  title: string;
  description: string;
  icon: string;
  highlight?: boolean;
}