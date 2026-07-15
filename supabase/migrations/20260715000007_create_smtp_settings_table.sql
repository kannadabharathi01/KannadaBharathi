-- Create SMTP settings table to store custom mail credentials
create table if not exists public.smtp_settings (
  id integer primary key default 1 check (id = 1),
  host text not null,
  port integer not null,
  user_name text not null,
  password text not null,
  from_email text not null,
  updated_at timestamp with time zone default now() not null
);

-- Enable RLS on smtp_settings
alter table public.smtp_settings enable row level security;

-- Policies for smtp_settings: only admin can read and update
create policy "Allow admin full access to smtp_settings"
  on public.smtp_settings for all
  using (public.is_admin());

-- Create pending registrations table to store unverified volunteer signups and OTPs
create table if not exists public.pending_registrations (
  email text primary key,
  password text not null,
  otp text not null,
  registration_id text not null,
  payload jsonb not null,
  created_at timestamp with time zone default now() not null,
  expires_at timestamp with time zone not null
);

-- Enable RLS on pending_registrations
alter table public.pending_registrations enable row level security;

-- No public policies are added for pending_registrations.
-- All inserts, select, and deletes will be performed securely on the server-side via Next.js API Routes using the service role client.
