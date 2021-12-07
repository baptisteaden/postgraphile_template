FROM postgres:14.1-alpine

ARG POSTGRES_DB

WORKDIR /docker-entrypoint-initdb.d

COPY ./up .

RUN echo "\connect $POSTGRES_DB" | cat - 00_init.sql > tmp && mv tmp 00_init.sql