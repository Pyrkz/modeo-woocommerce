'use client';

import { memo } from 'react';
import { ShopToastNotification } from './ShopToastNotification';
import { NotificationState } from '../types';

interface ShopNotificationContainerProps {
  notifications: NotificationState[];
  onHideNotification: (id: string) => void;
}

export const ShopNotificationContainer = memo<ShopNotificationContainerProps>(({
  notifications,
  onHideNotification
}) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <ShopToastNotification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          show={notification.show}
          onHide={() => onHideNotification(notification.id)}
        />
      ))}
    </div>
  );
});

ShopNotificationContainer.displayName = 'ShopNotificationContainer';