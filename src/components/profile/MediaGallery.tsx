import React from 'react';
import { Image, Video, Music, Plus } from 'lucide-react';

type MediaGalleryProps = {
  type: 'images' | 'videos' | 'audio';
};

export default function MediaGallery({ type }: MediaGalleryProps) {
  const getIcon = () => {
    switch (type) {
      case 'images': return Image;
      case 'videos': return Video;
      case 'audio': return Music;
    }
  };

  const Icon = getIcon();

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 capitalize">{type}</h2>
        <button className="flex items-center text-purple-600 hover:text-purple-700">
          <Plus className="w-5 h-5 mr-1" />
          Add {type.slice(0, -1)}
        </button>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {/* Placeholder for media items */}
        <div className="aspect-square bg-purple-50 rounded-lg flex items-center justify-center">
          <Icon className="w-8 h-8 text-purple-300" />
        </div>
      </div>
    </div>
  );
}