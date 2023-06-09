const express = require('express');
const { verifyAccessToken } = require('../tokenize/TokenManager');
const adminRole = require('../utils/userRole');
const {
  postRentalCompanyHandler,
  getRentalCompanyByIdHandler,
  getAllRentalComapaniesHandler,
  deleteRentalCompanyByIdHandler,
  editRentalCompanyByIdHandler,
} = require('../controllers/rentalCompaniesController');

const router = express.Router();

router.get('/rental-companies', getAllRentalComapaniesHandler);
router.get('/rental-companies/:id', getRentalCompanyByIdHandler);
router.put('/rental-companies/:id', verifyAccessToken, editRentalCompanyByIdHandler);
router.post('/rental-companies', verifyAccessToken, adminRole, postRentalCompanyHandler);
router.delete('/rental-companies/:id', verifyAccessToken, adminRole, deleteRentalCompanyByIdHandler);

module.exports = router;