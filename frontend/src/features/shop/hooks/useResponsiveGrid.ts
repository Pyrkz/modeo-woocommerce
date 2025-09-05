'use client';

import { useState, useEffect, useCallback } from 'react';

interface GridDimensions {
  containerWidth: number;
  containerHeight: number;
  columnsPerRow: number;
  columnWidth: number;
  rowHeight: number;
}

export const useResponsiveGrid = (
  containerRef: React.RefObject<HTMLElement | null>,
  minColumnWidth: number = 280,
  rowHeight: number = 450,
  maxColumns: number = 4
): GridDimensions => {
  const [dimensions, setDimensions] = useState<GridDimensions>({
    containerWidth: 1200,
    containerHeight: 800,
    columnsPerRow: 4,
    columnWidth: 300,
    rowHeight,
  });

  const calculateDimensions = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width || 1200;
    const containerHeight = Math.max(containerRect.height || 800, 400);

    // Calculate optimal columns
    const maxPossibleColumns = Math.floor(containerWidth / minColumnWidth);
    const columnsPerRow = Math.max(1, Math.min(maxColumns, maxPossibleColumns));
    const columnWidth = containerWidth / columnsPerRow;

    setDimensions({
      containerWidth,
      containerHeight,
      columnsPerRow,
      columnWidth,
      rowHeight,
    });
  }, [containerRef, minColumnWidth, rowHeight, maxColumns]);

  useEffect(() => {
    // Initial calculation
    calculateDimensions();

    // Debounced resize handler
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(calculateDimensions, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [calculateDimensions]);

  return dimensions;
};