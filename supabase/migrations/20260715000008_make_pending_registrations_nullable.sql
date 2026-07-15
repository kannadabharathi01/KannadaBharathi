-- Make columns nullable in pending_registrations to support early email OTP validation
alter table public.pending_registrations alter column password drop not null;
alter table public.pending_registrations alter column registration_id drop not null;
alter table public.pending_registrations alter column payload drop not null;

-- Add is_verified column
alter table public.pending_registrations add column if not exists is_verified boolean default false;
