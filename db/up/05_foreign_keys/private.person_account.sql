alter table private.person_account 
add constraint fk_person_account_person 
foreign key (person_id) references public.person(id) on delete cascade;
