export type Event = {
  id: string;
  artistId: string; // Reference to artist ID
  title: string;
  category: string; // Example: 'music', 'dance', 'comedy'
  eventType: 'single' | 'multiple'; // Event duration type
  startDate: string; // Example: '2025-02-12'
  endDate: string;
  startTime: string; // Example: '23:20'
  endTime: string;
  description: string;
  city: string;
  venue: string;
  ticketType: 'free' | 'paid'; // Ticket type
  ticketName: string;
  ticketPrice: number;
  ticketQuantity: number;
  ticketInfo: string;
  ticketEnabled: boolean;
  ticketStatus: 'live' | 'coming_soon' | 'sold_out'; // Ticket availability status
  salesStart: string; // Example: '2025-02-01 23:20'
  salesEnd: string;
};


export type FilterState = {
  artType: string;
  location: string;
  minPrice: string;
  maxPrice: string;
  startDate: string;
  endDate: string;
};