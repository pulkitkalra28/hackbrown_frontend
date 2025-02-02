/*
  # Add business role to user_role enum

  1. Changes
    - Add 'business' to user_role enum type
*/

ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'business';