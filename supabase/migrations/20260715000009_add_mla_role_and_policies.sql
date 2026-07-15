-- Alter the user_role_type enum to include 'mla'
alter type public.user_role_type add value if not exists 'mla';
