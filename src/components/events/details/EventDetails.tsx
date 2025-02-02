import React from 'react';
import { Calendar, Clock, MapPin, Ticket, User, Info } from 'lucide-react';
import { Event } from '../types';

// Static images for event categories
const categoryImages: Record<string, string> = {
  dance: 'https://plus.unsplash.com/premium_photo-1682089706055-d5ef14dc14e4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  music: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80',
  comedy: 'https://images.unsplash.com/photo-1543584756-8f40a802e14f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  sports: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
};

// Function to format date safely
const formatDate = (dateStr: string | null | undefined) => {
  if (!dateStr || isNaN(Date.parse(dateStr))) return 'N/A';

  const date = new Date(dateStr);

  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};


// Function to format time safely
const formatTime = (timeStr: string | null | undefined) => {
  if (!timeStr || !timeStr.includes(':')) return 'N/A';

  const [hours, minutes] = timeStr.split(':').map(Number);

  if (isNaN(hours) || isNaN(minutes)) return 'N/A';

  const date = new Date();
  date.setHours(hours, minutes);

  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(date);
};


type EventDetailsProps = {
  event: Event;
};

export default function EventDetails({ event }: EventDetailsProps) {
  // Use category image if available, otherwise use a fallback
  const eventImage = categoryImages[event.category.toLowerCase()] || 'https://example.com/default.jpg';

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Event Image */}
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={eventImage}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Event Info */}
      <div className="p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div className="flex items-center text-gray-600">
              <Calendar className="w-5 h-5 mr-3" />
              <span>{formatDate(event.startDate)} - {formatDate(event.endDate)}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-3" />
              <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-3" />
              <span>{event.city}, {event.venue}</span>
            </div>
            
            <div className="flex items-center text-gray-900">
              <Ticket className="w-5 h-5 mr-3" />
              <span className="font-bold">
                {event.ticketType === 'free' ? 'Free' : `$${event.ticketPrice} per ticket`}
              </span>
            </div>

            <div className="flex items-center text-gray-600">
              <Info className="w-5 h-5 mr-3" />
              <span>{event.ticketInfo}</span>
            </div>

            <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${event.ticketStatus === 'coming_soon' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>
              {event.ticketStatus.replace('_', ' ')}
            </div>
          </div>

          {/* Artist Info */}
          <div className="bg-purple-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-900">{"Pulkit Kalra"}</h3>
                <p className="text-sm text-gray-600">Performing Artist</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sales Information */}
        <div className="prose max-w-none mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Sales Period</h2>
          <p className="text-gray-600">
            <strong>Start:</strong> {event.salesStart} <br />
            <strong>End:</strong> {event.salesEnd}
          </p>
        </div>

        {/* Event Description */}
        <div className="prose max-w-none mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Event</h2>
          <p className="text-gray-600">{event.description}</p>
        </div>
      </div>
    </div>
  );
}
