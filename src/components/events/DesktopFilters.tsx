import React from 'react';
import { FilterState } from './types';
import FilterForm from './FilterForm';

type DesktopFiltersProps = {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onApply: () => void;
  onClear: () => void;
};

export default function DesktopFilters({ filters, onFilterChange, onApply, onClear }: DesktopFiltersProps) {
  return (
    <div className="hidden lg:block bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
      </div>
      
      <FilterForm 
        filters={filters} 
        onFilterChange={onFilterChange} 
      />

      <div className="flex gap-3 mt-6">
        <button
          onClick={onClear}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Clear
        </button>
        <button
          onClick={onApply}
          className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Apply
        </button>
      </div>
    </div>
  );
}