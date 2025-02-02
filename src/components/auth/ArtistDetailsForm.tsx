import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

const artTypes = ['dance', 'music', 'art', 'sports', 'other'] as const;

export default function ArtistDetailsForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    artType: '',
    location: '',
    bio: '',
    youtubeUrl: '',
    instagramUrl: '',
    twitterUrl: '',
    websiteUrl: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.artType) {
      newErrors.artType = 'Art type is required';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.bio.trim()) {
      newErrors.bio = 'Bio is required';
    }
    
    // Validate URLs if provided
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    
    if (formData.youtubeUrl && !urlRegex.test(formData.youtubeUrl)) {
      newErrors.youtubeUrl = 'Invalid URL format';
    }
    
    if (formData.instagramUrl && !urlRegex.test(formData.instagramUrl)) {
      newErrors.instagramUrl = 'Invalid URL format';
    }
    
    if (formData.twitterUrl && !urlRegex.test(formData.twitterUrl)) {
      newErrors.twitterUrl = 'Invalid URL format';
    }
    
    if (formData.websiteUrl && !urlRegex.test(formData.websiteUrl)) {
      newErrors.websiteUrl = 'Invalid URL format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const { error } = await supabase.rpc('create_artist_profile', {
        p_user_id: userId,
        p_art_type: formData.artType as typeof artTypes[number],
        p_location: formData.location,
        p_bio: formData.bio,
        p_youtube_url: formData.youtubeUrl || null,
        p_instagram_url: formData.instagramUrl || null,
        p_twitter_url: formData.twitterUrl || null,
        p_website_url: formData.websiteUrl || null
      });

      if (error) throw error;

      navigate('/events');
    } catch (error) {
      console.error('Error:', error);
      setErrors({ submit: 'An error occurred while saving artist details' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-2xl mx-auto px-4 py-24">
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Complete Your Artist Profile</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Art Type
              </label>
              <select
                value={formData.artType}
                onChange={(e) => setFormData({ ...formData, artType: e.target.value })}
                className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="">Select art type</option>
                {artTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
              {errors.artType && (
                <p className="text-red-500 text-xs mt-1">{errors.artType}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="City, Country"
                className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
              />
              {errors.location && (
                <p className="text-red-500 text-xs mt-1">{errors.location}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={4}
                placeholder="Tell us about yourself and your art..."
                className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
              />
              {errors.bio && (
                <p className="text-red-500 text-xs mt-1">{errors.bio}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                YouTube URL (optional)
              </label>
              <input
                type="url"
                value={formData.youtubeUrl}
                onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                placeholder="https://youtube.com/..."
                className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
              />
              {errors.youtubeUrl && (
                <p className="text-red-500 text-xs mt-1">{errors.youtubeUrl}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instagram URL (optional)
              </label>
              <input
                type="url"
                value={formData.instagramUrl}
                onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                placeholder="https://instagram.com/..."
                className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
              />
              {errors.instagramUrl && (
                <p className="text-red-500 text-xs mt-1">{errors.instagramUrl}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Twitter URL (optional)
              </label>
              <input
                type="url"
                value={formData.twitterUrl}
                onChange={(e) => setFormData({ ...formData, twitterUrl: e.target.value })}
                placeholder="https://twitter.com/..."
                className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
              />
              {errors.twitterUrl && (
                <p className="text-red-500 text-xs mt-1">{errors.twitterUrl}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website URL (optional)
              </label>
              <input
                type="url"
                value={formData.websiteUrl}
                onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                placeholder="https://..."
                className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
              />
              {errors.websiteUrl && (
                <p className="text-red-500 text-xs mt-1">{errors.websiteUrl}</p>
              )}
            </div>

            {errors.submit && (
              <p className="text-red-500 text-sm text-center">{errors.submit}</p>
            )}

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/events')}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Skip for Now
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}