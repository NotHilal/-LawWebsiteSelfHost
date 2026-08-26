-- Run this once in the Supabase dashboard: Project → SQL Editor → New query
-- → paste this whole file → Run.

create table if not exists requests (
  id uuid primary key,
  name text not null,
  organization text,
  title text,
  email text not null,
  phone text,
  interest text,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- RLS on with zero policies = nobody can read/write this table through the
-- public API (anon/authenticated keys), full stop. Our /api functions use
-- the service_role key instead, which always bypasses RLS — so this is
-- purely a safety net in case the anon key ever ends up somewhere it
-- shouldn't, not something that needs a matching policy to make the app work.
alter table requests enable row level security;
