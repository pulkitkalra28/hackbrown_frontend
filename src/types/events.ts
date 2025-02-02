export type EventStatus = 'upcoming' | 'completed' | 'cancelled';

export type Event = {
  id: string;
  name: string;
  artistName: string;
  date: string;
  time: string;
  location: string;
  price: number;
  artType: string;
  status: EventStatus;
  imageUrl: string;
  description: string;
  totalTickets: number;
  availableTickets: number;
};