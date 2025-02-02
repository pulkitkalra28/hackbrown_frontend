/*
  # Add event status and bookings

  1. Changes
    - Add event status enum type
    - Add status column to events table
    - Create bookings table
    - Add RLS policies for bookings

  2. Security
    - Enable RLS on bookings table
    - Add policies for users to view their own bookings
    - Add policies for artists to view bookings for their events
*/

-- Create event status enum
CREATE TYPE event_status AS ENUM ('upcoming', 'completed', 'cancelled');

-- Add status column to events table
ALTER TABLE events 
ADD COLUMN status event_status NOT NULL DEFAULT 'upcoming';

-- Create bookings table
CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id),
  event_id uuid NOT NULL REFERENCES events(id),
  ticket_count integer NOT NULL CHECK (ticket_count > 0),
  total_price numeric(10,2) NOT NULL CHECK (total_price >= 0),
  status event_status NOT NULL DEFAULT 'upcoming',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Policies for bookings
CREATE POLICY "Users can view their own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Artists can view bookings for their events"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM events
      WHERE events.id = bookings.event_id
      AND events.artist_id = auth.uid()
    )
  );

-- Function to update event status based on date
CREATE OR REPLACE FUNCTION update_event_status()
RETURNS trigger AS $$
BEGIN
  -- Update status to completed if event date has passed
  UPDATE events
  SET status = 'completed'
  WHERE date < CURRENT_DATE
  AND status = 'upcoming';
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to run daily
CREATE OR REPLACE TRIGGER update_event_status_trigger
  AFTER INSERT OR UPDATE ON events
  FOR EACH STATEMENT
  EXECUTE FUNCTION update_event_status();