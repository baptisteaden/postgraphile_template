do $$ begin
  create type public.jwt_token as (
    role text,
    exp integer,
    person_id uuid
  );
exception
  when duplicate_object then null;
end $$;