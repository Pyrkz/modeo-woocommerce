export interface CollectionBenefit {
  id: string;
  text: string;
  isHighlighted?: boolean;
}

export interface CollectionBenefitsData {
  title: string;
  subtitle: string;
  description: {
    intro: string;
    highlight: string;
    conclusion: string;
  };
  callToAction: {
    title: string;
    highlight: string;
  };
  benefits: CollectionBenefit[];
  productImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}