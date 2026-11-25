-- Core: households, allow-list, profiles, activity log, and the RLS helper.

create table public.households (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

-- Who may sign in. Only readable by the service role (RLS on, no policies).
create table public.allowed_emails (
  email text primary key check (email = lower(email)),
  household_id uuid not null references public.households on delete cascade,
  display_name text
);

create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  household_id uuid not null references public.households on delete restrict,
  display_name text not null,
  email text not null,
  avatar_color text,
  morning_brief_enabled boolean not null default true,
  notify_tasks boolean not null default true,
  timezone text not null default 'Europe/Oslo',
  created_at timestamptz not null default now()
);
create index on public.profiles (household_id);

-- The signed-in user's household. SECURITY DEFINER so policies can call it without recursion.
create or replace function public.my_household_id()
returns uuid
language sql
stable
security definer
set search_path = ''
as $$
  select household_id from public.profiles where id = auth.uid()
$$;

-- Refuse sign-ups that are not on the allow-list; create the profile for those that are.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  allowed public.allowed_emails;
begin
  select * into allowed from public.allowed_emails where email = lower(new.email);
  if not found then
    raise exception 'Email % is not on the allow-list', new.email
      using errcode = 'insufficient_privilege';
  end if;

  insert into public.profiles (id, household_id, display_name, email)
  values (
    new.id,
    allowed.household_id,
    coalesce(allowed.display_name, new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    lower(new.email)
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Who did what, from where (app, Claude via MCP, or the system).
create table public.activity_log (
  id bigint generated always as identity primary key,
  household_id uuid not null references public.households on delete cascade,
  user_id uuid references public.profiles on delete set null,
  source text not null check (source in ('app', 'claude', 'system')),
  action text not null,
  entity text not null,
  entity_id text,
  details jsonb not null default '{}',
  created_at timestamptz not null default now()
);
create index on public.activity_log (household_id, created_at desc);

-- Row Level Security -------------------------------------------------------

alter table public.households enable row level security;
alter table public.allowed_emails enable row level security;
alter table public.profiles enable row level security;
alter table public.activity_log enable row level security;

revoke all on public.allowed_emails from anon, authenticated;

create policy "members read own household" on public.households
  for select to authenticated using (id = public.my_household_id());

create policy "members read household profiles" on public.profiles
  for select to authenticated using (household_id = public.my_household_id());

create policy "users update own profile" on public.profiles
  for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

-- Users may only change harmless profile columns (never household_id or email).
revoke update on public.profiles from authenticated;
grant update (display_name, avatar_color, morning_brief_enabled, notify_tasks, timezone)
  on public.profiles to authenticated;

create policy "members read activity" on public.activity_log
  for select to authenticated using (household_id = public.my_household_id());

create policy "members write activity" on public.activity_log
  for insert to authenticated
  with check (household_id = public.my_household_id() and user_id = auth.uid());

revoke all on public.households, public.profiles, public.activity_log from anon;
