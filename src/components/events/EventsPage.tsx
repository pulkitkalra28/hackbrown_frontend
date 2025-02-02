import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import EventGrid from './EventGrid';
import MobileFilters from './MobileFilters';
import DesktopFilters from './DesktopFilters';
import { FilterState } from './types';
import { Music, Mic, Dumbbell, PersonStanding } from 'lucide-react';

const initialFilters: FilterState = {
  artType: '',
  location: '',
  minPrice: '',
  maxPrice: '',
  startDate: '',
  endDate: ''
};

const categories = [
  { name: 'Music', icon: Music, color: 'bg-purple-500 hover:bg-purple-600' },
  { name: 'Dance', icon: PersonStanding, color: 'bg-pink-500 hover:bg-pink-600' },
  { name: 'Comedy', icon: Mic, color: 'bg-yellow-500 hover:bg-yellow-600' },
  { name: 'Sports', icon: Dumbbell, color: 'bg-blue-500 hover:bg-blue-600' }
];

export default function EventsPage() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(initialFilters);

  const handleApplyFilters = () => {
    setAppliedFilters(filters);
  };

  const handleClearFilters = () => {
    setFilters(initialFilters);
    setAppliedFilters(initialFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Find Events</h1>
        
        {/* Category Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setFilters({ ...filters, artType: category.name.toLowerCase() })}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full text-white transition-colors ${category.color}`}
            >
              <category.icon className="w-5 h-5" />
              <span>{category.name}</span>
            </button>
          ))}
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <DesktopFilters
            filters={filters}
            onFilterChange={setFilters}
            onApply={handleApplyFilters}
            onClear={handleClearFilters}
          />
          
          <div className="flex-1">
            <EventGrid 
              filters={appliedFilters}
              page={1}
              perPage={100}
            />
          </div>
        </div>

        <MobileFilters
          filters={filters}
          onFilterChange={setFilters}
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
        />
      </div>
    </div>
  );
}