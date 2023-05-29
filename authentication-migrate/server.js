require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./app/models');

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
/** RUN SEEDER DATA */
const { up, down } = require('./app/seeders/20230529154522-seed_roles');

app.use('/api/seeder', async (req, res) => {
  await down(db.sequelize.queryInterface, db.Sequelize);
  await up(db.sequelize.queryInterface, db.Sequelize);

  res.status(200).send({
    status: 'success',
    message: 'seeder successfully run',
  });
});

/** MAIN ROUTE */
require('./app/router/router')(app);

db.sequelize.authenticate().then(() => {
  app.listen(port, () => console.log(`${title} run on ${baseUrl}/${port}`));
});
