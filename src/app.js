//env
require('dotenv').config()
//express
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const app = express()
const logger = require('./middleware/loggermd')
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
const port = process.env.PORT

//routes for cnpq api endpoint
const cnpq = require('./routes/cnpqRoutes')
app.use('/v1/cnpq', cnpq)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.use(logger)
app.use(express.static('public'))

app.listen(port, () => {
  console.log(`server running at port ${port}`)
})
