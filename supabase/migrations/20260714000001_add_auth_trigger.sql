-- Drop not null and default constraints on user_roles.role
alter table public.user_roles alter column role drop not null;
alter table public.user_roles alter column role drop default;

-- Create the trigger function to automatically link new auth.users
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.user_roles (id, role)
  values (new.id, null);
  return new;
end;
$$ language plpgsql security definer;

-- Drop trigger if it already exists
drop trigger if exists on_auth_user_created on auth.users;

-- Create the trigger on auth.users table
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
