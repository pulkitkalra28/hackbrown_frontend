import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2, Mail, MapPin, Calendar, Upload, Plus } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import MediaGallery from './MediaGallery';
import VenueList from './VenueList';

type Profile = {
  full_name: string;
  role: 'user' | 'artist' | 'business';
  created_at: string;
};

export default function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [coverPhoto, setCoverPhoto] = useState('https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80');
  const [profilePicture, setProfilePicture] = useState('');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('full_name, role, created_at')
          .eq('id', user.id)
          .maybeSingle();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching profile:', error);
          return;
        }

        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 py-24">
          <div className="text-center">
            <p className="text-gray-600">Loading profile...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-24">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Cover Photo */}
          <div className="relative h-64">
            <img 
              src={coverPhoto} 
              alt="Cover" 
              className="w-full h-full object-cover"
            />
            <button 
              onClick={() => {/* Handle cover photo upload */}}
              className="absolute bottom-4 right-4 px-4 py-2 bg-black/50 text-white rounded-lg hover:bg-black/60 transition-colors flex items-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span>Change Cover</span>
            </button>
          </div>
          
          {/* Profile Content */}
          <div className="relative px-6 pb-6">
            {/* Profile Picture */}
            <div className="absolute -top-16 left-6">
              <div className="relative w-32 h-32 bg-white rounded-full p-2">
                <div className="w-full h-full bg-purple-100 rounded-full flex items-center justify-center overflow-hidden">
                  {profilePicture ? (
                    <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl font-bold text-purple-600">
                      {profile?.full_name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase()}
                    </span>
                  )}
                  <button 
                    onClick={() => {/* Handle profile picture upload */}}
                    className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    <Upload className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end pt-4 space-x-4">
              {profile?.role === 'artist' && (
                <button
                  onClick={() => navigate('/events/create')}
                  className="flex items-center px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Event
                </button>
              )}
              {profile?.role === 'business' && (
                <button
                  onClick={() => navigate('/venues/create')}
                  className="flex items-center px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  List Venue
                </button>
              )}
              <button
                onClick={() => navigate('/profile/edit')}
                className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
            </div>

            {/* Profile Info */}
            <div className="mt-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {profile?.full_name || 'User'}
              </h1>
              
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  <span>{user?.email}</span>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>New York, USA</span>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>Joined {new Date(profile?.created_at || '').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex space-x-8 mt-6">
                <div>
                  <span className="text-2xl font-bold text-gray-900">245</span>
                  <p className="text-sm text-gray-600">Following</p>
                </div>
                <div>
                  <span className="text-2xl font-bold text-gray-900">12.8k</span>
                  <p className="text-sm text-gray-600">Followers</p>
                </div>
                <div>
                  <span className="text-2xl font-bold text-gray-900">89</span>
                  <p className="text-sm text-gray-600">Events</p>
                </div>
              </div>
            </div>

            {/* Venues List (for business users) */}
            {profile?.role === 'business' && <VenueList />}

            {/* Media Galleries */}
            <div className="mt-12">
              <MediaGallery type="images" />
              <MediaGallery type="videos" />
              <MediaGallery type="audio" />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}