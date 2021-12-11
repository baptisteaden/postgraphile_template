A webapp template with postgres and postgraphile (auto-generates a graphql api based on a postgres db)

## Get started
- rename `.env.example` to `.env` and update it with your values
- start the containers locally with `docker-compose up -d`
- go in your local db with `docker-compose exec db psql -U postgres -d postgraphile_template` or try your graphql api by visiting `http://localhost:5433/graphiql`

## Notes
- postgres data lives in the volume `db/data`
- you can describe your db schema with sql files and add some initial data if you want in the folders under `db/up`
  - keep the code already here if you want to keep the `public.authenticate` function, that'll allow to auth with jwt and setup rights
  - perform manual migrations with `node db/migrate.js` (needs to have nodejs installed locally)

## Helpers 

```
# start containers
docker-compose up -d

# psql into db container
docker-compose exec db psql -U postgres -d postgraphile_template

# rm db + restart all + psql
docker-compose down && sudo rm -rf db/data/ && docker-compose up --build -d && sleep 1 && docker-compose exec db psql -U postgres -d postgraphile_template
```