/*
  # Fix Event Migration

  1. Changes
    - Drop and recreate foreign key constraint for events table
    - Update get_event_with_artist function with proper column types
    - Add art_type column to events table

  2. Security
    - Maintain existing RLS policies
*/

-- Drop existing foreign key constraint
ALTER TABLE events 
DROP CONSTRAINT IF EXISTS events_artist_id_fkey;

-- Add new foreign key constraint to artists table
ALTER TABLE events
ADD CONSTRAINT events_artist_id_fkey 
FOREIGN KEY (artist_id) 
REFERENCES artists(id)
ON DELETE CASCADE;

-- Drop existing function
DROP FUNCTION IF EXISTS get_event_with_artist(uuid);

-- Add art_type column to events table
ALTER TABLE events
ADD COLUMN art_type art_type NOT NULL DEFAULT 'other';

-- Recreate the function with proper column types
CREATE OR REPLACE FUNCTION get_event_with_artist(event_id uuid)
RETURNS TABLE (
  id uuid,
  name text,
  artist_id uuid,
  artist_name text,
  description text,
  event_date date,
  event_time varchar,
  location text,
  price numeric,
  total_tickets integer,
  available_tickets integer,
  image_url text,
  art_type art_type,
  status event_status,
  created_at timestamptz,
  updated_at timestamptz
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    e.id,
    e.name,
    e.artist_id,
    p.full_name as artist_name,
    e.description,
    e.date as event_date,
    e.time::varchar as event_time,
    e.location,
    e.price,
    e.total_tickets,
    e.available_tickets,
    e.image_url,
    e.art_type,
    e.status,
    e.created_at,
    e.updated_at
  FROM events e
  JOIN artists a ON a.id = e.artist_id
  JOIN profiles p ON p.id = a.id
  WHERE e.id = event_id;
END;
$$ LANGUAGE plpgsql;