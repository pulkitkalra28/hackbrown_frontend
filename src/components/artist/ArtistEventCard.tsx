import React from 'react';
import { MapPin, Calendar, Clock, Ticket, Edit2, XCircle } from 'lucide-react';
import { Event } from '../events/types';

type ArtistEventCardProps = {
  event: Event;
  onEdit: (eventId: string) => void;
  onCancel: (eventId: string) => void;
};

export default function ArtistEventCard({ event, onEdit, onCancel }: ArtistEventCardProps) {
  const isUpcoming = event.status === 'upcoming';
  const isCancelled = event.status === 'cancelled';

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
      <div className="aspect-w-16 aspect-h-9 overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-4 mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-2">
            {event.name}
          </h3>
          <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
            event.status === 'upcoming' ? 'bg-green-100 text-green-800' :
            event.status === 'cancelled' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {event.status?.charAt(0).toUpperCase() + event.status?.slice(1)}
          </span>
        </div>
        
        <div className="space-y-2 text-sm text-gray-600 mb-6">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 min-w-[1rem] mr-2" />
            <span>{event.date}</span>
          </div>
          
          <div className="flex items-center">
            <Clock className="w-4 h-4 min-w-[1rem] mr-2" />
            <span>{event.time}</span>
          </div>
          
          <div className="flex items-center">
            <MapPin className="w-4 h-4 min-w-[1rem] mr-2" />
            <span className="line-clamp-1">{event.location}</span>
          </div>

          <div className="flex items-center">
            <Ticket className="w-4 h-4 min-w-[1rem] mr-2" />
            <span>${event.price}</span>
          </div>
        </div>
        
        {isUpcoming && !isCancelled && (
          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4">
            <button
              onClick={() => onEdit(event.id)}
              className="flex items-center justify-center px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Edit
            </button>
            <button
              onClick={() => onCancel(event.id)}
              className="flex items-center justify-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}