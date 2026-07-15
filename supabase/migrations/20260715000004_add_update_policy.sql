-- Add update policy for user_roles to allow registered users to complete their profile setup
create policy "Allow users to update their own row"
  on public.user_roles for update
  using (auth.uid()::text = id)
  with check (role != 'admin');
