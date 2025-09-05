'use client';

import { useState, useCallback } from 'react';

export interface NotificationState {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  show: boolean;
}

export interface UseShopNotificationsReturn {
  notifications: NotificationState[];
  showNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
  hideNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

export const useShopNotifications = (): UseShopNotificationsReturn => {
  const [notifications, setNotifications] = useState<NotificationState[]>([]);

  const showNotification = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const notification: NotificationState = {
      id,
      message,
      type,
      show: true,
    };

    setNotifications(prev => [...prev, notification]);
  }, []);

  const hideNotification = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, show: false }
          : notification
      )
    );

    // Remove from array after animation completes
    setTimeout(() => {
      setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, 500);
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    notifications,
    showNotification,
    hideNotification,
    clearAllNotifications,
  };
};