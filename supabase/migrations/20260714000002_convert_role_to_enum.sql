-- Create custom role enum type
create type public.user_role_type as enum ('admin', 'learner', 'teacher', 'mentor', 'organizer', 'donor');

-- Drop the old check constraint on user_roles
alter table public.user_roles drop constraint if exists user_roles_role_check;

-- Change the user_roles.role column type to the enum
alter table public.user_roles 
  alter column role type public.user_role_type 
  using role::public.user_role_type;
