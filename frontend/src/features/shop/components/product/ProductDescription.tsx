import { Product } from '@/types/product';

interface ProductDescriptionProps {
  product: Product;
}

export const ProductDescription = ({ product }: ProductDescriptionProps) => {
  if (!product.description) {
    return null;
  }

  return (
    <div className="mt-16 border-t pt-16">
      <div className="max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Opis produktu</h2>
        <div className="product-description">
          <div dangerouslySetInnerHTML={{ __html: product.description }} />
        </div>
      </div>
    </div>
  );
};