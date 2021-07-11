# PostGraphile + fastify template 

## Helpers 

```
# psql into container
docker-compose exec db psql -U postgres -d forum_example

# get db
docker-compose cp db:/var/lib/postgresql/data .
```