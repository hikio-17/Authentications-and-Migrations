/* eslint-disable import/no-dynamic-require */
/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { errorHandler } = require('./app/utils/errorResponse');
const runSeeders = require('./seeder');

const app = express();

/** MIDDLEWARE */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token',
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

/** ENDPOINT SEEDER */
app.use('/api/seeder', (req, res) => {
  runSeeders();
  res.status(200).send({
    status: 'success',
    message: 'Seeder successfully run',
  });
});

/** ROUTER TRAVEL API */
fs.readdirSync('./app/routes').map((r) => app.use('/api', require(`./app/routes/${r}`)));
/** ROUTER DOCUMENTATION TRAVEL API */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errorHandler);

/** CONNECT TO DATABASE */
const db = require('./app/models');
// Set app config
const title = process.env.title || 'my title';
const port = process.env.PORT || 8000;
const baseUrl = process.env.URL || 'localhost';

db.sequelize.authenticate().then(async () => {
  try {
    app.listen(port, () => {
      console.log(`${title} running at ${baseUrl}/${port}`);
    });
  } catch (error) {
    console.log(error);
  }
});
