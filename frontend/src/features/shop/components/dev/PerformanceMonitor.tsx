'use client';

import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  renderTime: number;
  apiCalls: number;
  cacheHits: number;
  cacheMisses: number;
  lastUpdate: number;
}

interface PerformanceMonitorProps {
  enabled?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export function PerformanceMonitor({ 
  enabled = process.env.NODE_ENV === 'development',
  position = 'bottom-right' 
}: PerformanceMonitorProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderTime: 0,
    apiCalls: 0,
    cacheHits: 0,
    cacheMisses: 0,
    lastUpdate: Date.now()
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    // Listen for performance events from components
    const handlePerformanceEvent = (event: CustomEvent<Partial<PerformanceMetrics>>) => {
      setMetrics(prev => ({
        ...prev,
        ...event.detail,
        lastUpdate: Date.now()
      }));
    };

    // @ts-expect-error - Custom event type
    window.addEventListener('shop-performance', handlePerformanceEvent);
    
    return () => {
      // @ts-expect-error - Custom event type not recognized by TypeScript
      window.removeEventListener('shop-performance', handlePerformanceEvent);
    };
  }, [enabled]);

  if (!enabled) return null;

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4'
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      <div className={`bg-black bg-opacity-80 text-white text-xs rounded-lg transition-all duration-200 ${
        isVisible ? 'p-3 w-48' : 'p-2 w-16'
      }`}>
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="w-full text-left font-mono"
        >
          {isVisible ? '🔧 Performance' : '🔧'}
        </button>
        
        {isVisible && (
          <div className="mt-2 space-y-1 font-mono">
            <div>Render: {metrics.renderTime.toFixed(1)}ms</div>
            <div>API: {metrics.apiCalls}</div>
            <div>Cache: {metrics.cacheHits}h/{metrics.cacheMisses}m</div>
            <div className="text-xs text-gray-300">
              {Math.round((Date.now() - metrics.lastUpdate) / 1000)}s ago
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper function to emit performance events
export function emitPerformanceEvent(metrics: Partial<PerformanceMetrics>) {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    window.dispatchEvent(new CustomEvent('shop-performance', { detail: metrics }));
  }
}