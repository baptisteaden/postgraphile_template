FROM node:lts-alpine

WORKDIR /app

RUN npm install postgraphile postgraphile-plugin-connection-filter fastify nodemon middie cors

EXPOSE 5433

#ENTRYPOINT ["postgraphile", "-n", "0.0.0.0", "--watch"]
ENTRYPOINT ["npx", "nodemon", "server/index.js"]