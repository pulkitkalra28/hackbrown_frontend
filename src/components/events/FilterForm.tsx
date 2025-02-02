import React from 'react';
import { FilterState } from './types';

const artTypes = ['All', 'Music', 'Dance', 'Art', 'Sports', 'Other'];

type FilterFormProps = {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
};

export default function FilterForm({ filters, onFilterChange }: FilterFormProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Art Type
        </label>
        <select
          value={filters.artType}
          onChange={(e) => onFilterChange({ ...filters, artType: e.target.value })}
          className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
        >
          {artTypes.map((type) => (
            <option key={type} value={type.toLowerCase()}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location
        </label>
        <input
          type="text"
          value={filters.location}
          onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
          placeholder="Enter city or area"
          className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            value={filters.minPrice}
            onChange={(e) => onFilterChange({ ...filters, minPrice: e.target.value })}
            placeholder="Min"
            className="w-1/2 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
          />
          <input
            type="number"
            value={filters.maxPrice}
            onChange={(e) => onFilterChange({ ...filters, maxPrice: e.target.value })}
            placeholder="Max"
            className="w-1/2 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Date Range
        </label>
        <input
          type="date"
          value={filters.startDate}
          onChange={(e) => onFilterChange({ ...filters, startDate: e.target.value })}
          className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500 mb-2"
        />
        <input
          type="date"
          value={filters.endDate}
          onChange={(e) => onFilterChange({ ...filters, endDate: e.target.value })}
          className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
        />
      </div>
    </div>
  );
}