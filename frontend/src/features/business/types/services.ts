export interface BusinessService {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: {
    text: string;
    href: string;
  };
}

export interface BusinessServicesProps {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  services: BusinessService[];
}