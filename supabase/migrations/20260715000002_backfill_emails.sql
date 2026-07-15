-- Backfill any existing user_roles rows that have NULL email by copying from auth.users
update public.user_roles ur
set email = au.email
from auth.users au
where ur.id = au.id::text and ur.email is null;
