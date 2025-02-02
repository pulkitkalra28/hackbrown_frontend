import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { User, Users } from 'lucide-react';

export default function ProfileSection() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Mock data - in a real app, this would come from the database
  const following = 0;
  const followers = 0;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {user?.email?.split('@')[0] || 'User'}
            </h2>
            <p className="text-gray-600">Artist</p>
          </div>
        </div>
        <button 
          onClick={() => navigate('/profile/edit')}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Edit Profile
        </button>
      </div>

      <div className="flex items-center space-x-8 mt-6">
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-600">Following</p>
            <p className="font-semibold text-gray-900">{following}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-600">Followers</p>
            <p className="font-semibold text-gray-900">{followers}</p>
          </div>
        </div>
      </div>
    </div>
  );
}