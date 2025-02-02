import React from 'react';
import { ThumbsUp } from 'lucide-react';

const featuredArtists = [
  {
    name: 'GUTSLIT',
    type: 'Musician/Band',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80'
  },
  {
    name: 'Bloodywood',
    type: 'Musician/Band',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80'
  },
  {
    name: 'Parvaaz',
    type: 'Musician/Band',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80'
  }
];

export default function FeaturedArtists() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Featured Artists</h2>
        <button className="text-sm text-purple-600 hover:text-purple-700">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {featuredArtists.map((artist, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium text-gray-900">{artist.name}</h3>
                <p className="text-sm text-gray-500">{artist.type}</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-purple-600">
              <ThumbsUp className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}