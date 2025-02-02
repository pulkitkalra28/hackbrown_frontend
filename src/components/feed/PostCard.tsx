import React from 'react';
import { Heart, Share2, MessageCircle, MoreHorizontal } from 'lucide-react';
import { Post } from '../../types/feed';

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-lg font-semibold text-purple-600">
              {post.userName[0]}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{post.userName}</h3>
            <p className="text-sm text-gray-500">{post.userRole}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
      </div>

      {/* Media */}
      {post.mediaUrl && (
        <div className="relative">
          {post.mediaType === 'image' && (
            <img 
              src={post.mediaUrl} 
              alt="" 
              className="w-full max-h-[500px] object-cover"
            />
          )}
          {post.mediaType === 'video' && (
            <video 
              src={post.mediaUrl} 
              controls 
              className="w-full max-h-[500px]"
            />
          )}
          {post.mediaType === 'audio' && (
            <audio 
              src={post.mediaUrl} 
              controls 
              className="w-full mt-2"
            />
          )}
        </div>
      )}

      {/* Actions */}
      <div className="px-4 py-3 flex items-center justify-between border-t border-gray-100">
        <div className="flex space-x-6">
          <button className="flex items-center space-x-2 text-gray-500 hover:text-purple-600">
            <Heart className="w-5 h-5" />
            <span>{post.likes}</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-500 hover:text-purple-600">
            <MessageCircle className="w-5 h-5" />
            <span>{post.comments}</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-500 hover:text-purple-600">
            <Share2 className="w-5 h-5" />
            <span>{post.shares}</span>
          </button>
        </div>
        <span className="text-sm text-gray-500">
          {formatDate(post.createdAt)}
        </span>
      </div>
    </div>
  );
}