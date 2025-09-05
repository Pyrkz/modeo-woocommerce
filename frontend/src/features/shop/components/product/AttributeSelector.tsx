'use client';

import { memo } from 'react';
import { ProductAttribute } from '@/types/product';
import { ColorSelector } from './ColorSelector';
import { SizeSelector } from './SizeSelector';
import { TextSelector } from './TextSelector';
import { ImageSelector } from './ImageSelector';

export interface AttributeSelectorProps {
  attribute: ProductAttribute;
  selectedValue?: string;
  onValueChange: (value: string) => void;
  availability?: Map<string, boolean>;
  className?: string;
}

/**
 * Smart attribute selector that automatically detects attribute type 
 * and renders the appropriate UI component
 */
const AttributeSelectorComponent = ({ 
  attribute, 
  selectedValue, 
  onValueChange, 
  availability,
  className = '' 
}: AttributeSelectorProps) => {
  // Detect attribute type based on name and taxonomy
  const attributeType = detectAttributeType(attribute);
  
  const commonProps = {
    attribute,
    selectedValue,
    onValueChange,
    availability,
    className
  };

  switch (attributeType) {
    case 'color':
      return <ColorSelector {...commonProps} />;
    case 'size':
      return <SizeSelector {...commonProps} />;
    case 'image':
      return <ImageSelector {...commonProps} />;
    case 'text':
    default:
      return <TextSelector {...commonProps} />;
  }
};

/**
 * Detects the type of attribute based on name, taxonomy and terms
 */
function detectAttributeType(attribute: ProductAttribute): 'color' | 'size' | 'image' | 'text' {
  const name = attribute.name?.toLowerCase() || '';
  const taxonomy = attribute.taxonomy?.toLowerCase() || '';
  
  // Color detection
  if (
    name.includes('kolor') || 
    name.includes('color') ||
    name.includes('barwa') ||
    taxonomy.includes('kolor') ||
    taxonomy.includes('color') ||
    taxonomy.includes('pa_kolor') ||
    taxonomy.includes('pa_color')
  ) {
    return 'color';
  }
  
  // Size detection - including volume, capacity, etc.
  if (
    name.includes('rozmiar') ||
    name.includes('size') ||
    name.includes('wielkość') ||
    name.includes('pojemność') ||
    name.includes('litr') ||
    name.includes('ml') ||
    name.includes('capacity') ||
    name.includes('volume') ||
    taxonomy.includes('rozmiar') ||
    taxonomy.includes('size') ||
    taxonomy.includes('pa_rozmiar') ||
    taxonomy.includes('pa_size') ||
    // Check if terms contain size-like values
    attribute.terms?.some(term => 
      /\d+\s*(l|litr|ml|cm|mm|m|kg|g|xl|xxl|xs|s|m|l)(\s|$)/i.test(term.name)
    )
  ) {
    return 'size';
  }
  
  // Image detection - attributes that commonly have visual representations
  if (
    name.includes('wzór') ||
    name.includes('wzor') ||
    name.includes('pattern') ||
    name.includes('tekstura') ||
    name.includes('texture') ||
    name.includes('materiał') ||
    name.includes('material') ||
    name.includes('finish') ||
    name.includes('wykończenie') ||
    name.includes('surface') ||
    name.includes('powierzchnia') ||
    taxonomy.includes('wzor') ||
    taxonomy.includes('pattern') ||
    taxonomy.includes('texture') ||
    taxonomy.includes('material') ||
    taxonomy.includes('pa_wzor') ||
    taxonomy.includes('pa_pattern') ||
    taxonomy.includes('pa_material') ||
    // Check if any terms have images
    attribute.terms?.some(term => 
      term.image?.url || 
      (term.swatch_type === 'image' && term.swatch_value)
    )
  ) {
    return 'image';
  }
  
  // Default to text for everything else
  return 'text';
}

// Memoized component for better performance
export const AttributeSelector = memo(AttributeSelectorComponent);

export default AttributeSelector;