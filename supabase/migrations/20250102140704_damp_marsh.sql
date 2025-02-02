/*
  # Fix Stack Depth Issues

  1. Changes
    - Simplify RLS policies for events table
    - Remove recursive function calls
    - Optimize policy checks

  2. Security
    - Maintain same security rules with optimized implementation
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Artists can create their own events" ON events;
DROP POLICY IF EXISTS "Anyone can view events" ON events;
DROP POLICY IF EXISTS "Artists can update their own events" ON events;

-- Simplified policies
CREATE POLICY "Artists can create their own events"
  ON events
  FOR INSERT
  TO authenticated
  WITH CHECK (
    artist_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'artist'
    )
  );

CREATE POLICY "Anyone can view events"
  ON events
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Artists can update their own events"
  ON events
  FOR UPDATE
  TO authenticated
  USING (
    artist_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'artist'
    )
  );