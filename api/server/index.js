(async () => {
  const { postgraphile } = require("postgraphile");
  const fastify = require("fastify")({ logger: true });

  await fastify.register(require("middie"));
  fastify.use(require("cors")());

  const ssl = process.env.NODE_ENV === "production" && {
    rejectUnauthorized: false,
  };
  fastify.use(
    postgraphile(
      {
        connectionString:
          `${process.env.DATABASE_URL}${ssl ? "" : ""}` ??
          "postgres://postgres/",
        ssl,
      },
      "public",
      {
        watchPg: true,
        graphiql: true,
        enhanceGraphiql: true,
        jwtPgTypeIdentifier: "public.jwt_token",
        jwtSecret: process.env.JWT_SECRET,
        rejectUnauthorized: false,
      }
    )
  );

  fastify.get("/", (req, res) => {
    res.send({ hello: "world" });
  });

  fastify.listen(process.env.PORT, "0.0.0.0", (err, address) => {
    if (err) throw err;
  });
})();
