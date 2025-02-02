import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Eye, EyeOff, User, Music, Building2 } from 'lucide-react';

type FormData = {
  fullName: string;
  email: string;
  password: string;
  role: 'user' | 'artist' | 'business';
};

export default function SignUpForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      // 1. Sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      if (authData.user) {
        // 2. Create the profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            full_name: formData.fullName,
            role: formData.role,
          });

        if (profileError) throw profileError;

        // 3. Navigate based on role
        if (formData.role === 'artist') {
          navigate('/artist-details', { 
            state: { userId: authData.user.id },
            replace: true
          });
        } else if (formData.role === 'business') {
          navigate('/venues/create', {
            replace: true
          });
        } else {
          navigate('/events', { replace: true });
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setErrors({ submit: 'An error occurred during signup' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Role Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'user' })}
              className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-colors ${
                formData.role === 'user'
                  ? 'border-purple-600 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-200'
              }`}
            >
              <User className={`w-8 h-8 mb-2 ${formData.role === 'user' ? 'text-purple-600' : 'text-gray-400'}`} />
              <span className={`text-sm font-medium ${formData.role === 'user' ? 'text-purple-600' : 'text-gray-600'}`}>
                User
              </span>
              <p className="text-xs text-gray-500 mt-1 text-center">
                Find and book amazing events near you
              </p>
            </button>

            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'artist' })}
              className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-colors ${
                formData.role === 'artist'
                  ? 'border-purple-600 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-200'
              }`}
            >
              <Music className={`w-8 h-8 mb-2 ${formData.role === 'artist' ? 'text-purple-600' : 'text-gray-400'}`} />
              <span className={`text-sm font-medium ${formData.role === 'artist' ? 'text-purple-600' : 'text-gray-600'}`}>
                Artist
              </span>
              <p className="text-xs text-gray-500 mt-1 text-center">
                Host events and showcase your talent
              </p>
            </button>

            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'business' })}
              className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-colors ${
                formData.role === 'business'
                  ? 'border-purple-600 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-200'
              }`}
            >
              <Building2 className={`w-8 h-8 mb-2 ${formData.role === 'business' ? 'text-purple-600' : 'text-gray-400'}`} />
              <span className={`text-sm font-medium ${formData.role === 'business' ? 'text-purple-600' : 'text-gray-600'}`}>
                Business
              </span>
              <p className="text-xs text-gray-500 mt-1 text-center">
                List your venues for artists to book
              </p>
            </button>
          </div>

          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
          </div>

          {errors.submit && (
            <p className="text-red-500 text-sm text-center">{errors.submit}</p>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Sign up'}
            </button>
          </div>

          <div className="text-sm text-center">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="font-medium text-purple-600 hover:text-purple-500"
            >
              Already have an account? Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}