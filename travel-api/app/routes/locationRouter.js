const express = require('express');
const { verifyAccessToken } = require('../tokenize/TokenManager');
const adminRole = require('../utils/userRole');
const { postLocationHandler } = require('../controllers/locationController');
const { deleteLocationById } = require('../services/locationsService');

const router = express.Router();

router.post('/locations', verifyAccessToken, adminRole, postLocationHandler);
router.delete('/locations/:id', verifyAccessToken, adminRole, deleteLocationById);

module.exports = router;