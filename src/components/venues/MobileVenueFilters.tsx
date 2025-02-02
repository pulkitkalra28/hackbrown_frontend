import React, { useState } from 'react';
import { FilterIcon, X } from 'lucide-react';
import { VenueFilters } from './types';
import MultiSelect from './MultiSelect';

const locations = ['New York', 'Los Angeles', 'Chicago', 'Miami'];
const eventTypes = ['Theatre', 'Music', 'Dance', 'Art', 'Sports'];

type Props = {
  filters: VenueFilters;
  onFilterChange: (filters: VenueFilters) => void;
  onApply: () => void;
  onClear: () => void;
};

export default function MobileVenueFilters({ filters, onFilterChange, onApply, onClear }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleApply = () => {
    onApply();
    setIsOpen(false);
  };

  const handleClear = () => {
    onClear();
    setIsOpen(false);
  };

  return (
    <>
      {/* Sticky button at bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 lg:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white px-4 py-3 rounded-lg"
        >
          <FilterIcon className="w-5 h-5" />
          <span>Filters</span>
        </button>
      </div>

      {/* Slide-up panel */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-4 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <MultiSelect
                  options={locations}
                  selected={filters.location}
                  onChange={(selected) => onFilterChange({ ...filters, location: selected })}
                  placeholder="Select locations"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Types
                </label>
                <MultiSelect
                  options={eventTypes}
                  selected={filters.eventTypes}
                  onChange={(selected) => onFilterChange({ ...filters, eventTypes: selected })}
                  placeholder="Select event types"
                />
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleClear}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Clear
                </button>
                <button
                  onClick={handleApply}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}