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

//routes for cnpq api endpoint
const cnpq = require('./routes/cnpqroutes')

app.use('/v1/cnpq', cnpq)


app.listen(port, () => {
  console.log(`server running at port ${port}`)
})
