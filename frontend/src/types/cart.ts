export interface CartItem {
  key: string;
  id: number;
  name: string;
  quantity: number;
  quantity_limits?: {
    minimum: number;
    maximum: number;
    multiple_of: number;
    editable: boolean;
  };
  prices: {
    price: string;
    currency_symbol: string;
    currency_code: string;
  };
  totals: {
    line_total: string;
    currency_symbol: string;
    currency_code: string;
  };
  images?: Array<{
    id: number;
    src: string;
    thumbnail: string;
    alt: string;
  }>;
  short_description?: string;
  permalink?: string;
  sku?: string;
}

export interface CartTotals {
  total_items: string;
  total_items_tax: string;
  total_fees: string;
  total_fees_tax: string;
  total_discount: string;
  total_discount_tax: string;
  total_shipping: string | null;
  total_shipping_tax: string | null;
  total_price: string;
  total_tax: string;
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
  currency_decimal_separator: string;
  currency_thousand_separator: string;
  currency_prefix: string;
  currency_suffix: string;
}

export interface Cart {
  items: CartItem[];
  coupons: Array<{
    code: string;
    discount_type: string;
    totals: {
      total_discount: string;
      total_discount_tax: string;
      currency_code: string;
      currency_symbol: string;
    };
  }>;
  fees: Array<{
    id: string;
    name: string;
    totals: {
      total: string;
      total_tax: string;
      currency_code: string;
      currency_symbol: string;
    };
  }>;
  totals: CartTotals;
  shipping_address: {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
  billing_address: {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    email: string;
    phone: string;
  };
}

export interface AddToCartRequest {
  id: number;
  quantity: number;
  variation?: Array<{
    attribute: string;
    value: string;
  }>;
}

export interface UpdateCartItemRequest {
  key: string;
  quantity: number;
}

export interface RemoveCartItemRequest {
  key: string;
}