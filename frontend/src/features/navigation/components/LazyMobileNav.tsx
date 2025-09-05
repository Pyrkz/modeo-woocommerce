'use client';

import { Suspense, lazy } from 'react';

const MobileNavigation = lazy(() => 
  import('./MobileNavigation').then(module => ({ default: module.MobileNavigation }))
);

interface LazyMobileNavProps {
  isOpen: boolean;
  activeSubmenu: string | null;
  onClose: () => void;
  onSubmenuToggle: (menuId: string) => void;
}

export const LazyMobileNav = (props: LazyMobileNavProps) => {
  if (!props.isOpen) return null;

  return (
    <Suspense fallback={null}>
      <MobileNavigation {...props} />
    </Suspense>
  );
};