const express = require('express');
const { verifyAccessToken } = require('../tokenize/TokenManager');
const adminRole = require('../utils/userRole');
const { postRentalPriceHandler } = require('../controllers/rentalPriceController');
const { deleteCarByIdHandler } = require('../controllers/carsController');

const router = express.Router();

router.post('/cars/:cardId/price', verifyAccessToken, adminRole, postRentalPriceHandler);
router.delete('/cars/:cardId/price/:id', verifyAccessToken, adminRole, deleteCarByIdHandler);

module.exports = router;