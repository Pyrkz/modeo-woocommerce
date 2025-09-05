import Link from 'next/link';
import { Product } from '@/types/product';

interface ProductBreadcrumbProps {
  product: Product;
}

export const ProductBreadcrumb = ({ product }: ProductBreadcrumbProps) => {
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim();
  };

  const displayName = stripHtml(product.name);
  const shortName = displayName.length > 50 ? `${displayName.substring(0, 50)}...` : displayName;

  return (
    <div className="bg-gray-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <nav className="text-sm text-gray-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-primary">
            Strona główna
          </Link>
          <span className="mx-2">→</span>
          <Link href="/sklep" className="hover:text-primary">
            Sklep
          </Link>
          <span className="mx-2">→</span>
          <span className="text-primary">{shortName}</span>
        </nav>
      </div>
    </div>
  );
};