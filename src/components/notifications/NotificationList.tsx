import React from 'react';
import { Notification } from '../../types/notifications';
import NotificationItem from './NotificationItem';

type NotificationListProps = {
  notifications: Notification[];
};

export default function NotificationList({ notifications }: NotificationListProps) {
  if (notifications.length === 0) {
    return (
      <div className="px-4 py-8 text-center text-gray-500">
        No notifications yet
      </div>
    );
  }

  return (
    <div className="max-h-[400px] overflow-y-auto">
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  );
}