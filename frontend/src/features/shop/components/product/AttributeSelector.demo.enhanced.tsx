'use client';

import { ProductAttribute } from '@/types/product';
import { AttributeSelector } from './AttributeSelector';

/**
 * Enhanced demo showcasing the new image-based attribute selector
 * for patterns, textures, and visual materials
 */
export const EnhancedAttributeSelectorDemo = () => {
  // Mock color attribute (unchanged)
  const colorAttribute: ProductAttribute = {
    id: 1,
    name: 'Kolor',
    taxonomy: 'pa_kolor',
    has_variations: true,
    terms: [
      { id: 1, name: 'Czerwony', slug: 'czerwony', swatch_type: 'color', swatch_value: '#FF0000' },
      { id: 2, name: 'Niebieski', slug: 'niebieski', swatch_type: 'color', swatch_value: '#0000FF' },
      { id: 3, name: 'Zielony', slug: 'zielony', swatch_type: 'color', swatch_value: '#00FF00' },
    ]
  };

  // Mock size attribute (unchanged)
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

  // NEW: Pattern attribute with images
  const patternAttribute: ProductAttribute = {
    id: 4,
    name: 'Wzór',
    taxonomy: 'pa_wzor',
    has_variations: true,
    terms: [
      { 
        id: 1, 
        name: 'Kratka', 
        slug: 'kratka',
        swatch_type: 'image',
        image: {
          id: 101,
          url: 'https://images.unsplash.com/photo-1580982947043-7e2c7ce53334?w=100&h=100&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1580982947043-7e2c7ce53334?w=80&h=80&fit=crop',
          alt: 'Wzór kratka'
        }
      },
      { 
        id: 2, 
        name: 'Paski', 
        slug: 'paski',
        swatch_type: 'image',
        image: {
          id: 102,
          url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=100&h=100&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=80&h=80&fit=crop',
          alt: 'Wzór paski'
        }
      },
      { 
        id: 3, 
        name: 'Groszki', 
        slug: 'groszki',
        swatch_type: 'image',
        image: {
          id: 103,
          url: 'https://images.unsplash.com/photo-1596265371388-43edbaadab94?w=100&h=100&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1596265371388-43edbaadab94?w=80&h=80&fit=crop',
          alt: 'Wzór groszki'
        }
      },
    ]
  };

  // NEW: Material texture attribute with images
  const textureAttribute: ProductAttribute = {
    id: 5,
    name: 'Tekstura materiału',
    taxonomy: 'pa_tekstura',
    has_variations: true,
    terms: [
      { 
        id: 1, 
        name: 'Gładka', 
        slug: 'gladka',
        swatch_type: 'image',
        image: {
          id: 201,
          url: 'https://images.unsplash.com/photo-1567696153798-a14a6e2b7e63?w=100&h=100&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1567696153798-a14a6e2b7e63?w=80&h=80&fit=crop',
          alt: 'Gładka tekstura'
        }
      },
      { 
        id: 2, 
        name: 'Strukturalna', 
        slug: 'strukturalna',
        swatch_type: 'image',
        image: {
          id: 202,
          url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=80&h=80&fit=crop',
          alt: 'Strukturalna tekstura'
        }
      },
      { 
        id: 3, 
        name: 'Filcowa', 
        slug: 'filcowa',
        swatch_type: 'image',
        image: {
          id: 203,
          url: 'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=100&h=100&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=80&h=80&fit=crop',
          alt: 'Filcowa tekstura'
        }
      },
    ]
  };

  const textAttribute: ProductAttribute = {
    id: 3,
    name: 'Styl',
    taxonomy: 'pa_styl',
    has_variations: true,
    terms: [
      { id: 1, name: 'Klasyczny', slug: 'klasyczny' },
      { id: 2, name: 'Sportowy', slug: 'sportowy' },
      { id: 3, name: 'Elegancki', slug: 'elegancki' },
    ]
  };

  return (
    <div className="space-y-8 p-6 bg-gray-50 rounded-lg">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Enhanced Attribute Selectors</h2>
        <p className="text-gray-600">Intelligent detection with visual pattern and texture support</p>
      </div>

      {/* Color Selector Example */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Color Attributes → Circular Swatches</h3>
        <AttributeSelector
          attribute={colorAttribute}
          onValueChange={(value) => console.log('Color selected:', value)}
        />
      </div>

      {/* NEW: Pattern Selector Example */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Pattern Attributes → Visual Grid</h3>
        <AttributeSelector
          attribute={patternAttribute}
          onValueChange={(value) => console.log('Pattern selected:', value)}
        />
        <p className="text-sm text-gray-500 mt-2">
          ✨ Automatycznie wykrywa wzory i wyświetla je jako obrazki
        </p>
      </div>

      {/* NEW: Texture Selector Example */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Texture Attributes → Material Preview</h3>
        <AttributeSelector
          attribute={textureAttribute}
          onValueChange={(value) => console.log('Texture selected:', value)}
        />
        <p className="text-sm text-gray-500 mt-2">
          ✨ Pokazuje rzeczywisty wygląd tekstury materiału
        </p>
      </div>

      {/* Size Selector Example */}
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
          onValueChange={(value) => console.log('Style selected:', value)}
        />
      </div>
    </div>
  );
};