export interface FooterLink {
  href: string;
  label: string;
  external?: boolean;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface SocialMediaLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface PaymentMethod {
  name: string;
  src: string;
  alt: string;
}

export interface FooterProps {
  className?: string;
  showSections?: boolean;
}

export interface LegalLink {
  href: string;
  label: string;
}