import { useState, useEffect } from 'react';
import { Event, EventStatus } from '../types/events';
import { mockEvents } from '../mock/events';

export function useArtistEvents(artistId: string | undefined, status: EventStatus) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API delay
    const timer = setTimeout(() => {
      const filteredEvents = mockEvents.filter(event => event.status === status);
      setEvents(filteredEvents);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [artistId, status]);

  return { events, loading, error };
}