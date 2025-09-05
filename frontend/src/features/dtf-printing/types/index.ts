// DTF printing feature types
export interface DTFFeature {
  icon: string;
  text: string;
}

export interface DTFColor {
  name: string;
  value: string;
}

export interface DTFBenefit {
  title: string;
  description: string;
  icon?: string;
}

export interface DTFProcess {
  step: string;
  title: string;
  description: string;
}