-- Run ONCE in the Supabase SQL editor, after the migrations.
-- Replace the two e-mail addresses and names below with your own (lowercase e-mail).

with h as (
  insert into public.households (name) values ('Familien') returning id
)
insert into public.allowed_emails (email, household_id, display_name)
select e.email, h.id, e.name
from h, (values
  ('forelder1@gmail.com', 'Henrik'),
  ('forelder2@gmail.com', 'Partner')
) as e(email, name);
