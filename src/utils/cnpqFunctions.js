const pool = require('../config/db')
exports.viewTable = async (table, param, value) => {
  const tab = table.toString()
  const query = param === undefined ? `SELECT * FROM ${tab}` : `SELECT * FROM ${tab} WHERE ${param.toString()} = ${value.toString()}`
  const data = await pool.query(query)
  return data
}

exports.insertCnpq = async (areas, subareas) => {
  const sub = subareas.map((item) => item.toString())
  const query = {
    text: 'INSERT INTO cnpq(nome, subareas) VALUES($1, $2)',
    values: [areas.toString(), sub]
  }
  const res = await pool.query(query)
  return res
}
exports.deleteFrom = async (table, value) => {
  const query = {
    text: `DELETE FROM ${table.toString()} WHERE id = $1`,
    values: [Number(value)]
  }
  let del = await pool.query(query)
  return del
}
