import React from 'react';
import { Search, CalendarCheck, Ticket } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Discover',
    description: 'Browse through a diverse range of artists and events in your area or worldwide.'
  },
  {
    icon: CalendarCheck,
    title: 'Book',
    description: 'Select your preferred event and secure your spot with our easy booking system.'
  },
  {
    icon: Ticket,
    title: 'Experience',
    description: 'Attend amazing performances and workshops, connecting with artists directly.'
  }
];

export default function HowItWorks() {
  return (
    <div className="py-24 bg-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600">Three simple steps to your next artistic experience</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}