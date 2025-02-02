import { Booking } from '../types/bookings';

export const mockBookings: Booking[] = [
  {
    id: '1',
    eventName: 'Jazz Night Under the Stars',
    eventDate: '2024-03-15',
    eventTime: '8:00 PM',
    location: 'Central Park, New York',
    ticketCount: 2,
    totalPrice: 50,
    status: 'confirmed',
    imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80'
  },
  {
    id: '2',
    eventName: 'Urban Dance Workshop',
    eventDate: '2024-03-18',
    eventTime: '6:00 PM',
    location: 'Dance Studio 23, Brooklyn',
    ticketCount: 1,
    totalPrice: 30,
    status: 'cancelled',
    imageUrl: 'https://images.unsplash.com/photo-1535525153412-5a092c564c20?auto=format&fit=crop&q=80'
  }
];