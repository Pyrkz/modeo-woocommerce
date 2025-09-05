export interface ExpertServicesData {
  accentTitle: string;
  mainHeading: {
    beforeAccent: string;
    accent: string;
    afterAccent: string;
  };
  description: {
    intro: string;
    highlight: string;
    conclusion: string;
  };
}

export interface ServiceHighlight {
  text: string;
  isHighlighted: boolean;
}