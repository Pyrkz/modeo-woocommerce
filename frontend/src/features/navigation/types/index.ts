export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: React.ReactElement;
  href: string;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: number;
  name: string;
  slug: string;
  href: string;
  parent_id: number;
}

export interface MegaMenuProps {
  categories: Category[];
  isOpen: boolean;
  onClose: () => void;
  onOpen?: () => void;
  className?: string;
}

export interface MegaMenuTriggerProps {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export interface CategorySectionProps {
  category: Category;
  className?: string;
}