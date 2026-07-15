-- Drop old trigger and function
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user() cascade;
drop function if exists public.is_admin() cascade;

-- Drop old individual registration tables
drop table if exists public.learners_registration cascade;
drop table if exists public.teachers_registration cascade;
drop table if exists public.mentors_registration cascade;
drop table if exists public.organizers_registration cascade;
drop table if exists public.donors_registration cascade;

-- Drop old user_roles table
drop table if exists public.user_roles cascade;

-- Create the unified user_roles table containing all columns
create table public.user_roles (
  id text primary key,
  role public.user_role_type,
  name text,
  age integer,
  gender text,
  guardian text,
  constituency text,
  representative text,
  mother_tongue text default 'ಕನ್ನಡ',
  native_place text,
  occupation text,
  school text,
  linked_id_1 text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS) on user_roles
alter table public.user_roles enable row level security;

-- Function to check if the current user is an admin
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from public.user_roles
    where id = auth.uid()::text and role = 'admin'
  );
end;
$$ language plpgsql security definer;

-- Policies for user_roles
create policy "Allow public submissions for volunteer roles"
  on public.user_roles for insert
  with check (role != 'admin');

create policy "Allow admin full access"
  on public.user_roles for all
  using (public.is_admin());

create policy "Allow users to read their own role"
  on public.user_roles for select
  using (auth.uid()::text = id);

-- Re-create the trigger function to automatically link new auth.users with empty roles
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.user_roles (id, role)
  values (new.id::text, null);
  return new;
end;
$$ language plpgsql security definer;

-- Re-create trigger on auth.users table
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
