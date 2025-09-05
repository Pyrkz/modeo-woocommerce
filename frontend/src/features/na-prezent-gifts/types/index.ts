export interface NaPrezentCategory {
  id: string;
  title: string;
  description: string;
  href: string;
  iconPath: string;
  category: 'holidays' | 'family' | 'personal';
  count?: number;
  color: string;
  gradient: string;
}

export interface NaPrezentStats {
  totalCategories: number;
  totalProducts: number;
  avgDeliveryTime: string;
  satisfactionRate: string;
}

export interface NaPrezentFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}