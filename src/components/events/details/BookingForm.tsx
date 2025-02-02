import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ticket, CreditCard, Info } from 'lucide-react';
import { Event } from '../types';

type BookingFormProps = {
  event: Event;
};

export default function BookingForm({ event }: BookingFormProps) {
  const navigate = useNavigate();
  const [ticketCount, setTicketCount] = useState(1);
  
  // Ensure the event is paid, otherwise set price to $0
  const ticketPrice = event.ticketType === 'free' ? 0 : event.ticketPrice;
  const totalPrice = ticketPrice * ticketCount;
  const maxTickets = event.ticketQuantity; // Available tickets

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Navigate to payment page or confirmation if free
    navigate('/payment', { 
      state: { 
        eventId: event.id,
        ticketCount,
        totalPrice,
        eventName: event.title
      } 
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Book Tickets</h2>
      
      {maxTickets === 0 ? (
        <div className="text-red-500 font-semibold flex items-center">
          <Info className="w-5 h-5 mr-2" />
          Tickets are Sold Out
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Tickets
            </label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                className="px-3 py-2 border border-gray-300 rounded-l-lg hover:bg-gray-50"
                disabled={ticketCount === 1}
              >
                -
              </button>
              <input
                type="number"
                min="1"
                max={maxTickets}
                value={ticketCount}
                onChange={(e) => setTicketCount(Math.min(maxTickets, Math.max(1, parseInt(e.target.value) || 1)))}
                className="w-20 text-center border-y border-gray-300 py-2"
              />
              <button
                type="button"
                onClick={() => setTicketCount(Math.min(maxTickets, ticketCount + 1))}
                className="px-3 py-2 border border-gray-300 rounded-r-lg hover:bg-gray-50"
                disabled={ticketCount >= maxTickets}
              >
                +
              </button>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center text-gray-600">
                <Ticket className="w-5 h-5 mr-2" />
                <span>{ticketCount} {ticketCount === 1 ? 'ticket' : 'tickets'}</span>
              </div>
              <span className="font-semibold text-gray-900">
                {event.ticketType === 'free' ? 'Free' : `$${ticketPrice} each`}
              </span>
            </div>
            
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total</span>
              <span>{event.ticketType === 'free' ? 'Free' : `$${totalPrice}`}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            disabled={maxTickets === 0}
          >
            <CreditCard className="w-5 h-5 mr-2" />
            {event.ticketType === 'free' ? 'Confirm Booking' : 'Proceed to Payment'}
          </button>
        </form>
      )}
    </div>
  );
}
