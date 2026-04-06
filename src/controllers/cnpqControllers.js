const f = require('../utils/cnpqFunctions')
const viewFull = async (req, res) => {
  f.viewTable('cnpq')
    .then(result => res.json(result.rows))
}
const viewId = async (req, res) => {
  f.viewTable('cnpq', 'id', req.params.id)
    .then((result) => res.json(result.rows[0]))
}
const insertData = async (req, res) => {
  const { nome, subarea } = req.body
  if (nome == null || subarea == null) {
    res.send("MISSING DATA")
    return console.error("ERROR:MISSING DATA")
  }
  f.insertCnpq(nome, subarea)
    .then((result) => res.json(req.body))
}

const delById = async (req, res) => {
  f.deleteFrom('cnpq', req.params.id)
    .then((result) => res.json(result.rowCount === 0 ? "ID not found on database" : `Row with ID ${req.params.id} deleted successfully`))
}
module.exports = {
  viewFull,
  delById,
  viewId,
  insertData
}
