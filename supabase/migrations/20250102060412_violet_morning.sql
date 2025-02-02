/*
  # Add RLS policies for artists table
  
  1. Security Changes
    - Add policy for artists to insert their own records
    - Update existing policies for better security
*/

-- Allow artists to insert their own records
CREATE POLICY "Artists can insert their own records"
  ON artists
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = artists.id
      AND profiles.role = 'artist'
      AND profiles.id = auth.uid()
    )
  );

-- Update existing select policy to be more specific
DROP POLICY IF EXISTS "Users can view artist details" ON artists;
CREATE POLICY "Users can view artist details"
  ON artists
  FOR SELECT
  TO authenticated
  USING (true);

-- Update existing update policy
DROP POLICY IF EXISTS "Artists can update their own details" ON artists;
CREATE POLICY "Artists can update their own details"
  ON artists
  FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = artists.id
      AND profiles.role = 'artist'
      AND profiles.id = auth.uid()
    )
  );