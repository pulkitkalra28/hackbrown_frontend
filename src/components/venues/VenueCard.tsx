import React from 'react';
import { MapPin, Users, Tag } from 'lucide-react';
import { Venue } from './types';

type Props = {
  venue: Venue;
  onClick: () => void;
};

export default function VenueCard({ venue, onClick }: Props) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden cursor-pointer"
    >
      <div className="aspect-w-16 aspect-h-9 overflow-hidden">
        <img
          src={venue.imageUrl}
          alt={venue.name}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {venue.name}
        </h3>
        
        <div className="space-y-2 text-sm text-gray-600 mb-4">
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
            <div className="flex flex-wrap gap-2">
              {venue.eventTypes.map((type) => (
                <span 
                  key={type}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2">
          {venue.description}
        </p>
      </div>
    </div>
  );
}