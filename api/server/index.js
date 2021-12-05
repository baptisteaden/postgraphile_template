(async () => {
  const { postgraphile } = require("postgraphile");
  const fastify = require("fastify")({ logger: true });

  await fastify.register(require("middie"));
  fastify.use(require("cors")());

  fastify.use(
    postgraphile(process.env.DATABASE_URL || "postgres://postgres/", "public", {
      watchPg: true,
      graphiql: true,
      enhanceGraphiql: true,
      jwtPgTypeIdentifier: "public.jwt_token",
      jwtSecret: process.env.JWT_SECRET,
    })
  );

  fastify.get("/", (req, res) => {
    res.send({ hello: "world" });
  });

  fastify.listen(5433, "0.0.0.0", (err, address) => {
    if (err) throw err;
  });
})();
