import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Clock, Ticket } from 'lucide-react';
import { Event } from './types';

// Static images for event categories
const categoryImages: Record<string, string> = {
  dance: 'https://plus.unsplash.com/premium_photo-1682089706055-d5ef14dc14e4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  music: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80',
  comedy: 'https://images.unsplash.com/photo-1543584756-8f40a802e14f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  sports: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
};

type EventCardProps = {
  event: Event;
};

export default function EventCard({ event }: EventCardProps) {
  const navigate = useNavigate();

  // Determine the event image: Use static image if category matches, else fallback to event.imageUrl
  const eventImage = categoryImages[event.category.toLowerCase()] || event.imageUrl;

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
      <div className="aspect-w-16 aspect-h-9 overflow-hidden">
        <img
          src={eventImage}
          alt={event.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {event.title}
        </h3>
        <p className="text-purple-600 font-medium mb-4">{event.artistName || 'Pulkit Kalra'}</p>
        
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{event.startDate} - {event.endDate}</span>
          </div>
          
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            <span>{event.startTime} - {event.endTime}</span>
          </div>
          
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="line-clamp-1">{event.city}, {event.venue}</span>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center text-gray-900">
            <Ticket className="w-4 h-4 mr-1" />
            <span className="font-bold">{event.ticketType === 'free' ? 'Free' : `$${event.ticketPrice}`}</span>
          </div>
          
          <button 
            onClick={() => navigate(`/events/${event.id}`)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
