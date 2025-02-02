/*
  # User Profiles and Artist Details Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `full_name` (text)
      - `role` (enum: 'user' or 'artist')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `artists`
      - `id` (uuid, primary key, references profiles)
      - `art_type` (enum)
      - `location` (text)
      - `bio` (text)
      - `youtube_url` (text, optional)
      - `instagram_url` (text, optional)
      - `twitter_url` (text, optional)
      - `website_url` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create enum types
CREATE TYPE user_role AS ENUM ('user', 'artist');
CREATE TYPE art_type AS ENUM ('dance', 'music', 'art', 'sports', 'other');

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create artists table
CREATE TABLE IF NOT EXISTS artists (
  id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  art_type art_type NOT NULL,
  location TEXT NOT NULL,
  bio TEXT,
  youtube_url TEXT,
  instagram_url TEXT,
  twitter_url TEXT,
  website_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE artists ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can view artist details"
  ON artists
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Artists can update their own details"
  ON artists
  FOR UPDATE
  TO authenticated
  USING (id = auth.uid());