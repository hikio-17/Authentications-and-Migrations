/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const db = require('./app/models');

const swaggerDocument = require('./swagger.json');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('app/public'));

// Set app config
const title = process.env.title || 'my title';
const port = process.env.PORT || 8000;
const baseUrl = process.env.URL || 'localhost';

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

const userRoutes = require('./app/routes/userRouter');
const carsRoutes = require('./app/routes/carsRouter');
const rentalCompaniesRoutes = require('./app/routes/rentalCompaniesRouter');
const rentalPriceRoutes = require('./app/routes/rentalPriceRouter');
const locationRoutes = require('./app/routes/locationRouter');
const transactionRoutes = require('./app/routes/transactionRouter');
const penaltyRoutes = require('./app/routes/penaltyRouter');
const { errorHandler } = require('./app/utils/errorResponse');

app.use('/api', userRoutes);
app.use('/api', carsRoutes);
app.use('/api', rentalCompaniesRoutes);
app.use('/api', rentalPriceRoutes);
app.use('/api', locationRoutes);
app.use('/api', transactionRoutes);
app.use('/api', penaltyRoutes);
app.use(errorHandler);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument),
);

db.sequelize.sync().then(() => {
  // createRoles();
  app.listen(port, () => console.log(`${title} run on ${baseUrl}/${port}`));
});

// function createRoles() {
//   db.Role.create({
//     id: 1,
//     name: 'USER',
//   });

//   db.Role.create({
//     id: 2,
//     name: 'ADMIN',
//   });

//   db.Role.create({
//     id: 3,
//     name: 'PM',
//   });
// }
