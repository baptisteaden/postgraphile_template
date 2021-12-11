(async () => {
  const { Client } = require("pg");
  const fs = require("fs").promises;
  require("dotenv").config({ path: `${__dirname}/../.env` });

  let rootSqlDir = process.argv[2];
  if (rootSqlDir && rootSqlDir !== "up" && rootSqlDir !== "down") {
    console.error(
      `Wrong parameter '${rootSqlDir}', possible values are: up, down`
    );
    return;
  }
  if (!rootSqlDir) rootSqlDir = "up";
  rootSqlDir = `${__dirname}/${rootSqlDir}`;

  const client = new Client({
    connectionString: process.env.DATABASE_URL.includes("@db:5432")
      ? process.env.DATABASE_URL.replace(/@db:5432/, "@localhost:5432")
      : `${process.env.DATABASE_URL}?ssl=true`,
  });
  await client.connect();

  const rootSqlDirContent = await fs.readdir(`${rootSqlDir}`);

  const rootSqlDirContentStats = await Promise.all(
    rootSqlDirContent.map((fileOrDir) => fs.lstat(`${rootSqlDir}/${fileOrDir}`))
  );

  const dirs = rootSqlDirContent.filter((_fileOrDir, i) =>
    rootSqlDirContentStats[i].isDirectory()
  );

  const sqlFilePaths = (
    await Promise.all(dirs.map((d) => fs.readdir(`${rootSqlDir}/${d}`)))
  ).flatMap((dirFiles, i) =>
    dirFiles.map((dirFile) => `${rootSqlDir}/${dirs[i]}/${dirFile}`)
  );

  const queries = (
    await Promise.all(sqlFilePaths.map((f) => fs.readFile(f)))
  ).map((q) => q.toString());

  Promise.all(
    queries.map((query, i) => {
      console.log(`executing ${sqlFilePaths[i]}`);
      return client.query(query);
    })
  ).finally(() => client.end());
})();
