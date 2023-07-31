const express = require('express')
const routes = require('./app');
require('./src/config/database')
const app = express();

//importation des routes
const agenceRoute = require('./src/routes/agence.routes');


var bodyParser = require('body-parser')
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

const port = process.env.PORT || 3000

//liste des routes pour l'application
app.use('/api/agence/', agenceRoute);
app.use('/', routes);
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})