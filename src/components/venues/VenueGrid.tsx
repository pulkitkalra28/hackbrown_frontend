import React from 'react';
import { useNavigate } from 'react-router-dom';
import VenueCard from './VenueCard';
import { VenueFilters, Venue } from './types';

// Mock venue data
const mockVenues: Venue[] = [
  {
    id: '1',
    name: 'The Grand Theatre',
    location: 'New York',
    eventTypes: ['Theatre', 'Music', 'Dance'],
    capacity: 500,
    imageUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&q=80',
    description: 'A historic venue perfect for performances and cultural events.',
    amenities: ['Stage Lighting', 'Sound System', 'Dressing Rooms', 'Parking'],
    host: {
      name: 'John Smith',
      email: 'john@grandtheatre.com',
      phone: '+1 (555) 123-4567'
    }
  },
  {
    id: '2',
    name: 'Studio 23',
    location: 'Los Angeles',
    eventTypes: ['Dance', 'Music'],
    capacity: 150,
    imageUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&q=80',
    description: 'Modern dance studio with state-of-the-art facilities.',
    amenities: ['Sprung Floor', 'Mirrors', 'Sound System', 'Changing Rooms'],
    host: {
      name: 'Sarah Johnson',
      email: 'sarah@studio23.com',
      phone: '+1 (555) 234-5678'
    }
  },
  {
    id: '3',
    name: 'The Art House',
    location: 'Chicago',
    eventTypes: ['Art', 'Theatre'],
    capacity: 200,
    imageUrl: 'https://images.unsplash.com/photo-1513829596324-4bb2800c5efb?auto=format&fit=crop&q=80',
    description: 'Contemporary art space suitable for exhibitions and performances.',
    amenities: ['Gallery Lighting', 'Exhibition Space', 'Workshop Area']
  },
  {
    id: '4',
    name: 'Sports Complex',
    location: 'Miami',
    eventTypes: ['Sports', 'Dance'],
    capacity: 1000,
    imageUrl: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&q=80',
    description: 'Multi-purpose sports facility with modern amenities.',
    amenities: ['Indoor Courts', 'Changing Rooms', 'Equipment Storage']
  }
];

type Props = {
  filters: VenueFilters;
};

export default function VenueGrid({ filters }: Props) {
  const navigate = useNavigate();
  
  // Filter venues based on selected filters
  const filteredVenues = mockVenues.filter(venue => {
    const locationMatch = filters.location.length === 0 || 
      filters.location.includes(venue.location);
    
    const eventTypeMatch = filters.eventTypes.length === 0 || 
      venue.eventTypes.some(type => filters.eventTypes.includes(type));
    
    return locationMatch && eventTypeMatch;
  });

  if (filteredVenues.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No venues found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {filteredVenues.map((venue) => (
        <VenueCard
          key={venue.id}
          venue={venue}
          onClick={() => navigate(`/venues/${venue.id}`)}
        />
      ))}
    </div>
  );
}