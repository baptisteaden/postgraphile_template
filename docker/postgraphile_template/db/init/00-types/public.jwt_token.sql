create type public.jwt_token as (
  role text,
  exp integer,
  person_id uuid
);
