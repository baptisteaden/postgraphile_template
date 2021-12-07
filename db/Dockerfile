FROM postgres:14.1-alpine

ARG POSTGRES_DB
ARG DB_WORKDIR

WORKDIR $DB_WORKDIR

COPY ./up .

RUN echo "\connect $POSTGRES_DB" | cat - 00_init/init.sql > tmp && mv tmp 00_init/init.sql