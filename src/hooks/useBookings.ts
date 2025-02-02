import { useState, useEffect } from 'react';
import { Booking } from '../types/bookings';
import { mockBookings } from '../mock/bookings';

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API delay
    const timer = setTimeout(() => {
      setBookings(mockBookings);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return { bookings, loading, error };
}