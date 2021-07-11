(async () => {
  const fastify = require("fastify")({
    logger: true,
  });
  const { postgraphile } = require("postgraphile");

  await fastify.register(require("middie"));
  fastify.use(require("cors")());

  fastify.use(
    postgraphile(process.env.DATABASE_URL || "postgres://postgres/", "public", {
      watchPg: true,
      graphiql: true,
      enhanceGraphiql: true,
    })
  );

  fastify.get("/", (req, res) => {
    res.send({ hello: "world" });
  });

  fastify.listen(5433, "0.0.0.0", (err, address) => {
    if (err) throw err;
  });
})();
