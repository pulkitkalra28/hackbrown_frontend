import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import { MapPin, Users, Tag, CheckCircle, Mail, Phone } from 'lucide-react';

// Mock venue data (same as in VenueGrid)
const mockVenues = [
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

export default function VenueDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const venue = mockVenues.find(v => v.id === id);

  if (!venue) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-24">
          <div className="text-center">
            <p className="text-gray-600">Venue not found.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-24">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Venue Image */}
          <div className="aspect-w-16 aspect-h-9">
            <img
              src={venue.imageUrl}
              alt={venue.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Venue Info */}
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{venue.name}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-3" />
                  <span>{venue.location}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-3" />
                  <span>Capacity: {venue.capacity}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Tag className="w-5 h-5 mr-3" />
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
              </div>

              {/* Host Info */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Host Information</h2>
                <div className="space-y-3">
                  <p className="text-gray-900 font-medium">{venue.host.name}</p>
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    <a href={`mailto:${venue.host.email}`} className="hover:text-purple-600">
                      {venue.host.email}
                    </a>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    <a href={`tel:${venue.host.phone}`} className="hover:text-purple-600">
                      {venue.host.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="prose max-w-none mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Venue</h2>
              <p className="text-gray-600">{venue.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {venue.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center text-gray-600">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}