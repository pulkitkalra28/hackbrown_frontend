export type BookingStatus = 'confirmed' | 'cancelled' | 'completed';

export type Booking = {
  id: string;
  eventName: string;
  eventDate: string;
  eventTime: string;
  location: string;
  ticketCount: number;
  totalPrice: number;
  status: BookingStatus;
  imageUrl: string;
};