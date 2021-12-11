create table if not exists public.person (
  id uuid primary key default gen_random_uuid(),
  first_name text,
  last_name text
);
