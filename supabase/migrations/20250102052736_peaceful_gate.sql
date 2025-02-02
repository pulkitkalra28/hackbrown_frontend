/*
  # Update profiles table policies

  1. Changes
    - Add INSERT policy for authenticated users to create their own profile
    - Update existing policies for better security

  2. Security
    - Users can only insert their own profile data
    - Users can only view and update their own profile
*/

-- Allow authenticated users to insert their own profile
CREATE POLICY "Users can create their own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Update existing policies to be more specific
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
CREATE POLICY "Users can view their own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);