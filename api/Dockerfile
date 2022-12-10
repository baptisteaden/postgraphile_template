FROM node:16

WORKDIR /app

COPY package.json .

RUN npm install

#EXPOSE 5433

#ENTRYPOINT ["postgraphile", "-n", "0.0.0.0", "--watch"]
ENTRYPOINT ["npx", "nodemon", "server/index.js"]