const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '113579',
  database: 'recipeFood',
  port: 5432,
});


module.exports = pool;