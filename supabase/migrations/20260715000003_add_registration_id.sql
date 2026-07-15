-- Add registration_id text column to public.user_roles
alter table public.user_roles add column if not exists registration_id text;
