create table private.person_account (
  person_id uuid not null,
  email text,
  password_hash text,
  role text
);
