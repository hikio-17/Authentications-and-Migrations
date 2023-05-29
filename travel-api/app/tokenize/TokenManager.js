const Jwt = require('jsonwebtoken');
const { User } = require('../models');
const { authenticationErrorResponse } = require('../utils/errorResponse');

const TokenManager = {
  generateAccessToken: (id) => `Bearer ${Jwt.sign({
    id,
  }, 'hikio010217', {
    expiresIn: 86400,
  })}`,
  verifyAccessToken: (req, res, next) => {
    const tokenHeader = req.headers['x-access-token'];
    if (!tokenHeader) {
      return res.status(500).send({
        status: 'error',
        message: 'Access token not found',
      });
    }
    if (tokenHeader.split(' ')[0] !== 'Bearer') {
      return res.status(500).send({
        status: 'error',
        message: 'Incorrect token format',
      });
    }

    const token = tokenHeader.split(' ')[1];

    if (!token) {
      return res.status(500).send({
        status: 'error',
        message: 'No token provided',
      });
    }

    Jwt.verify(token, 'hikio010217', async (err, decode) => {
      if (err) {
        return res.status(500).send({
          status: 'error',
          message: err,
        });
      }

      const userId = decode.id;

      const user = await User.findByPk(userId);

      if (!user) authenticationErrorResponse(res, 'Access token not valid. User not found');

      req.userId = userId;
      next();
    });
  },
};

module.exports = TokenManager;