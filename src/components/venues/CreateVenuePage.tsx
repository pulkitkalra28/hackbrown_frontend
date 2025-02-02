import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload } from 'lucide-react';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

const eventTypes = ['Dance', 'Music', 'Sports', 'Art', 'Theatre'];

type FormData = {
  name: string;
  location: string;
  capacity: string;
  eventTypes: string[];
  email: string;
  phone: string;
  coverImage: File | null;
  coverImagePreview: string;
};

export default function CreateVenuePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    location: '',
    capacity: '',
    eventTypes: [],
    email: '',
    phone: '',
    coverImage: null,
    coverImagePreview: ''
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        coverImage: file,
        coverImagePreview: URL.createObjectURL(file)
      });
    }
  };

  const handleEventTypeChange = (type: string) => {
    const newTypes = formData.eventTypes.includes(type)
      ? formData.eventTypes.filter(t => t !== type)
      : [...formData.eventTypes, type];
    
    setFormData({
      ...formData,
      eventTypes: newTypes
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-3xl mx-auto px-4 py-24">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">List a New Venue</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Cover Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Venue Cover Image
              </label>
              
              {formData.coverImagePreview ? (
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={formData.coverImagePreview}
                    alt="Cover preview"
                    className="w-full h-48 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, coverImage: null, coverImagePreview: '' })}
                    className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/60"
                  >
                    <Upload className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <label className="block">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-purple-500 transition-colors cursor-pointer">
                    <div className="flex flex-col items-center">
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Basic Info */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Venue Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Capacity
              </label>
              <input
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>

            {/* Event Types */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Types of Events Allowed
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {eventTypes.map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.eventTypes.includes(type)}
                      onChange={() => handleEventTypeChange(type)}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                List Venue
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}