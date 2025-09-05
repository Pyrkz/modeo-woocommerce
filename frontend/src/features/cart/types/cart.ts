// Cart Types
export interface CartItem {
  key: string;
  id: number;
  quantity: number;
  name: string;
  sku?: string;
  permalink: string;
  images: Array<{
    id: number;
    src: string;
    thumbnail: string;
    alt: string;
  }>;
  prices: {
    price: string;
    regular_price: string;
    sale_price: string;
    currency_symbol: string;
    currency_code: string;
  };
  totals: {
    line_subtotal: string;
    line_total: string;
    currency_symbol: string;
    currency_code: string;
  };
  variation?: Array<{
    attribute: string;
    value: string;
  }>;
}

export interface CartTotals {
  total_items: string;
  total_items_tax: string;
  total_fees: string;
  total_fees_tax: string;
  total_discount: string;
  total_discount_tax: string;
  total_shipping: string;
  total_shipping_tax: string;
  total_tax: string;
  total_price: string;
  currency_code: string;
  currency_symbol: string;
}

export interface CartFee {
  id: string;
  name: string;
  totals: {
    total: string;
    total_tax: string;
    currency_code: string;
    currency_symbol: string;
  };
}

export interface CartError {
  code: string;
  message: string;
  data?: Record<string, unknown>;
}

export interface CrossSellProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  type: string;
  featured: boolean;
}

export interface Cart {
  items: CartItem[];
  items_count: number;
  items_weight: number;
  cross_sells: CrossSellProduct[];
  needs_payment: boolean;
  needs_shipping: boolean;
  has_calculated_shipping: boolean;
  fees: CartFee[];
  totals: CartTotals;
  errors: CartError[];
  payment_methods: string[];
  payment_requirements: string[];
  extensions: Record<string, unknown>;
}

export interface AddToCartRequest {
  id: number;
  quantity: number;
  variation?: Array<{
    attribute: string;
    value: string;
  }>;
}

export interface CartApiResponse<T = unknown> {
  data: T;
  success: boolean;
  message?: string;
}

// Component Props
export interface SlideCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (itemKey: string, quantity: number) => Promise<void>;
  onRemove: (itemKey: string) => Promise<void>;
  isUpdating?: boolean;
}

export interface CartSummaryProps {
  totals: CartTotals;
  onCheckout: () => void;
  isLoading?: boolean;
}

export interface CartItemImageProps {
  src?: string;
  alt: string;
  className?: string;
}