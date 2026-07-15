-- Add email column to public.user_roles table
alter table public.user_roles add column if not exists email text;

-- Update trigger function to insert both id and email when a user is created in auth
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.user_roles (id, email, role)
  values (new.id::text, new.email, null);
  return new;
end;
$$ language plpgsql security definer;
