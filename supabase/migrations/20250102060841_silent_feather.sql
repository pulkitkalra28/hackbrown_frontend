/*
  # Add stored function for artist profile creation
  
  1. New Function
    - create_artist_profile: Creates artist record with proper transaction handling
*/

CREATE OR REPLACE FUNCTION create_artist_profile(
  p_user_id UUID,
  p_art_type art_type,
  p_location TEXT,
  p_bio TEXT,
  p_youtube_url TEXT DEFAULT NULL,
  p_instagram_url TEXT DEFAULT NULL,
  p_twitter_url TEXT DEFAULT NULL,
  p_website_url TEXT DEFAULT NULL
) RETURNS void AS $$
BEGIN
  -- Verify user is an artist
  IF NOT EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = p_user_id 
    AND role = 'artist'
  ) THEN
    RAISE EXCEPTION 'User is not an artist';
  END IF;

  -- Insert artist record
  INSERT INTO artists (
    id,
    art_type,
    location,
    bio,
    youtube_url,
    instagram_url,
    twitter_url,
    website_url
  ) VALUES (
    p_user_id,
    p_art_type,
    p_location,
    p_bio,
    p_youtube_url,
    p_instagram_url,
    p_twitter_url,
    p_website_url
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;