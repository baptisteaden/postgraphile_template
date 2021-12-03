\connect forum_example;

/*Create some dummy users*/
INSERT INTO public.user (username) VALUES
('Benjie'),
('Singingwolfboy'),
('Lexius');

/*Create some dummy posts*/
INSERT INTO public.post (title, body, author_id) VALUES
('First post example', 'Lorem ipsum dolor sit amet', 1),
('Second post example', 'Consectetur adipiscing elit', 2),
('Third post example', 'Aenean blandit felis sodales', 3);

--
insert into public.person(id, first_name) values('38567db5-7b72-40c6-a230-9424091aa683', 'thierry');
insert into private.person_account values('38567db5-7b72-40c6-a230-9424091aa683', 'thierry@mail.com', crypt('password', gen_salt('md5')), 'user');