import React, { useState, useRef } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Image, Video, Music, Send, X } from 'lucide-react';
import { Post } from '../../types/feed';

type CreatePostProps = {
  onPost: (post: Post) => void;
};

export default function CreatePost({ onPost }: CreatePostProps) {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video' | 'audio' | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newPost: Post = {
      id: Date.now().toString(),
      userId: user?.id || '',
      userName: user?.email?.split('@')[0] || 'Anonymous',
      userRole: 'Artist',
      content,
      mediaUrl,
      mediaType: mediaType || undefined,
      likes: 0,
      shares: 0,
      comments: 0,
      createdAt: new Date().toISOString(),
    };

    onPost(newPost);
    setContent('');
    setMediaUrl('');
    setMediaType(null);
  };

  const handleFileSelect = (type: 'image' | 'video' | 'audio') => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = type === 'image' ? 'image/*' : type === 'video' ? 'video/*' : 'audio/*';
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, we would upload the file to a storage service
      // For now, we'll create a temporary URL
      const url = URL.createObjectURL(file);
      setMediaUrl(url);
      setMediaType(file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'audio');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's new?"
          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          rows={3}
        />

        {mediaUrl && (
          <div className="relative mt-2">
            {mediaType === 'image' && (
              <img src={mediaUrl} alt="Preview" className="max-h-48 rounded-lg object-cover" />
            )}
            {mediaType === 'video' && (
              <video src={mediaUrl} className="max-h-48 rounded-lg" controls />
            )}
            {mediaType === 'audio' && (
              <audio src={mediaUrl} className="w-full mt-2" controls />
            )}
            <button
              type="button"
              onClick={() => {
                setMediaUrl('');
                setMediaType(null);
              }}
              className="absolute top-2 right-2 p-1 bg-gray-800/50 rounded-full text-white hover:bg-gray-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="flex items-center justify-between mt-4">
          <div className="flex space-x-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => handleFileSelect('image')}
              className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
            >
              <Image className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => handleFileSelect('video')}
              className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
            >
              <Video className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => handleFileSelect('audio')}
              className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
            >
              <Music className="w-5 h-5" />
            </button>
          </div>

          <button
            type="submit"
            disabled={!content.trim()}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}