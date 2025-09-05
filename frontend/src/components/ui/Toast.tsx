'use client';

import { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

export interface ToastProps {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  onClose: (id: string) => void;
}

interface ToastConfig {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

let toastId = 0;

// Global toast state
let toasts: ToastProps[] = [];
let toastListeners: ((toasts: ToastProps[]) => void)[] = [];

export const toast = {
  success: (message: string, duration = 5000) => {
    addToast({ message, type: 'success', duration });
  },
  error: (message: string, duration = 7000) => {
    addToast({ message, type: 'error', duration });
  },
  info: (message: string, duration = 5000) => {
    addToast({ message, type: 'info', duration });
  },
  warning: (message: string, duration = 6000) => {
    addToast({ message, type: 'warning', duration });
  }
};

function addToast(config: ToastConfig) {
  const id = `toast-${++toastId}`;
  const newToast: ToastProps = {
    id,
    ...config,
    onClose: removeToast
  };
  
  toasts = [...toasts, newToast];
  notifyListeners();
}

function removeToast(id: string) {
  toasts = toasts.filter(toast => toast.id !== id);
  notifyListeners();
}

function notifyListeners() {
  toastListeners.forEach(listener => listener([...toasts]));
}

export function useToasts() {
  const [toastList, setToastList] = useState<ToastProps[]>([]);

  useEffect(() => {
    toastListeners.push(setToastList);
    setToastList([...toasts]);

    return () => {
      toastListeners = toastListeners.filter(listener => listener !== setToastList);
    };
  }, []);

  return toastList;
}

export function Toast({ id, message, type, duration = 5000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(id);
    }, 300);
  }, [onClose, id]);

  useEffect(() => {
    // Show animation
    requestAnimationFrame(() => {
      setIsVisible(true);
    });

    // Auto close
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, handleClose]);

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case 'info':
      default:
        return (
          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <div
      className={`
        fixed top-4 right-4 z-50 max-w-sm w-full
        transform transition-all duration-300 ease-in-out
        ${isVisible && !isExiting ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        ${isExiting ? 'scale-95' : 'scale-100'}
      `}
    >
      <div
        className={`
          flex items-start p-4 border rounded-lg shadow-lg backdrop-blur-sm
          ${getTypeStyles()}
        `}
      >
        <div className="flex-shrink-0 mr-3">
          {getIcon()}
        </div>
        
        <div className="flex-1">
          <p className="text-sm font-medium leading-5">
            {message}
          </p>
        </div>
        
        <button
          onClick={handleClose}
          className="flex-shrink-0 ml-3 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export function ToastContainer() {
  const toasts = useToasts();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || typeof window === 'undefined') {
    return null;
  }

  return createPortal(
    <div className="fixed top-0 right-0 z-50 p-4 space-y-2 pointer-events-none">
      {toasts.map((toastProps) => (
        <div key={toastProps.id} className="pointer-events-auto">
          <Toast {...toastProps} />
        </div>
      ))}
    </div>,
    document.body
  );
}