export interface AboutFeature {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export interface AboutValue {
  id: string;
  title: string;
  description: string;
}

export interface BusinessService {
  id: string;
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  ctaVariant: 'primary' | 'secondary';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  email: string;
  phone: string;
  avatar: string;
  avatarBgColor: 'black' | 'primary' | 'gray';
}

export interface Statistic {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  number: string;
  title: string;
  description: string;
  iconBgColor: string;
}

export interface AboutHeroProps {
  className?: string;
}

export interface HeroBackgroundProps {
  src: string;
  alt: string;
  overlayOpacity?: number;
}

export interface HeroContentProps {
  greeting?: string;
  title: string;
  description: string;
}

export interface AboutFeatureCardProps {
  feature: AboutFeature;
  className?: string;
}

export interface AboutFeaturesProps {
  className?: string;
}

export interface AboutContentProps {
  className?: string;
}

export interface AboutValuesProps {
  className?: string;
}

export interface AboutValueCardProps {
  value: AboutValue;
  className?: string;
}

export interface AboutBusinessProps {
  className?: string;
}

export interface BusinessServiceCardProps {
  service: BusinessService;
  className?: string;
}

export interface AboutTeamProps {
  className?: string;
}

export interface TeamMemberCardProps {
  member: TeamMember;
  className?: string;
}

export interface TeamContactProps {
  className?: string;
}

export interface AboutStatsProps {
  className?: string;
}

export interface StatCardProps {
  stat: Statistic;
  className?: string;
}

export interface AboutCTAProps {
  className?: string;
}

export interface CTAContactCard {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  description: string;
  href?: string;
  type: 'email' | 'phone' | 'address';
}