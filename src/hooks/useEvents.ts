import { useState, useEffect } from 'react';
import { Event } from '../types/events';
import { mockEvents } from '../mock/events';

export function useEvents(filters?: {
  artType?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  startDate?: string;
  endDate?: string;
}) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API delay
    const timer = setTimeout(() => {
      let filteredEvents = [...mockEvents];

      if (filters) {
        if (filters.artType && filters.artType !== 'all') {
          filteredEvents = filteredEvents.filter(event => 
            event.artType.toLowerCase() === filters.artType?.toLowerCase()
          );
        }

        if (filters.location) {
          filteredEvents = filteredEvents.filter(event =>
            event.location.toLowerCase().includes(filters.location!.toLowerCase())
          );
        }

        if (filters.minPrice) {
          filteredEvents = filteredEvents.filter(event =>
            event.price >= filters.minPrice!
          );
        }

        if (filters.maxPrice) {
          filteredEvents = filteredEvents.filter(event =>
            event.price <= filters.maxPrice!
          );
        }
      }

      setEvents(filteredEvents);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [filters]);

  return { events, loading, error };
}