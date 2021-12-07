A webapp template with postgres and postgraphile (auto-generates a graphql api based on a postgres db)

## Get started
- rename `.env.example` to `.env` and update it with your values
- start the containers locally with `docker-compose up -d`
- go in your local db with `docker-compose exec db psql -U postgres -d postgraphile_template` or try your graphql api by visiting `http://localhost:5433/graphiql`

## Notes
- `db/up` contains sql files that'll be executed to init your db if it's empty
  - keep the code in the folders if you want to keep the `public.authenticate` function, that'll allow to auth with jwt and setup rights
  - you can delete other example files, describe your own schema and add some initial data here
- postgres data lives in the volume `db/data`

## Helpers 

```
# start containers
docker-compose up -d

# psql into db container
docker-compose exec db psql -U postgres -d postgraphile_template

# rm db + restart all + psql
docker-compose down && sudo rm -rf db/data/ && docker-compose up --build -d && sleep 1 && docker-compose exec db psql -U postgres -d postgraphile_template
```