import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import VenueGrid from './VenueGrid';
import VenueFilters from './VenueFilters';
import MobileVenueFilters from './MobileVenueFilters';
import { VenueFilters as VenueFiltersType } from './types';

const initialFilters: VenueFiltersType = {
  location: [],
  eventTypes: []
};

export default function VenuesPage() {
  const [filters, setFilters] = useState<VenueFiltersType>(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState<VenueFiltersType>(initialFilters);

  const handleApplyFilters = () => {
    setAppliedFilters(filters);
  };

  const handleClearFilters = () => {
    setFilters(initialFilters);
    setAppliedFilters(initialFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Find Venues</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="hidden lg:block lg:w-64">
            <VenueFilters
              filters={filters}
              onFilterChange={setFilters}
              onApply={handleApplyFilters}
              onClear={handleClearFilters}
            />
          </div>
          
          <div className="flex-1">
            <VenueGrid filters={appliedFilters} />
          </div>
        </div>

        <MobileVenueFilters
          filters={filters}
          onFilterChange={setFilters}
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
        />
      </main>

      <Footer />
    </div>
  );
}