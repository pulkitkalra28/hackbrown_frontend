import React from 'react';
import { VenueFilters as VenueFiltersType } from './types';

const locations = ['New York', 'Los Angeles', 'Chicago', 'Miami'];
const eventTypes = ['Theatre', 'Music', 'Dance', 'Art', 'Sports'];

type Props = {
  filters: VenueFiltersType;
  onFilterChange: (filters: VenueFiltersType) => void;
};

export default function VenueFilters({ filters, onFilterChange }: Props) {
  const handleLocationChange = (location: string) => {
    const newLocations = filters.location.includes(location)
      ? filters.location.filter(l => l !== location)
      : [...filters.location, location];
    
    onFilterChange({
      ...filters,
      location: newLocations
    });
  };

  const handleEventTypeChange = (type: string) => {
    const newTypes = filters.eventTypes.includes(type)
      ? filters.eventTypes.filter(t => t !== type)
      : [...filters.eventTypes, type];
    
    onFilterChange({
      ...filters,
      eventTypes: newTypes
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Filters</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Location</h3>
          <div className="space-y-2">
            {locations.map((location) => (
              <label key={location} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.location.includes(location)}
                  onChange={() => handleLocationChange(location)}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="ml-2 text-sm text-gray-600">{location}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Event Types</h3>
          <div className="space-y-2">
            {eventTypes.map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.eventTypes.includes(type)}
                  onChange={() => handleEventTypeChange(type)}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="ml-2 text-sm text-gray-600">{type}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}