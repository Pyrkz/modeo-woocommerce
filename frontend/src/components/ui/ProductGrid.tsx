import { Product } from '@/types/product';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onAddToCart?: (productId: number, quantity?: number, variation?: { [key: string]: string }) => Promise<void>;
  columns?: 'auto' | 2 | 3 | 4;
  className?: string;
}

const ProductGrid = ({ 
  products, 
  onAddToCart,
  columns = 'auto',
  className = '' 
}: ProductGridProps) => {
  const getGridClasses = () => {
    switch (columns) {
      case 2:
        return 'grid-cols-1 sm:grid-cols-2';
      case 3:
        return 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3';
      case 4:
        return 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-4';
      default:
        return 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
    }
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Brak produktów</h3>
          <p className="text-gray-600">Obecnie nie mamy żadnych produktów w ofercie. Wróć wkrótce!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`grid ${getGridClasses()} gap-6 ${className}`}>
      {products.map((product) => (
        <ProductCard 
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductGrid;