import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';
import ProfileDropdown from '../profile/ProfileDropdown';

export default function NavButtons() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isArtist, setIsArtist] = useState(false);

  useEffect(() => {
    async function checkArtistStatus() {
      if (!user) {
        setIsArtist(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .maybeSingle();

        if (error && error.code !== 'PGRST116') {
          console.error('Error checking artist status:', error);
        }

        setIsArtist(data?.role === 'artist');
      } catch (error) {
        console.error('Error checking artist status:', error);
        setIsArtist(false);
      }
    }

    checkArtistStatus();
  }, [user]);

  return (
    <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4 p-2 md:p-0">
      <button 
        onClick={() => navigate('/events')}
        className="text-gray-300 hover:text-purple-400 transition-colors text-left md:text-center"
      >
        Find Events
      </button>
      
      {isArtist && (
        <>
          <button 
            onClick={() => navigate('/events/create')}
            className="text-gray-300 hover:text-purple-400 transition-colors text-left md:text-center"
          >
            Create Event
          </button>
          <button 
            onClick={() => navigate('/venues')}
            className="text-gray-300 hover:text-purple-400 transition-colors text-left md:text-center"
          >
            Find Venues
          </button>
        </>
      )}
      
      <button 
        onClick={() => navigate('/contact')}
        className="text-gray-300 hover:text-purple-400 transition-colors text-left md:text-center"
      >
        Contact Us
      </button>
      
      {user ? (
        <div className="flex items-center space-x-2">
          <ProfileDropdown />
        </div>
      ) : (
        <button 
          onClick={() => navigate('/login')}
          className="w-full md:w-auto px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors text-center"
        >
          Login
        </button>
      )}
    </div>
  );
}