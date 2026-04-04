//env
require('dotenv').config()
//express
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
const port = process.env.PORT
//postgres
const pg = require('pg')
const { Pool } = pg
const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASS,
  host: process.env.PGHOST,
  database: process.env.PGDB
})

async function viewTable(table, param, value) {
  const tab = table.toString()
  const par = param.toString()
  const val = value.toString()
  const query = param === undefined ? `SELECT * FROM ${tab}` : `SELECT * FROM ${tab} WHERE ${par} = ${val}`
  const data = await pool.query(query)
  return data
}

async function insertCnpq(areas, subareas) {
  const sub = subareas.map((item) => item.toString())
  const query = {
    text: 'INSERT INTO cnpq(nome, subareas) VALUES($1, $2)',
    values: [areas.toString(), sub]
  }
  const res = await pool.query(query)
  return res
}
async function deleteFrom(table, value) {
  const query = {
    text: `DELETE FROM ${table.toString()} WHERE id = $1`,
    values: [Number(value)]
  }
  let del = await pool.query(query)
  return del
}

app.get('/v1/cnpq', (req, res) => {
  viewTable('cnpq')
    .then(result => res.json(result.rows))
})
app.get('/v1/cnpq/:id', (req, res) => {
  viewTable('cnpq', 'id', req.params.id)
    .then((result) => res.json(result.rows[0]))
})
app.post('/v1/cnpq', (req, res) => {
  const { nome, subarea } = req.body
  if (nome == null || subarea == null) {
    res.send("MISSING DATA")
    return console.error("ERROR:MISSING DATA")
  }
  insertCnpq(nome, subarea)
    .then((result) => res.json(result.rows))
})

app.delete('/v1/cnpq/:id', (req, res) => {
  deleteFrom('cnpq', req.params.id)
    .then((result) => res.send(result.rowCount === 0 ? "ID not found on database" : `Row with ID ${req.params.id} deleted successfully`))
})

app.listen(port, () => {
  console.log(`server running at port ${port}`)
})
