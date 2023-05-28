const express = require('express');
const { verifyAccessToken } = require('../tokenize/TokenManager');
const adminRole = require('../utils/userRole');
const {
  postLocationHandler,
  deleteLocationByIdHandler,
  getAllLocationsHandler,
  getLocationByIdHandler,
} = require('../controllers/locationController');

const router = express.Router();

router.get('/locations', getAllLocationsHandler);
router.get('/locations/:id', getLocationByIdHandler);
router.post('/locations', verifyAccessToken, adminRole, postLocationHandler);
router.delete('/locations/:id', verifyAccessToken, adminRole, deleteLocationByIdHandler);

module.exports = router;