import React from 'react';
import { Globe, Ticket, Calendar, Users } from 'lucide-react';

const features = [
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Share your art with audiences worldwide or discover talented artists from every corner of the globe.'
  },
  {
    icon: Ticket,
    title: 'Easy Ticketing',
    description: 'Seamless ticket purchasing and management for both artists and attendees.'
  },
  {
    icon: Calendar,
    title: 'Event Management',
    description: 'Powerful tools to create, manage, and promote your workshops and performances.'
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Connect with fellow artists and build your following in our vibrant creative community.'
  }
];

export default function Features() {
  return (
    <div className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Why Choose FindYourGig</h2>
          <p className="text-lg sm:text-xl text-gray-600">Everything you need to connect, create, and grow</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 sm:p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <feature.icon className="w-10 h-10 sm:w-12 sm:h-12 text-purple-600 mb-6" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}