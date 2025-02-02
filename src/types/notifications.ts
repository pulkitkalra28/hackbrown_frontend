export type NotificationType = 'like' | 'comment' | 'follow';

export type Notification = {
  id: string;
  type: NotificationType;
  actor: string;
  message: string;
  read: boolean;
  createdAt: string;
};