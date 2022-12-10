FROM node:16

WORKDIR /app

COPY package.json .
COPY server .

RUN npm install

#EXPOSE 5433

#ENTRYPOINT ["postgraphile", "-n", "0.0.0.0", "--watch"]
ENTRYPOINT ["node", "server/index.js"]