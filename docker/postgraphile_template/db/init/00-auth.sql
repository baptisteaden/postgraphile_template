create extension pgcrypto;
create schema private;

-- token type - if you change its name, change POSTGRES_JWT_TOKEN_TYPE too
create type public.jwt_token as (
  role text,
  exp integer,
  person_id uuid
);

create table public.person (
  id uuid primary key default gen_random_uuid(),
  first_name text,
  last_name text
);

create table private.person_account (
  person_id uuid not null references public.person(id) on delete cascade,
  email text,
  password_hash text,
  role text
);

create function public.authenticate(
  email text,
  password text
) returns public.jwt_token as $$
declare
  account private.person_account;
begin
  select a.* into account
    from private.person_account as a
    where a.email = authenticate.email;

  if account.password_hash = crypt(password, account.password_hash) then
    return (
      account.role,
      extract(epoch from now() + interval '7 days'),
      account.person_id
    )::public.jwt_token;
  else
    return null;
  end if;
end;
$$ language plpgsql strict security definer;
