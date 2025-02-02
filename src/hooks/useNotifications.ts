import { useState, useEffect } from 'react';
import { Notification } from '../types/notifications';

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    actor: 'Sarah Chen',
    message: 'liked your post',
    read: false,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    type: 'comment',
    actor: 'Marcus Rivera',
    message: 'commented on your post: "Great performance!"',
    read: true,
    createdAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: '3',
    type: 'follow',
    actor: 'Emma Thompson',
    message: 'started following you',
    read: false,
    createdAt: new Date(Date.now() - 7200000).toISOString()
  }
];

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  return { notifications, unreadCount };
}