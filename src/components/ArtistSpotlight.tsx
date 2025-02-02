import React from 'react';

const artists = [
  {
    name: 'Sarah Chen',
    type: 'Classical Pianist',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80',
    event: 'Piano Masterclass',
    date: 'March 15, 2024'
  },
  {
    name: 'Marcus Rivera',
    type: 'Street Dance',
    image: 'https://images.unsplash.com/photo-1535525153412-5a092c564c20?auto=format&fit=crop&q=80',
    event: 'Urban Dance Workshop',
    date: 'March 18, 2024'
  },
  {
    name: 'Emma Thompson',
    type: 'Visual Artist',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80',
    event: 'Abstract Art Exhibition',
    date: 'March 20, 2024'
  }
];

export default function ArtistSpotlight() {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Artists</h2>
          <p className="text-xl text-gray-600">Discover amazing talent from around the world</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artists.map((artist, index) => (
            <div key={index} className="group relative overflow-hidden rounded-xl">
              <div className="aspect-w-3 aspect-h-4">
                <img 
                  src={artist.image} 
                  alt={artist.name}
                  className="object-cover w-full h-[400px] transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <div className="absolute bottom-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-1">{artist.name}</h3>
                  <p className="text-purple-300 mb-3">{artist.type}</p>
                  <div className="bg-purple-600/90 px-4 py-2 rounded-lg">
                    <p className="font-semibold">{artist.event}</p>
                    <p className="text-sm opacity-90">{artist.date}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}