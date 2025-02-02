/*
  # Delete all data from tables
  
  1. Changes
    - Delete all data from events table
    - Delete all data from artists table  
    - Delete all data from profiles table
    - Delete all auth.users data
*/

-- Delete data in correct order to maintain referential integrity
DELETE FROM events;
DELETE FROM artists;
DELETE FROM profiles;

-- Delete all users from auth schema
DELETE FROM auth.users;