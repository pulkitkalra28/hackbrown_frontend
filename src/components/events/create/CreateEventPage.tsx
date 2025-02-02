import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';
import Navbar from '../../navbar/Navbar';
import CreateEventForm from './CreateEventForm';
import { useAuth } from '../../../hooks/useAuth';

export default function CreateEventPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Check if user is an artist
  const checkArtistStatus = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error checking artist status:', error);
        navigate('/events');
        return;
      }

      if (data?.role !== 'artist') {
        navigate('/events');
      }
    } catch (error) {
      console.error('Error:', error);
      navigate('/events');
    }
  };

  React.useEffect(() => {
    checkArtistStatus();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Event</h1>
        <CreateEventForm />
      </div>
    </div>
  );
}