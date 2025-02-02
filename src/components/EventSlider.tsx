import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Clock, Ticket } from 'lucide-react';

const recommendedEvents = [
    {
      id: '1',
      name: 'Salsa Night Extravaganza',
      artistName: 'Carlos & Isabella',
      date: 'Mar 15, 2024',
      time: '8:00 PM',
      location: 'Brooklyn Dance Studio, New York',
      price: 25,
      imageUrl: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: '2',
      name: 'Hip-Hop Freestyle Battle',
      artistName: 'Marcus Rivera & Crew',
      date: 'Mar 18, 2024',
      time: '6:00 PM',
      location: 'Downtown Dance Arena, Jersey City, New Jersey',
      price: 30,
      imageUrl: 'https://plus.unsplash.com/premium_photo-1710064217185-8351ee74d564?q=80&w=2954&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: '3',
      name: 'Broadway Jazz Showcase',
      artistName: 'New York Jazz Collective',
      date: 'Mar 20, 2024',
      time: '10:00 AM',
      location: 'Lincoln Center, New York',
      price: 15,
      imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80'
    },
    {
      id: '4',
      name: 'Rock & Blues Jam Session',
      artistName: 'The Midnight Strikers',
      date: 'Mar 22, 2024',
      time: '9:00 PM',
      location: 'The Stone Pony, Asbury Park, New Jersey',
      price: 35,
      imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80'
    },
    {
      id: '5',
      name: 'Classical Ballet Performance',
      artistName: 'New York Ballet Ensemble',
      date: 'Mar 25, 2024',
      time: '7:30 PM',
      location: 'Metropolitan Opera House, New York',
      price: 40,
      imageUrl: 'https://images.unsplash.com/photo-1598255539863-122cca274e15?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: '6',
      name: 'Live Orchestra & Symphony Night',
      artistName: 'New Jersey Symphony Orchestra',
      date: 'Mar 28, 2024',
      time: '7:00 PM',
      location: 'New Jersey Performing Arts Center, Newark, New Jersey',
      price: 50,
      imageUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&q=80'
    }
  ];
  

function EventCard({ event }: { event: typeof recommendedEvents[0] }) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden w-full h-[450px] flex flex-col border border-gray-700">
      <div className="aspect-w-16 aspect-h-9 h-48">
        <img
          src={event.imageUrl}
          alt={event.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-6 flex flex-col flex-grow bg-gradient-to-b from-gray-800 to-gray-900">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
          {event.name}
        </h3>
        <p className="text-purple-400 font-medium mb-4">{event.artistName}</p>
        
        <div className="space-y-2 text-sm text-gray-300 flex-grow">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{event.date}</span>
          </div>
          
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            <span>{event.time}</span>
          </div>
          
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center text-white">
            <Ticket className="w-4 h-4 mr-1" />
            <span className="font-bold">${event.price}</span>
          </div>
          
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default function EventSlider() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const eventsPerSlide = 3;
  const totalSlides = Math.ceil(recommendedEvents.length / eventsPerSlide);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  const currentEvents = recommendedEvents.slice(
    currentIndex * eventsPerSlide,
    (currentIndex + 1) * eventsPerSlide
  );

  return (
    <div className="bg-gray-900 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Recommended for You</h2>
          <p className="text-xl text-gray-300">Discover events tailored to your interests</p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-gray-800 shadow-lg hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-gray-800 shadow-lg hover:bg-gray-700 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Events Grid */}
          <div className="relative overflow-hidden">
            <div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {currentEvents.map((event) => (
                <div 
                  key={event.id} 
                  onClick={() => navigate(`/events/${event.id}`)}
                  className="cursor-pointer"
                >
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center space-x-2 mt-8">
          {[...Array(totalSlides)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-purple-400' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}