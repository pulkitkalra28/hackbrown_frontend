/*
  # Fix Events RLS policies
  
  1. Security Changes
    - Update insert policy for events table
    - Ensure proper artist role checking
*/

-- Drop existing policy
DROP POLICY IF EXISTS "Artists can create their own events" ON events;

-- Create new insert policy with proper role checking
CREATE POLICY "Artists can create their own events"
  ON events
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = artist_id
      AND profiles.role = 'artist'
      AND profiles.id = auth.uid()
    )
  );

-- Update select policy
DROP POLICY IF EXISTS "Anyone can view events" ON events;
CREATE POLICY "Anyone can view events"
  ON events
  FOR SELECT
  TO authenticated
  USING (true);

-- Update update policy
DROP POLICY IF EXISTS "Artists can update their own events" ON events;
CREATE POLICY "Artists can update their own events"
  ON events
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = artist_id
      AND profiles.role = 'artist'
      AND profiles.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = artist_id
      AND profiles.role = 'artist'
      AND profiles.id = auth.uid()
    )
  );