import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

const categories = ['Dance', 'Music', 'Sports', 'Comedy'];
const subcategories = {
  Dance: ['Ballet', 'Contemporary', 'Hip Hop', 'Jazz', 'Traditional'],
  Music: ['Rock', 'Jazz', 'Classical', 'Pop', 'Electronic'],
  Sports: ['Basketball', 'Soccer', 'Tennis', 'Boxing', 'eSports'],
  Comedy: ['Stand-up', 'Improv', 'Sketch', 'Musical Comedy']
};

const countries = ['USA', 'Canada', 'UK', 'Australia', 'India'];
const cities = {
  USA: ['New York', 'Los Angeles', 'Chicago', 'Miami', 'Austin'],
  Canada: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'],
  UK: ['London', 'Manchester', 'Birmingham', 'Edinburgh', 'Glasgow'],
  Australia: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
  India: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata']
};

type FormData = {
  name: string;
  mobile: string;
  country: string;
  city: string;
  category: string;
  subcategory: string;
  address: string;
  social: {
    spotify: string;
    youtube: string;
    instagram: string;
    twitter: string;
    facebook: string;
    other: string;
  };
};

export default function EditProfilePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    mobile: '',
    country: '',
    city: '',
    category: '',
    subcategory: '',
    address: '',
    social: {
      spotify: '',
      youtube: '',
      instagram: '',
      twitter: '',
      facebook: '',
      other: ''
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-3xl mx-auto px-4 py-24">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value, city: '' })}
                    className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                    disabled={!formData.country}
                  >
                    <option value="">Select City</option>
                    {formData.country && cities[formData.country as keyof typeof cities].map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value, subcategory: '' })}
                    className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subcategory
                  </label>
                  <select
                    value={formData.subcategory}
                    onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                    className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                    disabled={!formData.category}
                  >
                    <option value="">Select Subcategory</option>
                    {formData.category && subcategories[formData.category as keyof typeof subcategories].map((sub) => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={3}
                  className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Social Media Links</h2>
            
            <div className="space-y-6">
              {Object.keys(formData.social).map((platform) => (
                <div key={platform}>
                  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                    {platform}
                  </label>
                  <input
                    type="url"
                    value={formData.social[platform as keyof typeof formData.social]}
                    onChange={(e) => setFormData({
                      ...formData,
                      social: {
                        ...formData.social,
                        [platform]: e.target.value
                      }
                    })}
                    className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                    placeholder={`https://${platform}.com/...`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4">
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
              Save Changes
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}