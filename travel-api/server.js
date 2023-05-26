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

require('./app/router/router')(app);

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
