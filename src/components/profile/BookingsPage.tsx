import React from 'react';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import BookingCard from './BookingCard';

// Hardcoded booking data for testing
const mockBookings = [
  {
    id: '1',
    event_name: 'Jazz Night Under the Stars',
    event_date: '2025-02-15',
    event_time: '8:00 PM',
    location: 'Central Park, New York',
    ticket_count: 2,
    total_price: 50,
    status: 'confirmed',
  },
  {
    id: '2',
    event_name: 'Urban Dance Workshop',
    event_date: '2025-02-18',
    event_time: '6:00 PM',
    location: 'Dance Studio 23, Brooklyn',
    ticket_count: 1,
    total_price: 30,
    status: 'cancelled',
  },
  {
    id: '3',
    event_name: 'Abstract Art Exhibition',
    event_date: '2025-02-20',
    event_time: '10:00 AM',
    location: 'Modern Art Gallery, Manhattan',
    ticket_count: 3,
    total_price: 45,
    status: 'confirmed',
  }
];

export default function BookingsPage() {
  const bookings = mockBookings; // Replace this with API data when available

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>
        
        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No bookings found.</p>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
