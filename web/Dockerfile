FROM node:lts-alpine

WORKDIR /app

COPY package.json .

RUN npm install

ENV HOST=0.0.0.0

ENTRYPOINT ["npm", "run", "dev"]