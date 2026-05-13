const mysql = require('mysql2/promise');
const env = require('../config/env');

const createDatabase = async () => {
  const connection = await mysql.createConnection({
    host: env.db.host,
    port: env.db.port,
    user: env.db.user,
    password: env.db.password,
  });

  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${env.db.name}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
  );

  await connection.end();
  console.log(`Banco ${env.db.name} criado ou ja existente.`);
};

createDatabase().catch((error) => {
  console.error('Falha ao criar banco.', error);
  process.exit(1);
});
