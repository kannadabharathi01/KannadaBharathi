-- Create helper function to get a user's role safely (prevents policy recursion)
create or replace function public.get_user_role(user_id text)
returns public.user_role_type as $$
  select role from public.user_roles where id = user_id;
$$ language sql security definer;

-- Create helper function to get a user's constituency safely (prevents policy recursion)
create or replace function public.get_user_constituency(user_id text)
returns text as $$
  select constituency from public.user_roles where id = user_id;
$$ language sql security definer;

-- Policy: MLAs (ಜನಪ್ರತಿನಿಧಿಗಳು) can view MLAs, Mentors (ಮಾರ್ಗದರ್ಶಕರು), and Organizers (ಸಂಘಟಕರು) in their constituency
create policy "Allow MLAs to view constituency volunteers"
  on public.user_roles for select
  using (
    public.get_user_role(auth.uid()::text) = 'mla'
    and role in ('mla', 'mentor', 'organizer')
    and constituency = public.get_user_constituency(auth.uid()::text)
  );

-- Policy: Mentors (ಮಾರ್ಗದರ್ಶಕರು) can view Learners (ಕಲಿಯುವವರು), Teachers (ಕಲಿಸುವವರು/ಮಕ್ಕಳು), Organizers (ಸಂಘಟಕರು), and Donors (ದಾನಿಗಳು)
create policy "Allow Mentors to view learners, teachers, organizers, and donors"
  on public.user_roles for select
  using (
    public.get_user_role(auth.uid()::text) = 'mentor'
    and role in ('learner', 'teacher', 'organizer', 'donor')
  );
