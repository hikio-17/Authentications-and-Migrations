const express = require('express');
const adminRole = require('../utils/userRole');
const {
  postCarHandler, getCarsHandler, getCarByIdHandler, deleteCarByIdHandler,
} = require('../controllers/carsController');
const { verifyAccessToken } = require('../tokenize/TokenManager');

const router = express.Router();

router.post('/rental-companies/:companiyId/cars', verifyAccessToken, adminRole, postCarHandler);
router.get('/rental-companies/:companiyId/cars', getCarsHandler);
router.get('/rental-companies/:companiyId/cars/:id', getCarByIdHandler);
router.delete('/rental-companies/:companiyId/cars/:id', verifyAccessToken, adminRole, deleteCarByIdHandler);

module.exports = router;