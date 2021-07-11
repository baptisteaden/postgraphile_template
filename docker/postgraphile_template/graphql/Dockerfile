FROM node:alpine
LABEL description="Instant high-performance GraphQL API for your PostgreSQL database https://github.com/graphile/postgraphile"

WORKDIR /app

# Install PostGraphile and PostGraphile connection filter plugin
RUN npm install postgraphile postgraphile-plugin-connection-filter fastify nodemon middie cors

EXPOSE 5433
#ENTRYPOINT ["postgraphile", "-n", "0.0.0.0", "--watch"]
ENTRYPOINT ["npx", "nodemon", "server/index.js"]