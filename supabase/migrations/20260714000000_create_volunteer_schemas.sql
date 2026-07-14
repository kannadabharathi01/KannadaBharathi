-- Create custom role enum type
create type public.user_role_type as enum ('admin', 'learner', 'teacher', 'mentor', 'organizer', 'donor');

-- Create user_roles table to manage permissions
create table public.user_roles (
  id uuid references auth.users(id) on delete cascade primary key,
  role public.user_role_type,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on user_roles
alter table public.user_roles enable row level security;

-- Function to check if the current authenticated user is an admin
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from public.user_roles
    where id = auth.uid() and role = 'admin'
  );
end;
$$ language plpgsql security definer;

-- Policies for user_roles
create policy "Allow users to read their own role"
  on public.user_roles for select
  using (auth.uid() = id);

create policy "Allow admin full access to user_roles"
  on public.user_roles for all
  using (public.is_admin());


-- 1. Learners Registration Table
create table public.learners_registration (
  id text primary key,
  name text not null,
  age integer not null,
  gender text not null,
  guardian text not null,
  constituency text not null,
  representative text not null,
  mother_tongue text not null default 'ಕನ್ನಡ',
  native_place text not null,
  occupation text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for learners_registration
alter table public.learners_registration enable row level security;

-- Policies for learners_registration
create policy "Allow public submissions"
  on public.learners_registration for insert
  with check (true);

create policy "Allow admin full read and write access"
  on public.learners_registration for all
  using (public.is_admin());


-- 2. Teachers Registration Table (Children Who Teach)
create table public.teachers_registration (
  id text primary key,
  name text not null,
  age integer not null,
  gender text not null,
  guardian text not null,
  constituency text not null,
  representative text not null,
  school text not null,
  linked_id_1 text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for teachers_registration
alter table public.teachers_registration enable row level security;

-- Policies for teachers_registration
create policy "Allow public submissions"
  on public.teachers_registration for insert
  with check (true);

create policy "Allow admin full read and write access"
  on public.teachers_registration for all
  using (public.is_admin());


-- 3. Mentors Registration Table
create table public.mentors_registration (
  id text primary key,
  name text not null,
  age integer not null,
  gender text not null,
  guardian text not null,
  constituency text not null,
  representative text not null,
  occupation text not null,
  linked_id_1 text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for mentors_registration
alter table public.mentors_registration enable row level security;

-- Policies for mentors_registration
create policy "Allow public submissions"
  on public.mentors_registration for insert
  with check (true);

create policy "Allow admin full read and write access"
  on public.mentors_registration for all
  using (public.is_admin());


-- 4. Organizers Registration Table
create table public.organizers_registration (
  id text primary key,
  name text not null,
  age integer not null,
  gender text not null,
  guardian text not null,
  constituency text not null,
  representative text not null,
  occupation text not null,
  linked_id_1 text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for organizers_registration
alter table public.organizers_registration enable row level security;

-- Policies for organizers_registration
create policy "Allow public submissions"
  on public.organizers_registration for insert
  with check (true);

create policy "Allow admin full read and write access"
  on public.organizers_registration for all
  using (public.is_admin());


-- 5. Donors Registration Table
create table public.donors_registration (
  id text primary key,
  name text not null,
  age integer not null,
  gender text not null,
  guardian text not null,
  constituency text not null,
  representative text not null,
  school text not null, -- Represents Organization/Trust Name
  linked_id_1 text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for donors_registration
alter table public.donors_registration enable row level security;

-- Policies for donors_registration
create policy "Allow public submissions"
  on public.donors_registration for insert
  with check (true);

create policy "Allow admin full read and write access"
  on public.donors_registration for all
  using (public.is_admin());

-- Create the trigger function to automatically link new auth.users
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.user_roles (id, role)
  values (new.id, null);
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger on auth.users table
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
