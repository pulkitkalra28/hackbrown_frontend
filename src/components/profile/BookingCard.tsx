import React from 'react';
import { Calendar, MapPin, Clock, Ticket } from 'lucide-react';

type Booking = {
  id: string;
  event_name: string;
  event_date: string;
  event_time: string;
  location: string;
  ticket_count: number;
  total_price: number;
  status: string;
};

type BookingCardProps = {
  booking: Booking;
};

export default function BookingCard({ booking }: BookingCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-4 mb-4">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
          {booking.event_name}
        </h3>
        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
          booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-gray-600">
        <div className="flex items-center">
          <Calendar className="w-5 h-5 min-w-[1.25rem] mr-2" />
          <span>{new Date(booking.event_date).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}</span>
        </div>
        
        <div className="flex items-center">
          <Clock className="w-5 h-5 min-w-[1.25rem] mr-2" />
          <span>{booking.event_time}</span>
        </div>
        
        <div className="flex items-center">
          <MapPin className="w-5 h-5 min-w-[1.25rem] mr-2" />
          <span className="line-clamp-1">{booking.location}</span>
        </div>
        
        <div className="flex items-center">
          <Ticket className="w-5 h-5 min-w-[1.25rem] mr-2" />
          <span>{booking.ticket_count} tickets (${booking.total_price})</span>
        </div>
      </div>
    </div>
  );
}
