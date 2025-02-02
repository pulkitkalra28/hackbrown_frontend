import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import ArtistEventCard from './ArtistEventCard';
import Pagination from '../events/Pagination';
import { useArtistEvents, EventStatus } from '../../hooks/useArtistEvents';

const EVENTS_PER_PAGE = 10;

export default function ArtistPostsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<EventStatus>('upcoming');
  
  const { events, loading, error } = useArtistEvents(user?.id, selectedStatus);

  const totalPages = Math.ceil(events.length / EVENTS_PER_PAGE);
  const currentEvents = events.slice(
    (currentPage - 1) * EVENTS_PER_PAGE,
    currentPage * EVENTS_PER_PAGE
  );

  const handleStatusChange = (status: EventStatus) => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  const handleEditEvent = (eventId: string) => {
    navigate(`/events/edit/${eventId}`);
  };

  const handleCancelEvent = async (eventId: string) => {
    try {
      const { error } = await supabase
        .from('events')
        .update({ status: 'cancelled' })
        .eq('id', eventId)
        .eq('artist_id', user?.id);

      if (error) throw error;
      
      // Refresh the events list
      window.location.reload();
    } catch (error) {
      console.error('Error cancelling event:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            <p className="text-gray-600">Loading events...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            <p className="text-red-600">Error loading events. Please try again later.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Events</h1>
          <button
            onClick={() => navigate('/events/create')}
            className="w-full sm:w-auto px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Create Event
          </button>
        </div>

        {/* Status Tabs - Scrollable on mobile */}
        <div className="flex overflow-x-auto pb-2 mb-8 -mx-4 sm:mx-0 px-4 sm:px-0">
          <div className="flex space-x-4 min-w-full sm:min-w-0">
            {(['upcoming', 'completed', 'cancelled'] as const).map((status) => (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
                  selectedStatus === status
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {currentEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No {selectedStatus} events found.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {currentEvents.map((event) => (
                <ArtistEventCard
                  key={event.id}
                  event={event}
                  onEdit={handleEditEvent}
                  onCancel={handleCancelEvent}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 overflow-x-auto">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}