/*
  # Initial Schema Setup for LendTracker

  1. New Tables
    - `loans`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `friend_name` (text)
      - `amount` (numeric)
      - `remaining_amount` (numeric)
      - `date` (date)
      - `due_date` (date, optional)
      - `note` (text, optional)
      - `status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `payments`
      - `id` (uuid, primary key)
      - `loan_id` (uuid, references loans)
      - `amount` (numeric)
      - `date` (date)
      - `note` (text, optional)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create loans table
CREATE TABLE IF NOT EXISTS loans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  friend_name text NOT NULL,
  amount numeric NOT NULL CHECK (amount > 0),
  remaining_amount numeric NOT NULL CHECK (remaining_amount >= 0),
  date date NOT NULL,
  due_date date,
  note text,
  status text NOT NULL CHECK (status IN ('active', 'overdue', 'fully-paid')),
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  loan_id uuid REFERENCES loans ON DELETE CASCADE NOT NULL,
  amount numeric NOT NULL CHECK (amount > 0),
  date date NOT NULL,
  note text,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE loans ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Create policies for loans
CREATE POLICY "Users can create their own loans"
  ON loans
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own loans"
  ON loans
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own loans"
  ON loans
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own loans"
  ON loans
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for payments
CREATE POLICY "Users can create payments for their loans"
  ON payments
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM loans
      WHERE loans.id = loan_id
      AND loans.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view payments for their loans"
  ON payments
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM loans
      WHERE loans.id = loan_id
      AND loans.user_id = auth.uid()
    )
  );

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON loans
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();