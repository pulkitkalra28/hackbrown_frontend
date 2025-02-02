import React from 'react';
import { Send } from 'lucide-react';

export default function FooterNewsletter() {
  return (
    <div className="lg:col-span-2">
      <h3 className="font-semibold text-gray-100 mb-4">Stay Connected</h3>
      <p className="text-gray-300 text-sm mb-4">
        Subscribe to our newsletter for the latest events and artist updates.
      </p>
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 px-4 py-2 bg-gray-800 rounded-lg text-gray-100 placeholder-gray-400 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
        />
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}