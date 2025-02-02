import React from 'react';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import { Music, Globe, Users, Award } from 'lucide-react';

const stats = [
  { label: 'Active Artists', value: '2,000+', icon: Users },
  { label: 'Events Hosted', value: '10,000+', icon: Music },
  { label: 'Cities', value: '50+', icon: Globe },
  { label: 'Artist Success Rate', value: '95%', icon: Award }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-16">
        {/* Hero Section */}
        <div className="bg-purple-600 text-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Mission</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Connecting talented artists with passionate audiences worldwide, creating unforgettable experiences one event at a time.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <stat.icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2024, FindYourGig emerged from a simple idea: making it easier for artists to connect with their audience. What started as a small platform has grown into a global community of creators and art enthusiasts.
              </p>
              <p className="text-lg text-gray-600">
                Today, we're proud to support thousands of artists worldwide, helping them showcase their talent and connect with passionate audiences who appreciate their craft.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}