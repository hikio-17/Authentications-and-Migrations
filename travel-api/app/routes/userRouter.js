const express = require('express');
const { verifyAccessToken } = require('../tokenize/TokenManager');
const adminRole = require('../utils/userRole');
const {
  getAllUsersHandler,
  getUserByIdHandler,
  deleteUserByIdHandler,
  editUserByIdHandler,
} = require('../controllers/userController');

const router = express.Router();

router.get('/users', verifyAccessToken, adminRole, getAllUsersHandler);
router.get('/users/:id', verifyAccessToken, getUserByIdHandler);
router.put('/users/:id', verifyAccessToken, editUserByIdHandler);
router.delete('/users/:id', verifyAccessToken, adminRole, deleteUserByIdHandler);

module.exports = router;