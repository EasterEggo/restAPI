const pg = require('pg')
const { Pool } = pg
const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASS,
  host: process.env.PGHOST,
  database: process.env.PGDB
})
module.exports = pool
