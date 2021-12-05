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
