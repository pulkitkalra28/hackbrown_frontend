export type Post = {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'audio';
  likes: number;
  shares: number;
  comments: number;
  createdAt: string;
};