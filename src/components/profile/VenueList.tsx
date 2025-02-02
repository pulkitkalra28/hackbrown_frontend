import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Users, Tag } from 'lucide-react';

// Mock venue data
const mockVenues = [
  {
    id: '1',
    name: 'The Grand Theatre',
    location: 'New York',
    eventTypes: ['Theatre', 'Music', 'Dance'],
    capacity: 500,
    imageUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&q=80',
  },
  {
    id: '2',
    name: 'Studio 23',
    location: 'Los Angeles',
    eventTypes: ['Dance', 'Music'],
    capacity: 150,
    imageUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&q=80',
  }
];

export default function VenueList() {
  const navigate = useNavigate();

  return (
    <div className="mb-12">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">My Venues</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockVenues.map((venue) => (
          <div 
            key={venue.id} 
            className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate(`/venues/${venue.id}`)}
          >
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={venue.imageUrl}
                alt={venue.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {venue.name}
              </h3>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{venue.location}</span>
                </div>
                
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  <span>Capacity: {venue.capacity}</span>
                </div>
                
                <div className="flex items-center">
                  <Tag className="w-4 h-4 mr-2" />
                  <div className="flex flex-wrap gap-1">
                    {venue.eventTypes.map((type) => (
                      <span 
                        key={type}
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}