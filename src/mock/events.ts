import { Event } from '../types/events';

export const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Jazz Night Under the Stars',
    artistName: 'Sarah Chen Quartet',
    date: 'Mar 15, 2024',
    time: '8:00 PM',
    location: 'Central Park, New York',
    price: 25,
    artType: 'music',
    status: 'upcoming',
    imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80',
    description: 'Join us for an enchanting evening of jazz under the stars.',
    totalTickets: 100,
    availableTickets: 45
  },
  {
    id: '2',
    name: 'Urban Dance Workshop',
    artistName: 'Marcus Rivera',
    date: 'Mar 18, 2024',
    time: '6:00 PM',
    location: 'Dance Studio 23, Brooklyn',
    price: 30,
    artType: 'dance',
    status: 'upcoming',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1682089706055-d5ef14dc14e4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Learn the latest urban dance moves from professional dancers.',
    totalTickets: 50,
    availableTickets: 20
  },
  {
    id: '3',
    name: 'Abstract Art Exhibition',
    artistName: 'Emma Thompson',
    date: 'Mar 20, 2024',
    time: '10:00 AM',
    location: 'Modern Art Gallery, Manhattan',
    price: 15,
    artType: 'art',
    status: 'completed',
    imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80',
    description: 'Experience a unique collection of abstract art pieces.',
    totalTickets: 200,
    availableTickets: 0
  }
];