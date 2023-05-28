const express = require('express');
const { verifyAccessToken } = require('../tokenize/TokenManager');
const adminRole = require('../utils/userRole');
const { postPenaltyHandler, deletePenaltyByIdHandler } = require('../controllers/penaltyController');

const router = express.Router();

router.post('/penalties', verifyAccessToken, adminRole, postPenaltyHandler);
router.delete('/penalties/:id', verifyAccessToken, adminRole, deletePenaltyByIdHandler);

module.exports = router;