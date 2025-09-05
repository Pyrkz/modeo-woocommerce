export interface ProductImage {
  src: string;
  alt: string;
  priority?: boolean;
}

export interface HeroSectionData {
  badge?: string;
  title: string;
  subtitle: string;
  cta: {
    text: string;
    href?: string;
  };
  description: string[];
}

export interface ProcessStep {
  id: number;
  icon: string;
  title: string;
  description: string;
  stepLabel: string;
}

export interface ProcessStepsData {
  title: string;
  subtitle: string;
  steps: ProcessStep[];
  bottomText?: string;
}

export interface ProductCategory {
  id: number;
  title: string;
  description: string;
}

export interface ProductCategoriesData {
  title: string;
  subtitle: string;
  categories: ProductCategory[];
  image: ProductImage;
}

export interface BusinessFeature {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface BusinessPartnerData {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  features: BusinessFeature[];
  image: ProductImage;
}

export interface CustomCollectionData {
  hero: HeroSectionData;
  images: {
    mainImage: ProductImage;
    showcaseImages: ProductImage[];
  };
  processSteps: ProcessStepsData;
  productCategories: ProductCategoriesData;
  businessPartner: BusinessPartnerData;
}