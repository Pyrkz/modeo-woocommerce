// Flex printing feature types
export interface FlexFeature {
  icon: string;
  text: string;
}

export interface FlexColor {
  name: string;
  value: string;
}

export interface FlexBenefit {
  title: string;
  description: string;
  icon?: string;
}

export interface FlexProcess {
  step: string;
  title: string;
  description: string;
}