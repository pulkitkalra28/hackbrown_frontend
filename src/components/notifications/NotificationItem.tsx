import React from 'react';
import { Heart, MessageCircle, UserPlus } from 'lucide-react';
import { Notification } from '../../types/notifications';

type NotificationItemProps = {
  notification: Notification;
};

export default function NotificationItem({ notification }: NotificationItemProps) {
  const getIcon = () => {
    switch (notification.type) {
      case 'like':
        return <Heart className="w-5 h-5 text-red-500" />;
      case 'comment':
        return <MessageCircle className="w-5 h-5 text-blue-500" />;
      case 'follow':
        return <UserPlus className="w-5 h-5 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className={`px-4 py-3 hover:bg-gray-50 ${!notification.read ? 'bg-purple-50' : ''}`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-900">
            <span className="font-medium">{notification.actor}</span>
            {' '}
            {notification.message}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {new Date(notification.createdAt).toLocaleDateString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true
            })}
          </p>
        </div>
      </div>
    </div>
  );
}