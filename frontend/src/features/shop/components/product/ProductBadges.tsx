'use client';

import { memo } from 'react';

interface ProductBadgesProps {
  stockStatus?: string;
  isVariable?: boolean;
  isOnSale?: boolean;
  className?: string;
}

const StockBadge = memo<{ status: string }>(({ status }) => {
  if (status === 'instock') return null;
  
  const badgeText = status === 'outofstock' ? 'Brak w magazynie' : 'Ograniczona dostępność';
  const badgeColor = status === 'outofstock' ? 'bg-gray-100 text-gray-600' : 'bg-warning/10 text-warning';
  
  return (
    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${badgeColor}`}>
      {badgeText}
    </span>
  );
});
StockBadge.displayName = 'StockBadge';

const SaleBadge = memo(() => (
  <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent">
    Promocja
  </span>
));
SaleBadge.displayName = 'SaleBadge';

const VariableBadge = memo(() => (
  <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700">
    Opcje dostępne
  </span>
));
VariableBadge.displayName = 'VariableBadge';

export const ProductBadges = memo<ProductBadgesProps>(({ 
  stockStatus, 
  isVariable = false, 
  isOnSale = false,
  className = '' 
}) => {
  const hasBadges = stockStatus !== 'instock' || isVariable || isOnSale;
  
  if (!hasBadges) return null;
  
  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {isOnSale && <SaleBadge />}
      {stockStatus && <StockBadge status={stockStatus} />}
      {isVariable && <VariableBadge />}
    </div>
  );
});

ProductBadges.displayName = 'ProductBadges';