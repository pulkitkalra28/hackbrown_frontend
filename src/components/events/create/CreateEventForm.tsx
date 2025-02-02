import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../hooks/useAuth';
import BasicInformation from './sections/BasicInformation';
import EventDetails from './sections/EventDetails';
import TicketInformation from './sections/TicketInformation';

export type FormData = {
  title: string;
  category: string;
  eventType: 'single' | 'multiple';
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  description: string;
  city: string;
  venue: string;
  ticketType: 'free' | 'paid';
  ticketName: string;
  salesStartDate: string;
  salesStartTime: string;
  salesEndDate: string;
  salesEndTime: string;
  ticketPrice: string;
  ticketQuantity: string;
  ticketInfo: string;
  ticketEnabled: boolean;
  ticketStatus: 'live' | 'coming_soon' | 'sold_out';
};

const initialFormData: FormData = {
  title: '',
  category: '',
  eventType: 'single',
  startDate: '',
  endDate: '',
  startTime: '',
  endTime: '',
  description: '',
  city: '',
  venue: '',
  ticketType: 'paid',
  ticketName: '',
  salesStartDate: '',
  salesStartTime: '',
  salesEndDate: '',
  salesEndTime: '',
  ticketPrice: '',
  ticketQuantity: '',
  ticketInfo: '',
  ticketEnabled: true,
  ticketStatus: 'coming_soon'
};

export default function CreateEventForm() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.startTime) newErrors.startTime = 'Start time is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.venue) newErrors.venue = 'Venue is required';
    
    if (formData.ticketType === 'paid' && !formData.ticketPrice) {
      newErrors.ticketPrice = 'Ticket price is required';
    }
    
    if (!formData.ticketQuantity) newErrors.ticketQuantity = 'Ticket quantity is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!validateForm()) return;

  //   setLoading(true);
  //   try {
  //     // Create event without image and tags
  //     const { error: eventError } = await supabase.from('events').insert({
  //       artist_id: user!.id,
  //       title: formData.title,
  //       category: formData.category,
  //       event_type: formData.eventType,
  //       start_date: formData.startDate,
  //       end_date: formData.eventType === 'multiple' ? formData.endDate : formData.startDate,
  //       start_time: formData.startTime,
  //       end_time: formData.endTime,
  //       description: formData.description,
  //       city: formData.city,
  //       venue: formData.venue,
  //       ticket_type: formData.ticketType,
  //       ticket_name: formData.ticketName,
  //       ticket_price: formData.ticketType === 'paid' ? parseFloat(formData.ticketPrice) : 0,
  //       ticket_quantity: parseInt(formData.ticketQuantity),
  //       ticket_info: formData.ticketInfo,
  //       ticket_enabled: formData.ticketEnabled,
  //       ticket_status: formData.ticketStatus,
  //       sales_start: `${formData.salesStartDate} ${formData.salesStartTime}`,
  //       sales_end: `${formData.salesEndDate} ${formData.salesEndTime}`
  //     });

  //     if (eventError) throw eventError;

  //     navigate('/events');
  //   } catch (error) {
  //     console.error('Error creating event:', error);
  //     setErrors({ title: 'Failed to create event. Please try again.' });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Prepare event data for the API request
      const eventData = {
        artistId: user!.id,
        title: formData.title,
        category: formData.category,
        eventType: formData.eventType,
        startDate: formData.startDate,
        endDate: formData.eventType === 'multiple' ? formData.endDate : formData.startDate,
        startTime: formData.startTime,
        endTime: formData.endTime,
        description: formData.description,
        city: formData.city,
        venue: formData.venue,
        ticketType: formData.ticketType,
        ticketName: formData.ticketName,
        ticketPrice: formData.ticketType === 'paid' ? parseFloat(formData.ticketPrice) : 0,
        ticketQuantity: parseInt(formData.ticketQuantity),
        ticketInfo: formData.ticketInfo,
        ticketEnabled: formData.ticketEnabled,
        ticketStatus: formData.ticketStatus,
        salesStart: `${formData.salesStartDate} ${formData.salesStartTime}`,
        salesEnd: `${formData.salesEndDate} ${formData.salesEndTime}`
      };

      // Make API call to create event
      const response = await fetch('http://localhost:8080/api/events/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error('Failed to create event');
      }

      const responseData = await response.json();
      console.log('Event Created:', responseData);
      alert('Event successfully created!');
      navigate('/events');

    } catch (error) {
      console.error('Error creating event:', error);
      setErrors({ title: 'Failed to create event. Please try again.' });
    } finally {
      setLoading(false);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <BasicInformation
        formData={formData}
        setFormData={setFormData}
        errors={errors}
      />
      
      <EventDetails
        formData={formData}
        setFormData={setFormData}
        errors={errors}
      />
      
      <TicketInformation
        formData={formData}
        setFormData={setFormData}
        errors={errors}
      />

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => navigate('/events')}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Event'}
        </button>
      </div>
    </form>
  );
}
