-- Update the handle_new_user trigger to populate all fields from raw_user_meta_data
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.user_roles (
    id,
    role,
    name,
    age,
    gender,
    guardian,
    constituency,
    representative,
    mother_tongue,
    native_place,
    occupation,
    school,
    linked_id_1,
    registration_id,
    email
  )
  values (
    new.id::text,
    coalesce((new.raw_user_meta_data->>'role')::public.user_role_type, null),
    new.raw_user_meta_data->>'name',
    (new.raw_user_meta_data->>'age')::integer,
    new.raw_user_meta_data->>'gender',
    new.raw_user_meta_data->>'guardian',
    new.raw_user_meta_data->>'constituency',
    new.raw_user_meta_data->>'representative',
    coalesce(new.raw_user_meta_data->>'mother_tongue', 'ಕನ್ನಡ'),
    new.raw_user_meta_data->>'native_place',
    new.raw_user_meta_data->>'occupation',
    new.raw_user_meta_data->>'school',
    new.raw_user_meta_data->>'linked_id_1',
    new.raw_user_meta_data->>'registration_id',
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

-- Create delete trigger to remove auth user when row is deleted from user_roles
create or replace function public.handle_delete_user()
returns trigger as $$
begin
  delete from auth.users where id = old.id::uuid;
  return old;
end;
$$ language plpgsql security definer;

drop trigger if exists on_user_role_deleted on public.user_roles;

create trigger on_user_role_deleted
  after delete on public.user_roles
  for each row execute procedure public.handle_delete_user();
