const express = require('express');
const adminRole = require('../utils/userRole');
const {
  postCarHandler,
  getCarsHandler,
  getCarByIdHandler,
  deleteCarByIdHandler,
  editCarByIdHandler,
} = require('../controllers/carsController');
const { verifyAccessToken } = require('../tokenize/TokenManager');
const { postRentalPriceHandler, deleteRentalPriceByIdHandler } = require('../controllers/rentalPriceController');

const router = express.Router();

// cars
router.get('/cars', getCarsHandler);
router.get('/cars/:id', getCarByIdHandler);
router.put('/cars/:id', verifyAccessToken, editCarByIdHandler);
router.post('/cars', verifyAccessToken, adminRole, postCarHandler);
router.delete('/cars/:id', verifyAccessToken, adminRole, deleteCarByIdHandler);

// price
router.post('/cars/:carId/prices', verifyAccessToken, adminRole, postRentalPriceHandler);
router.delete('/cars/:carId/prices/:id', verifyAccessToken, adminRole, deleteRentalPriceByIdHandler);

module.exports = router;