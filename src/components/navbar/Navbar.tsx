import React, { useState } from 'react';
import Logo from './Logo';
import SearchBar from './SearchBar';
import NavButtons from './NavButtons';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Desktop Navigation */}
        <div className="flex items-center justify-between h-16">
          <Logo />
          
          <div className="hidden md:block flex-1 px-8">
            <SearchBar />
          </div>
          
          <div className="hidden md:block">
            <NavButtons />
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-400 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="px-2 pb-4">
              <SearchBar />
            </div>
            <NavButtons />
          </div>
        )}
      </div>
    </nav>
  );
}