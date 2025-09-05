export interface SlideCartState {
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface CartContextValue {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

export interface CartIconProps {
  className?: string;
  itemCount?: number;
  onClick?: () => void;
}

export interface SlideCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface CartItemProps {
  item: import('@/types/cart').CartItem;
  onUpdateQuantity: (key: string, quantity: number) => Promise<void>;
  onRemove: (key: string) => Promise<void>;
  isUpdating?: boolean;
}

export interface CartSummaryProps {
  totals: import('@/types/cart').CartTotals;
  onCheckout: () => void;
  isLoading?: boolean;
}