A webapp template with postgres and postgraphile (auto-generated a graphql api)

## Get started
- rename `.env.example` to `.env` and update it with your values
- start the containers locally with `docker-compose up -d`
- go in your local db with `docker-compose exec db psql -U postgres -d postgraphile_template` or try your graphql api by visiting `http://localhost:5433/graphiql`

## Deploy
### API & database (using heroku)
- in heroku ui, create an app
- in `Resources` tab add the addon `Heroku Postgres`
- in `Settings` tab, click `Reveal Config Vars` and put the content of `.env.example` updated with your values (variable `DATABASE_URL` is init by the `Heroku Postgres` addon, use it to init other variables `POSTGRES_USER`, `POSTGRES_PASSWORD`, `PORT` and `POSTGRES_DB`)
- in the `Deploy` tab, connect this heroku app to your repository and manually deploy (or enable auto deploy if you prefer)
- wait until it's deployed, then in your terminal type `heroku run node db/migrate.js` to init the db
### UI (using netlify)
- in netlify ui, `Add new site` > `Import existing project` and select your repo
- put `web/` in the `Base directory` input, `web/dist/` in the `Publish directory` one and `npm run build` as the `Build command`

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

# rm db + restart all
docker-compose down && sudo rm -rf db/data/ && docker-compose up --build -d && sleep 1 
```