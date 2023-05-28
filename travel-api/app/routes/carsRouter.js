const express = require('express');
const adminRole = require('../utils/userRole');
const {
  postCarHandler, getCarsHandler, getCarByIdHandler, deleteCarByIdHandler,
} = require('../controllers/carsController');
const { verifyAccessToken } = require('../tokenize/TokenManager');

const router = express.Router();

router.post('/cars', verifyAccessToken, adminRole, postCarHandler);
router.get('/cars', getCarsHandler);
router.get('/cars/:id', getCarByIdHandler);
router.delete('/cars/:id', verifyAccessToken, adminRole, deleteCarByIdHandler);

module.exports = router;