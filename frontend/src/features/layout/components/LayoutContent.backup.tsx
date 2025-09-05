'use client';

import React, { ReactNode } from 'react';
import { Header } from '../../header';
import { Footer } from '../../footer';

interface LayoutContentProps {
  children: ReactNode;
}

export const LayoutContent: React.FC<LayoutContentProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer showSections={true} />
    </>
  );
};