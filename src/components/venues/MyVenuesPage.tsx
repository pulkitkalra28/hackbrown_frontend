import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2, Trash2, Plus } from 'lucide-react';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import { Venue } from './types';

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
  }
];

export default function MyVenuesPage() {
  const navigate = useNavigate();

  const handleEdit = (e: React.MouseEvent, venueId: string) => {
    e.stopPropagation();
    navigate(`/venues/edit/${venueId}`);
  };

  const handleDelete = (e: React.MouseEvent, venueId: string) => {
    e.stopPropagation();
    // Handle venue deletion
    console.log('Delete venue:', venueId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-24">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Venues</h1>
          <button
            onClick={() => navigate('/venues/create')}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            List New Venue
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockVenues.map((venue) => (
            <div 
              key={venue.id} 
              onClick={() => navigate(`/venues/${venue.id}`)}
              className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={venue.imageUrl}
                  alt={venue.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {venue.name}
                </h3>
                
                <div className="space-y-2 text-gray-600 mb-4">
                  <p>Location: {venue.location}</p>
                  <p>Capacity: {venue.capacity}</p>
                  <div className="flex flex-wrap gap-2">
                    {venue.eventTypes.map((type) => (
                      <span 
                        key={type}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={(e) => handleEdit(e, venue.id)}
                    className="flex items-center px-3 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, venue.id)}
                    className="flex items-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}