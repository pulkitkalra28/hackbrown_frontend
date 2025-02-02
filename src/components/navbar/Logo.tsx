import React from 'react';
import { Music } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Logo() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate('/')}
      className="flex items-center space-x-2"
    >
      <Music className="w-8 h-8 text-purple-400" />
      <span className="text-xl font-bold text-white">FindYourGig</span>
    </button>
  );
}
