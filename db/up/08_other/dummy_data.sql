do $$ begin
  insert into public.person(id, first_name) values('38567db5-7b72-40c6-a230-9424091aa683', 'thierry');
exception
  when unique_violation then null;
end $$;

do $$ begin
  insert into private.person_account values('38567db5-7b72-40c6-a230-9424091aa683', 'thierry@mail.com', crypt('password', gen_salt('md5')), 'user');
exception
  when unique_violation then null;
end $$;