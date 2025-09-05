'use client';

import { ProductAttribute } from '@/types/product';
import { AttributeSelector } from './AttributeSelector';

/**
 * Demo component showcasing the enhanced attribute selector functionality
 * Demonstrates automatic detection of color, size, and text attributes
 */
export const AttributeSelectorDemo = () => {
  // Mock attribute data for demonstration
  const colorAttribute: ProductAttribute = {
    id: 1,
    name: 'Kolor',
    taxonomy: 'pa_kolor',
    has_variations: true,
    terms: [
      { id: 1, name: 'Czerwony', slug: 'czerwony', swatch_value: '#FF0000' },
      { id: 2, name: 'Niebieski', slug: 'niebieski', swatch_value: '#0000FF' },
      { id: 3, name: 'Zielony', slug: 'zielony', swatch_value: '#00FF00' },
      { id: 4, name: 'Żółty', slug: 'zolty', swatch_value: '#FFFF00' },
    ]
  };

  const sizeAttribute: ProductAttribute = {
    id: 2,
    name: 'Pojemność',
    taxonomy: 'pa_pojemnosc',
    has_variations: true,
    terms: [
      { id: 1, name: '0.5L', slug: '05l' },
      { id: 2, name: '1L', slug: '1l' },
      { id: 3, name: '2L', slug: '2l' },
      { id: 4, name: '5L', slug: '5l' },
    ]
  };

  const textAttribute: ProductAttribute = {
    id: 3,
    name: 'Materiał',
    taxonomy: 'pa_material',
    has_variations: true,
    terms: [
      { id: 1, name: 'Bawełna', slug: 'bawelna' },
      { id: 2, name: 'Poliester', slug: 'poliester' },
      { id: 3, name: 'Mix', slug: 'mix' },
    ]
  };

  return (
    <div className="space-y-8 p-6 bg-gray-50 rounded-lg">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Enhanced Attribute Selectors</h2>
        <p className="text-gray-600">Intelligent detection of attribute types with optimized UX</p>
      </div>

      {/* Color Selector Example */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Color Attributes → Circular Swatches</h3>
        <AttributeSelector
          attribute={colorAttribute}
          onValueChange={(value) => console.log('Color selected:', value)}
        />
      </div>

      {/* Size/Volume Selector Example */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Size/Volume Attributes → Text Labels (sorted)</h3>
        <AttributeSelector
          attribute={sizeAttribute}
          onValueChange={(value) => console.log('Size selected:', value)}
        />
      </div>

      {/* Text Selector Example */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Text Attributes → Standard Buttons</h3>
        <AttributeSelector
          attribute={textAttribute}
          onValueChange={(value) => console.log('Material selected:', value)}
        />
      </div>
    </div>
  );
};