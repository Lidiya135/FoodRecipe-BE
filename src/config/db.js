const { Pool } = require(`pg`);
require(`dotenv`).config();

const connectionString = process.env.PG_CONNECT;

const pool = new Pool({ connectionString });

pool.connect((err) => {
  if (err) {
    console.log('<:: PostgreSQL Client Error', err);
  } else {
    console.log(`::> PostgreSQL Client Connected lidiya_recipe`);
  }
});

module.exports = pool;

// const { Pool } = require('pg');

// const pool = new Pool({
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER
// });

// module.exports = pool;