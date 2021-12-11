create table if not exists private.person_account (
  person_id uuid unique not null,
  email text,
  password_hash text,
  role text
);
