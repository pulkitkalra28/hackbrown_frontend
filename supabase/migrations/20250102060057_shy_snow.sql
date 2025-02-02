/*
  # Create events table and policies

  1. New Tables
    - `events`
      - `id` (uuid, primary key)
      - `artist_id` (uuid, foreign key to artists)
      - `name` (text)
      - `description` (text)
      - `date` (date)
      - `time` (time)
      - `location` (text)
      - `price` (numeric)
      - `total_tickets` (integer)
      - `available_tickets` (integer)
      - `image_url` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `events` table
    - Add policies for:
      - Artists can create their own events
      - Anyone can view published events
      - Artists can update their own events
*/

CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id uuid NOT NULL REFERENCES artists(id),
  name text NOT NULL,
  description text NOT NULL,
  date date NOT NULL,
  time time NOT NULL,
  location text NOT NULL,
  price numeric(10,2) NOT NULL CHECK (price >= 0),
  total_tickets integer NOT NULL CHECK (total_tickets > 0),
  available_tickets integer NOT NULL CHECK (available_tickets >= 0),
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Allow artists to create their own events
CREATE POLICY "Artists can create their own events"
  ON events
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM artists 
      WHERE id = artist_id 
      AND id = auth.uid()
    )
  );

-- Allow anyone to view events
CREATE POLICY "Anyone can view events"
  ON events
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow artists to update their own events
CREATE POLICY "Artists can update their own events"
  ON events
  FOR UPDATE
  TO authenticated
  USING (artist_id = auth.uid())
  WITH CHECK (artist_id = auth.uid());