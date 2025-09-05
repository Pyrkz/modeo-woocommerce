export interface FlockColor {
  name: string;
  value: string;
}

export interface FlockFeature {
  icon: string;
  text: string;
  description?: string;
}

export interface FlockPricing {
  basePrice: number;
  currency: string;
  minOrder?: number;
  discounts?: PriceDiscount[];
}

export interface PriceDiscount {
  quantity: number;
  discount: number;
  label: string;
}