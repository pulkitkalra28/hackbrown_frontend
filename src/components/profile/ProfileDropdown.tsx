import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle, LogOut, User, Calendar, FileText, Building2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState<'user' | 'artist' | 'business' | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    async function checkUserRole() {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .maybeSingle();

        if (error && error.code !== 'PGRST116') {
          console.error('Error checking user role:', error);
          return;
        }

        setUserRole(data?.role || null);
      } catch (error) {
        console.error('Error checking user role:', error);
      }
    }

    checkUserRole();
  }, [user]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-700 transition-colors"
      >
        <UserCircle className="w-6 h-6 text-gray-300" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
          <button
            onClick={() => {
              setIsOpen(false);
              navigate('/profile');
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <User className="w-4 h-4 mr-2" />
            Profile
          </button>
          
          <button
            onClick={() => {
              setIsOpen(false);
              navigate('/bookings');
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Calendar className="w-4 h-4 mr-2" />
            My Bookings
          </button>

          {userRole === 'artist' && (
            <button
              onClick={() => {
                setIsOpen(false);
                navigate('/artist/posts');
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <FileText className="w-4 h-4 mr-2" />
              My Posts
            </button>
          )}

          {userRole === 'business' && (
            <button
              onClick={() => {
                setIsOpen(false);
                navigate('/venues/my-venues');
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Building2 className="w-4 h-4 mr-2" />
              My Venues
            </button>
          )}
          
          <hr className="my-1" />
          
          <button
            onClick={handleSignOut}
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}