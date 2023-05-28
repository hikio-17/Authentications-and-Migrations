const express = require('express');
const { verifyAccessToken } = require('../tokenize/TokenManager');
const adminRole = require('../utils/userRole');
const {
  getAllTransactionHandler,
  getTransactionByIdHandler,
  postTransactionHandler,
  deleteTransactionByIdHandler,
} = require('../controllers/transactionController');

const router = express.Router();

router.get('/transactions', verifyAccessToken, adminRole, getAllTransactionHandler);
router.get('/transactions/:id', verifyAccessToken, getTransactionByIdHandler);
router.post('/transactions', verifyAccessToken, postTransactionHandler);
router.delete('/transaction/:id', verifyAccessToken, deleteTransactionByIdHandler);

module.exports = router;