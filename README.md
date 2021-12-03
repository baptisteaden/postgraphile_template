# PostGraphile + fastify template 

## Get started
- rename `postgraphile-template/` folder under `docker/` to match your own app name (it's used just to have a decent app name in `Docker Desktop`)
- `docker/postgraphile_template/db/init` contains sql files that'll be executed to init your db if it's empty
  - file `00-auth.sql` contains the authentication logic, that allows to have different rights over the data depending on the role
  - you can delete other example files, describe your own schema and add some initial data here
- rename `.env.example` to `.env` and update it

## Notes
- the `graphql` service uses `nodemon` to automatically reflect changes to `server/index.js`, change to `node` in prod


## Helpers 

```
# start
cd docker/postgraphile_template && docker-compose up -d

# psql into container
docker-compose exec db psql -U postgres -d forum_example

# get db
docker-compose cp db:/var/lib/postgresql/data .
```