const express = require('express');
const { signup, signin } = require('../controllers/userController');

const router = express.Router();

router.post('/auth/signup', signup);
router.post('/auth/signin', signin);

module.exports = router;