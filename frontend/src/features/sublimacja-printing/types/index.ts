// Sublimacja printing feature types
export interface SublimacjaFeature {
  icon: string;
  text: string;
}

export interface SublimacjaColor {
  name: string;
  value: string;
}

export interface SublimacjaBenefit {
  title: string;
  description: string;
  icon?: string;
}

export interface SublimacjaProcess {
  step: string;
  title: string;
  description: string;
}