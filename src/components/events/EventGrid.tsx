import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';
import { FilterState } from './types';
import axios from 'axios';

type EventGridProps = {
  filters: FilterState;
};

export default function EventGrid({ filters }: EventGridProps) {
  const [events, setEvents] = useState([]);

  // Fetch events from backend
  useEffect(() => {
    axios.get('http://localhost:8080/api/events/all')
      .then(response => {
        setEvents(response.data); // Assuming response.data.events contains an array
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  // Apply filters to events
  let filteredEvents = events;

  if (filters.artType && filters.artType !== 'all') {
    filteredEvents = filteredEvents.filter(event => 
      event.category.toLowerCase() === filters.artType.toLowerCase()
    );
  }

  if (filters.location) {
    filteredEvents = filteredEvents.filter(event =>
      event.city.toLowerCase().includes(filters.location.toLowerCase())
    );
  }

  if (filters.minPrice) {
    filteredEvents = filteredEvents.filter(event =>
      event.ticketPrice >= Number(filters.minPrice)
    );
  }

  if (filters.maxPrice) {
    filteredEvents = filteredEvents.filter(event =>
      event.ticketPrice <= Number(filters.maxPrice)
    );
  }

  if (filteredEvents.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No events found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {filteredEvents.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
