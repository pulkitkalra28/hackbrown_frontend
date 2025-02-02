import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Globe, Music } from 'lucide-react';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen pt-16">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      <div className="relative h-full flex items-center justify-center py-20 px-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Music className="w-8 h-8 sm:w-12 sm:h-12 text-purple-400" />
            <h1 className="text-2xl sm:text-4xl font-bold text-white">FindYourGig</h1>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            From Local Stages to <br />
            <span className="text-purple-400">Global Spotlight!</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto px-4">
          Empowering artists to shine globally while helping users discover events, explore passions, and connect with creativity.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
            <button 
              onClick={() => navigate('/events')}
              className="w-full sm:w-auto px-8 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-colors"
            >
              Explore Events
            </button>
            <button 
              onClick={() => navigate('/signup')}
              className="w-full sm:w-auto px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-colors"
            >
              Join as an Artist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}