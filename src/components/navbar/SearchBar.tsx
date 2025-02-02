import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar() {
  return (
    <div className="relative max-w-md w-full">
      <input
        type="text"
        placeholder="Search artists, workshops, events..."
        className="w-full py-2 pl-4 pr-12 rounded-full bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 focus:outline-none transition-all"
      />
      <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
    </div>
  );
}