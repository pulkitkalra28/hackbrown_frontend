import React from 'react';
import { Music } from 'lucide-react';
import FooterSection from './FooterSection';

const footerSections = [
  {
    title: 'Company',
    links: ['About Us', 'Contact Us']
  },
  {
    title: 'Community',
    links: ['Artist Stories', 'Blog']
  },
  {
    title: 'Legal',
    links: ['Terms of Service', 'Privacy Policy']
  }
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Music className="w-6 h-6 text-purple-400" />
              <span className="text-lg font-bold">FindYourGig</span>
            </div>
            <p className="text-gray-300 text-sm">
              Connecting local artists with global audiences.
            </p>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <FooterSection key={index} {...section} />
          ))}
        </div>
      </div>
    </footer>
  );
}