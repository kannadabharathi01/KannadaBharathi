-- Add details column to public.user_roles
alter table public.user_roles add column if not exists details text;

-- Update trigger function to include details
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
    email,
    details
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
    new.email,
    new.raw_user_meta_data->>'details'
  );
  return new;
end;
$$ language plpgsql security definer;
