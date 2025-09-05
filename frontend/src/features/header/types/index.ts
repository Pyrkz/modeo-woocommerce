export interface NavigationItem {
  href: string;
  label: string;
  icon?: string;
  active?: boolean;
}

export interface RouteConfig {
  [key: string]: string;
}

export interface HeaderProps {
  className?: string;
}